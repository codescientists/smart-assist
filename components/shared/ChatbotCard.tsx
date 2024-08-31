import { BotIcon, HeartIcon } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'

const ChatbotCard = ({ chatbot }: any) => {

  return (
    <div className="w-full h-full border px-4 py-5 rounded-md">
      <div className="flex items-center">
        <div style={{ background: chatbot?.color}} className="bg-indigo-400 flex items-center justify-center rounded-full mr-4 w-14 h-14">
          <BotIcon className="h-8 w-8 text-white" />
        </div>
        <div>
          <Link href={`/chatbots/${chatbot?._id}`} className="custom-link text-lg font-medium line-clamp-2">
            {chatbot?.name}
          </Link>
          <p className="text-xs">{chatbot?.description}</p>
        </div>
      </div>
      <div className="mt-4">
        <Link href={`/chatbots/${chatbot?._id}`} className="w-full flex items-center justify-center text-sm bg-indigo-500 text-white hover:bg-indigo-700 transition px-3 py-2 rounded-md font-semibold">
          View Chatbot
        </Link>
      </div>
    </div>
  )
}

export default ChatbotCard