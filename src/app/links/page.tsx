"use client";

import { motion } from "framer-motion";
import { Code2, Globe, Mail, Briefcase, User } from "lucide-react";
import { initAudio, playHoverSound, playClickSound } from "@/utils/audio";
import SpotlightCard from "@/components/ui/SpotlightCard";

const LINKS = [
  { name: "OFFICIAL WEBSITE", url: "https://glitch-flicks.vercel.app", icon: Globe, color: "var(--color-neon-blue)" },
  { name: "TRANSMIT EMAIL", url: "mailto:ujwaltr212@gmail.com", icon: Mail, color: "#39ff14" },
  { name: "LINKEDIN", url: "https://in.linkedin.com/in/ujwal-tr-407b95317", icon: Briefcase, color: "#0077b5" },
  { name: "GITHUB_REPO", url: "https://github.com/Ujwal-TR/glitch-flicks", icon: Code2, color: "white" },
  { name: "CREATOR'S PORTFOLIO", url: "https://ujwaltr.xyz", icon: User, color: "var(--color-neon-pink)" },
];

export default function LinksPage() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background darkening overlay for better readability over the 3D scene */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm pointer-events-none z-0" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md z-10 relative mt-12 mb-12"
      >
        <SpotlightCard className="glass p-8 border border-gray-800" spotlightColor="rgba(0, 243, 255, 0.15)">
          <div className="flex flex-col items-center w-full">
          <div className="w-24 h-24 rounded-full border-2 border-[var(--color-neon-pink)] p-1 mb-6 relative group overflow-hidden mx-auto">
             <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-[var(--color-neon-blue)] opacity-20 animate-pulse" />
               <span className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-pink)] font-mono animate-glitch">GF</span>
             </div>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2 text-neon-glow text-center">GLITCH-FLICKS</h1>
          <p className="text-gray-400 font-mono text-sm mb-8 text-center max-w-xs">
            We manufacture internet attention. <br/>
            <span className="text-[#39ff14]">STATUS: ONLINE</span>
          </p>

          <div className="w-full space-y-4">
            {LINKS.map((link, i) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.name}
                  href={link.url}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  onMouseEnter={() => { initAudio(); playHoverSound(); }}
                  onClick={() => { initAudio(); playClickSound(); }}
                  className="w-full p-4 border border-gray-700 bg-black/40 transition-all flex items-center justify-between group relative overflow-hidden"
                  data-interactive
                  style={{ borderColor: `rgba(255,255,255,0.1)` }}
                  whileHover={{ 
                    scale: 1.02, 
                    borderColor: link.color,
                    boxShadow: `0 0 15px ${link.color}40`,
                    backgroundColor: 'rgba(255,255,255,0.05)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity" 
                    style={{ backgroundColor: link.color }}
                  />
                  <span className="font-mono font-bold text-sm text-gray-200 group-hover:text-white relative z-10 transition-colors">
                    {link.name}
                  </span>
                  <Icon className="w-5 h-5 relative z-10 opacity-70 group-hover:opacity-100 transition-all" style={{ color: link.color }} />
                </motion.a>
              )
            })}
          </div>
          </div>
        </SpotlightCard>
        
        <div className="mt-8 text-center font-mono text-xs text-gray-600">
           &copy; {new Date().getFullYear()} GLITCH-FLICKS OS.
        </div>
      </motion.div>
    </main>
  );
}
