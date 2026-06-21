"use client";

import { useEffect } from "react";
import { initAudio, playGlitchSound } from "@/utils/audio";

export default function NotFound() {
  useEffect(() => {
    // Play a harsh sound on load
    initAudio();
    playGlitchSound();
  }, []);

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center font-mono text-white cursor-none selection:bg-red-500 selection:text-white">
      <div className="border border-red-900 bg-red-950/20 p-12 flex flex-col items-center text-center shadow-[0_0_50px_rgba(255,0,0,0.2)]">
        <h1 className="text-6xl md:text-8xl text-red-600 font-bold animate-glitch mb-4">404</h1>
        <p className="text-xl md:text-2xl text-red-400 mb-8 tracking-widest uppercase">FATAL_ERROR: DIRECTORY_NOT_FOUND</p>
        <div className="text-sm text-gray-500 space-y-2 text-left bg-black p-4 border border-red-900/50 w-full">
          <p>{">"} SYSTEM CHECK... <span className="text-red-500">FAILED</span></p>
          <p>{">"} NEURAL LINK... <span className="text-red-500">SEVERED</span></p>
          <p>{">"} INITIATING RECOVERY... <span className="text-red-500">DENIED</span></p>
        </div>
        <a href="/" className="mt-8 px-6 py-3 border border-red-800 text-red-500 hover:bg-red-900 hover:text-white transition-colors uppercase text-sm font-bold tracking-widest cursor-pointer">
          [ REBOOT SYSTEM ]
        </a>
      </div>
    </div>
  );
}
