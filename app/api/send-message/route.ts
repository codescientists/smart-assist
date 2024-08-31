import Session from "@/lib/database/models/session.model";
import { NextRequest, NextResponse } from "next/server";

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

export async function POST(request: NextRequest) {
  const { message, name, shopDetails, chats, sessionId } = await request.json();

  const prevHistory = chats.map((chat: any) => ({
    role: chat.sender == "bot" ? "model" : "user",
    parts: [{ text: chat.message }],
  }));

  try {

    const chat = model.startChat({
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.1,
      },    
      history: [
        {
            role: "user", 
            parts: [{ text: `You are a helpful assistant talking to customer. If a generic question is asked which is not relevant or in the same scope or domain as the points in mentioned in the key information section, kindly inform the user they are only allowed to search for the specified content. Use Emoji's where possible. Here is some key information that you need to be aware of, these are elements you may be asked about: ${shopDetails}` }]
        },
        ...prevHistory
      ]
    });

    let result = await chat.sendMessage(message);

    const botMessage = { sender: 'bot', message: result.response.text(), timestamp: new Date() };

    const latestChats = [
      chats[chats.length - 1],
      botMessage
    ]

    // Save chat conversation
    const session = await Session.findOneAndUpdate(
      { _id: sessionId },
      {
        $push: { chats: { $each: latestChats } }, // Append the new chats
      }
    );

    if (!session) return NextResponse.json({ error: 'chat did not updated' }, { status: 404 });

    return NextResponse.json({
      data: result.response.text(),
    })
  
    
  } catch (error) {
    console.log("Error sending message", error)
    return NextResponse.json({ error }, { status: 500 });
  }
  
}