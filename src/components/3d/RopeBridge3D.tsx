// src/components/3d/RopeBridge3D.tsx — Suspended Wooden Plank Rope Bridge
import { useMemo, useState } from 'react';
import { useCursor } from '@react-three/drei';
import * as THREE from 'three';

interface Props {
  start: [number, number, number];
  end: [number, number, number];
  planksCount?: number;
  sag?: number;
  onSelect?: () => void;
  isHovered?: boolean;
}

export function RopeBridge3D({
  start,
  end,
  planksCount = 12,
  sag = 0.4,
  onSelect,
  isHovered,
}: Props) {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered && Boolean(onSelect));

  const materials = useMemo(() => {
    return {
      woodPlank: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#5c3d2e'),
        roughness: 0.75,
        metalness: 0.1,
      }),
      rope: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#8d6e63'),
        roughness: 0.9,
      }),
    };
  }, []);

  // Compute curve points between start and end with natural sag
  const planks = useMemo(() => {
    const list: { pos: [number, number, number]; rot: [number, number, number] }[] = [];
    const pStart = new THREE.Vector3(...start);
    const pEnd = new THREE.Vector3(...end);

    for (let i = 0; i <= planksCount; i++) {
      const alpha = i / planksCount;
      const point = new THREE.Vector3().lerpVectors(pStart, pEnd, alpha);
      // Parabolic sag
      const sagOffset = Math.sin(alpha * Math.PI) * sag;
      point.y -= sagOffset;

      // Approximate rotation towards next point
      const nextAlpha = Math.min(1, alpha + 0.05);
      const nextPoint = new THREE.Vector3().lerpVectors(pStart, pEnd, nextAlpha);
      nextPoint.y -= Math.sin(nextAlpha * Math.PI) * sag;

      const dir = new THREE.Vector3().subVectors(nextPoint, point).normalize();
      const yaw = Math.atan2(dir.x, dir.z);
      const pitch = -Math.asin(dir.y);

      list.push({
        pos: [point.x, point.y, point.z],
        rot: [pitch, yaw, 0],
      });
    }
    return list;
  }, [start, end, planksCount, sag]);

  return (
    <group
      onClick={onSelect}
      onPointerOver={onSelect ? (e) => { e.stopPropagation(); setHovered(true); } : undefined}
      onPointerOut={onSelect ? () => setHovered(false) : undefined}
    >
      {/* Wooden Steps / Planks */}
      {planks.map((p, idx) => (
        <mesh
          key={idx}
          position={p.pos}
          rotation={p.rot}
          castShadow
          receiveShadow
          material={materials.woodPlank}
        >
          <boxGeometry args={[0.9, 0.08, 0.28]} />
        </mesh>
      ))}

      {/* Hover illumination */}
      {isHovered && (
        <pointLight
          position={[(start[0] + end[0]) / 2, (start[1] + end[1]) / 2, (start[2] + end[2]) / 2]}
          color="#ffb75e"
          intensity={3}
          distance={5}
        />
      )}
    </group>
  );
}
