import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import {
  ClerkProvider
} from '@clerk/nextjs'
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from 'react-hot-toast';

const fontPoppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: "Smart Assist",
  description: "Smart Assist Help Bot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontPoppins
        )}>
          <main>
            {children}
            <Toaster />
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
