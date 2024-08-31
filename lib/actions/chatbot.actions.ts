'use server'

import { connectToDatabase } from "../database"
import ChatBot from "../database/models/chatbot.model"
import { handleError } from "../utils"
import { revalidatePath } from "next/cache"

export async function createChatBot(data: any) {
    try {
      await connectToDatabase()
  
      const newChatBot = await ChatBot.create(data)
      return JSON.parse(JSON.stringify(newChatBot))
    } catch (error) {
      handleError(error)
    }
}

export async function updateChatBot(chatBotId: string, data: any) {
    try {
      await connectToDatabase()

      const updatedChatBot = await ChatBot.findOneAndUpdate( {_id: chatBotId} , { $set: data }, { new: true })
      
      if (!updatedChatBot) throw new Error('Chatbot update failed')

      return JSON.parse(JSON.stringify(updatedChatBot))

    } catch (error) {
      handleError(error)
    }
}
  
export async function deleteChatBot(chatBotId: string) {
    try {
      await connectToDatabase()
      
      // Find chatbot to delete
      const chatBotToDelete = await ChatBot.findOne({ chatBotId })
  
      if (!chatBotToDelete) {
        throw new Error('ChatBot not found')
      }
      
      // Delete chatbot
      const deletedChatBot = await ChatBot.findByIdAndDelete(chatBotToDelete._id)
      
      revalidatePath('/')
      
      return deletedChatBot ? JSON.parse(JSON.stringify(deletedChatBot)) : null
    } catch (error) {
      handleError(error)
    }
}


export async function getChatBotById(chatBotId:string | undefined) {
      try {
        await connectToDatabase()
    
        const chatbot = await ChatBot.findById(chatBotId);
        
        return JSON.parse(JSON.stringify(chatbot))
      } catch (error) {
        handleError(error)
      }
}

export async function getChatBotByIdWithSessions(chatBotId:string | undefined) {
      try {
        await connectToDatabase()

        console.log("CONNECTED")
    
        const chatbot = await ChatBot.findById(chatBotId).populate('sessions');
        console.log(chatbot)
        
        return JSON.parse(JSON.stringify(chatbot))
      } catch (error) {
        handleError(error)
      }
}


export async function getAllChatbots() {
  try {
    await connectToDatabase()

    const chatBots = await ChatBot.find().sort({ createdAt: 'desc' })

    return {
      data: JSON.parse(JSON.stringify(chatBots)),
    }
    
  } catch (error) {
    handleError(error)
  }
}

export async function getChatbotsByUser(userId: any) {
  try {
    await connectToDatabase()

    const chatBots = await ChatBot.find({ owner: userId}).sort({ createdAt: 'desc' })

    return {
      data: JSON.parse(JSON.stringify(chatBots)),
    }
    
  } catch (error) {
    handleError(error)
  }
}