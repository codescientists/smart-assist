import { NextRequest, NextResponse } from "next/server";

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

export async function GET(request: NextRequest) {
  // const { chat_session_id, chatbot_id, content, name } = await request.json();

  console.log("RECIEVED MESSAGE");

  try {

    // const completion = await openai.chat.completions.create({
    //   messages: [{ role: "system", content: "You are a helpful assistant of CodeScientist App that provide courses of all programming languages for free." }],
    //   model: "gpt-3.5-turbo",
    // });

    const name = "Piyush"
  
    const shopDetails = `
      My shop name is Gada Electronics. Address of my shop is Andheri East, Mumbai. Phone number of my shop is 123 234 2123. Website address is gadaelectronics.com. We are offering 20% discount on each products between 06 August to 18 August as an independence day sale.
    `;

    const chat = model.startChat({
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.1,
      },    
      history: [
        {
            role: "user",
            parts: [{ text: `You are a helpful assistant talking to ${name}. If a generic question is asked which is not relevant or in the same scope or domain as the points in mentioned in the key information section, kindly inform the user they are only allowed to search for the specified content. Use Emoji's where possible. Here is some key information that you need to be aware of, these are elements you may be asked about: ${shopDetails}` }]
        },
      ]
    });

    let result = await chat.sendMessage("Is there any sale available?");
    console.log(result.response.text()); 

    return NextResponse.json({
      data: result,
    })
  
    
  } catch (error) {
    console.log("Error sending message", error)
    return NextResponse.json({ error }, { status: 500 });
  }
  
}