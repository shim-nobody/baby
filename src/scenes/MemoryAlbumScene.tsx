// src/scenes/MemoryAlbumScene.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { PhotoFrame } from '../components/PhotoFrame';
import { PhotoViewer } from '../components/PhotoViewer';
import { FloatingParticles } from '../components/FloatingParticles';
import { photos } from '../config/photos';
import { photoAlbumTitle, photoAlbumSubtitle, photoCategories } from '../config/content';

interface MemoryAlbumSceneProps {
  onNext: () => void;
  onPrev: () => void;
}

const ROTATIONS = [-4, 2, -2, 5, -3, 4, -5, 3, -1, 4, -3, 2];
const PER_PAGE = 6;

export function MemoryAlbumScene({ onNext, onPrev }: MemoryAlbumSceneProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [galleryPage, setGalleryPage] = useState(0);

  const filtered = useMemo(() => {
    const src = activeCategory
      ? photos.filter((p) => p.category === activeCategory)
      : photos;
    return src.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  }, [activeCategory]);

  const totalGalleryPages = Math.ceil(filtered.length / PER_PAGE);
  const visiblePhotos = filtered.slice(
    galleryPage * PER_PAGE,
    (galleryPage + 1) * PER_PAGE
  );

  const openViewer = (index: number) => setViewerIndex(index);
  const closeViewer = () => setViewerIndex(null);

  const prevPhoto = () => {
    if (viewerIndex === null) return;
    setViewerIndex((i: number | null) => (i !== null && i > 0 ? i - 1 : filtered.length - 1));
  };
  const nextPhoto = () => {
    if (viewerIndex === null) return;
    setViewerIndex((i: number | null) => (i !== null && i < filtered.length - 1 ? i + 1 : 0));
  };

  return (
    <div
      className="fixed inset-0 flex flex-col items-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at top left, #FFF0F5 0%, #FFF5F7 70%, #FFE8F0 100%)',
      }}
    >
      <FloatingParticles opacity={0.2} />

      {/* Top decorative strip */}
      <div
        className="w-full h-1.5"
        style={{
          background: 'linear-gradient(90deg, #F8C8DC, #D4AF76, #E9789C, #D4AF76, #F8C8DC)',
          flexShrink: 0,
        }}
      />

      {/* Back button */}
      <div className="w-full max-w-5xl px-6 pt-4 flex items-center" style={{ flexShrink: 0 }}>
        <button
          onClick={onPrev}
          className="flex items-center gap-1.5 font-dm text-sm transition-all"
          style={{ color: '#B08090' }}
        >
          ← Back to Letter
        </button>
      </div>

      {/* Title */}
      <motion.div
        className="text-center px-6 pt-2 pb-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ flexShrink: 0 }}
      >
        <h1 className="font-playfair" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#C45C7A' }}>
          {photoAlbumTitle}
        </h1>
        <p className="font-dm text-sm mt-1 max-w-xl mx-auto" style={{ color: '#B08090', fontStyle: 'italic' }}>
          {photoAlbumSubtitle}
        </p>
      </motion.div>

      {/* Category filter tabs */}
      <div className="flex flex-wrap justify-center gap-2 px-6 pb-4" style={{ flexShrink: 0 }}>
        <button
          onClick={() => { setActiveCategory(null); setGalleryPage(0); }}
          className="px-4 py-1.5 rounded-full font-dm text-xs transition-all"
          style={{
            background: !activeCategory ? 'linear-gradient(135deg, #E9789C, #C45C7A)' : 'rgba(248,200,220,0.4)',
            color: !activeCategory ? '#fff' : '#C45C7A',
            boxShadow: !activeCategory ? '0 2px 10px rgba(228,120,156,0.3)' : 'none',
          }}
        >
          All Memories ❤️
        </button>
        {photoCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setGalleryPage(0); }}
            className="px-4 py-1.5 rounded-full font-dm text-xs transition-all"
            style={{
              background: activeCategory === cat ? 'linear-gradient(135deg, #E9789C, #C45C7A)' : 'rgba(248,200,220,0.4)',
              color: activeCategory === cat ? '#fff' : '#C45C7A',
              boxShadow: activeCategory === cat ? '0 2px 10px rgba(228,120,156,0.3)' : 'none',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Photo grid */}
      <div
        className="flex-1 w-full max-w-5xl px-6 overflow-y-auto"
        style={{ minHeight: 0 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${galleryPage}`}
            className="grid gap-6 pb-4"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(165px, 1fr))' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {visiblePhotos.map((photo, i) => (
              <div key={photo.id} className="flex justify-center">
                <PhotoFrame
                  photo={photo}
                  rotation={ROTATIONS[i % ROTATIONS.length]}
                  onClick={() => openViewer(filtered.indexOf(photo))}
                  delay={i}
                />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {totalGalleryPages > 1 && (
          <div className="flex justify-center gap-3 pb-4">
            <button
              onClick={() => setGalleryPage((p: number) => Math.max(0, p - 1))}
              disabled={galleryPage === 0}
              className="px-4 py-1.5 rounded-full font-dm text-xs disabled:opacity-30"
              style={{ background: '#F8C8DC', color: '#C45C7A' }}
            >
              ← Prev
            </button>
            <span className="font-dm text-xs self-center" style={{ color: '#B08090' }}>
              {galleryPage + 1} / {totalGalleryPages}
            </span>
            <button
              onClick={() => setGalleryPage((p: number) => Math.min(totalGalleryPages - 1, p + 1))}
              disabled={galleryPage === totalGalleryPages - 1}
              className="px-4 py-1.5 rounded-full font-dm text-xs disabled:opacity-30"
              style={{ background: '#F8C8DC', color: '#C45C7A' }}
            >
              Next →
            </button>
          </div>
        )}
      </div>

      {/* Bottom action bar */}
      <div
        className="w-full flex justify-center items-center gap-6 py-4 border-t"
        style={{ borderColor: '#F8C8DC', flexShrink: 0, background: 'rgba(255,250,247,0.9)' }}
      >
        <button
          onClick={onPrev}
          className="px-6 py-2.5 rounded-full font-dm text-sm"
          style={{
            background: 'linear-gradient(135deg, #F8C8DC, #E9789C)',
            color: '#fff',
            boxShadow: '0 2px 10px rgba(228,120,156,0.3)',
          }}
        >
          ← Back to Letter
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2.5 rounded-full font-dm text-sm"
          style={{
            background: 'linear-gradient(135deg, #E9789C, #C45C7A)',
            color: '#fff',
            boxShadow: '0 2px 10px rgba(228,120,156,0.4)',
          }}
        >
          Continue Reading →
        </button>
      </div>

      {/* Photo viewer modal */}
      <PhotoViewer
        photo={viewerIndex !== null ? filtered[viewerIndex] : null}
        onClose={closeViewer}
        onPrev={prevPhoto}
        onNext={nextPhoto}
      />
    </div>
  );
}
