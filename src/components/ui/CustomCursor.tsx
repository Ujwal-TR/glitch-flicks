"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    
    if (!cursor || !dot) return;

    // Set initial position
    gsap.set([cursor, dot], { xPercent: -50, yPercent: -50 });

    const moveCursor = (e: MouseEvent) => {
      // Fast movement for the dot
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
      
      // Slower follow for the outer ring
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power3.out",
      });
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

    // Add interactive class logic
    const interactables = document.querySelectorAll("a, button, input, [data-interactive]");
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

  return (
    <>
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
