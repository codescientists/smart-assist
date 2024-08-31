import ChatbotCard from '@/components/shared/ChatbotCard'
import { getAllChatbots, getChatbotsByUser } from '@/lib/actions/chatbot.actions'
import { auth, clerkClient } from '@clerk/nextjs/server';
import { PlusCircleIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const ChatBots = async () => {
  const { userId } = auth();

  const user = await clerkClient.users.getUser(userId!);

  const chatbots = await getChatbotsByUser(user?.publicMetadata?.userId);

  return (
    <section className="mx-6 my-10 md:px-8 xl:px-32">
        <h4 className="font-bold text-2xl mb-4">Chatbots</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {
                chatbots?.data?.map((chatbot: any) => (
                    <div className="col-span-2" key={chatbot?._id}>
                        <ChatbotCard chatbot={chatbot} />
                    </div>
                ))
            }
            <Link href={`/chatbots/create`} className="col-span-2 border border-black hover:border-indigo-600 hover:text-indigo-600 transition flex items-center justify-center border-dashed rounded-md min-h-36">
                <PlusCircleIcon className="mr-2"/> Create New Chatbot
            </Link>
        </div>
    </section>
  )
}

export default ChatBots