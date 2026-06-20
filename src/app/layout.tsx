import type { Metadata } from "next";
import { Orbitron, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import SceneManager from "@/components/canvas/SceneManager";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  variable: "--font-share-tech-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Glitch-Flicks | OS Experience",
  description: "A futuristic social media marketing agency.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${shareTechMono.variable} antialiased`}
    >
      <body className="min-h-full flex flex-col relative selection:bg-[var(--color-neon-pink)] selection:text-white">
        <LenisProvider>
          <CustomCursor />
          <SceneManager />
          <div className="relative z-10 w-full flex-grow">
            {children}
          </div>
        </LenisProvider>
      </body>
    </html>
  );
}
