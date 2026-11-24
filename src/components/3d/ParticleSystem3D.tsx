// src/components/3d/ParticleSystem3D.tsx — Falling Cherry Blossom Petals & Golden Fireflies
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function ParticleSystem3D() {
  const petalsCount = 65;
  const firefliesCount = 25;

  const petalsRef = useRef<THREE.InstancedMesh>(null);
  const firefliesRef = useRef<THREE.InstancedMesh>(null);

  // Initialize petals random positions & velocities
  const petalData = useMemo(() => {
    return Array.from({ length: petalsCount }, () => ({
      x: (Math.random() - 0.4) * 9,
      y: 2 + Math.random() * 6,
      z: (Math.random() - 0.4) * 9,
      speedY: 0.012 + Math.random() * 0.02,
      swaySpeed: 1 + Math.random() * 2,
      rotSpeed: (Math.random() - 0.5) * 0.04,
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
    }));
  }, [petalsCount]);

  // Initialize fireflies
  const fireflyData = useMemo(() => {
    return Array.from({ length: firefliesCount }, () => ({
      baseX: (Math.random() - 0.5) * 7,
      baseY: 0.8 + Math.random() * 2.5,
      baseZ: (Math.random() - 0.5) * 7,
      speed: 0.8 + Math.random() * 1.5,
      offset: Math.random() * Math.PI * 2,
    }));
  }, [firefliesCount]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Update Petals
    if (petalsRef.current) {
      petalData.forEach((p, i) => {
        p.y -= p.speedY;
        if (p.y < -3.5) {
          p.y = 7 + Math.random() * 2;
          p.x = (Math.random() - 0.4) * 9;
          p.z = (Math.random() - 0.4) * 9;
        }

        dummy.position.set(
          p.x + Math.sin(t * p.swaySpeed + i) * 0.4,
          p.y,
          p.z + Math.cos(t * p.swaySpeed + i) * 0.35
        );
        p.rotation[0] += p.rotSpeed;
        p.rotation[1] += p.rotSpeed * 1.5;
        dummy.rotation.set(p.rotation[0], p.rotation[1], p.rotation[2]);
        dummy.scale.set(0.12, 0.03, 0.16);
        dummy.updateMatrix();

        petalsRef.current!.setMatrixAt(i, dummy.matrix);
      });
      petalsRef.current.instanceMatrix.needsUpdate = true;
    }

    // Update Fireflies
    if (firefliesRef.current) {
      fireflyData.forEach((f, i) => {
        dummy.position.set(
          f.baseX + Math.sin(t * f.speed + f.offset) * 0.6,
          f.baseY + Math.cos(t * f.speed * 0.8 + f.offset) * 0.4,
          f.baseZ + Math.cos(t * f.speed + f.offset) * 0.6
        );
        const s = 0.05 + Math.sin(t * 4 + f.offset) * 0.025;
        dummy.scale.set(s, s, s);
        dummy.updateMatrix();

        firefliesRef.current!.setMatrixAt(i, dummy.matrix);
      });
      firefliesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* ── 1. FALLING SAKURA BLOSSOM PETALS ── */}
      <instancedMesh ref={petalsRef} args={[undefined, undefined, petalsCount]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#ffaec8"
          emissive="#f59abb"
          emissiveIntensity={0.35}
          roughness={0.7}
        />
      </instancedMesh>

      {/* ── 2. GLOWING GOLDEN FIREFLIES ── */}
      <instancedMesh ref={firefliesRef} args={[undefined, undefined, firefliesCount]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#ffe299" />
      </instancedMesh>
    </group>
  );
}

