import { connectToDatabase } from "@/lib/database";
import ChatBot from "@/lib/database/models/chatbot.model";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, context: { params: { id: string } }) {
    const id = context.params.id;
    
    try {
        await connectToDatabase();

        const chatbot = await ChatBot.findById(id);

        if (!chatbot) {
          return NextResponse.json({ error: 'chatbot not found' }, { status: 404 });
        }
  
        return NextResponse.json({ chatbot: chatbot }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
  
}
