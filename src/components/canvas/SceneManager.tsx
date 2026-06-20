"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";
import DataSphere from "./DataSphere";
import TimeTunnel from "./TimeTunnel";
import HolographicTeam from "./HolographicTeam";
import Galaxy from "./Galaxy";

function CameraController() {
  useFrame((state) => {
    if (typeof window === 'undefined') return;
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? Math.max(0, Math.min(scrollY / maxScroll, 1)) : 0;

    let targetZ = 5, targetY = 0, targetRotX = 0;

    if (progress < 0.33) {
      // Stage 1: Data Sphere -> Time Tunnel
      const p = progress / 0.33;
      targetZ = THREE.MathUtils.lerp(5, -10, p);
      targetY = THREE.MathUtils.lerp(0, -20, p);
      targetRotX = THREE.MathUtils.lerp(0, -Math.PI / 2, p);
    } else if (progress < 0.66) {
      // Stage 2: Time Tunnel -> Holographic Team
      const p = (progress - 0.33) / 0.33;
      targetZ = THREE.MathUtils.lerp(-10, -5, p);
      targetY = THREE.MathUtils.lerp(-20, -35, p);
      targetRotX = THREE.MathUtils.lerp(-Math.PI / 2, 0, p);
    } else {
      // Stage 3: Holographic Team -> Galaxy
      const p = (progress - 0.66) / 0.34;
      targetZ = THREE.MathUtils.lerp(-5, 0, p);
      targetY = THREE.MathUtils.lerp(-35, -55, p);
      targetRotX = THREE.MathUtils.lerp(0, -Math.PI / 6, p);
    }

    state.camera.position.z += (targetZ - state.camera.position.z) * 0.05;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.05;
    state.camera.rotation.x += (targetRotX - state.camera.rotation.x) * 0.05;
  });

  return null;
}

export default function SceneManager() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 bg-[var(--color-dark-bg)] pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: false, alpha: false }}
      >
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 5, 30]} />
        <CameraController />
        <Suspense fallback={null}>
          <DataSphere />
          <TimeTunnel />
          <HolographicTeam />
          <Galaxy />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
