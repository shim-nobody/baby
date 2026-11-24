// src/components/3d/HeartVault3D.tsx — Floating Crystalline Glass Heart Vault
import { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useCursor } from '@react-three/drei';
import * as THREE from 'three';

interface Props {
  onSelectVault?: () => void;
  isHovered?: boolean;
}

export function HeartVault3D({ onSelectVault, isHovered }: Props) {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered && Boolean(onSelectVault));

  const heartGroupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  // Floating bob and rotation of rings
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (heartGroupRef.current) {
      heartGroupRef.current.position.y = 5.2 + Math.sin(t * 1.8) * 0.22;
      heartGroupRef.current.rotation.y = t * 0.35;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.8;
      ring1Ref.current.rotation.y = t * 0.5;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.7;
      ring2Ref.current.rotation.z = t * 0.4;
    }
  });

  const materials = useMemo(() => {
    return {
      crystalGlass: new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#ffc2d1'),
        emissive: new THREE.Color('#f59abb'),
        emissiveIntensity: 0.6,
        transparent: true,
        opacity: 0.82,
        roughness: 0.1,
        metalness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
      }),
      goldRing: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#e8c88d'),
        emissive: new THREE.Color('#c29b53'),
        emissiveIntensity: 0.4,
        roughness: 0.25,
        metalness: 0.85,
      }),
      coreGlow: new THREE.MeshBasicMaterial({
        color: new THREE.Color('#fff6ee'),
      }),
    };
  }, []);

  return (
    <group
      ref={heartGroupRef}
      position={[-0.4, 5.2, 0.2]}
      onClick={onSelectVault}
      onPointerOver={onSelectVault ? (e) => { e.stopPropagation(); setHovered(true); } : undefined}
      onPointerOut={onSelectVault ? () => setHovered(false) : undefined}
    >
      {/* ── 1. FLOATING CRYSTALLINE HEART SHAPE ── */}
      {/* Left sphere lobe */}
      <mesh position={[-0.22, 0.22, 0]} material={materials.crystalGlass}>
        <sphereGeometry args={[0.32, 16, 16]} />
      </mesh>
      {/* Right sphere lobe */}
      <mesh position={[0.22, 0.22, 0]} material={materials.crystalGlass}>
        <sphereGeometry args={[0.32, 16, 16]} />
      </mesh>
      {/* Lower heart cone tip */}
      <mesh position={[0, -0.15, 0]} rotation={[0, 0, Math.PI]} material={materials.crystalGlass}>
        <coneGeometry args={[0.48, 0.65, 16]} />
      </mesh>

      {/* Radiant inner star core */}
      <mesh position={[0, 0.08, 0]} material={materials.coreGlow}>
        <octahedronGeometry args={[0.12, 0]} />
      </mesh>

      {/* ── 2. ORBITING CELESTIAL GOLDEN RINGS ── */}
      <mesh ref={ring1Ref} material={materials.goldRing}>
        <torusGeometry args={[0.85, 0.025, 12, 32]} />
      </mesh>
      <mesh ref={ring2Ref} material={materials.goldRing}>
        <torusGeometry args={[0.95, 0.02, 12, 32]} />
      </mesh>

      {/* Floating starlight beacon */}
      <pointLight color="#e8c88d" intensity={2.8} distance={5} />
      <pointLight color="#f59abb" intensity={1.8} distance={4} />

      {/* Hover feedback halo */}
      {isHovered && (
        <pointLight color="#fff6ee" intensity={4.5} distance={6} />
      )}
    </group>
  );
}
