// src/components/3d/OrganicIslandMesh.tsx — Procedurally Sculpted Natural Island Landmass
import { useMemo } from 'react';
import * as THREE from 'three';

interface Props {
  radius?: number;
  depth?: number;
  heightVariation?: number;
  rockColor?: string;
  grassColor?: string;
  seed?: number;
}

export function createOrganicIslandGeometry(
  radius: number = 4.4,
  depth: number = 4.2,
  heightVariation: number = 0.5,
  seed: number = 1
) {
  // High-density cylinder for procedural sculpting
  const radSegs = 56;
  const heightSegs = 28;
  const geo = new THREE.CylinderGeometry(radius, radius * 0.92, depth, radSegs, heightSegs, false);
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();

  // Pseudo-random noise function based on coordinates
  const noise = (x: number, y: number, z: number) => {
    return (
      Math.sin(x * 1.8 + seed * 2.3) * Math.cos(z * 1.8 + seed) +
      0.5 * Math.sin(x * 3.4 - y * 2.1) +
      0.3 * Math.cos(z * 4.2 + y * 3.1)
    );
  };

  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);

    const angle = Math.atan2(v.z, v.x);
    const distFromCenter = Math.sqrt(v.x * v.x + v.z * v.z);
    const normDist = Math.min(1, distFromCenter / radius);

    // Natural multi-frequency perimeter perturbation (so island is not a perfect circle)
    const perimeterPerturb =
      1 +
      0.16 * Math.sin(angle * 3 + seed * 1.7) +
      0.10 * Math.cos(angle * 5 + seed * 2.1) +
      0.06 * Math.sin(angle * 7 - seed) +
      0.04 * Math.cos(angle * 11 + seed * 3.4);

    if (v.y > 0) {
      // ── Top Grassy Surface ──
      // Gentle natural rolling hills, highest near rear-center, sloping gently toward front waterfall edges
      const hillMound =
        (1 - Math.pow(normDist, 1.6) * 0.65) * heightVariation +
        0.18 * Math.sin(v.x * 0.9 + seed) * Math.cos(v.z * 0.9) +
        0.10 * noise(v.x, 0, v.z);

      v.y += hillMound;

      // Soft natural perimeter roll-off
      v.x *= perimeterPerturb;
      v.z *= perimeterPerturb;
    } else {
      // ── Rocky Underside & Stalactite ──
      const depthFactor = -v.y / (depth / 2); // 0 at waist, 1 at bottom tip

      // Craggy, multi-tiered rock strata taper
      const naturalTaper = Math.max(0.06, Math.pow(1 - depthFactor * 0.88, 1.45));

      // Organic rock bumps, vertical fissures and crags
      const cragDisplacement =
        0.22 * Math.sin(angle * 6 + depthFactor * 5) +
        0.15 * Math.cos(angle * 8 - depthFactor * 7) +
        0.08 * Math.sin(depthFactor * 16) +
        0.12 * noise(v.x * 1.5, v.y * 1.5, v.z * 1.5);

      v.x *= naturalTaper * (perimeterPerturb + cragDisplacement);
      v.z *= naturalTaper * (perimeterPerturb + cragDisplacement);

      // Deep tapered stalactite needle extending downward
      if (depthFactor > 0.75) {
        v.y -= 0.8 * (depthFactor - 0.75);
      }
    }

    pos.setXYZ(i, v.x, v.y, v.z);
  }

  geo.computeVertexNormals();
  return geo;
}

export function OrganicIslandMesh({
  radius = 4.4,
  depth = 4.2,
  heightVariation = 0.5,
  rockColor = '#1e2430',
  grassColor = '#3a8e3a',
  seed = 1,
}: Props) {
  const geometry = useMemo(
    () => createOrganicIslandGeometry(radius, depth, heightVariation, seed),
    [radius, depth, heightVariation, seed]
  );

  const materials = useMemo(() => {
    return [
      // Side material: Layered natural dark slate rock with crags
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(rockColor),
        roughness: 0.92,
        metalness: 0.12,
        flatShading: false,
      }),
      // Top material: Lush vibrant velvety moss & grass
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(grassColor),
        roughness: 0.72,
        metalness: 0.04,
        flatShading: false,
      }),
      // Bottom material: Deep shadow stalactite rock
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#10141b'),
        roughness: 0.95,
        metalness: 0.18,
      }),
    ];
  }, [rockColor, grassColor]);

  return (
    <mesh
      geometry={geometry}
      material={materials}
      castShadow
      receiveShadow
    />
  );
}
