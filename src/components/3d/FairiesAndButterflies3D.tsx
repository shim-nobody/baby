// src/components/3d/FairiesAndButterflies3D.tsx — Flying Winged Fairies & Golden Butterflies
// Matched directly to the reference image artwork
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function FairiesAndButterflies3D() {
  const fairy1Ref = useRef<THREE.Group>(null);
  const fairy2Ref = useRef<THREE.Group>(null);
  const butterfliesRef = useRef<THREE.Group>(null);

  // Orbiting flight paths & fluttering wings
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Fairy 1 (flying near left moon & center cottage)
    if (fairy1Ref.current) {
      fairy1Ref.current.position.x = -2.8 + Math.cos(t * 0.7) * 2.2;
      fairy1Ref.current.position.y = 4.2 + Math.sin(t * 1.2) * 0.6;
      fairy1Ref.current.position.z = 1.2 + Math.sin(t * 0.7) * 1.8;
      fairy1Ref.current.rotation.y = -t * 0.7 + Math.PI / 2;
    }

    // Fairy 2 (flying between right cottage & center)
    if (fairy2Ref.current) {
      fairy2Ref.current.position.x = 3.2 + Math.sin(t * 0.6) * 2.5;
      fairy2Ref.current.position.y = 4.6 + Math.cos(t * 0.9) * 0.5;
      fairy2Ref.current.position.z = -0.5 + Math.cos(t * 0.6) * 1.6;
      fairy2Ref.current.rotation.y = t * 0.6 - Math.PI / 2;
    }

    // Butterflies flutter
    if (butterfliesRef.current) {
      butterfliesRef.current.position.y = Math.sin(t * 2) * 0.15;
    }
  });

  const materials = useMemo(() => {
    return {
      fairySkin: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ffe0bd'),
        roughness: 0.5,
      }),
      fairyDressPink: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ff4d6d'),
        emissive: new THREE.Color('#c9184a'),
        emissiveIntensity: 0.5,
      }),
      fairyHair: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#b04a28'),
        roughness: 0.6,
      }),
      fairyWings: new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#caf0f8'),
        emissive: new THREE.Color('#90e0ef'),
        emissiveIntensity: 0.8,
        transparent: true,
        opacity: 0.75,
        roughness: 0.1,
        transmission: 0.6,
        clearcoat: 1.0,
      }),
      butterflyGold: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#ffb703'),
        emissive: new THREE.Color('#fd9e02'),
        emissiveIntensity: 0.9,
      }),
    };
  }, []);

  return (
    <group>
      {/* ── 1. FLYING FAIRY 1 (Left sky) ── */}
      <group ref={fairy1Ref} position={[-2.8, 4.2, 1.2]} scale={0.45}>
        {/* Head */}
        <mesh position={[0, 0.45, 0]} material={materials.fairySkin}>
          <sphereGeometry args={[0.2, 12, 12]} />
        </mesh>
        {/* Hair */}
        <mesh position={[0, 0.52, -0.06]} material={materials.fairyHair}>
          <sphereGeometry args={[0.22, 10, 10]} />
        </mesh>
        {/* Dress */}
        <mesh position={[0, 0.1, 0]} material={materials.fairyDressPink}>
          <coneGeometry args={[0.25, 0.55, 10]} />
        </mesh>
        {/* Glowing Translucent Wings */}
        <group position={[0, 0.25, -0.15]}>
          <mesh position={[-0.32, 0.2, 0]} rotation={[0, 0.3, -0.3]} material={materials.fairyWings}>
            <coneGeometry args={[0.25, 0.7, 3]} />
          </mesh>
          <mesh position={[0.32, 0.2, 0]} rotation={[0, -0.3, 0.3]} material={materials.fairyWings}>
            <coneGeometry args={[0.25, 0.7, 3]} />
          </mesh>
        </group>
        {/* Fairy Starlight Aura Light */}
        <pointLight color="#90e0ef" intensity={1.8} distance={3.5} />
      </group>

      {/* ── 2. FLYING FAIRY 2 (Right sky) ── */}
      <group ref={fairy2Ref} position={[3.2, 4.6, -0.5]} scale={0.42}>
        {/* Head */}
        <mesh position={[0, 0.45, 0]} material={materials.fairySkin}>
          <sphereGeometry args={[0.2, 12, 12]} />
        </mesh>
        {/* Hair */}
        <mesh position={[0, 0.52, -0.06]} material={materials.fairyHair}>
          <sphereGeometry args={[0.22, 10, 10]} />
        </mesh>
        {/* Dress */}
        <mesh position={[0, 0.1, 0]} material={materials.fairyDressPink}>
          <coneGeometry args={[0.25, 0.55, 10]} />
        </mesh>
        {/* Wings */}
        <group position={[0, 0.25, -0.15]}>
          <mesh position={[-0.32, 0.2, 0]} rotation={[0, 0.3, -0.3]} material={materials.fairyWings}>
            <coneGeometry args={[0.25, 0.7, 3]} />
          </mesh>
          <mesh position={[0.32, 0.2, 0]} rotation={[0, -0.3, 0.3]} material={materials.fairyWings}>
            <coneGeometry args={[0.25, 0.7, 3]} />
          </mesh>
        </group>
        <pointLight color="#ffa502" intensity={1.8} distance={3.5} />
      </group>

      {/* ── 3. FLUTTERING GOLDEN BUTTERFLIES ── */}
      <group ref={butterfliesRef}>
        {[
          { pos: [-1.2, 2.2, 2.2], rot: [0.2, 0.4, 0] },
          { pos: [1.8, 1.8, 2.5], rot: [-0.1, 0.8, 0] },
          { pos: [3.4, 2.8, -0.4], rot: [0.3, -0.5, 0] },
          { pos: [-4.2, 3.2, -1.2], rot: [0.1, 0.6, 0] },
        ].map((b, idx) => (
          <group key={`bf-${idx}`} position={b.pos as [number, number, number]} rotation={b.rot as [number, number, number]} scale={0.15}>
            {/* Left wing */}
            <mesh position={[-0.35, 0, 0]} rotation={[0, 0.4, 0]} material={materials.butterflyGold}>
              <boxGeometry args={[0.6, 0.04, 0.45]} />
            </mesh>
            {/* Right wing */}
            <mesh position={[0.35, 0, 0]} rotation={[0, -0.4, 0]} material={materials.butterflyGold}>
              <boxGeometry args={[0.6, 0.04, 0.45]} />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]} material={materials.butterflyGold}>
              <cylinderGeometry args={[0.06, 0.06, 0.4, 4]} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
