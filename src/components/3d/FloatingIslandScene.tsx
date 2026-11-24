// src/components/3d/FloatingIslandScene.tsx — The Complete 3D Floating Fairy Archipelago
// Matched directly to the user's reference image artwork
import { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Html } from '@react-three/drei';
import * as THREE from 'three';

import { CentralIsland3D } from './CentralIsland3D';
import { SatelliteIsland3D } from './SatelliteIsland3D';
import { RopeBridge3D } from './RopeBridge3D';
import { LotusFlowers3D } from './LotusFlowers3D';
import { FairiesAndButterflies3D } from './FairiesAndButterflies3D';
import { DoubleMoonsAndSky3D } from './DoubleMoonsAndSky3D';

interface Props {
  onSelectLandmark: (landmark: string) => void;
}

function IslandArchipelagoGroup({
  onSelectLandmark,
  hovered,
  setHovered,
}: {
  onSelectLandmark: (lm: string) => void;
  hovered: string | null;
  setHovered: (lm: string | null) => void;
}) {
  const archipelagoRef = useRef<THREE.Group>(null);

  // Subtle natural floating bob of the entire archipelago
  useFrame((state) => {
    if (archipelagoRef.current) {
      const t = state.clock.getElapsedTime();
      archipelagoRef.current.position.y = Math.sin(t * 0.6) * 0.12;
    }
  });

  return (
    <group ref={archipelagoRef} position={[0, -0.2, 0]}>
      {/* ── 1. CENTRAL MAIN FLOATING ISLAND ── */}
      <group
        onPointerOver={(e) => { e.stopPropagation(); setHovered('cottage'); }}
        onPointerOut={() => setHovered(null)}
      >
        <CentralIsland3D
          onSelectCottage={() => onSelectLandmark('cottage')}
          isCottageHovered={hovered === 'cottage'}
        />
        {hovered === 'cottage' && (
          <Html position={[0, 4.2, 0]} center distanceFactor={18}>
            <div className="glass-cinematic px-3.5 py-1.5 rounded-full text-xs font-playfair text-champagnegold whitespace-nowrap shadow-xl border border-champagnegold animate-bounce pointer-events-none font-bold">
              🏡 Chapter 1: The Boy Who Loved Silence
            </div>
          </Html>
        )}
      </group>

      {/* ── 2. UPPER LEFT SATELLITE ISLAND (With Red Cottage & Waterfall) ── */}
      <group
        onPointerOver={(e) => { e.stopPropagation(); setHovered('tree'); }}
        onPointerOut={() => setHovered(null)}
      >
        <SatelliteIsland3D
          position={[-7.2, 2.4, -2.2]}
          scale={0.92}
          rotationY={0.35}
          hasCottage={true}
          cottageVariant="left"
          hasWaterfall={true}
          waterfallOffset={[0.8, 0.15, 1.3]}
          onSelect={() => onSelectLandmark('tree')}
          isHovered={hovered === 'tree'}
          seed={4}
        />
        {hovered === 'tree' && (
          <Html position={[-7.2, 5.0, -2.2]} center distanceFactor={18}>
            <div className="glass-cinematic px-3.5 py-1.5 rounded-full text-xs font-playfair text-dustyrose whitespace-nowrap shadow-xl border border-dustyrose animate-bounce pointer-events-none font-bold">
              🌸 Chapter 2: The Smile Under the Tree
            </div>
          </Html>
        )}
      </group>

      {/* ── 3. UPPER RIGHT SATELLITE ISLAND (With Red Cottage & Cyan Door) ── */}
      <group
        onPointerOver={(e) => { e.stopPropagation(); setHovered('waterfall'); }}
        onPointerOut={() => setHovered(null)}
      >
        <SatelliteIsland3D
          position={[7.2, 2.4, -2.2]}
          scale={0.92}
          rotationY={-0.35}
          hasCottage={true}
          cottageVariant="right"
          hasWaterfall={true}
          waterfallOffset={[-0.8, 0.15, 1.3]}
          onSelect={() => onSelectLandmark('waterfall')}
          isHovered={hovered === 'waterfall'}
          seed={6}
        />
        {hovered === 'waterfall' && (
          <Html position={[7.2, 5.0, -2.2]} center distanceFactor={18}>
            <div className="glass-cinematic px-3.5 py-1.5 rounded-full text-xs font-playfair text-streamBlue whitespace-nowrap shadow-xl border border-streamBlue animate-bounce pointer-events-none font-bold">
              🌊 Chapter 5: The Girl Who Brought Sunshine
            </div>
          </Html>
        )}
      </group>

      {/* ── 4. LOWER RIGHT FOREGROUND ISLAND (With Waterfall & Bridge Landing) ── */}
      <SatelliteIsland3D
        position={[6.2, -2.6, 3.4]}
        scale={0.88}
        rotationY={-0.2}
        hasCottage={false}
        hasWaterfall={true}
        waterfallOffset={[-0.6, 0.1, 1.0]}
        seed={7}
      />

      {/* ── 5. LOWER LEFT FOREGROUND ISLAND (With Waterfall) ── */}
      <SatelliteIsland3D
        position={[-6.2, -2.6, 3.4]}
        scale={0.88}
        rotationY={0.2}
        hasCottage={false}
        hasWaterfall={true}
        waterfallOffset={[0.6, 0.1, 1.0]}
        seed={8}
      />

      {/* ── 6. CONNECTING CATENARY WOODEN ROPE BRIDGES ── */}
      {/* Bridge 1: Center Island to Left Island */}
      <group
        onPointerOver={(e) => { e.stopPropagation(); setHovered('bridge'); }}
        onPointerOut={() => setHovered(null)}
      >
        <RopeBridge3D
          start={[-3.3, 0.45, -0.2]}
          end={[-5.8, 2.3, -1.8]}
          planksCount={14}
          sag={0.35}
          onSelect={() => onSelectLandmark('bridge')}
          isHovered={hovered === 'bridge'}
        />
        {hovered === 'bridge' && (
          <Html position={[-4.5, 1.8, -1.0]} center distanceFactor={18}>
            <div className="glass-cinematic px-3 py-1.5 rounded-full text-xs font-playfair text-warmpeach whitespace-nowrap shadow-xl border border-warmpeach animate-bounce pointer-events-none font-bold">
              🏮 Chapter 3: The Moment You Chose Me
            </div>
          </Html>
        )}
      </group>

      {/* Bridge 2: Center Island to Right Island */}
      <RopeBridge3D
        start={[3.3, 0.45, -0.2]}
        end={[5.8, 2.3, -1.8]}
        planksCount={14}
        sag={0.35}
        onSelect={() => onSelectLandmark('bridge')}
      />

      {/* Bridge 3: Center Island sloping down to Lower Right Island */}
      <RopeBridge3D
        start={[2.6, 0.45, 2.4]}
        end={[5.2, -2.1, 3.2]}
        planksCount={16}
        sag={0.4}
        onSelect={() => onSelectLandmark('bridge')}
      />

      {/* ── 7. GIANT VIBRANT BLOOMING LOTUS FLOWERS & LILIES ── */}
      <group
        onPointerOver={(e) => { e.stopPropagation(); setHovered('garden'); }}
        onPointerOut={() => setHovered(null)}
      >
        {/* Center Island Front Flowers */}
        <LotusFlowers3D
          position={[-2.8, 0.55, 2.2]}
          scale={1.15}
          type="pink"
          onSelect={() => onSelectLandmark('garden')}
          isHovered={hovered === 'garden'}
        />
        <LotusFlowers3D
          position={[2.4, 0.55, 1.8]}
          scale={1.1}
          type="magenta"
          onSelect={() => onSelectLandmark('garden')}
        />
        <LotusFlowers3D
          position={[-1.5, 0.55, 3.2]}
          scale={1.05}
          type="orange"
          onSelect={() => onSelectLandmark('garden')}
        />
        <LotusFlowers3D
          position={[1.5, 0.55, 3.1]}
          scale={1.05}
          type="cyan"
          onSelect={() => onSelectLandmark('garden')}
        />

        {/* Foreground Giant Blooming Lotus (Just like the reference image) */}
        <LotusFlowers3D position={[-5.0, -2.4, 4.0]} scale={1.4} type="pink" />
        <LotusFlowers3D position={[-4.0, -2.5, 4.4]} scale={1.2} type="blue" />
        <LotusFlowers3D position={[4.6, -2.4, 4.0]} scale={1.4} type="orange" />
        <LotusFlowers3D position={[5.6, -2.5, 4.4]} scale={1.2} type="magenta" />

        {hovered === 'garden' && (
          <Html position={[0, 1.6, 3.2]} center distanceFactor={18}>
            <div className="glass-cinematic px-3.5 py-1.5 rounded-full text-xs font-playfair text-champagnegold whitespace-nowrap shadow-xl border border-champagnegold animate-bounce pointer-events-none font-bold">
              💌 Chapter 4: The Little Things
            </div>
          </Html>
        )}
      </group>

      {/* ── 8. FLYING FAIRY CHARACTERS & FLUTTERING BUTTERFLIES ── */}
      <FairiesAndButterflies3D />

      {/* ── 9. DUAL CELESTIAL MOONS & CLOUDS (Chapter 7) ── */}
      <group
        onPointerOver={(e) => { e.stopPropagation(); setHovered('moon'); }}
        onPointerOut={() => setHovered(null)}
      >
        <DoubleMoonsAndSky3D
          onSelectMoon={() => onSelectLandmark('moon')}
          isHovered={hovered === 'moon'}
        />
        {hovered === 'moon' && (
          <Html position={[-6.2, 10.8, -9]} center distanceFactor={22}>
            <div className="glass-cinematic px-3.5 py-1.5 rounded-full text-xs font-playfair text-champagnegold whitespace-nowrap shadow-xl border border-champagnegold animate-bounce pointer-events-none font-bold">
              🌕 Chapter 7: Every Tomorrow, With You
            </div>
          </Html>
        )}
      </group>
    </group>
  );
}

