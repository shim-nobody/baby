// src/components/3d/SatelliteIsland3D.tsx — Satellite Floating Islands with Waterfalls, Trees & Cottages
import { useMemo, useState } from 'react';
import { useCursor } from '@react-three/drei';
import * as THREE from 'three';
import { OrganicIslandMesh } from './OrganicIslandMesh';
import { RealisticWaterfall3D } from './RealisticWaterfall3D';
import { PagodaCottage3D } from './PagodaCottage3D';
import { FantasyTree3D } from './FantasyTree3D';

interface Props {
  position: [number, number, number];
  scale?: number;
  rotationY?: number;
  hasCottage?: boolean;
  cottageVariant?: 'left' | 'right';
  hasWaterfall?: boolean;
  waterfallOffset?: [number, number, number];
  onSelect?: () => void;
  isHovered?: boolean;
  seed?: number;
}

export function SatelliteIsland3D({
  position,
  scale = 1,
  rotationY = 0,
  hasCottage = true,
  cottageVariant = 'left',
  hasWaterfall = true,
  waterfallOffset = [0.8, 0.2, 1.2],
  onSelect,
  isHovered,
  seed = 2,
}: Props) {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered && Boolean(onSelect));

  const materials = useMemo(() => {
    return {
      glowingWindow: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ffeaa7'),
        emissive: new THREE.Color('#ffa502'),
        emissiveIntensity: 3.2,
      }),
      hangingVine: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#1c3d19'),
        roughness: 0.9,
      }),
    };
  }, []);

  return (
    <group
      position={position}
      scale={scale}
      rotation={[0, rotationY, 0]}
      onClick={onSelect}
      onPointerOver={onSelect ? (e) => { e.stopPropagation(); setHovered(true); } : undefined}
      onPointerOut={onSelect ? () => setHovered(false) : undefined}
    >
      {/* ── 1. PROCEDURALLY SCULPTED ORGANIC SATELLITE ISLAND ── */}
      <OrganicIslandMesh
        radius={2.6}
        depth={3.0}
        heightVariation={0.35}
        rockColor="#1e2430"
        grassColor="#3a8e3a"
        seed={seed}
      />

      {/* ── 2. GLOWING ROCK CAVITY WINDOW ── */}
      <group position={[0.7, -0.7, 1.3]} rotation={[0.2, 0.35, 0]}>
        <mesh material={materials.glowingWindow}>
          <boxGeometry args={[0.34, 0.4, 0.1]} />
        </mesh>
        <pointLight color="#ffa502" intensity={1.5} distance={2.4} />
      </group>

      {/* Hanging roots */}
      {[
        { pos: [-1.4, -0.5, 1.2], len: 1.4 },
        { pos: [1.3, -0.6, 1.4], len: 1.6 },
        { pos: [0, -0.6, -1.5], len: 1.8 },
      ].map((vine, i) => (
        <mesh
          key={`sat-vine-${i}`}
          position={[vine.pos[0], vine.pos[1] - vine.len / 2, vine.pos[2]]}
          material={materials.hangingVine}
        >
          <cylinderGeometry args={[0.03, 0.015, vine.len, 4]} />
        </mesh>
      ))}

      {/* ── 3. VOLUMETRIC CASCADING WATERFALL ── */}
      {hasWaterfall && (
        <RealisticWaterfall3D
          position={waterfallOffset as [number, number, number]}
          rotationY={0.15}
          width={0.75}
          height={7.2}
        />
      )}

      {/* ── 4. SATELLITE FAIRY COTTAGE ── */}
      {hasCottage && (
        <PagodaCottage3D
          position={[0, 0.5, -0.2]}
          scale={0.92}
          variant={cottageVariant}
        />
      )}

      {/* ── 5. CHARMING CHERRY BLOSSOM TREE BESIDE COTTAGE ── */}
      {hasCottage && (
        <FantasyTree3D
          position={[cottageVariant === 'left' ? -1.4 : 1.4, 0.35, -0.7]}
          scale={0.88}
          rotationY={cottageVariant === 'left' ? 0.3 : -0.3}
          variant="cherry"
        />
      )}

      {/* Hover visual feedback */}
      {isHovered && (
        <pointLight position={[0, 2.5, 0]} color="#E8C88D" intensity={2} distance={5} />
      )}
    </group>
  );
}
