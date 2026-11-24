// src/components/3d/Cottage3D.tsx — Two-Story Japanese Romantic Cottage (Inspired by Reference Image 1)
import { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useCursor } from '@react-three/drei';
import * as THREE from 'three';

interface Props {
  onSelect?: () => void;
  isHovered?: boolean;
}

export function Cottage3D({ onSelect, isHovered }: Props) {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered && Boolean(onSelect));

  const lightRef = useRef<THREE.PointLight>(null);

  // Gentle flickering of the warm interior candle/lantern light
  useFrame((state) => {
    if (lightRef.current) {
      const t = state.clock.getElapsedTime();
      lightRef.current.intensity = 4.2 + Math.sin(t * 4.5) * 0.4 + Math.cos(t * 7.2) * 0.25;
    }
  });

  const materials = useMemo(() => {
    return {
      timberDark: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#382319'),
        roughness: 0.8,
        metalness: 0.05,
      }),
      timberPillars: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#4d3224'),
        roughness: 0.75,
        metalness: 0.05,
      }),
      wallPlaster: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#f5eedc'),
        roughness: 0.9,
      }),
      shojiLit: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ffe2a8'),
        emissive: new THREE.Color('#ffb75e'),
        emissiveIntensity: 1.8,
        roughness: 0.3,
      }),
      roofTile: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#223838'),
        roughness: 0.55,
        metalness: 0.15,
        flatShading: true,
      }),
      roofRidge: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#162626'),
        roughness: 0.6,
      }),
      chimneyStone: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#3d3844'),
        roughness: 0.85,
        flatShading: true,
      }),
      deckPlanks: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#5c3d2e'),
        roughness: 0.7,
      }),
    };
  }, []);

  return (
    <group
      position={[-0.8, 1.9, -1.2]}
      rotation={[0, 0.32, 0]}
      onClick={onSelect}
      onPointerOver={onSelect ? (e) => { e.stopPropagation(); setHovered(true); } : undefined}
      onPointerOut={onSelect ? () => setHovered(false) : undefined}
    >
      {/* ── 1. GROUND FLOOR BASE & VERANDA DECK ── */}
      {/* Raised wooden deck */}
      <mesh position={[0, 0.1, 0.4]} castShadow receiveShadow material={materials.deckPlanks}>
        <boxGeometry args={[3.2, 0.2, 3.2]} />
      </mesh>
      {/* Foundation stone pillars under deck */}
      {[-1.4, 0, 1.4].map((x, i) =>
        [-1.4, 1.4].map((z, j) => (
          <mesh key={`${i}-${j}`} position={[x, -0.15, z]} castShadow material={materials.timberDark}>
            <boxGeometry args={[0.2, 0.35, 0.2]} />
          </mesh>
        ))
      )}

      {/* Ground floor main walls */}
      <mesh position={[0, 0.9, 0]} castShadow receiveShadow material={materials.wallPlaster}>
        <boxGeometry args={[2.5, 1.4, 2.2]} />
      </mesh>

      {/* Timber Corner Pillars */}
      {[-1.25, 1.25].map((x, i) =>
        [-1.1, 1.1].map((z, j) => (
          <mesh key={`p-${i}-${j}`} position={[x, 0.9, z]} castShadow material={materials.timberPillars}>
            <boxGeometry args={[0.18, 1.45, 0.18]} />
          </mesh>
        ))
      )}

      {/* ── 2. GLOWING SHOJI SCREEN WINDOWS (FRONT & SIDES) ── */}
      {/* Front sliding shoji screens (open to warm interior) */}
      <mesh position={[-0.6, 0.85, 1.12]} material={materials.shojiLit}>
        <boxGeometry args={[0.9, 1.1, 0.05]} />
      </mesh>
      <mesh position={[0.6, 0.85, 1.12]} material={materials.shojiLit}>
        <boxGeometry args={[0.9, 1.1, 0.05]} />
      </mesh>
      {/* Right side window */}
      <mesh position={[1.27, 0.9, 0]} rotation={[0, Math.PI / 2, 0]} material={materials.shojiLit}>
        <boxGeometry args={[1.2, 0.9, 0.05]} />
      </mesh>

      {/* Shoji Wood Lattices */}
      <mesh position={[-0.6, 0.85, 1.15]} material={materials.timberDark}>
        <boxGeometry args={[0.95, 0.05, 0.02]} />
      </mesh>
      <mesh position={[0.6, 0.85, 1.15]} material={materials.timberDark}>
        <boxGeometry args={[0.95, 0.05, 0.02]} />
      </mesh>

      {/* Warm Interior Lighting radiating outwards */}
      <pointLight
        ref={lightRef}
        position={[0, 1.0, 0.3]}
        color="#ff9d42"
        intensity={4.5}
        distance={7.5}
        decay={2}
        castShadow
        shadow-bias={-0.002}
      />
      {/* Soft exterior porch illumination */}
      <pointLight position={[0, 1.2, 1.4]} color="#ffb75e" intensity={1.8} distance={3.5} />

      {/* ── 3. MID-TIER AWNING ROOF SEPARATING FLOORS ── */}
      <mesh position={[0, 1.65, 0.2]} rotation={[0.08, 0, 0]} castShadow receiveShadow material={materials.roofTile}>
        <boxGeometry args={[3.4, 0.2, 3.2]} />
      </mesh>
      <mesh position={[0, 1.76, 0.2]} material={materials.roofRidge}>
        <boxGeometry args={[3.45, 0.08, 0.15]} />
      </mesh>

      {/* ── 4. UPPER FLOOR & BALCONY ── */}
      <mesh position={[0, 2.3, -0.1]} castShadow receiveShadow material={materials.wallPlaster}>
        <boxGeometry args={[2.2, 1.2, 1.9]} />
      </mesh>

      {/* Upper floor balcony railing */}
      <mesh position={[0, 2.05, 0.95]} castShadow material={materials.timberPillars}>
        <boxGeometry args={[2.2, 0.45, 0.08]} />
      </mesh>

      {/* Upper floor illuminated shoji window */}
      <mesh position={[0, 2.35, 0.86]} material={materials.shojiLit}>
        <boxGeometry args={[1.3, 0.8, 0.05]} />
      </mesh>

      {/* ── 5. MAIN TILED GABLED JAPANESE ROOF ── */}
      <group position={[0, 3.0, -0.1]}>
        {/* Slanted left roof plane */}
        <mesh position={[-0.85, 0.35, 0]} rotation={[0, 0, 0.52]} castShadow receiveShadow material={materials.roofTile}>
          <boxGeometry args={[2.1, 0.18, 2.6]} />
        </mesh>
        {/* Slanted right roof plane */}
        <mesh position={[0.85, 0.35, 0]} rotation={[0, 0, -0.52]} castShadow receiveShadow material={materials.roofTile}>
          <boxGeometry args={[2.1, 0.18, 2.6]} />
        </mesh>
        {/* Main roof central ridge beam */}
        <mesh position={[0, 0.95, 0]} material={materials.roofRidge}>
          <boxGeometry args={[0.3, 0.22, 2.75]} />
        </mesh>
      </group>

      {/* ── 6. STONE CHIMNEY & ROOF ACCENTS ── */}
      <mesh position={[0.85, 3.3, -0.6]} castShadow material={materials.chimneyStone}>
        <boxGeometry args={[0.35, 1.2, 0.35]} />
      </mesh>

      {/* Hover outline ring / starlight beacon */}
      {isHovered && (
        <mesh position={[0, 2.0, 0]}>
          <ringGeometry args={[2.4, 2.45, 32]} />
          <meshBasicMaterial color="#e8c88d" side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
}
