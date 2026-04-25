/**
 * Cinematic lighting rig for the futuristic desk hero scene.
 *
 * ⚠️  NEVER use `new THREE.*` inside JSX — it creates a new object on
 *     every render which floods the scene and causes crashes.
 *     Use lowercase R3F JSX equivalents instead.
 */
export const HeroLights = () => {
  return (
    <>
      {/* Key light — cool white from front-top */}
      <spotLight
        position={[0, 8, 8]}
        angle={0.2}
        intensity={120}
        penumbra={0.4}
        color="#e0f0ff"
        castShadow
      />

      {/* Cyan fill — matches the desk glow colour */}
      <spotLight
        position={[-5, 4, 3]}
        angle={0.45}
        intensity={60}
        penumbra={0.9}
        color="#00e5ff"
      />

      {/* Purple rim from behind */}
      <spotLight
        position={[0, 4, -7]}
        angle={0.5}
        intensity={80}
        penumbra={1}
        color="#9d4edd"
      />

      {/* Warm right-side accent */}
      <spotLight
        position={[6, 3, 2]}
        angle={0.35}
        intensity={40}
        penumbra={0.7}
        color="#4361ee"
      />

      {/* Screen glow — cyan rect area simulating monitor light */}
      <rectAreaLight
        width={3}
        height={2}
        intensity={10}
        color="#00e5ff"
        position={[0, 2, 2]}
        rotation={[0, Math.PI, 0]}
      />

      {/* Under-desk LED glow point */}
      <pointLight position={[0, -0.5, 0]} intensity={18} color="#00e5ff" />

      {/* Purple ambient glow */}
      <pointLight position={[-2, 1, 1]} intensity={12} color="#7209b7" />

      {/* Deep blue backdrop */}
      <pointLight position={[0, 3, -4]} intensity={10} color="#0d00a4" />

      {/* Very soft ambient — keeps shadows readable */}
      <ambientLight intensity={0.2} color="#0a0f1e" />
    </>
  );
};

export default HeroLights;
