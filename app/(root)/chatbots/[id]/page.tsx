"use client"

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { getChatBotById, updateChatBot } from '@/lib/actions/chatbot.actions';
import { getSessionsByChatbotId } from '@/lib/actions/session.actions';
import { ArrowRight, PenBoxIcon } from 'lucide-react';
import Link from 'next/link';

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const ChatbotDetails = ({params: { id }}: {params: { id: string }}) => {
  const [message, setMessage] = useState('')
  const [chatbot, setChatbot] = useState<any>();
  const [sessions, setSessions] = useState<any>([]);

  useEffect(() => {
    const getChatBot = async () => {
      const data = await getChatBotById(id);
      setMessage(data?.predefinedInformation);
      setChatbot(data);
      const sessions = await getSessionsByChatbotId(id)
      setSessions(sessions);
    }
    getChatBot()
  }, [])
  

  const updateChatBotInfo = async () => {
    try {
      await updateChatBot(id, {
        predefinedInformation: message,
      })

      toast.success("Updated!")
      
    } catch (error) {
      console.log(error);
    }
  };

  const codeString = `<my-widget chatbot-id="${id}"></my-widget>
<script src="https://smart-assist-widget.vercel.app/widget.umd.js"></script>`

  return (
    <section className="grid grid-cols-12 gap-5 my-4 md:px-8 xl:px-32">
        <div className="col-span-12 md:col-span-5 px-6">
          {/* <h6 className="font-semibold flex items-center text-sm line-clamp-1">Demo : <Link href={`/demo/${id}`} target="_blank" className="flex items-center text-purple-600 text-xs underline mx-2">{`http://localhost:3000/demo/${id}`} <SquareArrowOutUpRight className='h-4 w-4 ml-1'/> </Link></h6> */}

          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{chatbot?.name}</h2>
            <Link href={`/chatbots/${chatbot?._id}/edit`} className="bg-black text-white h-10 w-10 flex items-center justify-center rounded-md"> <PenBoxIcon /> </Link>
          </div>
          <p className="my-4">{chatbot?.description}</p>

          <h5 className="font-medium mb-1">Quick edit your shop description: </h5>
          <Textarea value={message} onChange={(e) => setMessage(e.target.value)} className="bg-gray-100 h-56" placeholder="Enter description of your store which you want to show to your user. For example: My Store name is E-Shopping Mall. We offer various amount of electronic products. We are offering 20% discount for independence day sale starting from 08 august to 18 august. "/>
          <Button className="mt-4 w-full ml-auto" onClick={updateChatBotInfo}>Save</Button>
        </div>
        <div className="col-span-12 md:col-span-7 px-6">
          <h2 className="text-xl font-bold">Insert bot on your website</h2>
          <p className="text-sm my-2">Copy this code and paste on main html ChatbotDetails of your website.</p>
          <SyntaxHighlighter language="html" style={docco}>
            {codeString}
          </SyntaxHighlighter>

          <div className="flex items-center justify-between mt-6">
            <h2 className="text-xl font-bold">Recent sessions</h2>
            <Link href={`/chatbots/${chatbot?._id}/sessions`} className="flex items-center justify-center text-sm text-indigo-500 font-medium">
              View all sessions <ArrowRight className='h-4 w-4 ml-1'/>
            </Link>
          </div>
          <ul className="h-fit">
            {sessions?.slice(0, 4)?.map((session:any) => (
              <li 
                key={session._id} 
                className={`p-4 cursor-pointer hover:bg-gray-200`}
              >
                <Link href={`/chatbots/${chatbot?._id}/sessions`}>
                  <p className="font-medium">{session?.user?.name || 'Unknown User'}</p>
                  <p className="text-sm text-gray-600">{new Date(session?.startTime).toLocaleString()}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
    </section>
  )
}

export default ChatbotDetails