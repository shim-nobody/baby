// src/components/3d/RealisticWaterfall3D.tsx — Volumetric Flowing Waterfall with Splash Mist
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Props {
  position: [number, number, number];
  rotationY?: number;
  width?: number;
  height?: number;
}

export function RealisticWaterfall3D({
  position,
  rotationY = 0,
  width = 0.9,
  height = 8.0,
}: Props) {
  const waterMeshRef = useRef<THREE.Mesh>(null);
  const foamMeshRef = useRef<THREE.Mesh>(null);
  const mistGroupRef = useRef<THREE.Group>(null);

  // Animated water flow with texture displacement & mist oscillation
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (waterMeshRef.current) {
      const mat = waterMeshRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.82 + Math.sin(t * 10) * 0.08;
    }
    if (foamMeshRef.current) {
      foamMeshRef.current.position.y = -height / 2 + Math.sin(t * 12) * 0.06;
      foamMeshRef.current.scale.x = 1 + Math.sin(t * 8) * 0.12;
      foamMeshRef.current.scale.y = 1 + Math.cos(t * 8) * 0.12;
    }
    if (mistGroupRef.current) {
      mistGroupRef.current.rotation.y = t * 0.35;
      mistGroupRef.current.position.y = -height / 2 + Math.sin(t * 2) * 0.1;
    }
  });

  const materials = useMemo(() => {
    return {
      waterStream: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#48cae4'),
        emissive: new THREE.Color('#0077b6'),
        emissiveIntensity: 0.7,
        transparent: true,
        opacity: 0.85,
        roughness: 0.1,
        metalness: 0.15,
      }),
      waterFoam: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#caf0f8'),
        emissive: new THREE.Color('#90e0ef'),
        emissiveIntensity: 0.85,
        transparent: true,
        opacity: 0.92,
        roughness: 0.35,
      }),
      mist: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#e0fbfc'),
        emissive: new THREE.Color('#90e0ef'),
        emissiveIntensity: 0.45,
        transparent: true,
        opacity: 0.3,
        roughness: 0.9,
      }),
    };
  }, []);

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* ── 1. UPPER CREST WATER OVERFLOW LIP (Curving over the cliff edge) ── */}
      <mesh position={[0, 0.15, -0.22]} rotation={[0.45, 0, 0]} material={materials.waterStream}>
        <cylinderGeometry args={[width / 2, width / 2, 0.45, 16, 1, false, 0, Math.PI]} />
      </mesh>

      {/* ── 2. VOLUMETRIC MAIN WATERFALL CURTAIN (Curved cylinder half, not a flat plane) ── */}
      <mesh ref={waterMeshRef} position={[0, -height / 2, 0]} castShadow material={materials.waterStream}>
        <cylinderGeometry args={[width / 2, width * 0.65, height, 16, 1, true, 0, Math.PI]} />
      </mesh>

      {/* Inner rushing water column with foam highlights */}
      <mesh position={[0, -height / 2, -0.08]} material={materials.waterFoam}>
        <cylinderGeometry args={[width * 0.35, width * 0.52, height * 0.98, 12, 1, true, 0, Math.PI]} />
      </mesh>

      {/* ── 3. BASE PLUNGE POOL SPLASH & FOAM RIPPLES ── */}
      <mesh ref={foamMeshRef} position={[0, -height / 2, 0.2]} rotation={[-Math.PI / 2, 0, 0]} material={materials.waterFoam}>
        <ringGeometry args={[width * 0.15, width * 1.5, 24]} />
      </mesh>

      {/* ── 4. SOFT RISING MIST CLOUD AT THE BASE ── */}
      <group ref={mistGroupRef} position={[0, -height / 2, 0.4]}>
        {[
          { pos: [-0.4, 0.1, 0], s: 0.55 },
          { pos: [0.35, 0.2, 0.1], s: 0.65 },
          { pos: [0, 0.35, -0.2], s: 0.75 },
          { pos: [-0.2, 0.5, 0.15], s: 0.5 },
        ].map((m, idx) => (
          <mesh key={idx} position={m.pos as [number, number, number]} scale={m.s} material={materials.mist}>
            <dodecahedronGeometry args={[1, 1]} />
          </mesh>
        ))}
      </group>

      {/* Ambient water reflection point light */}
      <pointLight position={[0, -height / 3, 0.5]} color="#00b4d8" intensity={1.8} distance={4} />
    </group>
  );
}
