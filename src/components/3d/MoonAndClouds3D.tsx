// src/components/3d/MoonAndClouds3D.tsx — Glowing 3D Moon and Drifting Clouds
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Props {
  onSelectMoon?: () => void;
  isHovered?: boolean;
}

export function MoonAndClouds3D({ onSelectMoon, isHovered }: Props) {
  const moonRef = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Group>(null);

  // Soft rotation and cloud drift
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (moonRef.current) {
      moonRef.current.position.y = 8.5 + Math.sin(t * 0.8) * 0.15;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = t * 0.02;
    }
  });

  const materials = useMemo(() => {
    return {
      moonGlow: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#fff6ee'),
        emissive: new THREE.Color('#e8c88d'),
        emissiveIntensity: 1.2,
        roughness: 0.3,
        metalness: 0.1,
      }),
      moonCrater: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#d4af76'),
        roughness: 0.7,
      }),
      cloudFluff: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#281c3b'),
        emissive: new THREE.Color('#160e24'),
        emissiveIntensity: 0.25,
        transparent: true,
        opacity: 0.7,
        roughness: 0.95,
        flatShading: true,
      }),
    };
  }, []);

  return (
    <group>
      {/* ── 1. GLOWING 3D CELESTIAL MOON (TOP RIGHT SKY) ── */}
      <group
        ref={moonRef}
        position={[9.5, 8.5, -6]}
        onClick={onSelectMoon}
        cursor={onSelectMoon ? 'pointer' : undefined}
      >
        {/* Main Moon Sphere */}
        <mesh castShadow material={materials.moonGlow}>
          <sphereGeometry args={[1.5, 32, 32]} />
        </mesh>

        {/* Craters */}
        {[
          { pos: [-0.4, 0.5, 1.3], r: 0.25 },
          { pos: [0.6, -0.3, 1.25], r: 0.35 },
          { pos: [0.1, 0.2, 1.42], r: 0.18 },
          { pos: [-0.5, -0.6, 1.2], r: 0.28 },
        ].map((c, i) => (
          <mesh key={i} position={c.pos as [number, number, number]} material={materials.moonCrater}>
            <sphereGeometry args={[c.r, 12, 12]} />
          </mesh>
        ))}

        {/* Moon Starlight Corona / Directional Moonlight */}
        <pointLight color="#fff6ee" intensity={3.5} distance={25} castShadow />
        <pointLight color="#e8c88d" intensity={2.0} distance={15} />

        {isHovered && (
          <pointLight color="#fff6ee" intensity={5} distance={12} />
        )}
      </group>

      {/* ── 2. VOLUMETRIC DRIFTING CLOUDS BELOW THE FLOATING ISLAND ── */}
      <group ref={cloudsRef} position={[0, -4.5, 0]}>
        {[
          { pos: [-6, 0, -4], scale: [3.5, 1.2, 2.5] },
          { pos: [5, 0.4, -5], scale: [4.2, 1.4, 3.0] },
          { pos: [6, -0.3, 3], scale: [3.8, 1.3, 2.8] },
          { pos: [-5, 0.2, 4], scale: [4.0, 1.2, 2.6] },
          { pos: [0, -0.6, 7], scale: [5.0, 1.5, 3.2] },
          { pos: [0, -0.8, -7], scale: [4.8, 1.4, 3.0] },
        ].map((cloud, i) => (
          <group key={i} position={cloud.pos as [number, number, number]}>
            <mesh scale={cloud.scale as [number, number, number]} material={materials.cloudFluff}>
              <dodecahedronGeometry args={[1, 1]} />
            </mesh>
            <mesh position={[0.8, 0.2, 0]} scale={[cloud.scale[0] * 0.7, cloud.scale[1] * 0.9, cloud.scale[2] * 0.7]} material={materials.cloudFluff}>
              <dodecahedronGeometry args={[1, 1]} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

