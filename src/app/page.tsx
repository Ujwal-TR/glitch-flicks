"use client";

import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import BootSequence from "@/components/ui/BootSequence";
import CommandCenter from "@/components/ui/CommandCenter";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { motion } from "framer-motion";

export default function Home() {
  const [hasBooted, setHasBooted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleLaunchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // These keys should be replaced with actual env variables from the user
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

      await emailjs.sendForm(serviceId, templateId, formRef.current, {
        publicKey: publicKey,
      });

      setSubmitStatus("success");
      formRef.current.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToContact = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="w-full">
      {!hasBooted && <BootSequence onComplete={() => setHasBooted(true)} />}
      
      {hasBooted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full"
        >
          {/* Hero Section */}
          <section className="h-screen flex flex-col items-center justify-center pointer-events-none px-4">
            <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-pink)] drop-shadow-[0_0_15px_rgba(0,243,255,0.8)] text-center mix-blend-screen animate-glitch relative z-10" data-interactive>
              GLITCH-FLICKS
            </h1>
            <p className="mt-4 text-xl md:text-2xl font-mono text-gray-300 max-w-2xl text-center backdrop-blur-sm bg-black/20 p-4 rounded border border-gray-800">
              We manufacture internet attention. 
            </p>
            <div className="absolute bottom-12 animate-bounce pointer-events-auto cursor-none">
              <span className="text-[var(--color-neon-blue)] font-mono text-sm opacity-70">
                [ SCROLL TO INITIALIZE ]
              </span>
            </div>
          </section>


          {/* Time Tunnel / History */}
          <section className="h-screen flex items-center justify-center pointer-events-none px-4">
             <div className="glass p-8 max-w-lg pointer-events-auto text-center transition-transform hover:scale-105 duration-300" data-interactive>
                <h2 className="text-4xl font-bold text-white mb-4 text-neon-glow">THE HISTORY</h2>
                <p className="font-mono text-gray-300">
                  Established in the shadows, built for the future. We transcend traditional marketing boundaries.
                </p>
             </div>
          </section>

          {/* Holographic Team */}
          <section className="h-screen flex flex-col justify-end pb-32 items-center pointer-events-none px-4">
             <div className="glass p-8 max-w-lg pointer-events-auto text-center transition-transform hover:scale-105 duration-300" data-interactive>
                <h2 className="text-4xl font-bold text-white mb-4 text-neon-glow-pink">THE AGENTS</h2>
                <p className="font-mono text-gray-300 mb-6">
                  Elite operatives manipulating the social algorithms from the core.
                </p>
                <button onClick={scrollToContact} className="px-6 py-3 bg-[var(--color-neon-blue)] text-black font-bold font-mono hover:bg-white transition-colors" data-interactive>
                  [ INITIATE CONTACT ]
                </button>
             </div>
          </section>

          {/* Testimonials */}
          <section className="h-screen flex items-center justify-center pointer-events-none px-4">
             <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
               <SpotlightCard className="glass p-6 pointer-events-auto text-center transition-transform hover:scale-105" spotlightColor="rgba(0, 243, 255, 0.15)">
                 <p className="text-gray-300 italic mb-4">"They hacked our growth so hard we had to upgrade our servers twice in one week."</p>
                 <p className="text-[var(--color-neon-blue)] font-bold font-mono">- CEO, NeuralNet Inc.</p>
               </SpotlightCard>
               <SpotlightCard className="glass p-6 pointer-events-auto text-center md:translate-y-12 transition-transform hover:scale-105" spotlightColor="rgba(255, 0, 234, 0.15)">
                 <p className="text-gray-300 italic mb-4">"I didn't think it was legal to get this much attention. Glitch-Flicks proved me wrong."</p>
                 <p className="text-[var(--color-neon-pink)] font-bold font-mono">- Founder, OmniCorp</p>
               </SpotlightCard>
               <SpotlightCard className="glass p-6 pointer-events-auto text-center transition-transform hover:scale-105" spotlightColor="rgba(0, 243, 255, 0.15)">
                 <p className="text-gray-300 italic mb-4">"The only agency that treats the algorithm like a video game. And they have the cheat codes."</p>
                 <p className="text-[var(--color-neon-blue)] font-bold font-mono">- CMO, CyberDyne</p>
               </SpotlightCard>
             </div>
          </section>

          {/* Pricing Missions */}
          <section className="min-h-screen flex flex-col items-center justify-center pointer-events-none px-4 py-20">
             <h2 className="text-4xl font-bold text-white mb-12 text-neon-glow-pink">SELECT YOUR MISSION</h2>
             <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
               
               <SpotlightCard className="glass p-8 pointer-events-auto border-t-4 border-gray-600 hover:border-[var(--color-neon-blue)] transition-colors flex flex-col" spotlightColor="rgba(0, 243, 255, 0.2)">
                 <h3 className="text-2xl font-bold text-white mb-6">STEALTH</h3>
                 <ul className="text-gray-400 space-y-2 mb-8 flex-grow font-mono text-sm">
                   <li>{'>'} Algorithmic mapping</li>
                   <li>{'>'} Micro-trend insertion</li>
                   <li>{'>'} Weekly analytics drop</li>
                 </ul>
                 <button onClick={scrollToContact} className="w-full py-3 border border-gray-600 text-white hover:bg-[var(--color-neon-blue)] hover:text-black transition-colors font-mono relative z-10" data-interactive>
                   [ INITIATE ]
                 </button>
               </SpotlightCard>

               <SpotlightCard className="glass p-8 pointer-events-auto border-t-4 border-[var(--color-neon-pink)] transform md:-translate-y-4 shadow-[0_0_30px_rgba(255,0,234,0.1)] flex flex-col relative" spotlightColor="rgba(255, 0, 234, 0.2)">
                 <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--color-neon-pink)] text-black text-xs font-bold px-3 py-1 font-mono whitespace-nowrap z-20">RECOMMENDED</div>
                 <h3 className="text-2xl font-bold text-white mb-6 mt-2">OVERRIDE</h3>
                 <ul className="text-gray-400 space-y-2 mb-8 flex-grow font-mono text-sm">
                   <li>{'>'} Full FYP saturation</li>
                   <li>{'>'} Synthetic influencer swarm</li>
                   <li>{'>'} Narrative hijacking</li>
                   <li>{'>'} 24/7 terminal access</li>
                 </ul>
                 <button onClick={scrollToContact} className="w-full py-3 bg-[var(--color-neon-pink)] text-black font-bold hover:bg-white transition-colors font-mono shadow-[0_0_15px_var(--color-neon-pink)] relative z-10" data-interactive>
                   [ INITIATE ]
                 </button>
               </SpotlightCard>

               <SpotlightCard className="glass p-8 pointer-events-auto border-t-4 border-gray-600 hover:border-[#39ff14] transition-colors flex flex-col" spotlightColor="rgba(57, 255, 20, 0.2)">
                 <h3 className="text-2xl font-bold text-white mb-6">GOD_MODE</h3>
                 <ul className="text-gray-400 space-y-2 mb-8 flex-grow font-mono text-sm">
                   <li>{'>'} Complete market takeover</li>
                   <li>{'>'} Deepfake campaigns</li>
                   <li>{'>'} Global trend manufacturing</li>
                 </ul>
                 <button onClick={scrollToContact} className="w-full py-3 border border-gray-600 text-white hover:bg-[#39ff14] hover:text-black transition-colors font-mono relative z-10" data-interactive>
                   [ CONTACT PROTOCOL ]
                 </button>
               </SpotlightCard>

             </div>
          </section>

          {/* Launch Contact Form */}
          <section id="contact-form" className="min-h-screen flex items-center justify-center pointer-events-none px-4 py-24 relative">
             <div className="glass p-8 md:p-12 max-w-2xl w-full pointer-events-auto border border-gray-800" data-interactive>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 text-neon-glow">INITIATE LAUNCH SEQUENCE</h2>
                <p className="font-mono text-gray-400 mb-8">Enter coordinates to begin transmission.</p>
                
                <form ref={formRef} className="space-y-6 flex flex-col" onSubmit={handleLaunchSubmit}>
                  <div className="space-y-2">
                    <label className="text-[var(--color-neon-blue)] font-mono text-sm">TARGET_NAME</label>
                    <input name="user_name" type="text" required className="w-full bg-black/50 border border-gray-700 p-3 text-white focus:border-[var(--color-neon-blue)] outline-none font-mono transition-colors" placeholder="Enter name..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[var(--color-neon-pink)] font-mono text-sm">COMMS_LINK</label>
                    <input name="user_email" type="email" required className="w-full bg-black/50 border border-gray-700 p-3 text-white focus:border-[var(--color-neon-pink)] outline-none font-mono transition-colors" placeholder="Enter email..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[#39ff14] font-mono text-sm">MISSION_PARAMETERS</label>
                    <textarea name="message" required rows={4} className="w-full bg-black/50 border border-gray-700 p-3 text-white focus:border-[#39ff14] outline-none font-mono transition-colors resize-none" placeholder="Describe the objective..."></textarea>
                  </div>
                  <button 
                    disabled={isSubmitting}
                    className="w-full py-4 mt-4 bg-white text-black font-bold font-mono hover:bg-[var(--color-neon-blue)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors tracking-widest uppercase" 
                    data-interactive
                  >
                    {isSubmitting ? "TRANSMITTING..." : "Transmit Data"}
                  </button>
                  {submitStatus === "success" && (
                    <p className="text-[#39ff14] text-center font-mono text-sm">TRANSMISSION SUCCESSFUL. AWAIT INSTRUCTIONS.</p>
                  )}
                  {submitStatus === "error" && (
                    <p className="text-red-500 text-center font-mono text-sm">TRANSMISSION FAILED. CHECK COMMS RELAY.</p>
                  )}
                </form>
             </div>
             
             <div className="absolute bottom-4 text-gray-600 font-mono text-xs text-center w-full">
               &copy; {new Date().getFullYear()} GLITCH-FLICKS OS. ALL RIGHTS RESERVED.
             </div>
          </section>
          
          <CommandCenter />
        </motion.div>
      )}
    </main>
  );
}
