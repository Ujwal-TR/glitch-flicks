"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { initAudio, playTypingSound } from "@/utils/audio";

const bootSequence = [
  { p: 5, text: "INIT GLITCH-FLICKS OS v4.2.0..." },
  { p: 15, text: "CONNECTING TO MAINFRAME..." },
  { p: 25, text: "BYPASSING SECURITY PROTOCOLS [FAILED]" },
  { p: 30, text: "RE-ROUTING THROUGH PROXY..." },
  { p: 45, text: "ACCESS GRANTED. ESTABLISHING NEURAL LINK..." },
  { p: 65, text: "LOADING 3D ENVIRONMENT..." },
  { p: 85, text: "INJECTING CYBERPUNK AESTHETICS..." },
  { p: 98, text: "BOOT SEQUENCE COMPLETE." }
];

const spinnerChars = ["|", "/", "-", "\\"];

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isBooting, setIsBooting] = useState(true);
  const [spinnerIdx, setSpinnerIdx] = useState(0);
  const [memoryCode, setMemoryCode] = useState("0x000000");

  useEffect(() => {
    const spinInterval = setInterval(() => {
      setSpinnerIdx((prev) => (prev + 1) % spinnerChars.length);
      setMemoryCode(`0x${Math.floor(Math.random() * 16777215).toString(16).toUpperCase().padStart(6, '0')}`);
    }, 50);
    return () => clearInterval(spinInterval);
  }, []);

  useEffect(() => {
    let start: number | null = null;
    // We want the boot to take about 3 seconds
    const duration = 3000; 
    
    let reqId: number;
    const animateBoot = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      // We can use easeOut for the loading bar so it slows down near the end
      const rawProgress = Math.min(elapsed / duration, 1);
      // Simple ease out cubic
      const easedProgress = 1 - Math.pow(1 - rawProgress, 3);
      const nextProgress = easedProgress * 100;
      
      setProgress(nextProgress);

      if (rawProgress < 1) {
        reqId = requestAnimationFrame(animateBoot);
      } else {
        setTimeout(() => {
          setIsBooting(false);
          setTimeout(onComplete, 1200); // Wait for exit animation
        }, 400);
      }
    };
    
    reqId = requestAnimationFrame(animateBoot);
    return () => cancelAnimationFrame(reqId);
  }, [onComplete]);

  const visibleLines = bootSequence.filter(line => progress >= line.p);
  const lastLineCount = useRef(0);

  useEffect(() => {
    if (visibleLines.length > lastLineCount.current) {
      initAudio();
      playTypingSound();
      lastLineCount.current = visibleLines.length;
    }
  }, [visibleLines.length]);

  return (
    <AnimatePresence>
      {isBooting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-start justify-end p-8 md:p-16 bg-[#020202] text-[var(--color-neon-blue)] font-mono pointer-events-none overflow-hidden"
        >
          {/* Background Grid Lines / Glitch effects */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[var(--color-neon-blue)] to-transparent pointer-events-none mix-blend-screen" />
          
          <div className="absolute top-8 left-8 text-xs text-[var(--color-neon-pink)] opacity-80 flex flex-col gap-1">
            <span>SYS_MEM: {memoryCode}</span>
            <span>CPU_LOAD: {(progress * 0.8 + 20).toFixed(1)}%</span>
            <span>NET_UPLINK: ACTIVE</span>
          </div>

          <div className="absolute top-8 right-8 text-xs text-gray-500 opacity-80 text-right">
            <span>SYSTEM_OVERRIDE: ENABLED</span>
            <br/>
            <span className="text-[var(--color-neon-blue)]">WAITING FOR OPERATOR INPUT...</span>
          </div>

          <div className="w-full max-w-3xl relative z-10 mb-12">
            <div className="min-h-[200px] flex flex-col justify-end">
              {visibleLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`mb-2 text-sm md:text-base ${i === visibleLines.length - 1 ? 'text-[var(--color-neon-pink)] drop-shadow-[0_0_8px_var(--color-neon-pink)]' : 'text-neon-glow'}`}
                >
                  <span className="opacity-50 mr-2">[{memoryCode.slice(2)}]</span> 
                  {`> ${line.text}`}
                </motion.div>
              ))}
              
              {/* Blinking cursor effect at the end of the lines */}
              {progress < 100 && (
                <div className="mt-2 text-sm md:text-base text-neon-glow">
                  <span className="opacity-50 mr-2">[{memoryCode.slice(2)}]</span> 
                  {`> `}
                  <span className="animate-pulse">_</span>
                </div>
              )}
            </div>
            
            <div className="mt-8 flex flex-col gap-2">
              <div className="flex justify-between text-xs text-[var(--color-neon-blue)]">
                <span>{spinnerChars[spinnerIdx]} COMPILING KERNEL...</span>
                <span>{progress.toFixed(2)}%</span>
              </div>
              <div className="h-[2px] w-full bg-gray-900 rounded overflow-hidden relative">
                {/* The glowing bar */}
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-pink)] shadow-[0_0_15px_var(--color-neon-pink)]"
                  style={{ width: `${progress}%` }}
                />
                {/* The solid leading edge */}
                <motion.div 
                  className="absolute top-0 h-full w-[4px] bg-white shadow-[0_0_10px_white]"
                  style={{ left: `calc(${progress}% - 4px)` }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
