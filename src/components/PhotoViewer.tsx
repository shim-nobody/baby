// src/components/PhotoViewer.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { PhotoEntry } from '../config/photos';

interface PhotoViewerProps {
  photo: PhotoEntry | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function PhotoViewer({ photo, onClose, onPrev, onNext }: PhotoViewerProps) {
  const [imageError, setImageError] = useState(false);
  const [heartsVisible, setHeartsVisible] = useState(false);

  const handleImageLoad = () => {
    setHeartsVisible(true);
    setTimeout(() => setHeartsVisible(false), 1800);
  };

  return (
    <AnimatePresence>
      {photo && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{ background: 'rgba(73,51,59,0.85)', backdropFilter: 'blur(8px)' }}
          />

          {/* Floating hearts burst */}
          <AnimatePresence>
            {heartsVisible &&
              Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-2xl pointer-events-none select-none"
                  style={{ zIndex: 60 }}
                  initial={{
                    opacity: 1,
                    x: (Math.random() - 0.5) * 60,
                    y: 0,
                    scale: 0,
                  }}
                  animate={{
                    opacity: 0,
                    y: -(80 + Math.random() * 100),
                    scale: 1.5,
                  }}
                  transition={{ duration: 1.2 + Math.random() * 0.5, delay: i * 0.08 }}
                >
                  {['❤️', '💕', '💗', '🩷'][Math.floor(Math.random() * 4)]}
                </motion.div>
              ))}
          </AnimatePresence>

          {/* Photo card */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Polaroid large frame */}
            <div
              className="relative rounded-sm shadow-2xl"
              style={{
                background: '#FFFDF8',
                padding: '16px 16px 60px 16px',
                maxWidth: '70vw',
                maxHeight: '70vh',
              }}
            >
              <div
                style={{
                  maxWidth: '65vw',
                  maxHeight: '55vh',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#FFF0F5',
                  minWidth: 300,
                  minHeight: 220,
                }}
              >
                {!imageError ? (
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '55vh' }}
                    onError={() => setImageError(true)}
                    onLoad={handleImageLoad}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-12">
                    <span className="text-6xl mb-4">💕</span>
                    <p className="font-dm text-sm" style={{ color: '#C45C7A' }}>
                      Our photo goes here
                    </p>
                  </div>
                )}
              </div>

              {/* Caption area */}
              <div className="absolute bottom-4 left-0 right-0 text-center px-4">
                <p className="font-vibes" style={{ fontSize: '1.4rem', color: '#C45C7A' }}>
                  {photo.caption}
                </p>
                {photo.date && (
                  <p className="font-dm text-xs mt-1" style={{ color: '#B08090' }}>
                    {photo.date}
                  </p>
                )}
                <div className="flex justify-center gap-1 mt-1">
                  <span className="text-sm select-none">🩷</span>
                  <span className="text-xs" style={{ color: '#D4AF76' }}>{photo.category}</span>
                  <span className="text-sm select-none">🩷</span>
                </div>
              </div>
            </div>

            {/* Nav row */}
            <div className="flex items-center gap-6 mt-6">
              <button
                onClick={onPrev}
                className="px-5 py-2.5 rounded-full font-dm text-sm transition-all"
                style={{
                  background: 'linear-gradient(135deg, #F8C8DC, #E9789C)',
                  color: '#fff',
                  boxShadow: '0 4px 16px rgba(228,120,156,0.4)',
                }}
              >
                ← Prev
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-full font-dm text-sm"
                style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }}
              >
                ✕ Close
              </button>
              <button
                onClick={onNext}
                className="px-5 py-2.5 rounded-full font-dm text-sm transition-all"
                style={{
                  background: 'linear-gradient(135deg, #E9789C, #C45C7A)',
                  color: '#fff',
                  boxShadow: '0 4px 16px rgba(228,120,156,0.4)',
                }}
              >
                Next →
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

