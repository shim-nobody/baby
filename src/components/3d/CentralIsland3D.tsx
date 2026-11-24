// src/components/3d/CentralIsland3D.tsx — Main Floating Island with Organic Landmass, Waterfalls & Pagoda
import { useMemo } from 'react';
import * as THREE from 'three';
import { OrganicIslandMesh } from './OrganicIslandMesh';
import { RealisticWaterfall3D } from './RealisticWaterfall3D';
import { PagodaCottage3D } from './PagodaCottage3D';
import { FantasyTree3D } from './FantasyTree3D';

interface Props {
  onSelectCottage?: () => void;
  isCottageHovered?: boolean;
}

export function CentralIsland3D({ onSelectCottage, isCottageHovered }: Props) {
  const materials = useMemo(() => {
    return {
      steppingStone: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#d4a373'),
        emissive: new THREE.Color('#a98467'),
        emissiveIntensity: 0.2,
        roughness: 0.75,
      }),
      glowingWindow: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ffeaa7'),
        emissive: new THREE.Color('#ffa502'),
        emissiveIntensity: 3.8,
        roughness: 0.2,
      }),
      hangingVine: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#1c3d19'),
        emissive: new THREE.Color('#0d210b'),
        emissiveIntensity: 0.1,
        roughness: 0.85,
      }),
      cliffMoss: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#2d6a4f'),
        roughness: 0.8,
      }),
    };
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {/* ── 1. PROCEDURALLY SCULPTED ORGANIC ISLAND LANDMASS ── */}
      <group position={[0, -0.1, 0]}>
        <OrganicIslandMesh
          radius={4.5}
          depth={4.2}
          heightVariation={0.5}
          rockColor="#1e2430"
          grassColor="#3a8e3a"
          seed={1}
        />
      </group>

      {/* Upper terrace beneath cottage */}
      <group position={[0, 0.45, -0.4]}>
        <OrganicIslandMesh
          radius={2.7}
          depth={1.4}
          heightVariation={0.2}
          rockColor="#1e2430"
          grassColor="#439e43"
          seed={3}
        />
      </group>

      {/* ── 2. BEAUTIFUL CHERRY BLOSSOM TREES (From Reference Images 1 & 5) ── */}
      {/* Left Cherry Blossom Tree framing the cottage */}
      <FantasyTree3D
        position={[-2.7, 0.6, -1.6]}
        scale={1.3}
        rotationY={0.4}
        variant="cherry"
      />
      {/* Right Cherry Blossom Tree */}
      <FantasyTree3D
        position={[2.8, 0.55, -1.4]}
        scale={1.2}
        rotationY={-0.6}
        variant="cherry"
      />

      {/* ── 3. GOLDEN STEPPING STONES PATHWAY TO COTTAGE ── */}
      {[
        { pos: [0, 0.76, 0.7], r: 0.36 },
        { pos: [-0.15, 0.74, 1.3], r: 0.33 },
        { pos: [0.12, 0.72, 1.9], r: 0.38 },
        { pos: [0.38, 0.68, 2.45], r: 0.35 },
        { pos: [0.68, 0.65, 3.0], r: 0.32 },
      ].map((stone, i) => (
        <mesh
          key={`path-${i}`}
          position={stone.pos as [number, number, number]}
          receiveShadow
          material={materials.steppingStone}
        >
          <cylinderGeometry args={[stone.r, stone.r * 1.05, 0.05, 12]} />
        </mesh>
      ))}

      {/* ── 4. GLOWING GOLDEN WINDOW POCKETS EMBEDDED IN ROCK FACE (From Reference Image) ── */}
      {[
        { pos: [-1.4, -0.9, 2.6], rot: [0.2, -0.3, 0], scale: [0.42, 0.48, 0.12] },
        { pos: [1.6, -1.2, 2.4], rot: [0.2, 0.4, 0], scale: [0.45, 0.52, 0.12] },
        { pos: [-0.2, -1.8, 2.2], rot: [0.3, 0, 0], scale: [0.38, 0.44, 0.1] },
        { pos: [1.1, -1.9, 1.6], rot: [0.3, 0.3, 0], scale: [0.35, 0.4, 0.1] },
        { pos: [-1.8, -1.4, 0.8], rot: [0.1, -0.6, 0], scale: [0.38, 0.46, 0.1] },
      ].map((w, idx) => (
        <group key={`win-${idx}`} position={w.pos as [number, number, number]} rotation={w.rot as [number, number, number]}>
          <mesh material={materials.glowingWindow}>
            <boxGeometry args={w.scale as [number, number, number]} />
          </mesh>
          <pointLight color="#ffa502" intensity={1.8} distance={2.8} />
        </group>
      ))}

      {/* ── 5. HANGING ROOTS / VINES DRAPING DOWN OVER ROCK EDGES ── */}
      {[
        { pos: [-2.8, -0.6, 2.1], len: 1.8 },
        { pos: [2.5, -0.7, 2.3], len: 2.2 },
        { pos: [-1.8, -0.8, 2.9], len: 1.5 },
        { pos: [3.3, -0.5, 1.3], len: 2.0 },
        { pos: [-3.5, -0.5, -0.4], len: 2.4 },
        { pos: [0.2, -0.8, 3.5], len: 1.6 },
      ].map((vine, i) => (
        <mesh key={`vine-${i}`} position={[vine.pos[0], vine.pos[1] - vine.len / 2, vine.pos[2]]} material={materials.hangingVine}>
          <cylinderGeometry args={[0.04, 0.02, vine.len, 5]} />
        </mesh>
      ))}

      {/* ── 6. THREE DISTINCT VOLUMETRIC WATERFALLS (From Reference Image) ── */}
      {/* Waterfall 1 (Front Left Stream) */}
      <RealisticWaterfall3D
        position={[-2.4, 0.15, 2.6]}
        rotationY={0.28}
        width={0.88}
        height={7.6}
      />

      {/* Waterfall 2 (Front Center-Left Stream) */}
      <RealisticWaterfall3D
        position={[-1.1, 0.15, 3.4]}
        rotationY={0.05}
        width={0.96}
        height={7.6}
      />

      {/* Waterfall 3 (Right Stream) */}
      <RealisticWaterfall3D
        position={[2.5, 0.15, 2.6]}
        rotationY={-0.35}
        width={0.85}
        height={7.6}
      />

      {/* ── 7. CENTRAL RED PAGODA COTTAGE ── */}
      <PagodaCottage3D
        position={[0, 0.95, -0.4]}
        scale={1.25}
        variant="center"
        onSelect={onSelectCottage}
        isHovered={isCottageHovered}
      />
    </group>
  );
}
