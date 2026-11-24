// src/components/3d/FantasyTree3D.tsx — Beautiful Flowering Cherry Blossom & Fantasy Trees
// Inspired by reference Image 1 & Image 5
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Props {
  position: [number, number, number];
  scale?: number;
  rotationY?: number;
  variant?: 'cherry' | 'emerald';
}

export function FantasyTree3D({
  position,
  scale = 1,
  rotationY = 0,
  variant = 'cherry',
}: Props) {
  const canopyRef = useRef<THREE.Group>(null);

  // Gentle swaying in the mountain breeze
  useFrame((state) => {
    if (canopyRef.current) {
      const t = state.clock.getElapsedTime();
      canopyRef.current.rotation.z = Math.sin(t * 1.5 + position[0]) * 0.035;
      canopyRef.current.rotation.x = Math.cos(t * 1.2 + position[2]) * 0.025;
    }
  });

  const materials = useMemo(() => {
    const isCherry = variant === 'cherry';

    return {
      trunk: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#3d2b1f'),
        roughness: 0.9,
        metalness: 0.05,
        flatShading: true,
      }),
      canopyMain: new THREE.MeshStandardMaterial({
        color: new THREE.Color(isCherry ? '#ff9ebb' : '#40916c'),
        emissive: new THREE.Color(isCherry ? '#c9184a' : '#1b4332'),
        emissiveIntensity: 0.2,
        roughness: 0.65,
        metalness: 0.05,
      }),
      canopyHighlight: new THREE.MeshStandardMaterial({
        color: new THREE.Color(isCherry ? '#ffc2d1' : '#52b788'),
        emissive: new THREE.Color(isCherry ? '#e01e5a' : '#2d6a4f'),
        emissiveIntensity: 0.15,
        roughness: 0.6,
      }),
      canopyDeep: new THREE.MeshStandardMaterial({
        color: new THREE.Color(isCherry ? '#e86a92' : '#2d6a4f'),
        roughness: 0.75,
      }),
    };
  }, [variant]);

  return (
    <group position={position} scale={scale} rotation={[0, rotationY, 0]}>
      {/* ── 1. GNARLED NATURAL WOODEN TRUNK ── */}
      {/* Base root flare */}
      <mesh position={[0, 0.25, 0]} castShadow material={materials.trunk}>
        <cylinderGeometry args={[0.22, 0.38, 0.5, 8]} />
      </mesh>
      {/* Lower curved trunk */}
      <mesh position={[0.08, 0.85, 0.05]} rotation={[0.08, 0, -0.15]} castShadow material={materials.trunk}>
        <cylinderGeometry args={[0.18, 0.22, 0.8, 8]} />
      </mesh>
      {/* Upper branching trunk */}
      <mesh position={[0.22, 1.45, 0.1]} rotation={[0.12, 0.2, -0.22]} castShadow material={materials.trunk}>
        <cylinderGeometry args={[0.13, 0.18, 0.7, 7]} />
      </mesh>
      {/* Left branch */}
      <mesh position={[-0.15, 1.35, -0.08]} rotation={[-0.2, -0.4, 0.45]} castShadow material={materials.trunk}>
        <cylinderGeometry args={[0.09, 0.14, 0.75, 6]} />
      </mesh>
      {/* Right high branch */}
      <mesh position={[0.38, 1.85, 0.2]} rotation={[0.15, 0.3, -0.35]} castShadow material={materials.trunk}>
        <cylinderGeometry args={[0.07, 0.11, 0.6, 6]} />
      </mesh>

      {/* ── 2. VOLUMETRIC PUFFY BLOSSOM CANOPY CLUSTERS ── */}
      <group ref={canopyRef} position={[0.15, 1.8, 0.05]}>
        {/* Central main foliage dome */}
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow material={materials.canopyMain}>
          <dodecahedronGeometry args={[0.95, 2]} />
        </mesh>

        {/* Left billowing puff */}
        <mesh position={[-0.65, 0.15, -0.2]} castShadow receiveShadow material={materials.canopyHighlight}>
          <dodecahedronGeometry args={[0.75, 2]} />
        </mesh>

        {/* Right overflowing puff */}
        <mesh position={[0.75, 0.25, 0.15]} castShadow receiveShadow material={materials.canopyHighlight}>
          <dodecahedronGeometry args={[0.82, 2]} />
        </mesh>

        {/* Top crowning puff */}
        <mesh position={[0.1, 0.95, -0.05]} castShadow receiveShadow material={materials.canopyHighlight}>
          <dodecahedronGeometry args={[0.7, 2]} />
        </mesh>

        {/* Back depth puff */}
        <mesh position={[-0.2, 0.3, -0.6]} castShadow receiveShadow material={materials.canopyDeep}>
          <dodecahedronGeometry args={[0.65, 2]} />
        </mesh>

        {/* Front hanging blossom puff */}
        <mesh position={[0.25, 0.1, 0.65]} castShadow receiveShadow material={materials.canopyMain}>
          <dodecahedronGeometry args={[0.6, 2]} />
        </mesh>
      </group>

      {/* Scattered fallen petals on ground */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const dist = 0.5 + (i % 3) * 0.25;
        return (
          <mesh
            key={`petal-ground-${i}`}
            position={[Math.cos(angle) * dist, 0.04, Math.sin(angle) * dist]}
            rotation={[-Math.PI / 2, 0, angle]}
            material={materials.canopyHighlight}
          >
            <circleGeometry args={[0.08, 6]} />
          </mesh>
        );
      })}
    </group>
  );
}

