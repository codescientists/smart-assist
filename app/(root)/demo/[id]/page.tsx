import ChatWidget from '@/components/shared/ChatWidget'
import { getChatBotById } from '@/lib/actions/chatbot.actions'
import React, { useEffect } from 'react'

const page = async ({ params: { id } }: any) => {

  const chatbot = await getChatBotById(id);

  return (
    <>
      <ChatWidget chatBotId={id} chatbot={chatbot} />
    </>
  )
}

export default page