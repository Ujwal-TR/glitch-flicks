"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Core Cursor Logic
  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    
    if (!cursor || !dot) return;

    gsap.set([cursor, dot], { xPercent: -50, yPercent: -50 });

    const moveCursor = (e: MouseEvent) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.5, ease: "power3.out" });
    };

    const handleHoverEnter = () => {
      gsap.to(cursor, { scale: 1.5, borderColor: "var(--color-neon-pink)", duration: 0.3 });
      gsap.to(dot, { scale: 0, duration: 0.3 });
    };

    const handleHoverLeave = () => {
      gsap.to(cursor, { scale: 1, borderColor: "var(--color-neon-blue)", duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", moveCursor);

    // Refresh interactive elements query since the DOM changes
    const interactables = document.querySelectorAll("a, button, input, textarea, [data-interactive]");
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverEnter);
      el.addEventListener("mouseleave", handleHoverLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverEnter);
        el.removeEventListener("mouseleave", handleHoverLeave);
      });
    };
  }, []);

  // Particle Trail Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    type Particle = {
      x: number;
      y: number;
      text: string;
      life: number;
      maxLife: number;
      vx: number;
      vy: number;
      color: string;
    };

    const particles: Particle[] = [];
    const hexChars = "0123456789ABCDEF!<>_";
    const colors = ["#00f3ff", "#ff00ea"];

    let mouseX = 0;
    let mouseY = 0;
    let lastX = 0;
    let lastY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const dx = mouseX - lastX;
      const dy = mouseY - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist > 2) {
        const count = Math.min(Math.floor(dist / 5), 4);
        for(let i = 0; i < count; i++) {
          particles.push({
            x: mouseX + (Math.random() - 0.5) * 15,
            y: mouseY + (Math.random() - 0.5) * 15,
            text: hexChars[Math.floor(Math.random() * hexChars.length)],
            life: 1,
            maxLife: Math.random() * 0.4 + 0.4,
            vx: (Math.random() - 0.5) * 1,
            vy: (Math.random() - 0.5) * 1 + 0.5,
            color: colors[Math.floor(Math.random() * colors.length)]
          });
        }
      }
      lastX = mouseX;
      lastY = mouseY;
    };

    window.addEventListener("mousemove", onMouseMove);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = "14px var(--font-share-tech-mono), monospace";

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= 0.02;
        p.x += p.vx;
        p.y += p.vy;

        if (p.life <= 0) {
          particles.splice(i, 1);
        } else {
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.life / p.maxLife;
          ctx.fillText(p.text, p.x, p.y);
        }
      }
      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9998]"
      />
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-[var(--color-neon-blue)] pointer-events-none z-[9999] mix-blend-difference"
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[var(--color-neon-pink)] pointer-events-none z-[10000] mix-blend-difference"
      />
    </>
  );
}
