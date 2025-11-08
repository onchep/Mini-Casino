import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/provider"; // Your existing provider (HeroUI, Socket)
import ContextProvider from '@/context'; // The new Reown/Wagmi provider
import { headers } from 'next/headers'; // Required for SSR cookie handling

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MiniCasino", // Updated title
  description: "Mini Casino", // Updated description
};

// RootLayout must be async to use headers()
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get cookies for Reown/Wagmi SSR
  const headersObj = await headers();
  const cookies = headersObj.get('cookie');

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} ${geistMono.className} max-w-[1920px] bg-white mx-auto`}>
        {/* Reown/Wagmi ContextProvider wraps everything */}
        <ContextProvider cookies={cookies}>
          {/* Your original Providers component is now inside */}
          <Providers>
            {children}
          </Providers>
        </ContextProvider>
      </body>
    </html>
  );
}