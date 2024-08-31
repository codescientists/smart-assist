"use client"

import { getChatBotById } from '@/lib/actions/chatbot.actions';
import { getSessionById, getSessionsByChatbotId } from '@/lib/actions/session.actions';
import { XIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const Sessions = ({params: { id }}: {params: { id: string }}) => {
  const [sessions, setSessions] = useState<any>([]);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [messages, setMessages] = useState<any>([]);
  const [chatbot, setChatbot] = useState<any>();

  useEffect(() => {
    const getSessions = async () => {
        const data = await getSessionsByChatbotId(id);
        setSessions(data)
        const chatbot = await getChatBotById(id);
        setChatbot(chatbot)
    }

    getSessions()
  }, []);

  const handleSessionSelect = async (sessionId: any) => {
    setSelectedSession(sessionId);
    const sessionData = await getSessionById(sessionId);
    setMessages(sessionData?.chats);
  };

  return (
    <div className="grid grid-cols-8 my-10 md:px-8 xl:px-32">
      {/* Sidebar */}
      <div className="col-span-2 bg-white border-r overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">{chatbot?.name} bot Sessions</h2>
        </div>
        <ul className="h-[30rem]">
          {sessions?.map((session:any) => (
            <li 
              key={session._id} 
              onClick={() => handleSessionSelect(session?._id)}
              className={`p-4 cursor-pointer hover:bg-gray-200 ${selectedSession === session?._id ? 'bg-gray-200' : ''}`}
            >
              <p className="font-medium">{session?.user?.name || 'Unknown User'}</p>
              <p className="text-sm text-gray-600">{new Date(session?.startTime).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Chat Area */}
      <div className="col-span-6 flex items-center justify-center"> 
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-3 w-96">
          <div style={{background: chatbot?.color}} className="p-4 bg-blue-600 text-white flex items-center justify-between">
            <div>
              {selectedSession 
                ? `Chat with ${sessions.find((s:any) => s._id === selectedSession)?.user?.name || 'Unknown User'}` 
                : 'Select a session'
              }
            </div>
            <button
              className="bg-transparent text-white p-3 rounded-full"
            >
              <XIcon />
            </button>
          </div>
          <div className="p-4 h-80 overflow-y-auto">
            {messages.length > 0 ? (
              messages.map((message:any, index:any) => (
                <div key={index} className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-2 rounded-lg ${message.sender === 'user' ? 'bg-black text-white' : 'bg-gray-300 text-black'}`}>
                    {message.message}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No messages to display</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sessions;
