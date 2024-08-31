"use client"

import { AlignJustifyIcon, BotIcon } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "../ui/scroll-area";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";


const Header = () => {
  const [isOpen, setisOpen] = useState(false);

  return (
    <header className="flex items-center justify-between py-5 border-b-2 bg-[rgba(255,255,255,0.5)] px-2 md:px-8 xl:px-32">
      <Sheet open={isOpen} onOpenChange={setisOpen}>
          
      <div className="flex items-center">
        <SheetTrigger onClick={() => setisOpen(true)} className="lg:hidden flex items-center justify-center h-10 w-10  mx-2 rounded-sm">
          <AlignJustifyIcon />
        </SheetTrigger>
        <Link href={`/`} className="font-semibold italic text-lg flex items-center md:text-xl"> <BotIcon className="mr-2 text-indigo-700" /> SmartAssist</Link>

      </div>
      
      <nav>
        <ul className="hidden md:flex space-x-6 font-semibold">
          <SignedIn>
            <li>
                <Link href={`/chatbots`} className="transition hover:text-indigo-700">Chatbots</Link>
            </li>
          </SignedIn>
          <li>
              <Link href={`/`} className="transition hover:text-indigo-700">Features</Link>
          </li>
          <li>
              <Link href={`/`} className="transition hover:text-indigo-700">Demo</Link>
          </li>
          <li>
              <Link href={`/`} className="transition hover:text-indigo-700">Pricing</Link>
          </li>
          <li>
              <Link href={`/`} className="transition hover:text-indigo-700">Blog</Link>
          </li>
        </ul>
      </nav>

      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton>
            <button className="flex items-center justify-center text-white bg-indigo-500 border-0 py-2 px-4 font-medium focus:outline-none hover:bg-indigo-600 rounded text-md">Sign In</button>
        </SignInButton>
      </SignedOut>


      {/* RESPONSIVENESS */}
          <SheetContent side="left" >
        <Link href={`/`} className="font-semibold italic text-lg flex items-center md:text-xl"> <BotIcon className="mr-2 text-indigo-700" /> SmartAssist</Link>
              <ScrollArea className="h-screen w-full">
                  <ul className="flex flex-col items-start justify-start space-y-3 my-5">
                      <SignedIn>
                        <li>
                            <Link href={`/chatbots`} className="transition hover:text-indigo-700">Chatbots</Link>
                        </li>
                      </SignedIn>
                      <li>
                          <Link href={`/`} className="transition hover:text-indigo-700">Features</Link>
                      </li>
                      <li>
                          <Link href={`/demo`} className="transition hover:text-indigo-700">Demo</Link>
                      </li>
                      <li>
                          <Link href={`/`} className="transition hover:text-indigo-700">Pricing</Link>
                      </li>
                      <li>
                          <Link href={`/`} className="transition hover:text-indigo-700">Blog</Link>
                      </li>
                  </ul>
              </ScrollArea>
          </SheetContent>
      </Sheet>
    </header>
)}

export default Header