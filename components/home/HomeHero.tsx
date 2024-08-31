import { SignedIn, SignedOut, SignUpButton } from '@clerk/nextjs'
import { ArrowRight, BotIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const HomeHero = () => {
  return (
    <section className="relative md:px-8 xl:px-32">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col-reverse items-center">
            <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold">Create, Manage, and Empower
                <br className="hidden lg:inline-block"/>with Custom AI Chatbots
            </h1>
            <p className="mb-8 leading-relaxed">Store and analyze conversations, track user interactions, and enhance customer support—all from a single, intuitive dashboard.</p>
            <div className="flex justify-center">
                <SignedIn>
                    <Link href={`/chatbots`} className="flex items-center justify-center text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Create Chatbot <BotIcon className='ml-2' /> </Link>
                </SignedIn>
                <SignedOut>
                    <SignUpButton>
                        <button className="flex items-center justify-center text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Get Started <ArrowRight className='ml-2' /> </button>
                    </SignUpButton>
                </SignedOut>
            </div>
            </div>
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img className="object-cover object-center rounded" alt="hero" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/mobile-app.svg"/>
            </div>
        </div>

        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div></div>
    </section>
  )
}

export default HomeHero