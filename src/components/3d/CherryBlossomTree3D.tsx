// src/components/3d/CherryBlossomTree3D.tsx — Lush Volumetric Cherry Blossom Tree (Inspired by Reference Image 1)
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Props {
  position: [number, number, number];
  scale?: number;
  rotationY?: number;
  onSelect?: () => void;
  isHovered?: boolean;
}

export function CherryBlossomTree3D({
  position,
  scale = 1,
  rotationY = 0,
  onSelect,
  isHovered,
}: Props) {
  const canopyRef = useRef<THREE.Group>(null);

  // Subtle wind sway animation
  useFrame((state) => {
    if (canopyRef.current) {
      const t = state.clock.getElapsedTime();
      canopyRef.current.rotation.z = Math.sin(t * 1.2 + position[0]) * 0.04;
      canopyRef.current.rotation.x = Math.cos(t * 0.9 + position[2]) * 0.03;
    }
  });

  const materials = useMemo(() => {
    return {
      bark: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#382014'),
        roughness: 0.9,
        metalness: 0.05,
        flatShading: true,
      }),
      blossomPink: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ffaec8'),
        emissive: new THREE.Color('#f59abb'),
        emissiveIntensity: 0.25,
        roughness: 0.8,
        flatShading: true,
      }),
      blossomRose: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#f48ca9'),
        emissive: new THREE.Color('#d98fa8'),
        emissiveIntensity: 0.2,
        roughness: 0.85,
        flatShading: true,
      }),
      blossomSoft: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ffe5ec'),
        emissive: new THREE.Color('#ffc2d1'),
        emissiveIntensity: 0.3,
        roughness: 0.75,
        flatShading: true,
      }),
    };
  }, []);

  return (
    <group
      position={position}
      scale={scale}
      rotation={[0, rotationY, 0]}
      onClick={onSelect}
      cursor={onSelect ? 'pointer' : undefined}
    >
      {/* ── 1. ORGANIC TWISTED WOODEN TRUNK & BRANCHES ── */}
      {/* Base root flair */}
      <mesh position={[0, 0.4, 0]} castShadow material={materials.bark}>
        <cylinderGeometry args={[0.55, 0.85, 0.8, 8]} />
      </mesh>
      {/* Lower curving trunk */}
      <mesh position={[0.15, 1.2, 0.05]} rotation={[0.08, 0.1, -0.15]} castShadow material={materials.bark}>
        <cylinderGeometry args={[0.42, 0.55, 1.0, 8]} />
      </mesh>
      {/* Mid trunk arching towards center */}
      <mesh position={[0.35, 2.0, 0]} rotation={[0.12, 0.2, -0.22]} castShadow material={materials.bark}>
        <cylinderGeometry args={[0.34, 0.42, 0.9, 8]} />
      </mesh>

      {/* Main Limb 1 (Left branch arching out) */}
      <mesh position={[-0.2, 2.6, 0.2]} rotation={[-0.3, 0.4, 0.65]} castShadow material={materials.bark}>
        <cylinderGeometry args={[0.22, 0.34, 1.4, 7]} />
      </mesh>
      {/* Main Limb 2 (Right branch arching high) */}
      <mesh position={[0.7, 2.7, -0.1]} rotation={[0.25, -0.3, -0.55]} castShadow material={materials.bark}>
        <cylinderGeometry args={[0.22, 0.32, 1.5, 7]} />
      </mesh>
      {/* Main Limb 3 (Center upper crown) */}
      <mesh position={[0.3, 3.1, 0.3]} rotation={[-0.1, 0.1, 0.1]} castShadow material={materials.bark}>
        <cylinderGeometry args={[0.18, 0.25, 1.1, 6]} />
      </mesh>

      {/* ── 2. VOLUMETRIC PUFFY SAKURA BLOSSOM CANOPY CLUSTERS ── */}
      <group ref={canopyRef} position={[0.3, 3.2, 0]}>
        {/* Central main foliage dome */}
        <mesh position={[0, 0.2, 0]} castShadow material={materials.blossomPink}>
          <dodecahedronGeometry args={[1.35, 1]} />
        </mesh>
        <mesh position={[-0.9, 0.1, 0.3]} castShadow material={materials.blossomRose}>
          <dodecahedronGeometry args={[1.05, 1]} />
        </mesh>
        <mesh position={[0.9, 0.2, -0.2]} castShadow material={materials.blossomSoft}>
          <dodecahedronGeometry args={[1.15, 1]} />
        </mesh>

        {/* Upper crowning puffs */}
        <mesh position={[0.1, 0.85, 0.1]} castShadow material={materials.blossomSoft}>
          <dodecahedronGeometry args={[0.95, 1]} />
        </mesh>
        <mesh position={[-0.5, 0.7, -0.4]} castShadow material={materials.blossomPink}>
          <dodecahedronGeometry args={[0.85, 1]} />
        </mesh>
        <mesh position={[0.6, 0.75, 0.4]} castShadow material={materials.blossomRose}>
          <dodecahedronGeometry args={[0.9, 1]} />
        </mesh>

        {/* Lower cascading blossom puffs */}
        <mesh position={[-1.3, -0.4, 0.2]} castShadow material={materials.blossomRose}>
          <dodecahedronGeometry args={[0.8, 1]} />
        </mesh>
        <mesh position={[1.4, -0.3, -0.2]} castShadow material={materials.blossomPink}>
          <dodecahedronGeometry args={[0.85, 1]} />
        </mesh>
        <mesh position={[0.2, -0.3, 1.1]} castShadow material={materials.blossomSoft}>
          <dodecahedronGeometry args={[0.8, 1]} />
        </mesh>
      </group>

      {/* Subtle starlight glow / beacon when hovered */}
      {isHovered && (
        <pointLight position={[0.3, 3.2, 0]} color="#ffaec8" intensity={3} distance={5} />
      )}
    </group>
  );
}

