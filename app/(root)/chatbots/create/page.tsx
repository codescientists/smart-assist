import ChatbotForm from '@/components/forms/ChatbotForm'
import { auth, clerkClient } from '@clerk/nextjs/server';
import React from 'react'

const page = async () => {
  const { userId } = auth();

  const user = await clerkClient.users.getUser(userId!);

  return (
    <section className="mx-6 md:px-8 xl:px-32">
        <h3 className="text-2xl my-8 font-bold capitalize">Create your chatbot</h3>
        <ChatbotForm type="Create" userId={user?.publicMetadata?.userId} />
    </section>
  )
}

export default page