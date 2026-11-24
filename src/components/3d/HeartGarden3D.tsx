// src/components/3d/HeartGarden3D.tsx — Botanical Heart Garden & Handkerchief Table
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Props {
  onSelectGarden?: () => void;
  isHovered?: boolean;
}

export function HeartGarden3D({ onSelectGarden, isHovered }: Props) {
  const flowerGroupRef = useRef<THREE.Group>(null);

  // Soft breathing glow of rose flowers
  useFrame((state) => {
    if (flowerGroupRef.current) {
      const t = state.clock.getElapsedTime();
      const s = 1 + Math.sin(t * 2) * 0.05;
      flowerGroupRef.current.scale.set(s, s, s);
    }
  });

  const materials = useMemo(() => {
    return {
      soil: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#38281f'),
        roughness: 0.9,
      }),
      stoneBorder: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#615951'),
        roughness: 0.8,
        flatShading: true,
      }),
      flowerPink: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ff85a1'),
        emissive: new THREE.Color('#f72585'),
        emissiveIntensity: 0.45,
        roughness: 0.3,
      }),
      flowerGold: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ffe299'),
        emissive: new THREE.Color('#ffb703'),
        emissiveIntensity: 0.5,
      }),
      handkerchief: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#fffdfa'),
        roughness: 0.5,
      }),
      tableStone: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#524941'),
        roughness: 0.75,
      }),
    };
  }, []);

  return (
    <group
      position={[2.4, 0.9, 0.4]}
      onClick={onSelectGarden}
      cursor={onSelectGarden ? 'pointer' : undefined}
    >
      {/* ── 1. RAISED BOTANICAL FLOWERBED BORDER ── */}
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow material={materials.stoneBorder}>
        <cylinderGeometry args={[1.3, 1.45, 0.25, 12]} />
      </mesh>
      <mesh position={[0, 0.16, 0]} material={materials.soil}>
        <cylinderGeometry args={[1.2, 1.2, 0.2, 12]} />
      </mesh>

      {/* ── 2. GLOWING ROSE BUDS & BLOSSOMS ── */}
      <group ref={flowerGroupRef} position={[0, 0.25, 0]}>
        {[
          { pos: [-0.4, 0.1, -0.4], color: materials.flowerPink, r: 0.16 },
          { pos: [0.5, 0.12, -0.3], color: materials.flowerPink, r: 0.18 },
          { pos: [-0.3, 0.14, 0.4], color: materials.flowerPink, r: 0.15 },
          { pos: [0.4, 0.1, 0.35], color: materials.flowerGold, r: 0.17 },
          { pos: [0, 0.15, 0.55], color: materials.flowerPink, r: 0.16 },
        ].map((f, idx) => (
          <mesh key={idx} position={f.pos as [number, number, number]} castShadow material={f.color}>
            <dodecahedronGeometry args={[f.r, 0]} />
          </mesh>
        ))}
        {/* Soft pink starlight floral glow */}
        <pointLight position={[0, 0.4, 0]} color="#f72585" intensity={1.8} distance={3.2} />
      </group>

      {/* ── 3. STONE TEA TABLE & HACKATHON HANDKERCHIEF ── */}
      <group position={[-0.1, 0.2, -0.1]}>
        {/* Stone table pedestal */}
        <mesh position={[0, 0.18, 0]} castShadow material={materials.tableStone}>
          <cylinderGeometry args={[0.3, 0.35, 0.35, 8]} />
        </mesh>
        {/* Embroidered delicate handkerchief folded on table */}
        <mesh position={[0, 0.38, 0]} rotation={[0, 0.35, 0]} material={materials.handkerchief}>
          <boxGeometry args={[0.22, 0.04, 0.22]} />
        </mesh>
        {/* Tiny golden embroidered heart on handkerchief */}
        <mesh position={[0, 0.41, 0]} material={materials.flowerGold}>
          <sphereGeometry args={[0.035, 8, 8]} />
        </mesh>
      </group>

      {/* Hover starlight aura */}
      {isHovered && (
        <pointLight position={[0, 0.6, 0]} color="#e8c88d" intensity={2.8} distance={4} />
      )}
    </group>
  );
}

