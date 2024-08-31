import { connectToDatabase } from "@/lib/database";
import Session from "@/lib/database/models/session.model";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, context: { params: { id: string } }) {
    const id = context.params.id;

    try {
        await connectToDatabase();

        const session = await Session.findOne({ _id: id });

        if (!session) {
          return NextResponse.json({ error: 'session not found' }, { status: 404 });
        }
  
        return NextResponse.json({ session }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to retrieve session' }, { status: 500 });
    }
  
}
