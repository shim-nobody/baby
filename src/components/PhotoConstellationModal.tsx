// src/components/PhotoConstellationModal.tsx — Inspired by Reference Image 3
// Hanging polaroids on starry celestial clothesline with wooden pins and ribbons
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { photos, PhotoItem } from '../config/photos';

interface Props {
  onClose: () => void;
}

export function PhotoConstellationModal({ onClose }: Props) {
  const [activePhoto, setActivePhoto] = useState<PhotoItem | null>(null);
  const [photoErrors, setPhotoErrors] = useState<Record<number, boolean>>({});

  const handleImageError = (id: number) => {
    setPhotoErrors(prev => ({ ...prev, [id]: true }));
  };

  const handleNextPhoto = () => {
    if (!activePhoto) return;
    const currIdx = photos.findIndex(p => p.id === activePhoto.id);
    const nextIdx = (currIdx + 1) % photos.length;
    setActivePhoto(photos[nextIdx]);
  };

  const handlePrevPhoto = () => {
    if (!activePhoto) return;
    const currIdx = photos.findIndex(p => p.id === activePhoto.id);
    const prevIdx = (currIdx - 1 + photos.length) % photos.length;
    setActivePhoto(photos[prevIdx]);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-between overflow-hidden p-4 sm:p-6 select-none"
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, #15224D 0%, #0B1026 70%, #040714 100%)',
      }}
    >
      {/* ── TOP HEADER ── */}
      <div className="w-full max-w-5xl flex items-center justify-between z-20">
        <div>
          <span className="font-dm text-xs uppercase tracking-widest text-champagnegold/80 block">
            Chapter 6 • Visual Memories
          </span>
          <h2 className="font-vibes text-3xl sm:text-4xl text-rose-gradient">
            Little Moments, Big Feelings
          </h2>
          <p className="font-dm text-xs text-softIvory/70">
            Every picture reminds me of another reason I'm grateful for you.
          </p>
        </div>

        <button
          onClick={onClose}
          className="glass-cinematic px-5 py-2 rounded-full font-dm text-xs text-softIvory hover:border-champagnegold/60 transition-all cursor-pointer flex items-center gap-1.5 shadow-lg"
        >
          ✕ Return to Island
        </button>
      </div>

      {/* ── CELESTIAL CLOTHESLINE WITH HANGING POLAROIDS (Inspired by Image 3) ── */}
      <div className="relative w-full max-w-5xl flex-1 flex flex-col justify-center my-3 overflow-y-auto overflow-x-hidden">
        {/* Curved clothesline ropes */}
        <div className="relative w-full py-6">
          <svg className="absolute top-8 inset-x-0 w-full h-24 pointer-events-none opacity-40">
            <path d="M 0 35 Q 250 75 500 45 Q 750 15 1000 55" fill="none" stroke="#E8C88D" strokeWidth="2" strokeDasharray="6 4" />
          </svg>

          {/* Grid / Row of hanging polaroids */}
          <div className="flex flex-wrap justify-center gap-6 relative z-10 px-4">
            {photos.map((photo, idx) => {
              const rotation = [-4, 3, -2, 5, -3, 2, -4][idx % 7];
              const isError = photoErrors[photo.id];

              return (
                <motion.div
                  key={photo.id}
                  className="flex flex-col items-center cursor-pointer group"
                  style={{ rotate: rotation }}
                  whileHover={{ scale: 1.08, rotate: 0, zIndex: 30 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActivePhoto(photo)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06 }}
                >
                  {/* Wooden clothes pin / peg (Reference Image 3) */}
                  <div
                    className="w-4 h-7 rounded-t-sm shadow-md z-10 -mb-2 flex flex-col items-center justify-between py-0.5"
                    style={{ background: '#C29B53', border: '1px solid #A87D38' }}
                  >
                    <div className="w-full h-1 bg-black/40 mt-1" />
                    <div className="text-[10px] -mt-1 text-champagnegold">🎀</div>
                  </div>

                  {/* Polaroid Frame */}
                  <div
                    className="p-2 pb-2 rounded-sm shadow-2xl transition-all"
                    style={{
                      width: 155,
                      background: '#FFFDF9',
                      border: '1px solid rgba(232, 200, 141, 0.4)',
                      boxShadow: '0 12px 30px rgba(0,0,0,0.6), 0 0 15px rgba(217, 143, 168, 0.15)',
                    }}
                  >
                    {/* Picture area */}
                    <div
                      className="w-full h-36 rounded-xs overflow-hidden flex items-center justify-center relative shadow-inner"
                      style={{ background: 'linear-gradient(135deg, #1C1233 0%, #2A1B4A 100%)' }}
                    >
                      {!isError ? (
                        <img
                          src={photo.src}
                          alt="Memory"
                          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                          onError={() => handleImageError(photo.id)}
                        />
                      ) : (
                        <div className="flex flex-col items-center p-3 text-center">
                          <span className="text-2xl mb-1">💑</span>
                          <p className="font-playfair text-[10px] text-champagnegold font-medium leading-tight">
                            Memory #{photo.id}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── EXPANDED FULL-SCREEN LIGHTBOX MODAL ── */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            style={{ background: 'rgba(5, 7, 20, 0.94)', backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhoto(null)}
          >
            <motion.div
              className="relative max-w-lg w-full p-4 sm:p-6 rounded-2xl shadow-2xl flex flex-col items-center my-auto"
              style={{
                background: '#FFFDF9',
                border: '2px solid rgba(232, 200, 141, 0.7)',
                boxShadow: '0 30px 80px rgba(0,0,0,0.95), 0 0 50px rgba(232, 200, 141, 0.35)',
              }}
              initial={{ scale: 0.88, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.88, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full text-midnight font-bold hover:bg-black/10 transition-colors cursor-pointer"
              >
                ✕ Close
              </button>

              {/* Large Image container (object-contain to preserve couple faces perfectly) */}
              <div
                className="w-full h-[55vh] max-h-[460px] rounded-xl overflow-hidden flex items-center justify-center relative shadow-inner my-2"
                style={{ background: 'linear-gradient(135deg, #1C1233 0%, #2A1B4A 100%)' }}
              >
                {!photoErrors[activePhoto.id] ? (
                  <img
                    src={activePhoto.src}
                    alt="Memory"
                    className="w-full h-full object-contain"
                    onError={() => handleImageError(activePhoto.id)}
                  />
                ) : (
                  <div className="flex flex-col items-center p-8 text-center">
                    <span className="text-6xl mb-3">💑</span>
                    <h3 className="font-playfair text-xl text-champagnegold font-semibold">
                      Our Romantic Memory #{activePhoto.id}
                    </h3>
                  </div>
                )}
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center justify-between w-full mt-4 pt-3 border-t border-[#E8C88D]/40">
                <button
                  onClick={handlePrevPhoto}
                  className="px-4 py-1.5 rounded-full text-xs font-dm font-semibold text-[#342454] hover:bg-black/5 cursor-pointer"
                >
                  ← Previous Memory
                </button>
                <span className="font-dm text-xs text-[#8A5A36]">
                  {activePhoto.id} of {photos.length}
                </span>
                <button
                  onClick={handleNextPhoto}
                  className="px-4 py-1.5 rounded-full text-xs font-dm font-semibold text-[#342454] hover:bg-black/5 cursor-pointer"
                >
                  Next Memory →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
