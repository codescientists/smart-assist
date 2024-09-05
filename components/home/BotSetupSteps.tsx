import { SignedOut, SignUpButton } from '@clerk/nextjs';
import React from 'react';

const BotSetupSteps = () => {
  const steps = [
    {
      number: 1,
      title: 'Create the Bot',
      description: 'Set up your bot with our easy-to-use interface. Customize the bot to fit your needs.',
      icon: '🤖', // You can replace this with an actual icon if needed
    },
    {
      number: 2,
      title: 'Feed Bot with Your Custom Information',
      description: 'Provide your bot with the necessary data, FAQs, and custom information it needs to assist your users.',
      icon: '📚',
    },
    {
      number: 3,
      title: 'Install Bot on Your Website',
      description: 'Easily integrate the bot into your website with our simple installation process.',
      icon: '💻',
    },
  ];

  return (
    <div className="md:px-8 xl:px-32 mx-auto px-6 py-10 md:py-36">
      <h2 className="text-3xl font-bold text-center mb-10">Get Started in 3 Simple Steps</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col justify-center items-center text-center py-10 px-4 border rounded-lg">
            <div className="text-4xl mb-4">{step.icon}</div>
            <h3 className="text-2xl font-semibold mb-2">Step {step.number} - {step.title}</h3>
            <p className="text-gray-600 text-sm">{step.description}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center w-full">
        <SignedOut>
          <SignUpButton>
          <button className="mt-6 flex items-center justify-center text-white bg-indigo-500 border-0 py-3 px-10 focus:outline-none hover:bg-indigo-600 rounded-full shadow-xl shadow-indigo-300 hover:shadow-indigo-200 transition text-lg">Get Started Now! </button>
          </SignUpButton>
        </SignedOut>
      </div>
    </div>
  );
};

export default BotSetupSteps;
