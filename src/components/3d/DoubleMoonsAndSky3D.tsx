// src/components/3d/DoubleMoonsAndSky3D.tsx — Two Luminous Moons & Dreamy Clouds
// Matched directly to the reference image artwork
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Props {
  onSelectMoon?: () => void;
  isHovered?: boolean;
}

export function DoubleMoonsAndSky3D({ onSelectMoon, isHovered }: Props) {
  const leftMoonRef = useRef<THREE.Group>(null);
  const rightMoonRef = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (leftMoonRef.current) {
      leftMoonRef.current.position.y = 7.5 + Math.sin(t * 0.8) * 0.12;
    }
    if (rightMoonRef.current) {
      rightMoonRef.current.position.y = 8.2 + Math.cos(t * 0.7) * 0.12;
    }
    if (cloudsRef.current) {
      cloudsRef.current.position.x = Math.sin(t * 0.1) * 0.3;
    }
  });

  const materials = useMemo(() => {
    return {
      moonLeftGlow: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#d8f3dc'),
        emissive: new THREE.Color('#95d5b2'),
        emissiveIntensity: 1.4,
        roughness: 0.25,
      }),
      moonRightGlow: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#caf0f8'),
        emissive: new THREE.Color('#90e0ef'),
        emissiveIntensity: 1.5,
        roughness: 0.25,
      }),
      moonCrater: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#74c69d'),
        roughness: 0.8,
      }),
      dreamCloud: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#2d3748'),
        emissive: new THREE.Color('#1a202c'),
        emissiveIntensity: 0.2,
        transparent: true,
        opacity: 0.75,
        roughness: 0.9,
        flatShading: true,
      }),
      waterLakeBase: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#0077b6'),
        emissive: new THREE.Color('#03045e'),
        emissiveIntensity: 0.4,
        transparent: true,
        opacity: 0.85,
        roughness: 0.1,
      }),
    };
  }, []);

  return (
    <group>
      {/* ── 1. HUGE CELESTIAL MOON 1 (LEFT SKY) ── */}
      <group
        ref={leftMoonRef}
        position={[-6.2, 7.5, -9]}
        onClick={onSelectMoon}
        cursor={onSelectMoon ? 'pointer' : undefined}
      >
        <mesh castShadow material={materials.moonLeftGlow}>
          <sphereGeometry args={[2.8, 32, 32]} />
        </mesh>
        {/* Subtle craters */}
        {[
          { pos: [-0.6, 0.8, 2.4], r: 0.45 },
          { pos: [0.8, -0.5, 2.4], r: 0.6 },
          { pos: [-0.2, -0.9, 2.4], r: 0.5 },
          { pos: [0.3, 0.6, 2.5], r: 0.35 },
        ].map((c, i) => (
          <mesh key={`c1-${i}`} position={c.pos as [number, number, number]} material={materials.moonCrater}>
            <sphereGeometry args={[c.r, 12, 12]} />
          </mesh>
        ))}
        {/* Moonlight fill */}
        <pointLight color="#d8f3dc" intensity={2.8} distance={20} />
      </group>

      {/* ── 2. MEDIUM LUMINOUS MOON 2 (RIGHT SKY) ── */}
      <group
        ref={rightMoonRef}
        position={[6.8, 8.2, -8.5]}
        onClick={onSelectMoon}
        cursor={onSelectMoon ? 'pointer' : undefined}
      >
        <mesh castShadow material={materials.moonRightGlow}>
          <sphereGeometry args={[1.9, 28, 28]} />
        </mesh>
        {[
          { pos: [-0.4, 0.5, 1.6], r: 0.3 },
          { pos: [0.5, -0.4, 1.65], r: 0.4 },
        ].map((c, i) => (
          <mesh key={`c2-${i}`} position={c.pos as [number, number, number]} material={materials.moonCrater}>
            <sphereGeometry args={[c.r, 12, 12]} />
          </mesh>
        ))}
        <pointLight color="#caf0f8" intensity={2.2} distance={18} />

        {isHovered && (
          <pointLight color="#ffffff" intensity={4} distance={12} />
        )}
      </group>

      {/* ── 3. DREAMY BILLOWING CLOUDS FRAMING THE MOONS & HORIZON ── */}
      <group ref={cloudsRef}>
        {/* Clouds around Left Moon */}
        <group position={[-7.5, 8.2, -7.5]}>
          <mesh position={[-1.2, 0, 0]} scale={[2.8, 1.4, 1.8]} material={materials.dreamCloud}>
            <dodecahedronGeometry args={[1, 1]} />
          </mesh>
          <mesh position={[1.4, 0.4, 0]} scale={[2.4, 1.3, 1.6]} material={materials.dreamCloud}>
            <dodecahedronGeometry args={[1, 1]} />
          </mesh>
        </group>

        {/* Clouds around Right Moon */}
        <group position={[8.0, 9.0, -7.0]}>
          <mesh position={[0, 0, 0]} scale={[2.6, 1.3, 1.6]} material={materials.dreamCloud}>
            <dodecahedronGeometry args={[1, 1]} />
          </mesh>
        </group>

        {/* Clouds drifting below floating islands */}
        <group position={[0, -5.5, 0]}>
          {[
            { pos: [-7, 0, -3], s: [4.5, 1.6, 3.2] },
            { pos: [6, 0.4, -4], s: [5.2, 1.8, 3.8] },
            { pos: [0, -0.4, 4], s: [6.0, 1.9, 4.0] },
          ].map((cl, i) => (
            <mesh key={`cloud-${i}`} position={cl.pos as [number, number, number]} scale={cl.s as [number, number, number]} material={materials.dreamCloud}>
              <dodecahedronGeometry args={[1, 1]} />
            </mesh>
          ))}
        </group>
      </group>

      {/* ── 4. CRYSTALLINE WATER LAKE AT VERY BOTTOM (Where waterfalls plunge) ── */}
      <mesh position={[0, -6.2, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.waterLakeBase}>
        <planeGeometry args={[36, 36]} />
      </mesh>
    </group>
  );
}

