"use client"

import { createSession, getSessionById, saveChatConversation } from '@/lib/actions/session.actions';
import { BotMessageSquare, SendHorizonalIcon, XIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const ChatWidget = ({ chatBotId, chatbot }: any) => {
  const [messages, setMessages] = useState<{sender: string, message: string, timestamp: Date}[] | []>([]);
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>();
  const [activeInput, setActiveInput] = useState('chat')
  const [userInfo, setUserInfo] = useState({name: '', email: ''})

  useEffect(() => {
    const createNewSession = async () => {
      const data = {
        chatBot: chatBotId
      }

      const newSession = await createSession(data);

      localStorage.setItem(`smartAssistChat${chatBotId}SessionId`, newSession._id);
      setSessionId(newSession._id);

      setMessages([
        { sender: 'bot', message: 'Hello! Before we continue, may I have your name?', timestamp: new Date() },
      ]);

      setActiveInput('name')
    }

    const storedSessionId = localStorage.getItem(`smartAssistChat${chatBotId}SessionId`);

    if (storedSessionId) {
      const getSession = async () => {
        const session = await getSessionById(storedSessionId);
        
        if (!session || session.chatBot !== chatBotId) {
          createNewSession();
        }
        
        setUserInfo({name: session?.user?.name, email: session?.user?.email})
        setSessionId(storedSessionId);
        setMessages(session?.chats)
      }
      getSession()
    } 
    else if (isOpen && !storedSessionId) {
      createNewSession();
    }
  }, [isOpen]);


  const handleSaveUser = async () => {
    if (inputValue.trim() !== '') {
      const session = await saveChatConversation(sessionId!, {
        user: {
          name: inputValue
        }
      })

      setInputValue('');

      setMessages(prev => [...prev, 
        { sender: 'bot', message: `Hello ${session?.user?.name}!, How can I assist you?`, timestamp: new Date() }
      ]);

      setActiveInput('chat')
    } 
  };


  const handleSendMessage = async () => {
    if (inputValue.trim() !== '') {
      const userMessage = { sender: 'user', message: inputValue, timestamp: new Date() };
      // Update the state with the new user message
      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages, userMessage];
        return updatedMessages;
      });

      setInputValue('');
      
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: userInfo?.name, message: inputValue, shopDetails: chatbot?.predefinedInformation}),      
      }) 
      const data = await response.json();

      const botMessage = { sender: 'bot', message: data.data, timestamp: new Date() };

      // Update the state with the bot's response
      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages, botMessage];
        return updatedMessages;
      });
      
      await saveChatConversation(sessionId!, { chats: [...messages, userMessage, botMessage] });
      
    } 
  };

  return (
    <div className="fixed bottom-5 right-5 md:bottom-12 md:right-12 flex flex-col justify-end items-end">
      
      {/* Chat Box */}
      {isOpen && (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-3 max-w-xl w-full">
          <div style={{background: chatbot?.color }} className="p-4 bg-indigo-600 text-white flex items-center justify-between">
            <div className="flex flex-col items-start">
              <h4 className="font-bold">{chatbot?.name}</h4>
              <p className="text-xs">{chatbot?.description}</p>
            </div>
            <button
              className="bg-transparent text-white p-3 rounded-full"
              onClick={() => setIsOpen(!isOpen)}
            >
              <XIcon />
            </button>
          </div>
          <div className="p-4 h-64 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : `justify-start`}`}
              >
                <div
                  style={{ background: message.sender !== 'user' && chatbot?.color }}
                  className={`${
                    message.sender === 'user' ? 'bg-gray-200 text-black' : 'bg-[#434343] text-white'
                  } p-2 rounded-lg mb-2 max-w-xs`}
                >
                  {message.message}
                </div>
              </div>
            ))}
          </div>
          {
            activeInput == "name" ? 
            <div className="p-4 border-t border-gray-200 flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full border rounded px-2 mr-1 h-10 text-sm"
                placeholder="Enter your name..."
              />
              <button
                onClick={handleSaveUser}
                style={{background: chatbot?.color }}
                className="bg-indigo-600 text-white rounded w-12 h-10 flex items-center justify-center"
              >
                <SendHorizonalIcon className="h-4 w-4" />
              </button>
            </div>
            :
            <div className="p-4 border-t border-gray-200 flex items-center">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full border rounded px-2 mr-1 h-10 text-sm"
                placeholder="Type a message..."
              />
              <button
                onClick={handleSendMessage}
                style={{background: chatbot?.color }}
                className="bg-indigo-600 text-white rounded w-12 h-10 flex items-center justify-center"
              >
                <SendHorizonalIcon className="h-4 w-4" />
              </button>
            </div>
          }
        </div>
      )}
      <button
          style={{background: chatbot?.color }}
          className="bg-indigo-600 text-white h-14 w-28 flex items-center justify-center rounded-full shadow-lg mt-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <XIcon /> : <BotMessageSquare />}
      </button>
    </div>
  );
};

export default ChatWidget;
