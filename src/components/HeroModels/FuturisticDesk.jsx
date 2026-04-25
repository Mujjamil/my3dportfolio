import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ─────────────────────────────────────────────
   Shared materials (created once, reused)
───────────────────────────────────────────── */
const darkMetal = new THREE.MeshStandardMaterial({
  color: "#1a1a2e",
  metalness: 0.9,
  roughness: 0.25,
});

const lightMetal = new THREE.MeshStandardMaterial({
  color: "#2d2d44",
  metalness: 0.8,
  roughness: 0.3,
});

const cyanGlow = new THREE.MeshStandardMaterial({
  color: "#00e5ff",
  emissive: "#00e5ff",
  emissiveIntensity: 2.5,
  metalness: 0.0,
  roughness: 0.1,
  toneMapped: false,
});

const whiteGlow = new THREE.MeshStandardMaterial({
  color: "#ffffff",
  emissive: "#c8e6ff",
  emissiveIntensity: 1.8,
  metalness: 0.0,
  roughness: 0.1,
  toneMapped: false,
});

const screenMat = new THREE.MeshStandardMaterial({
  color: "#0a0a1a",
  emissive: "#1a3a6a",
  emissiveIntensity: 0.8,
  roughness: 0.1,
  metalness: 0.2,
});

const chairFabric = new THREE.MeshStandardMaterial({
  color: "#111122",
  metalness: 0.4,
  roughness: 0.6,
});

/* ─────────────────────────────────────────────
   DESK
   – Wide flat top with bevelled sides
   – Two large angular support legs
   – Glowing white LED strip along the front edge
   – Glowing cyan underside strip
───────────────────────────────────────────── */
const Desk = () => (
  <group>
    {/* Desk top surface */}
    <mesh material={darkMetal} receiveShadow castShadow position={[0, 0, 0]}>
      <boxGeometry args={[4.2, 0.12, 1.8]} />
    </mesh>

    {/* Front edge bevel strip */}
    <mesh material={lightMetal} position={[0, -0.04, 0.9]}>
      <boxGeometry args={[4.2, 0.04, 0.04]} />
    </mesh>

    {/* Glowing white LED — front edge bottom */}
    <mesh material={whiteGlow} position={[0, -0.09, 0.88]}>
      <boxGeometry args={[4.0, 0.015, 0.015]} />
    </mesh>

    {/* Glowing cyan underside strip */}
    <mesh material={cyanGlow} position={[0, -0.065, 0]}>
      <boxGeometry args={[3.8, 0.012, 1.6]} />
    </mesh>

    {/* Left leg — angular L-shape base */}
    <mesh material={darkMetal} castShadow position={[-1.7, -0.7, 0]}>
      <boxGeometry args={[0.18, 1.3, 1.6]} />
    </mesh>
    <mesh material={darkMetal} castShadow position={[-1.7, -1.3, 0.6]}>
      <boxGeometry args={[0.18, 0.12, 0.45]} />
    </mesh>
    <mesh material={darkMetal} castShadow position={[-1.7, -1.3, -0.6]}>
      <boxGeometry args={[0.18, 0.12, 0.45]} />
    </mesh>

    {/* Right leg */}
    <mesh material={darkMetal} castShadow position={[1.7, -0.7, 0]}>
      <boxGeometry args={[0.18, 1.3, 1.6]} />
    </mesh>
    <mesh material={darkMetal} castShadow position={[1.7, -1.3, 0.6]}>
      <boxGeometry args={[0.18, 0.12, 0.45]} />
    </mesh>
    <mesh material={darkMetal} castShadow position={[1.7, -1.3, -0.6]}>
      <boxGeometry args={[0.18, 0.12, 0.45]} />
    </mesh>

    {/* Leg glowing inner lines */}
    <mesh material={cyanGlow} position={[-1.7, -0.7, 0.81]}>
      <boxGeometry args={[0.01, 1.2, 0.01]} />
    </mesh>
    <mesh material={cyanGlow} position={[1.7, -0.7, 0.81]}>
      <boxGeometry args={[0.01, 1.2, 0.01]} />
    </mesh>

    {/* Under-desk shelf */}
    <mesh material={lightMetal} position={[0, -0.5, -0.4]}>
      <boxGeometry args={[3.6, 0.06, 0.9]} />
    </mesh>
  </group>
);

