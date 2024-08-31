import { connectToDatabase } from "@/lib/database";
import ChatBot from "@/lib/database/models/chatbot.model";
import Session from "@/lib/database/models/session.model";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest, context: { params: { id: string } }) {
    const data = await request.json();
    const id = context.params.id;

    try {
        await connectToDatabase();

        const session = await Session.findOneAndUpdate( {_id: id} , { $set: data }, { new: true })
      
        if (!session) return NextResponse.json({ error: 'session did not updated' }, { status: 404 });

        return NextResponse.json({ session }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
    }
  
}
