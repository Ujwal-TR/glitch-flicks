"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";

export default function CommandCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>(["Glitch-Flicks Terminal v1.0", "Type 'help' for commands."]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle terminal with tilde ~ or Ctrl+`
      if (e.key === "`" || e.key === "~") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [output]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    setOutput((prev) => [...prev, `> ${cmd}`]);
    
    // Command logic
    if (cmd === "help") {
      setOutput((prev) => [...prev, "AVAILABLE COMMANDS: help, clear, about, services, contact, matrix"]);
    } else if (cmd === "clear") {
      setOutput([]);
    } else if (cmd === "about") {
      setOutput((prev) => [...prev, "GLITCH-FLICKS: We manipulate internet attention.", "Status: ONLINE", "Location: THE GRID"]);
    } else if (cmd === "matrix") {
      setOutput((prev) => [...prev, "Waking up...", "Follow the white rabbit."]);
      // Trigger some global visual effect here in future
    } else {
      setOutput((prev) => [...prev, `Command not found: ${cmd}`]);
    }

    setInput("");
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-40 p-4 rounded-full glass hover:border-[var(--color-neon-pink)] transition-colors group cursor-none"
        data-interactive
      >
        <Terminal className="w-6 h-6 text-[var(--color-neon-blue)] group-hover:text-[var(--color-neon-pink)] transition-colors" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-8 z-50 w-96 h-96 glass rounded-lg flex flex-col overflow-hidden border-[var(--color-neon-blue)] border-opacity-30"
          >
            <div className="bg-black/80 px-4 py-2 border-b border-gray-800 flex justify-between items-center">
              <span className="text-xs font-mono text-gray-400">COMMAND_CENTER</span>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-[var(--color-neon-pink)] text-xs cursor-none" data-interactive>
                [X]
              </button>
            </div>
            
            <div 
              ref={scrollRef}
              className="flex-grow p-4 overflow-y-auto font-mono text-sm text-[var(--color-neon-blue)] space-y-1"
            >
              {output.map((line, i) => (
                <div key={i} className="opacity-90">{line}</div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800 bg-black/60 flex items-center">
              <span className="text-[var(--color-neon-pink)] mr-2 font-mono">{">"}</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow bg-transparent border-none outline-none font-mono text-white cursor-none"
                spellCheck={false}
                autoComplete="off"
                data-interactive
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