/* ─────────────────────────────────────────────
   HOLOGRAPHIC MONITOR FRAME
   – Large outer cyan frame (3×2 grid display)
   – 6 screen panels inside with emissive glow
   – Animated floating / pulse
───────────────────────────────────────────── */
const HoloFrame = () => {
  const frameRef = useRef();
  const glowRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (frameRef.current) {
      frameRef.current.position.y = 2.1 + Math.sin(t * 0.6) * 0.06;
    }
    if (glowRef.current) {
      glowRef.current.material.emissiveIntensity = 1.5 + Math.sin(t * 1.5) * 0.5;
    }
  });

  const panelColors = ["#4fc3f7", "#e040fb", "#ff6d00", "#69f0ae", "#ff4081", "#40c4ff"];

  return (
    <group ref={frameRef} position={[0, 2.1, -0.4]}>
      {/* Outer frame border — top */}
      <mesh material={cyanGlow} position={[0, 1.1, 0]}>
        <boxGeometry args={[3.2, 0.06, 0.06]} />
      </mesh>
      {/* bottom */}
      <mesh material={cyanGlow} position={[0, -1.1, 0]}>
        <boxGeometry args={[3.2, 0.06, 0.06]} />
      </mesh>
      {/* left */}
      <mesh material={cyanGlow} position={[-1.6, 0, 0]}>
        <boxGeometry args={[0.06, 2.26, 0.06]} />
      </mesh>
      {/* right */}
      <mesh material={cyanGlow} position={[1.6, 0, 0]}>
        <boxGeometry args={[0.06, 2.26, 0.06]} />
      </mesh>

      {/* Corner accents */}
      {[[-1.6, 1.1], [1.6, 1.1], [-1.6, -1.1], [1.6, -1.1]].map(([x, y], i) => (
        <mesh key={i} material={cyanGlow} position={[x, y, 0.01]}>
          <boxGeometry args={[0.15, 0.15, 0.08]} />
        </mesh>
      ))}

      {/* Inner dividers */}
      <mesh material={cyanGlow} position={[0, 0, 0]}>
        <boxGeometry args={[0.03, 2.1, 0.03]} />
      </mesh>
      <mesh material={cyanGlow} position={[0, 0.37, 0]}>
        <boxGeometry args={[3.1, 0.03, 0.03]} />
      </mesh>
      <mesh material={cyanGlow} position={[0, -0.37, 0]}>
        <boxGeometry args={[3.1, 0.03, 0.03]} />
      </mesh>

      {/* 6 screen panels (2 columns × 3 rows) */}
      {[
        [-0.8, 0.73], [0.8, 0.73],
        [-0.8, 0.0],  [0.8, 0.0],
        [-0.8, -0.73],[0.8, -0.73],
      ].map(([x, y], i) => (
        <mesh key={i} position={[x, y, -0.02]}>
          <boxGeometry args={[1.45, 0.65, 0.02]} />
          <meshStandardMaterial
            color={panelColors[i]}
            emissive={panelColors[i]}
            emissiveIntensity={0.45}
            roughness={0.1}
            metalness={0.1}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* Glow back panel */}
      <mesh ref={glowRef} position={[0, 0, -0.08]}>
        <boxGeometry args={[3.1, 2.1, 0.01]} />
        <meshStandardMaterial
          color="#00e5ff"
          emissive="#00e5ff"
          emissiveIntensity={1.5}
          transparent
          opacity={0.08}
          toneMapped={false}
        />
      </mesh>

      {/* Monitor stand arm */}
      <mesh material={darkMetal} position={[0, -1.6, 0.2]}>
        <boxGeometry args={[0.12, 1.1, 0.12]} />
      </mesh>
    </group>
  );
};

/* ─────────────────────────────────────────────
   KEYBOARD
───────────────────────────────────────────── */
const Keyboard = () => (
  <group position={[0, 0.08, 0.55]}>
    <mesh material={lightMetal}>
      <boxGeometry args={[1.1, 0.05, 0.38]} />
    </mesh>
    {/* Key rows — glowing dots */}
    {[-0.4, -0.2, 0.0, 0.2, 0.4].map((x, i) =>
      [-0.12, 0.04, 0.12].map((z, j) => (
        <mesh key={`${i}-${j}`} material={cyanGlow} position={[x, 0.03, z]}>
          <boxGeometry args={[0.06, 0.01, 0.06]} />
        </mesh>
      ))
    )}
  </group>
);

/* ─────────────────────────────────────────────
   MOUSE
───────────────────────────────────────────── */
const Mouse = () => (
  <group position={[1.6, 0.07, 0.55]}>
    <mesh material={lightMetal}>
      <cylinderGeometry args={[0.09, 0.09, 0.05, 24]} />
    </mesh>
    <mesh material={cyanGlow} position={[0, 0.03, 0]}>
      <cylinderGeometry args={[0.03, 0.03, 0.01, 16]} />
    </mesh>
  </group>
);

/* ─────────────────────────────────────────────
   CHAIR
   – Circular platform base
   – Hydraulic stem
   – Seat cushion
   – High curved back
   – Armrests with cyan tips
───────────────────────────────────────────── */
const Chair = () => {
  const chairRef = useRef();

  useFrame((state) => {
    if (chairRef.current) {
      chairRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.15 - 0.3;
    }
  });

  return (
    <group ref={chairRef} position={[1.5, -1.38, 1.4]}>
      {/* Platform base disc */}
      <mesh material={darkMetal} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.72, 0.72, 0.06, 40]} />
      </mesh>
      {/* Platform glowing ring */}
      <mesh material={cyanGlow} position={[0, 0.04, 0]}>
        <torusGeometry args={[0.68, 0.025, 8, 48]} />
      </mesh>

      {/* Star base legs */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2;
        return (
          <mesh
            key={i}
            material={darkMetal}
            position={[Math.cos(angle) * 0.38, 0.05, Math.sin(angle) * 0.38]}
            rotation={[0, -angle, 0]}
          >
            <boxGeometry args={[0.72, 0.05, 0.1]} />
          </mesh>
        );
      })}

      {/* Hydraulic stem */}
      <mesh material={lightMetal} position={[0, 0.38, 0]}>
        <cylinderGeometry args={[0.07, 0.09, 0.6, 16]} />
      </mesh>

      {/* Seat cushion */}
      <mesh material={chairFabric} position={[0, 0.73, 0]}>
        <boxGeometry args={[0.72, 0.14, 0.72]} />
      </mesh>
      {/* Seat front curved edge */}
      <mesh material={chairFabric} position={[0, 0.73, 0.36]}>
        <cylinderGeometry args={[0.07, 0.07, 0.72, 12]} rotation={[0, 0, Math.PI / 2]} />
      </mesh>

      {/* Chair back */}
      <mesh material={chairFabric} position={[0, 1.42, -0.33]}>
        <boxGeometry args={[0.7, 1.42, 0.14]} />
      </mesh>
      {/* Back top curve */}
      <mesh material={lightMetal} position={[0, 2.15, -0.33]}>
        <cylinderGeometry args={[0.35, 0.35, 0.1, 20, 1, false, 0, Math.PI]} />
      </mesh>
      {/* Back cyan accent strip */}
      <mesh material={cyanGlow} position={[0, 1.42, -0.27]}>
        <boxGeometry args={[0.06, 1.3, 0.02]} />
      </mesh>

      {/* Left armrest */}
      <mesh material={darkMetal} position={[-0.38, 1.0, 0.05]}>
        <boxGeometry args={[0.08, 0.5, 0.52]} />
      </mesh>
      <mesh material={cyanGlow} position={[-0.38, 1.0, 0.32]}>
        <boxGeometry args={[0.08, 0.06, 0.08]} />
      </mesh>

      {/* Right armrest */}
      <mesh material={darkMetal} position={[0.38, 1.0, 0.05]}>
        <boxGeometry args={[0.08, 0.5, 0.52]} />
      </mesh>
      <mesh material={cyanGlow} position={[0.38, 1.0, 0.32]}>
        <boxGeometry args={[0.08, 0.06, 0.08]} />
      </mesh>
    </group>
  );
};

/* ─────────────────────────────────────────────
   AMBIENT FLOOR GLOW DISC
───────────────────────────────────────────── */
const FloorGlow = () => {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.material.opacity = 0.12 + Math.sin(state.clock.elapsedTime * 0.8) * 0.04;
    }
  });
  return (
    <mesh ref={ref} position={[0, -1.41, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[3.2, 64]} />
      <meshStandardMaterial
        color="#00e5ff"
        emissive="#00e5ff"
        emissiveIntensity={1}
        transparent
        opacity={0.12}
        toneMapped={false}
        depthWrite={false}
      />
    </mesh>
  );
};

/* ─────────────────────────────────────────────
   MAIN EXPORT — Full Futuristic Desk Scene
───────────────────────────────────────────── */
export const FuturisticDesk = () => {
  return (
    <group>
      <Desk />
      <HoloFrame />
      <Keyboard />
      <Mouse />
      <Chair />
      <FloorGlow />
    </group>
  );
};

export default FuturisticDesk;
