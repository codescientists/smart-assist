"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { createChatBot, updateChatBot } from "@/lib/actions/chatbot.actions"
import { GradientPicker } from "../ui/color-picker"
import { BotIcon, SendHorizonalIcon, XIcon } from "lucide-react"
import toast from "react-hot-toast"

export const chatbotFormSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(3, 'Description must be at least 3 characters'),
  predefinedInformation: z.string().min(20, 'Description must be at least 20 characters'),
  color: z.string(),
  // logo: z.string(),
});

export const chatbotDefaultValues = {
    name: '',
    description: '',
    predefinedInformation: '',
    color: '',
    // logo: '',
}

const colors = [
  '#E2E2E2',
  '#ff75c3',
  '#ffa647',
  '#ffe83f',
  '#9fff5b',
  '#70e2ff',
  '#cd93ff',
  '#09203f',
]

type ChatbotFormProps = {
  type: "Create" | "Update"
  chatbot?: any,
  chatbotId?: string,
  userId: string | null | unknown,
}

const ChatbotForm = ({ type, chatbot, chatbotId, userId } : ChatbotFormProps) => {

  const [color, setColor] = useState('#09203f');

  const initialValues = chatbot && type === 'Update' 
    ? { 
      ...chatbot,
    } : chatbotDefaultValues

  const router = useRouter();

  const form = useForm<z.infer<typeof chatbotFormSchema>>({
    resolver: zodResolver(chatbotFormSchema),
    defaultValues: initialValues,
  })
 
  async function onSubmit(values: z.infer<typeof chatbotFormSchema>) {
    
    if(type === 'Create') {
      try {
        const newChatbot = await createChatBot({
          name: values.name,
          description: values.description,
          predefinedInformation: values.predefinedInformation,
          color: values.color,
          owner: userId
        })

        if(newChatbot) {
          form.reset();
          router.push(`/chatbots/${newChatbot._id}`)
        }
        
      } catch (error) {
        console.log(error);
      }
    }

    if(type === 'Update') {
      if(!chatbotId) {
        router.back()
        return;
      }

      try {
        await updateChatBot(chatbotId, {
          name: values.name,
          description: values.description,
          predefinedInformation: values.predefinedInformation,
          color: values.color,
        })

        toast.success("Updated!")
        
      } catch (error) {
        (error);
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mb-20">
        <div className="grid grid-cols-12 w-full">
          <div className="col-span-12 md:col-span-6 flex flex-col gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Chatbot Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Chatbot Name" {...field} className="flex items-center h-[54px] w-full overflow-hidden rounded-md bg-gray-50 px-4 py-2" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Chatbot Tagline</FormLabel>
                    <FormControl className="h-10">
                      <Input placeholder="Enter Tagline of your store or service that represents this chatbot" {...field} className="flex items-center h-[54px] w-full overflow-hidden rounded-md bg-gray-50 px-4 py-2" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="predefinedInformation"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Chatbot Details</FormLabel>
                    <FormControl className="h-24">
                      <Textarea {...field} className="bg-gray-50 h-56" placeholder="Enter description of your store which you want to show to your user. For example: My Store name is E-Shopping Mall. We offer various amount of electronic products. We are offering 20% discount for independence day sale starting from 08 august to 18 august. "/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
            />


            <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Color Scheme</FormLabel>
                    <FormControl>
                      <GradientPicker
                        className="w-full"
                        background={field.value}
                        setBackground={field.onChange}
                        setColor={setColor}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

            <Button 
              type="submit"
              size="lg"
              disabled={form.formState.isSubmitting}
              className="button col-span-2 w-full"
              >
              {form.formState.isSubmitting ? (
                'Submitting...'
              ): `${type} Chatbot `}</Button>
              
          </div>
          <div className="col-span-12 md:col-span-6 mt-6 flex flex-col items-center justify-start">
            <h2 className="text-xl font-bold">Preview</h2>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden mt-3 w-72 md:w-80">
              <div style={{background: form.getValues("color")}} className="p-4 bg-blue-600 text-white flex items-center justify-between">
                <div className="flex flex-col items-start">
                  <h4 className="font-bold">{form.getValues("name")}</h4>
                  <p className="text-xs">{form.getValues("description")}</p>
                </div>
                <button
                  className="bg-transparent text-white p-3 rounded-full"
                >
                  <XIcon />
                </button>
              </div>
              <div className="p-4 h-64 overflow-y-auto">
                <div className="flex items-center justify-center">
                  <BotIcon className="h-16 w-16 text-blue-600 text-center"/>
                </div>
                <div
                  className={`flex justify-start`}
                >
                  <div
                    style={{background: form.getValues("color")}}
                    className={`bg-blue-600 text-white p-2 rounded-lg mb-2 max-w-xs`}
                  >
                    How can I help you?
                  </div>
                </div>
                <div
                  className={`flex justify-end`}
                >
                  <div
                    className={`bg-gray-300 text-white p-2 rounded-lg mb-2 max-w-xs`}
                  >
                    What are the available offers
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-200 flex items-center">
                <input
                  type="text"
                  className="w-full border rounded px-2 mr-1 h-10 text-sm"
                  placeholder="Type a message..."
                />
                <button
                  style={{background: form.getValues("color")}}
                  className={`bg-blue-600 text-white rounded w-12 h-10 flex items-center justify-center`}
                >
                  <SendHorizonalIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default ChatbotForm