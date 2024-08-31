import { BotIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="md:px-8 xl:px-32 mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
            <Link href={`/`} className="text-white font-semibold italic text-lg flex items-center md:text-xl"> 
                <BotIcon className="mr-2 text-indigo-700" /> SmartAssist
            </Link>
        </div>
        <div className="flex space-x-4 text-sm md:text-base">
          <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
          <a href="#" className="text-gray-400 hover:text-white">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