export function FloatingIslandScene({ onSelectLandmark }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative w-full h-full">
      <Canvas
        shadows
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        {/* Isometric Three-Quarter Camera Positioned to Frame the Complete Archipelago */}
        <PerspectiveCamera makeDefault fov={42} position={[0, 3.6, 17.0]} />

        {/* OrbitControls to explore the real 3D depth */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={10}
          maxDistance={24}
          minPolarAngle={Math.PI / 4.5}
          maxPolarAngle={Math.PI / 2.05}
          dampingFactor={0.06}
          rotateSpeed={0.5}
        />

        {/* ── ATMOSPHERIC FAIRY-TALE CINEMATIC LIGHTING (Matching Reference Art) ── */}
        <ambientLight color="#2e5077" intensity={1.9} />

        {/* Key Moonlight from Left Large Moon */}
        <directionalLight
          position={[-8, 16, 6]}
          color="#d8f3dc"
          intensity={2.4}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0005}
        />

        {/* Secondary Luminous Light from Right Moon */}
        <directionalLight
          position={[8, 14, -6]}
          color="#caf0f8"
          intensity={1.9}
        />

        {/* Warm fill glow from center cottage */}
        <pointLight position={[0, 2.2, 2]} color="#ffa502" intensity={3.0} distance={9} />

        {/* Twilight Atmosphere Fog matching the reference blue sky */}
        <fog attach="fog" args={['#0e2a4a', 15, 38]} />

        {/* The Complete 3D Floating Archipelago */}
        <Suspense fallback={null}>
          <IslandArchipelagoGroup
            onSelectLandmark={onSelectLandmark}
            hovered={hovered}
            setHovered={setHovered}
          />
        </Suspense>
      </Canvas>

      {/* Orbit & Interaction Hint at bottom center */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 glass-cinematic px-5 py-2 rounded-full pointer-events-none z-20 flex items-center gap-2 border border-champagnegold/40 shadow-xl">
        <span className="text-champagnegold text-xs">✨</span>
        <span className="font-dm text-xs text-softIvory/90">
          Drag to rotate 3D camera • Click cottages, bridges, lotuses or moons to explore our story
        </span>
      </div>
    </div>
  );
}
