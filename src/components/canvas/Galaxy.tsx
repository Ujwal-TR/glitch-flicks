"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Galaxy() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 5000;
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    const colorInside = new THREE.Color("#ff00ea");
    const colorOutside = new THREE.Color("#00f3ff");

    for (let i = 0; i < count; i++) {
      // Galaxy math
      const radius = Math.random() * 20;
      const branchAngle = (i % 3) * ((Math.PI * 2) / 3);
      const spinAngle = radius * 0.5;
      
      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 2;
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 2;
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 2;

      const x = Math.cos(branchAngle + spinAngle) * radius + randomX;
      const y = randomY;
      const z = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      positions.set([x, y, z], i * 3);

      const mixedColor = colorInside.clone().lerp(colorOutside, radius / 20);
      colors.set([mixedColor.r, mixedColor.g, mixedColor.b], i * 3);
    }

    return [positions, colors];
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group position={[0, -60, -10]} rotation={[0, 0, Math.PI / 8]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
