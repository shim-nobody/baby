// src/components/3d/PagodaCottage3D.tsx — Curved-Eave Japanese Pagoda Fairy Cottage
import { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useCursor } from '@react-three/drei';
import * as THREE from 'three';

interface Props {
  position?: [number, number, number];
  scale?: number;
  rotationY?: number;
  variant?: 'center' | 'left' | 'right';
  onSelect?: () => void;
  isHovered?: boolean;
}

export function PagodaCottage3D({
  position = [0, 0, 0],
  scale = 1,
  rotationY = 0,
  variant = 'center',
  onSelect,
  isHovered,
}: Props) {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered && Boolean(onSelect));

  const doorLightRef = useRef<THREE.PointLight>(null);
  const lanternRef = useRef<THREE.Group>(null);

  // Soft breathing glow of doorway & lantern
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (doorLightRef.current) {
      doorLightRef.current.intensity = 4.2 + Math.sin(t * 3.5) * 0.45;
    }
    if (lanternRef.current) {
      lanternRef.current.rotation.z = Math.sin(t * 2) * 0.08;
    }
  });

  const materials = useMemo(() => {
    return {
      roofRed: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#d93838'),
        emissive: new THREE.Color('#801515'),
        emissiveIntensity: 0.25,
        roughness: 0.4,
        metalness: 0.1,
      }),
      roofGoldTrim: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#f4a261'),
        emissive: new THREE.Color('#e76f51'),
        emissiveIntensity: 0.2,
        roughness: 0.35,
        metalness: 0.6,
      }),
      wallTeal: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#226f78'),
        roughness: 0.75,
        metalness: 0.08,
      }),
      timberBeam: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#194247'),
        roughness: 0.8,
      }),
      doorGlowGold: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ffeaa7'),
        emissive: new THREE.Color('#ffa502'),
        emissiveIntensity: 2.8,
        roughness: 0.2,
      }),
      doorGlowCyan: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#b5f4ff'),
        emissive: new THREE.Color('#00d2d3'),
        emissiveIntensity: 2.5,
        roughness: 0.2,
      }),
      goldFinial: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#e8c88d'),
        emissive: new THREE.Color('#c29b53'),
        emissiveIntensity: 0.5,
        roughness: 0.25,
        metalness: 0.85,
      }),
      stoneBase: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#5c677d'),
        roughness: 0.85,
      }),
    };
  }, []);

  const isCenter = variant === 'center';
  const doorMaterial = variant === 'right' ? materials.doorGlowCyan : materials.doorGlowGold;
  const doorLightColor = variant === 'right' ? '#00d2d3' : '#ff9f1a';

  return (
    <group
      position={position}
      scale={scale}
      rotation={[0, rotationY, 0]}
      onClick={onSelect}
      onPointerOver={onSelect ? (e) => { e.stopPropagation(); setHovered(true); } : undefined}
      onPointerOut={onSelect ? () => setHovered(false) : undefined}
    >
      {/* ── 1. STONE FOUNDATION & STAIRS ── */}
      <mesh position={[0, 0.18, 0]} castShadow receiveShadow material={materials.stoneBase}>
        <boxGeometry args={[isCenter ? 3.0 : 2.1, 0.35, isCenter ? 2.8 : 2.0]} />
      </mesh>
      {/* Stone steps */}
      <mesh position={[0, 0.12, isCenter ? 1.55 : 1.15]} castShadow receiveShadow material={materials.stoneBase}>
        <boxGeometry args={[1.3, 0.2, 0.45]} />
      </mesh>
      <mesh position={[0, 0.05, isCenter ? 1.85 : 1.4]} castShadow receiveShadow material={materials.stoneBase}>
        <boxGeometry args={[1.5, 0.1, 0.35]} />
      </mesh>

      {/* ── 2. TEAL WOODEN WALLS WITH TIMBER POSTS ── */}
      <mesh position={[0, 1.05, 0]} castShadow receiveShadow material={materials.wallTeal}>
        <boxGeometry args={[isCenter ? 2.4 : 1.7, isCenter ? 1.4 : 1.25, isCenter ? 2.2 : 1.6]} />
      </mesh>
      {/* Dark timber corner pillars */}
      {[-1, 1].map((x) =>
        [-1, 1].map((z) => (
          <mesh
            key={`pillar-${x}-${z}`}
            position={[(x * (isCenter ? 2.4 : 1.7)) / 2, 1.05, (z * (isCenter ? 2.2 : 1.6)) / 2]}
            material={materials.timberBeam}
          >
            <boxGeometry args={[0.14, isCenter ? 1.45 : 1.3, 0.14]} />
          </mesh>
        ))
      )}

      {/* ── 3. ARCHED GLOWING DOORWAY ── */}
      <group position={[0, 0.8, (isCenter ? 2.2 : 1.6) / 2 + 0.03]}>
        {/* Door frame */}
        <mesh position={[0, 0, 0]} material={materials.timberBeam}>
          <boxGeometry args={[0.95, 1.25, 0.08]} />
        </mesh>
        {/* Glowing door panel */}
        <mesh position={[0, -0.05, 0.03]} material={doorMaterial}>
          <boxGeometry args={[0.75, 1.05, 0.04]} />
        </mesh>
        {/* Arched top */}
        <mesh position={[0, 0.48, 0.03]} material={doorMaterial}>
          <cylinderGeometry args={[0.375, 0.375, 0.04, 16, 1, false, 0, Math.PI]} />
        </mesh>

        {/* Door light illuminating the path */}
        <pointLight
          ref={doorLightRef}
          position={[0, 0.2, 0.6]}
          color={doorLightColor}
          intensity={4.2}
          distance={isCenter ? 7.0 : 4.8}
          castShadow
        />
      </group>

      {/* Round Gold Clock / Medallion above door */}
      <group position={[0, 1.7, (isCenter ? 2.2 : 1.6) / 2 + 0.05]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} material={materials.goldFinial}>
          <cylinderGeometry args={[0.24, 0.24, 0.05, 16]} />
        </mesh>
        <mesh position={[0, 0, 0.03]} rotation={[Math.PI / 2, 0, 0]} material={materials.roofGoldTrim}>
          <cylinderGeometry args={[0.18, 0.18, 0.04, 16]} />
        </mesh>
      </group>

      {/* ── 4. LOWER CURVED RED PAGODA ROOF ── */}
      <group position={[0, isCenter ? 1.95 : 1.75, 0]}>
        {/* Main curved roof block with overhang */}
        <mesh castShadow receiveShadow material={materials.roofRed}>
          <boxGeometry args={[isCenter ? 3.4 : 2.5, 0.35, isCenter ? 3.2 : 2.4]} />
        </mesh>
        {/* Slanted upper hip faces */}
        <mesh position={[0, 0.3, 0]} castShadow receiveShadow material={materials.roofRed}>
          <boxGeometry args={[isCenter ? 2.8 : 2.0, 0.35, isCenter ? 2.6 : 1.9]} />
        </mesh>

        {/* Flared upward-curving eaves corners (4 corners) */}
        {[
          { pos: [-1.7, 0.12, -1.6], rot: [0.3, 0.3, -0.4] },
          { pos: [1.7, 0.12, -1.6], rot: [0.3, -0.3, 0.4] },
          { pos: [-1.7, 0.12, 1.6], rot: [-0.3, -0.3, -0.4] },
          { pos: [1.7, 0.12, 1.6], rot: [-0.3, 0.3, 0.4] },
        ].map((corner, i) => (
          <mesh
            key={`corner-${i}`}
            position={corner.pos as [number, number, number]}
            rotation={corner.rot as [number, number, number]}
            material={materials.roofGoldTrim}
          >
            <coneGeometry args={[0.16, 0.45, 4]} />
          </mesh>
        ))}

        {/* Golden eaves trim */}
        <mesh position={[0, -0.16, 0]} material={materials.roofGoldTrim}>
          <boxGeometry args={[isCenter ? 3.55 : 2.65, 0.06, isCenter ? 3.35 : 2.55]} />
        </mesh>
      </group>

      {/* ── 5. UPPER TIER TOWER (For Center Cottage) ── */}
      {isCenter ? (
        <group position={[0, 2.6, 0]}>
          {/* Upper story wall */}
          <mesh position={[0, 0.25, 0]} castShadow receiveShadow material={materials.wallTeal}>
            <boxGeometry args={[1.6, 0.85, 1.5]} />
          </mesh>
          {/* Upper glowing round window */}
          <mesh position={[0, 0.25, 0.77]} material={materials.doorGlowGold}>
            <circleGeometry args={[0.26, 16]} />
          </mesh>

          {/* Upper tier curved red pagoda roof */}
          <group position={[0, 0.95, 0]}>
            <mesh castShadow receiveShadow material={materials.roofRed}>
              <boxGeometry args={[2.4, 0.3, 2.3]} />
            </mesh>
            <mesh position={[0, 0.25, 0]} castShadow receiveShadow material={materials.roofRed}>
              <boxGeometry args={[1.8, 0.3, 1.7]} />
            </mesh>
            {/* Upper roof golden eaves trim */}
            <mesh position={[0, -0.14, 0]} material={materials.roofGoldTrim}>
              <boxGeometry args={[2.55, 0.06, 2.45]} />
            </mesh>

            {/* Top golden roof peak spire & sphere finial */}
            <mesh position={[0, 0.55, 0]} material={materials.goldFinial}>
              <coneGeometry args={[0.2, 0.6, 12]} />
            </mesh>
            <mesh position={[0, 0.92, 0]} material={materials.goldFinial}>
              <sphereGeometry args={[0.15, 16, 16]} />
            </mesh>
          </group>
        </group>
      ) : (
        /* Top roof peak finial for satellite cottage */
        <group position={[0, 2.35, 0]}>
          <mesh material={materials.goldFinial}>
            <coneGeometry args={[0.18, 0.5, 12]} />
          </mesh>
          <mesh position={[0, 0.32, 0]} material={materials.goldFinial}>
            <sphereGeometry args={[0.14, 14, 14]} />
          </mesh>
        </group>
      )}

      {/* Hanging porch lantern */}
      <group ref={lanternRef} position={[0.7, 1.7, (isCenter ? 2.2 : 1.6) / 2 + 0.35]}>
        <mesh position={[0, 0.12, 0]} material={materials.timberBeam}>
          <cylinderGeometry args={[0.015, 0.015, 0.25, 4]} />
        </mesh>
        <mesh position={[0, 0, 0]} material={materials.doorGlowGold}>
          <boxGeometry args={[0.2, 0.25, 0.2]} />
        </mesh>
        <pointLight color="#ffa502" intensity={1.8} distance={2.8} />
      </group>

      {/* Hover feedback */}
      {isHovered && (
        <pointLight position={[0, 2.2, 0]} color="#ffeaa7" intensity={5} distance={7} />
      )}
    </group>
  );
}
