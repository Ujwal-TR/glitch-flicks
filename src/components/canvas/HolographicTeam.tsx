"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

export default function HolographicTeam() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
      groupRef.current.position.y = -35 + Math.sin(state.clock.getElapsedTime()) * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[0, -35, -10]}>
      {/* Central Core */}
      <mesh>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#39ff14" wireframe />
      </mesh>
      
      {/* Team Member 1 */}
      <group position={[-3, 0, 0]}>
         <mesh>
           <planeGeometry args={[1.5, 2]} />
           <meshBasicMaterial color="#00f3ff" transparent opacity={0.2} side={THREE.DoubleSide} />
         </mesh>
         <Text position={[0, -1.2, 0]} fontSize={0.2} color="#00f3ff">
            AGENT_01
         </Text>
      </group>

      {/* Team Member 2 */}
      <group position={[3, 0, 0]}>
         <mesh>
           <planeGeometry args={[1.5, 2]} />
           <meshBasicMaterial color="#ff00ea" transparent opacity={0.2} side={THREE.DoubleSide} />
         </mesh>
         <Text position={[0, -1.2, 0]} fontSize={0.2} color="#ff00ea">
            AGENT_02
         </Text>
      </group>
    </group>
  );
}
