'use server'

import { connectToDatabase } from "../database"
import ChatBot from "../database/models/chatbot.model"
import Session from "../database/models/session.model"
import { handleError } from "../utils"

export async function createSession(data: any) {
  try {
      await connectToDatabase()

      // Create the session and save it to the session collection
      const newSession = await Session.create(data)

      // Update the corresponding bot by adding the new session to its sessions array
      await ChatBot.findByIdAndUpdate(
          newSession.chatBot, // Bot ID is stored in the session
          { $push: { sessions: newSession._id } }, // Push the new session ID to the bot's sessions array
          { new: true }
      )

      return JSON.parse(JSON.stringify(newSession))
  } catch (error) {
      handleError(error)
  }
}

export async function saveChatConversation(sessionId: string, data: any) {
    try {
      await connectToDatabase()

      const updatedSession = await Session.findOneAndUpdate( {_id: sessionId} , { $set: data }, { new: true })
      
      if (!updatedSession) throw new Error('Failed saving chat')

      return JSON.parse(JSON.stringify(updatedSession))

    } catch (error) {
      handleError(error)
    }
}

export async function getSessionById(sessionId:string | undefined) {
    try {
      await connectToDatabase()
  
      const session = await Session.findById(sessionId);
      
      return JSON.parse(JSON.stringify(session))
    } catch (error) {
      handleError(error)
    }
}
  
export async function getSessionsByChatbotId(chatBotId:string | undefined) {
    try {
      await connectToDatabase()
  
      const session = await Session.find({chatBot: chatBotId}).sort( { "startTime": -1 } );
      
      return JSON.parse(JSON.stringify(session))
    } catch (error) {
      handleError(error)
    }
}
  