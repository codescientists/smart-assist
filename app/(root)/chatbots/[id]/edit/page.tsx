import ChatbotForm from '@/components/forms/ChatbotForm'
import { getChatBotById } from '@/lib/actions/chatbot.actions';
import { auth, clerkClient } from '@clerk/nextjs/server';
import React from 'react'

const page = async ({params: { id }}: {params: { id: string }}) => {
  const { userId } = auth();

  const user = await clerkClient.users.getUser(userId!);

  const chatbot = await getChatBotById(id);

  return (
    <section className="mx-6 md:px-8 xl:px-32">
        <h3 className="text-2xl my-8 font-bold capitalize">Edit your chatbot</h3>
        <ChatbotForm type="Update" chatbotId={id} chatbot={chatbot} userId={user.publicMetadata.userId} />
    </section>
  )
}

export default page