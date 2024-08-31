import { connectToDatabase } from "@/lib/database";
import ChatBot from "@/lib/database/models/chatbot.model";
import Session from "@/lib/database/models/session.model";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    const data = await request.json();

    try {
        await connectToDatabase();

        const newSession = await Session.create(data)

        // Update the corresponding bot by adding the new session to its sessions array
        await ChatBot.findByIdAndUpdate(
            newSession.chatBot, // Bot ID is stored in the session
            { $push: { sessions: newSession._id } }, // Push the new session ID to the bot's sessions array
            { new: true }
        )
  
        return NextResponse.json({ newSession }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
    }
  
}
