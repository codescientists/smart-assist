"use client"

import { AlignJustifyIcon, HousePlugIcon } from "lucide-react";
// import { Input } from "../ui/input"
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "../ui/scroll-area";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";


const Header = () => {
  // const [searchTerm, setSearchTerm] = useState('')

  const [isOpen, setisOpen] = useState(false);

  return (
    <header className="flex items-center justify-between py-5 shadow-md px-2 md:px-8 xl:px-32">
      <Sheet open={isOpen} onOpenChange={setisOpen}>
          
      <div className="flex items-center">
        <SheetTrigger onClick={() => setisOpen(true)} className="lg:hidden flex items-center justify-center h-10 w-10  mx-2 rounded-sm">
          <AlignJustifyIcon />
        </SheetTrigger>
        <Link href={`/`} className="font-semibold italic text-lg flex items-center md:text-xl"> <HousePlugIcon className="mr-2 text-blue-700" /> HomeShine</Link>

      </div>
      
      <nav>
        <ul className="hidden md:flex space-x-6 font-semibold">
            <li>
                <Link href={`/`} className="transition hover:text-blue-700">Home</Link>
            </li>
            <li>
                <Link href={`/`} className="transition hover:text-blue-700">Services</Link>
            </li>
            <li>
                <Link href={`/`} className="transition hover:text-blue-700">Pages</Link>
            </li>
            <li>
                <Link href={`/`} className="transition hover:text-blue-700">Contacts</Link>
            </li>
        </ul>
      </nav>

      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>

      {/* <div className="hidden lg:flex items-center rounded-full border border-slate-400 px-2 mr-4 ml-6">
        <SearchIcon className="text-slate-400 h-5 w-5"/>
        <Input placeholder="Search Products..." value={searchTerm} className="lg:w-[300px] bg-transparent border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 " />
      </div> */}


      {/* RESPONSIVENESS */}
          <SheetContent side="left" >
              {/* <div className="flex items-center rounded-full border border-slate-400 px-2 mr-4">
                <SearchIcon className="text-slate-400 h-5 w-5"/>
                <Input 
                  placeholder="Search Products..." 
                  value={searchTerm} 
                  className="lg:w-[300px] bg-transparent border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 " 
                  />
              </div> */}
              <ScrollArea className="h-screen w-full">
                  <ul className="flex flex-col items-start justify-start space-y-3 my-5">
                      {/* <li>
                        <NavLink href={`/`} onClick={() => setisOpen(false)} className={({ isActive }) =>
                                isActive ? "bg-blue-100 flex items-center py-1 px-2 rounded-md" : "flex items-center py-1 px-2 rounded-md hover:bg-gray-100"
                        }>
                            Home
                        </NavLink>
                      </li>
                      <li>
                        <NavLink href={`/shop`} onClick={() => setisOpen(false)} className={({ isActive }) =>
                                isActive ? "bg-blue-100 flex items-center py-1 px-2 rounded-md" : "flex items-center py-1 px-2 rounded-md hover:bg-gray-100"
                        }>
                            Services
                        </NavLink>
                      </li>
                      <li>
                        <NavLink href={`/services`} onClick={() => setisOpen(false)} className={({ isActive }) =>
                                isActive ? "bg-blue-100 flex items-center py-1 px-2 rounded-md" : "flex items-center py-1 px-2 rounded-md hover:bg-gray-100"
                        }>
                            Pages
                        </NavLink>
                      </li>
                      <li>
                        <NavLink href={`/stores`} onClick={() => setisOpen(false)} className={({ isActive }) =>
                                isActive ? "bg-blue-100 flex items-center py-1 px-2 rounded-md" : "flex items-center py-1 px-2 rounded-md hover:bg-gray-100"
                        }>
                            Contact
                        </NavLink>
                      </li> */}
                  </ul>
              </ScrollArea>
          </SheetContent>
      </Sheet>
    </header>
)}

export default Header