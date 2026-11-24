// src/components/3d/WaterfallAndPond3D.tsx — Animated Cascading Waterfall and Mountain Pond
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Props {
  onSelectWaterfall?: () => void;
  isHovered?: boolean;
}

export function WaterfallAndPond3D({ onSelectWaterfall, isHovered }: Props) {
  const waterfallMeshRef = useRef<THREE.Mesh>(null);
  const pondMeshRef = useRef<THREE.Mesh>(null);
  const splashRef = useRef<THREE.Mesh>(null);

  // Animated water shimmer & flow
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (waterfallMeshRef.current) {
      // Subtle pulse and texture shift simulation
      const mat = waterfallMeshRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.8 + Math.sin(t * 8) * 0.1;
    }
    if (pondMeshRef.current) {
      pondMeshRef.current.position.y = 0.38 + Math.sin(t * 1.5) * 0.015;
    }
    if (splashRef.current) {
      splashRef.current.scale.set(
        1 + Math.sin(t * 10) * 0.15,
        1,
        1 + Math.cos(t * 10) * 0.15
      );
    }
  });

  const materials = useMemo(() => {
    return {
      waterfall: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#48cae4'),
        emissive: new THREE.Color('#0077b6'),
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.85,
        roughness: 0.1,
        metalness: 0.2,
      }),
      pondWater: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#0077b6'),
        emissive: new THREE.Color('#023e8a'),
        emissiveIntensity: 0.35,
        transparent: true,
        opacity: 0.82,
        roughness: 0.15,
        metalness: 0.3,
      }),
      foamSplash: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#caf0f8'),
        emissive: new THREE.Color('#90e0ef'),
        emissiveIntensity: 0.6,
        transparent: true,
        opacity: 0.85,
        roughness: 0.4,
      }),
      lilypad: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#2d6a4f'),
        roughness: 0.8,
      }),
      lotusPink: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ffaec8'),
        emissive: new THREE.Color('#f59abb'),
        emissiveIntensity: 0.5,
      }),
    };
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {/* ── 1. CASCADING WATERFALL (LEFT CLIFF FACE) ── */}
      <group
        position={[-3.2, 1.6, 0.4]}
        rotation={[0, 0.15, 0.08]}
        onClick={onSelectWaterfall}
        cursor={onSelectWaterfall ? 'pointer' : undefined}
      >
        {/* Waterfall water stream curtain */}
        <mesh ref={waterfallMeshRef} castShadow material={materials.waterfall}>
          <boxGeometry args={[1.2, 2.8, 0.25]} />
        </mesh>
        {/* Waterfall upper crest curve */}
        <mesh position={[0, 1.45, -0.3]} rotation={[0.45, 0, 0]} material={materials.waterfall}>
          <boxGeometry args={[1.15, 0.4, 0.6]} />
        </mesh>
        {/* Foaming splash pool at base */}
        <mesh ref={splashRef} position={[0, -1.35, 0.2]} material={materials.foamSplash}>
          <cylinderGeometry args={[0.95, 0.7, 0.25, 12]} />
        </mesh>
        {/* Light glow on water */}
        <pointLight position={[0, -0.8, 0.5]} color="#48cae4" intensity={2.2} distance={3.8} />
      </group>

      {/* ── 2. CRYSTAL CELESTIAL POND SURFACE ── */}
      <group position={[-1.2, 0, 2.2]}>
        {/* Pond Water Mesh */}
        <mesh ref={pondMeshRef} position={[0, 0.38, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={materials.pondWater}>
          <planeGeometry args={[3.8, 2.6, 16, 16]} />
        </mesh>

        {/* Floating Lilypads and Lotus Flowers */}
        {[
          { pos: [-0.8, 0.4, -0.4], rot: 0.2, r: 0.3 },
          { pos: [0.6, 0.4, 0.3], rot: -0.5, r: 0.35 },
          { pos: [-0.2, 0.4, 0.6], rot: 0.8, r: 0.28 },
          { pos: [1.1, 0.4, -0.6], rot: -0.2, r: 0.32 },
        ].map((pad, idx) => (
          <group key={idx} position={pad.pos as [number, number, number]} rotation={[0, pad.rot, 0]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} material={materials.lilypad}>
              <circleGeometry args={[pad.r, 12]} />
            </mesh>
            {/* Pink lotus flower on pad */}
            <mesh position={[0, 0.06, 0]} material={materials.lotusPink}>
              <coneGeometry args={[0.09, 0.12, 6]} />
            </mesh>
          </group>
        ))}

        {/* Pond underwater turquoise illumination */}
        <pointLight position={[0, 0.2, 0]} color="#00b4d8" intensity={1.8} distance={4.5} />
      </group>

      {/* Hover beacon */}
      {isHovered && (
        <pointLight position={[-3.2, 1.8, 0.4]} color="#caf0f8" intensity={3.5} distance={5} />
      )}
    </group>
  );
}

