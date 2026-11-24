// src/scenes/UniverseScene.tsx — The Universe Where I Found You (Main 3D Interactive World)
import { useState } from 'react';
import { StarField } from '../components/StarField';
import { MusicControl } from '../components/MusicControl';
import { FloatingIslandScene } from '../components/3d/FloatingIslandScene';
import { StoryChapterViewer } from '../components/StoryChapterViewer';
import { PhotoConstellationModal } from '../components/PhotoConstellationModal';
import { FinalHeartVaultModal } from '../components/FinalHeartVaultModal';
import { META } from '../config/content';

interface Props {
  onOpenCelebration: () => void;
}

export function UniverseScene({ onOpenCelebration }: Props) {
  const [activeChapterId, setActiveChapterId] = useState<number | null>(null);
  const [showConstellation, setShowConstellation] = useState<boolean>(false);
  const [showHeartVault, setShowHeartVault] = useState<boolean>(false);

  const handleLandmarkSelect = (landmark: string) => {
    switch (landmark) {
      case 'cottage':
        setActiveChapterId(1);
        break;
      case 'tree':
        setActiveChapterId(2);
        break;
      case 'bridge':
        setActiveChapterId(3);
        break;
      case 'garden':
        setActiveChapterId(4);
        break;
      case 'waterfall':
        setActiveChapterId(5);
        break;
      case 'constellation':
        setShowConstellation(true);
        break;
      case 'moon':
        setActiveChapterId(7);
        break;
      case 'vault':
        setShowHeartVault(true);
        break;
      default:
        setActiveChapterId(1);
    }
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center select-none"
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, #173d6b 0%, #0d2748 55%, #07172b 100%)',
      }}
    >
      {/* Background Deep Starfield */}
      <StarField count={180} />

      {/* Top Header Title */}
      <div className="absolute top-6 left-8 z-20 flex flex-col pointer-events-none">
        <span className="font-dm text-[11px] uppercase tracking-widest text-champagnegold/80 font-semibold">
          {META.occasion}
        </span>
        <h1 className="font-vibes text-3xl md:text-4xl text-rose-gradient">
          {META.title}
        </h1>
        <p className="font-dm text-xs text-softIvory/70">
          {META.subtitle}
        </p>
      </div>

      {/* Top Right Quick Actions (Memory Constellation & Heart Vault) */}
      <div className="absolute top-6 right-8 z-20 flex items-center gap-3">
        <button
          onClick={() => setShowConstellation(true)}
          className="glass-cinematic px-4 py-2 rounded-full font-dm text-xs text-softIvory hover:border-champagnegold/60 transition-all flex items-center gap-1.5 shadow-lg cursor-pointer"
        >
          <span>✨</span>
          <span>Our Constellation</span>
        </button>

        <button
          onClick={() => setShowHeartVault(true)}
          className="glass-cinematic px-4 py-2 rounded-full font-dm text-xs text-champagnegold hover:border-champagnegold/60 transition-all flex items-center gap-1.5 shadow-lg cursor-pointer border border-champagnegold/40"
        >
          <span>💝</span>
          <span>The Heart Vault</span>
        </button>
      </div>

      <MusicControl />

      {/* ── REAL 3D FLOATING FANTASY ISLAND CANVAS ── */}
      <FloatingIslandScene onSelectLandmark={handleLandmarkSelect} />

      {/* ── MODALS / DEDICATED EXPERIENCES ── */}
      {/* Story Chapter Viewer for Chapters 1, 2, 3, 4, 5, 7 */}
      {activeChapterId !== null && (
        <StoryChapterViewer
          initialChapterId={activeChapterId}
          onClose={() => setActiveChapterId(null)}
          onOpenVault={() => {
            setActiveChapterId(null);
            setShowHeartVault(true);
          }}
        />
      )}

      {/* Photo Constellation for Chapter 6 */}
      {showConstellation && (
        <PhotoConstellationModal
          onClose={() => setShowConstellation(false)}
        />
      )}

      {/* Final Heart Vault Love Letter Modal */}
      {showHeartVault && (
        <FinalHeartVaultModal
          onProceedToCelebration={() => {
            setShowHeartVault(false);
            onOpenCelebration();
          }}
          onClose={() => setShowHeartVault(false)}
        />
      )}
    </div>
  );
}
