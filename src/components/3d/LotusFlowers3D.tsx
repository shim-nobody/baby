// src/components/3d/LotusFlowers3D.tsx — Realistic Curved Petal Lotus Blossoms & Lilypads
import { useMemo, useState } from 'react';
import { useCursor } from '@react-three/drei';
import * as THREE from 'three';

export interface FlowerProps {
  position: [number, number, number];
  scale?: number;
  rotationY?: number;
  colorType?: 'pink' | 'orange' | 'cyan' | 'magenta' | 'blue';
  type?: 'pink' | 'orange' | 'cyan' | 'magenta' | 'blue';
  onSelect?: () => void;
  isHovered?: boolean;
}

// Single smooth curved realistic petal
function LotusPetal({
  rotation,
  position,
  scale = [0.28, 0.08, 0.65],
  material,
}: {
  rotation: [number, number, number];
  position: [number, number, number];
  scale?: [number, number, number];
  material: THREE.Material;
}) {
  return (
    <group position={position} rotation={rotation}>
      <mesh scale={scale} castShadow receiveShadow material={material}>
        <sphereGeometry args={[1, 16, 12]} />
      </mesh>
    </group>
  );
}

export function LotusFlowers3D({
  position,
  scale = 1,
  rotationY = 0,
  colorType,
  type,
  onSelect,
  isHovered,
}: FlowerProps) {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered && Boolean(onSelect));

  const chosenType = colorType || type || 'pink';

  const materials = useMemo(() => {
    // Petal materials with soft sheen and luminous translucency
    const petalColors: Record<string, { base: string; emissive: string; outer: string }> = {
      pink: { base: '#ff4d6d', emissive: '#c9184a', outer: '#ff758f' },
      magenta: { base: '#e01e5a', emissive: '#9b113e', outer: '#f72585' },
      orange: { base: '#f77f00', emissive: '#d62828', outer: '#fcbf49' },
      cyan: { base: '#00b4d8', emissive: '#0077b6', outer: '#90e0ef' },
      blue: { base: '#0096c7', emissive: '#023e8a', outer: '#48cae4' },
    };
    const c = petalColors[chosenType] || petalColors.pink;

    return {
      petal: new THREE.MeshStandardMaterial({
        color: new THREE.Color(c.base),
        emissive: new THREE.Color(c.emissive),
        emissiveIntensity: 0.35,
        roughness: 0.35,
        metalness: 0.05,
      }),
      petalOuter: new THREE.MeshStandardMaterial({
        color: new THREE.Color(c.outer),
        emissive: new THREE.Color(c.emissive),
        emissiveIntensity: 0.25,
        roughness: 0.4,
      }),
      stamenGold: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ffb703'),
        emissive: new THREE.Color('#fb8500'),
        emissiveIntensity: 0.75,
        roughness: 0.3,
      }),
      lilypad: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#2d6a4f'),
        emissive: new THREE.Color('#1b4332'),
        emissiveIntensity: 0.15,
        roughness: 0.75,
        metalness: 0.05,
      }),
    };
  }, [chosenType]);

  return (
    <group
      position={position}
      scale={scale}
      rotation={[0, rotationY, 0]}
      onClick={onSelect}
      onPointerOver={onSelect ? (e) => { e.stopPropagation(); setHovered(true); } : undefined}
      onPointerOut={onSelect ? () => setHovered(false) : undefined}
    >
      {/* ── 1. CIRCULAR LILYPAD LEAF BASE ── */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={materials.lilypad}>
        <circleGeometry args={[1.1, 24, 0, Math.PI * 1.88]} />
      </mesh>

      {/* ── 2. MAIN BLOOMING LOTUS FLOWER ── */}
      <group position={[0, 0.14, 0]}>
        {/* Golden Seed Pod / Stamen Center */}
        <mesh position={[0, 0.12, 0]} material={materials.stamenGold}>
          <cylinderGeometry args={[0.22, 0.18, 0.18, 16]} />
        </mesh>
        <mesh position={[0, 0.22, 0]} material={materials.stamenGold}>
          <sphereGeometry args={[0.12, 12, 12]} />
        </mesh>

        {/* Inner Ring: 6 upright cupping petals */}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          const dist = 0.28;
          return (
            <LotusPetal
              key={`inner-${i}`}
              position={[Math.cos(angle) * dist, 0.18, Math.sin(angle) * dist]}
              rotation={[0.45 * Math.sin(angle), -angle + Math.PI / 2, 0.45 * Math.cos(angle)]}
              scale={[0.24, 0.09, 0.52]}
              material={materials.petal}
            />
          );
        })}

        {/* Mid Ring: 7 opening petals */}
        {Array.from({ length: 7 }).map((_, i) => {
          const angle = (i / 7) * Math.PI * 2 + 0.3;
          const dist = 0.45;
          return (
            <LotusPetal
              key={`mid-${i}`}
              position={[Math.cos(angle) * dist, 0.12, Math.sin(angle) * dist]}
              rotation={[0.75 * Math.sin(angle), -angle + Math.PI / 2, 0.75 * Math.cos(angle)]}
              scale={[0.28, 0.08, 0.62]}
              material={materials.petal}
            />
          );
        })}

        {/* Outer Ring: 8 wide flared horizontal petals */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2 + 0.6;
          const dist = 0.65;
          return (
            <LotusPetal
              key={`outer-${i}`}
              position={[Math.cos(angle) * dist, 0.06, Math.sin(angle) * dist]}
              rotation={[1.15 * Math.sin(angle), -angle + Math.PI / 2, 1.15 * Math.cos(angle)]}
              scale={[0.32, 0.07, 0.72]}
              material={materials.petalOuter}
            />
          );
        })}
      </group>

      {/* Accompanying smaller flower bud */}
      <group position={[-0.75, 0.08, 0.55]} scale={0.55} rotation={[0.2, 0.5, 0]}>
        <mesh position={[0, 0.15, 0]} material={materials.petal}>
          <sphereGeometry args={[0.25, 12, 12]} />
        </mesh>
      </group>

      {/* Hover starlight aura */}
      {isHovered && (
        <pointLight position={[0, 0.6, 0]} color="#ffb703" intensity={2.5} distance={3.5} />
      )}
    </group>
  );
}
