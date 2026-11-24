// src/components/3d/Terrain3D.tsx — Realistic Floating Fantasy Island Landmass
import { useMemo } from 'react';
import * as THREE from 'three';

export function Terrain3D() {
  // Grassy top surface with stepped terraces and pond recess
  const terrainMaterials = useMemo(() => {
    return {
      grass: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#385e38'),
        roughness: 0.85,
        metalness: 0.1,
        flatShading: true,
      }),
      darkGrass: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#254425'),
        roughness: 0.9,
        metalness: 0.05,
        flatShading: true,
      }),
      stonePath: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#7d7871'),
        roughness: 0.75,
        metalness: 0.15,
        flatShading: true,
      }),
      cliffRock: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#2b2633'),
        roughness: 0.9,
        metalness: 0.2,
        flatShading: true,
      }),
      cliffDark: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#1c1724'),
        roughness: 0.95,
        metalness: 0.25,
        flatShading: true,
      }),
      crystal: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#e8c88d'),
        emissive: new THREE.Color('#e8c88d'),
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.8,
      }),
    };
  }, []);

  return (
    <group position={[0, -0.5, 0]}>
      {/* ── 1. MAIN ISLAND UPPER BASE (IRREGULAR NATURAL PLATFORM) ── */}
      {/* Upper terrace (under cottage & back cherry tree) */}
      <mesh position={[-0.5, 1.2, -1]} castShadow receiveShadow material={terrainMaterials.grass}>
        <boxGeometry args={[7, 1.4, 5.5]} />
      </mesh>

      {/* Mid terrace (stone path and garden) */}
      <mesh position={[1, 0.6, 1.2]} castShadow receiveShadow material={terrainMaterials.grass}>
        <boxGeometry args={[6.5, 1.2, 5]} />
      </mesh>

      {/* Lower pond bank (surrounding the pond) */}
      <mesh position={[-1.2, 0.1, 2.2]} castShadow receiveShadow material={terrainMaterials.darkGrass}>
        <boxGeometry args={[5, 0.8, 3.5]} />
      </mesh>

      {/* ── 2. ROCKY CLIFF FACES & STRATA (LEFT WATERFALL WALL) ── */}
      {/* High cliff rock backing waterfall */}
      <mesh position={[-3.8, 1.8, -0.8]} castShadow receiveShadow material={terrainMaterials.cliffRock}>
        <boxGeometry args={[1.5, 3.5, 4.8]} />
      </mesh>
      <mesh position={[-3.6, 0.5, 1.5]} castShadow receiveShadow material={terrainMaterials.cliffDark}>
        <boxGeometry args={[1.4, 2.2, 3.2]} />
      </mesh>

      {/* Front right rocky cliff corner */}
      <mesh position={[3.6, 0.4, 2.5]} castShadow receiveShadow material={terrainMaterials.cliffRock}>
        <boxGeometry args={[1.8, 2, 2.6]} />
      </mesh>
      <mesh position={[3.8, 1.2, -1.5]} castShadow receiveShadow material={terrainMaterials.cliffDark}>
        <boxGeometry args={[1.6, 2.8, 4]} />
      </mesh>

      {/* ── 3. NATURAL STONE PATHWAY & STEPS ── */}
      {/* Stepping stones from bridge to cottage */}
      {[
        { pos: [0.8, 1.25, 0.8], size: [1.2, 0.15, 0.8] },
        { pos: [0.2, 1.55, 0.1], size: [1.1, 0.18, 0.7] },
        { pos: [-0.4, 1.92, -0.5], size: [1.3, 0.15, 0.9] },
        { pos: [1.4, 0.7, 2.1], size: [0.9, 0.12, 0.6] },
      ].map((step, i) => (
        <mesh key={i} position={step.pos as [number, number, number]} castShadow receiveShadow material={terrainMaterials.stonePath}>
          <boxGeometry args={step.size as [number, number, number]} />
        </mesh>
      ))}

      {/* Decorative stone boulders along riverbank */}
      {[
        { pos: [-0.2, 0.4, 1.2], scale: [0.6, 0.5, 0.7] },
        { pos: [-2.4, 0.3, 3.2], scale: [0.8, 0.6, 0.8] },
        { pos: [0.5, 0.35, 3.4], scale: [0.7, 0.5, 0.6] },
        { pos: [2.5, 0.4, 0.5], scale: [0.9, 0.7, 0.8] },
        { pos: [-3.2, 1.5, 0.8], scale: [0.8, 0.9, 0.7] },
      ].map((boulder, i) => (
        <mesh key={i} position={boulder.pos as [number, number, number]} scale={boulder.scale as [number, number, number]} castShadow receiveShadow material={terrainMaterials.cliffRock}>
          <dodecahedronGeometry args={[0.5, 0]} />
        </mesh>
      ))}

      {/* ── 4. TAPERED FLOATING ISLAND UNDERSIDE (INTO THE CLOUDS) ── */}
      {/* Upper sub-layer */}
      <mesh position={[0, -0.6, 0.2]} castShadow material={terrainMaterials.cliffDark}>
        <coneGeometry args={[4.8, 2.2, 7]} />
      </mesh>
      {/* Deep stalactite rocky core */}
      <mesh position={[-0.4, -1.8, 0]} castShadow material={terrainMaterials.cliffDark}>
        <coneGeometry args={[3.2, 3.2, 6]} />
      </mesh>
      {/* Bottom tapered needle tip */}
      <mesh position={[-0.2, -3.2, -0.2]} castShadow material={terrainMaterials.cliffRock}>
        <coneGeometry args={[1.5, 2.5, 5]} />
      </mesh>

      {/* Starlight crystals embedded in the bottom rocks */}
      {[
        { pos: [-0.6, -2.5, 0.6], rot: [0.4, 0.2, -0.3], scale: [0.25, 0.8, 0.25] },
        { pos: [0.4, -2.2, -0.5], rot: [-0.3, 0.5, 0.2], scale: [0.2, 0.7, 0.2] },
        { pos: [-0.1, -3.8, 0.1], rot: [0.1, 0.1, 0.5], scale: [0.18, 0.9, 0.18] },
      ].map((c, i) => (
        <mesh key={i} position={c.pos as [number, number, number]} rotation={c.rot as [number, number, number]} scale={c.scale as [number, number, number]} material={terrainMaterials.crystal}>
          <octahedronGeometry args={[0.5, 0]} />
        </mesh>
      ))}
    </group>
  );
}

