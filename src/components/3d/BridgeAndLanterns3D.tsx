// src/components/3d/BridgeAndLanterns3D.tsx — Arched Wooden Bridge & Stone Lanterns
import { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useCursor } from '@react-three/drei';
import * as THREE from 'three';

interface Props {
  onSelectBridge?: () => void;
  isHovered?: boolean;
}

export function BridgeAndLanterns3D({ onSelectBridge, isHovered }: Props) {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered && Boolean(onSelectBridge));

  const lanternLightRef = useRef<THREE.PointLight>(null);

  // Lantern flame flicker
  useFrame((state) => {
    if (lanternLightRef.current) {
      const t = state.clock.getElapsedTime();
      lanternLightRef.current.intensity = 2.4 + Math.sin(t * 6.2) * 0.35 + Math.cos(t * 9.5) * 0.2;
    }
  });

  const materials = useMemo(() => {
    return {
      bridgeWood: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#6b4226'),
        roughness: 0.7,
        metalness: 0.1,
      }),
      bridgeRailing: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#a85832'),
        roughness: 0.6,
      }),
      lanternStone: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#4a4440'),
        roughness: 0.85,
        flatShading: true,
      }),
      lanternFire: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ffe299'),
        emissive: new THREE.Color('#ffb75e'),
        emissiveIntensity: 2.2,
      }),
    };
  }, []);

  return (
    <group
      position={[0.4, 0.5, 2.0]}
      rotation={[0, -0.28, 0]}
      onClick={onSelectBridge}
      onPointerOver={onSelectBridge ? (e) => { e.stopPropagation(); setHovered(true); } : undefined}
      onPointerOut={onSelectBridge ? () => setHovered(false) : undefined}
    >
      {/* ── 1. ARCHED WOODEN FOOTBRIDGE ── */}
      {/* Arched bridge main span */}
      <mesh position={[0, 0.42, 0]} rotation={[0, 0, 0]} castShadow receiveShadow material={materials.bridgeWood}>
        <boxGeometry args={[1.2, 0.14, 2.4]} />
      </mesh>

      {/* Bridge handrails & posts */}
      {[-0.55, 0.55].map((x, i) => (
        <group key={`rail-${i}`}>
          {/* Top rail */}
          <mesh position={[x, 0.75, 0]} castShadow material={materials.bridgeRailing}>
            <boxGeometry args={[0.08, 0.08, 2.4]} />
          </mesh>
          {/* Support posts */}
          {[-1.0, -0.35, 0.35, 1.0].map((z, j) => (
            <mesh key={`post-${j}`} position={[x, 0.55, z]} castShadow material={materials.bridgeRailing}>
              <cylinderGeometry args={[0.04, 0.04, 0.35, 6]} />
            </mesh>
          ))}
        </group>
      ))}

      {/* ── 2. JAPANESE STONE LANTERN (TORO) BESIDE BRIDGE ── */}
      <group position={[0.9, 0.3, 1.3]}>
        {/* Lantern stone base & pillar */}
        <mesh position={[0, 0.1, 0]} castShadow material={materials.lanternStone}>
          <boxGeometry args={[0.35, 0.2, 0.35]} />
        </mesh>
        <mesh position={[0, 0.35, 0]} castShadow material={materials.lanternStone}>
          <cylinderGeometry args={[0.1, 0.14, 0.35, 6]} />
        </mesh>
        {/* Lantern fire chamber */}
        <mesh position={[0, 0.62, 0]} material={materials.lanternFire}>
          <boxGeometry args={[0.22, 0.22, 0.22]} />
        </mesh>
        {/* Lantern roof pagoda cap */}
        <mesh position={[0, 0.8, 0]} castShadow material={materials.lanternStone}>
          <coneGeometry args={[0.38, 0.2, 6]} />
        </mesh>
        {/* Warm lantern flame light */}
        <pointLight
          ref={lanternLightRef}
          position={[0, 0.65, 0]}
          color="#ffb75e"
          intensity={2.5}
          distance={4.2}
          castShadow
        />
      </group>

      {/* Hover visual feedback */}
      {isHovered && (
        <pointLight position={[0, 0.8, 0]} color="#e8c88d" intensity={2.5} distance={4} />
      )}
    </group>
  );
}
