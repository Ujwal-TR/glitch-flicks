"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function TimeTunnel() {
  const groupRef = useRef<THREE.Group>(null);
  const ringCount = 40;
  const particleCount = 300;

  const [particlePositions] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 2 + Math.random() * 1.8; // inside the rings (radius 4)
      const angle = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = -(Math.random() * 80); // Y position
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return [pos];
  }, []);
  
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      groupRef.current.children.forEach((child) => {
        child.position.y += 0.2;
        if (child.position.y > 5) {
          child.position.y -= 80;
        }
      });
    }
    if (particlesRef.current) {
      particlesRef.current.position.y += 0.4;
      if (particlesRef.current.position.y > 5) {
        particlesRef.current.position.y -= 80;
      }
    }
  });

  return (
    <group position={[0, -20, -10]}>
      <group ref={groupRef}>
        {Array.from({ length: ringCount }).map((_, i) => (
          <mesh key={i} position={[0, -i * 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[4, 4.1, 32]} />
            <meshBasicMaterial 
              color={i % 3 === 0 ? "#ff00ea" : "#00f3ff"} 
              side={THREE.DoubleSide}
              transparent
              opacity={0.8} 
            />
          </mesh>
        ))}
      </group>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#ffffff" size={0.05} transparent opacity={0.5} />
      </points>
    </group>
  );
}
