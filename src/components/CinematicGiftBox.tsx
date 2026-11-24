// src/components/CinematicGiftBox.tsx — Luxurious 3D-Styled Gift from Captain
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onOpened: () => void;
}

export function CinematicGiftBox({ onOpened }: Props) {
  const [openingState, setOpeningState] = useState<'idle' | 'unlocking' | 'opening' | 'unveiling'>('idle');

  const handleOpen = () => {
    if (openingState !== 'idle') return;
    setOpeningState('unlocking');

    // Sequence timing
    setTimeout(() => setOpeningState('opening'), 800);
    setTimeout(() => setOpeningState('unveiling'), 1600);
    setTimeout(() => onOpened(), 2600);
  };

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      {/* Dynamic Backlight Halo */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 420,
          height: 420,
          background: 'radial-gradient(circle, rgba(232,200,141,0.22) 0%, rgba(52,36,84,0.3) 45%, transparent 70%)',
        }}
        animate={{
          scale: openingState === 'idle' ? [1, 1.1, 1] : [1, 1.5, 2.5],
          opacity: openingState === 'idle' ? [0.6, 0.9, 0.6] : [0.9, 1, 0],
        }}
        transition={{ duration: 4, repeat: openingState === 'idle' ? Infinity : 0, ease: 'easeInOut' }}
      />

      {/* Floating Realistic Gift Box */}
      <motion.div
        className="relative cursor-pointer group"
        onClick={handleOpen}
        animate={
          openingState === 'idle'
            ? { y: [0, -14, 0], rotateZ: [-1, 1, -1] }
            : openingState === 'unlocking'
            ? { scale: [1, 1.05, 1], y: -10 }
            : { y: 20, scale: 0.95 }
        }
        transition={{ duration: 4.5, repeat: openingState === 'idle' ? Infinity : 0, ease: 'easeInOut' }}
      >
        {/* Soft realistic cast shadow on ground */}
        <motion.div
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
          style={{
            width: 240,
            height: 35,
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.7) 0%, rgba(7,11,26,0.3) 60%, transparent 80%)',
          }}
          animate={
            openingState === 'idle'
              ? { scale: [1, 0.85, 1], opacity: [0.7, 0.5, 0.7] }
              : { scale: 0.5, opacity: 0 }
          }
          transition={{ duration: 4.5, repeat: openingState === 'idle' ? Infinity : 0 }}
        />

        {/* ── GIFT BOX STRUCTURE ── */}
        <div className="relative w-64 h-60" style={{ perspective: '1000px' }}>
          
          {/* Box Body */}
          <div
            className="absolute bottom-0 left-0 right-0 h-44 rounded-xl overflow-hidden shadow-2xl"
            style={{
              background: 'linear-gradient(145deg, #382458 0%, #26163F 60%, #170B2B 100%)',
              border: '1.5px solid rgba(232, 200, 141, 0.35)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.85), inset 0 2px 4px rgba(255,255,255,0.15)',
            }}
          >
            {/* Subtle Royal Velvet Damask Texture */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, #E8C88D 1px, transparent 1px)',
                backgroundSize: '16px 16px',
              }}
            />

            {/* Vertical Pink Satin Ribbon */}
            <div
              className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-10 shadow-lg"
              style={{
                background: 'linear-gradient(90deg, #C26888 0%, #F59ABB 45%, #FFAEC8 55%, #C26888 100%)',
                boxShadow: 'inset 0 0 8px rgba(0,0,0,0.3)',
              }}
            >
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-white/40" />
            </div>

            {/* Horizontal Pink Satin Ribbon */}
            <div
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-10 shadow-lg"
              style={{
                background: 'linear-gradient(180deg, #C26888 0%, #F59ABB 45%, #FFAEC8 55%, #C26888 100%)',
                boxShadow: 'inset 0 0 8px rgba(0,0,0,0.3)',
              }}
            >
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-white/40" />
            </div>

            {/* Gold Filigree Corner Accents */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-champagnegold/60 rounded-tl" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-champagnegold/60 rounded-tr" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-champagnegold/60 rounded-bl" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-champagnegold/60 rounded-br" />
          </div>

          {/* Box Lid with 3D Tilt when opening */}
          <motion.div
            className="absolute top-4 -left-2 -right-2 h-16 rounded-xl overflow-hidden z-20"
            style={{
              background: 'linear-gradient(145deg, #442D6B 0%, #2E1B4E 70%, #1D1033 100%)',
              border: '2px solid rgba(232, 200, 141, 0.5)',
              boxShadow: '0 12px 30px rgba(0,0,0,0.6), inset 0 2px 5px rgba(255,255,255,0.25)',
              transformOrigin: 'top center',
            }}
            animate={
              openingState === 'opening' || openingState === 'unveiling'
                ? { y: -80, rotateX: -110, opacity: 0 }
                : { y: 0, rotateX: 0, opacity: 1 }
            }
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Satin Ribbon cross on lid */}
            <div
              className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-10"
              style={{
                background: 'linear-gradient(90deg, #C26888 0%, #F59ABB 45%, #FFAEC8 55%, #C26888 100%)',
              }}
            />
            <div
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-8"
              style={{
                background: 'linear-gradient(180deg, #C26888 0%, #F59ABB 45%, #FFAEC8 55%, #C26888 100%)',
              }}
            />
          </motion.div>

          {/* Double Satin Bow on top of lid */}
          <motion.div
            className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center pointer-events-none"
            animate={
              openingState === 'opening' || openingState === 'unveiling'
                ? { y: -100, scale: 0.5, opacity: 0 }
                : { scale: [1, 1.04, 1] }
            }
            transition={{ duration: 3, repeat: openingState === 'idle' ? Infinity : 0 }}
          >
            <svg width="120" height="70" viewBox="0 0 120 70" fill="none">
              {/* Left loop */}
              <path
                d="M60 35 C40 10, 10 15, 20 38 C28 55, 55 42, 60 35 Z"
                fill="url(#satinGrad1)"
                stroke="#C26888"
                strokeWidth="1.5"
                filter="drop-shadow(0 4px 6px rgba(0,0,0,0.3))"
              />
              {/* Right loop */}
              <path
                d="M60 35 C80 10, 110 15, 100 38 C92 55, 65 42, 60 35 Z"
                fill="url(#satinGrad2)"
                stroke="#C26888"
                strokeWidth="1.5"
                filter="drop-shadow(0 4px 6px rgba(0,0,0,0.3))"
              />
              {/* Ribbon knot & tails */}
              <ellipse cx="60" cy="35" rx="9" ry="8" fill="#F59ABB" stroke="#E8C88D" strokeWidth="1.5" />
              <path d="M56 42 Q45 65 35 68" stroke="#F59ABB" strokeWidth="5" strokeLinecap="round" />
              <path d="M64 42 Q75 65 85 68" stroke="#F59ABB" strokeWidth="5" strokeLinecap="round" />
              <defs>
                <linearGradient id="satinGrad1" x1="0" y1="0" x2="60" y2="60" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FFAEC8" />
                  <stop offset="0.5" stopColor="#F59ABB" />
                  <stop offset="1" stopColor="#C26888" />
                </linearGradient>
                <linearGradient id="satinGrad2" x1="120" y1="0" x2="60" y2="60" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FFAEC8" />
                  <stop offset="0.5" stopColor="#F59ABB" />
                  <stop offset="1" stopColor="#C26888" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Golden Heart Lock (Center Front) */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center cursor-pointer"
            animate={
              openingState === 'unlocking'
                ? { scale: [1, 1.3, 1.1], rotate: [0, -10, 10, 0] }
                : openingState === 'opening' || openingState === 'unveiling'
                ? { scale: 0, opacity: 0 }
                : {}
            }
            transition={{ duration: 0.6 }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl relative"
              style={{
                background: 'radial-gradient(circle at 35% 35%, #FFF6EE, #E8C88D 55%, #A87A36 100%)',
                boxShadow:
                  openingState === 'unlocking'
                    ? '0 0 35px rgba(232,200,141,1), 0 0 60px rgba(245,154,187,0.8)'
                    : '0 4px 15px rgba(0,0,0,0.5), 0 0 20px rgba(232,200,141,0.5)',
                border: '1.5px solid #FFF6EE',
              }}
            >
              <span className="text-xl select-none">💖</span>
            </div>
          </motion.div>
        </div>

        {/* ── UNVEILING: MINIATURE EXPANDING GALAXY / ISLAND SPHERE ── */}
        <AnimatePresence>
          {openingState === 'unveiling' && (
            <motion.div
              className="absolute top-10 left-1/2 -translate-x-1/2 z-40 rounded-full flex items-center justify-center pointer-events-none"
              style={{
                width: 140,
                height: 140,
                background: 'radial-gradient(circle at 35% 35%, #FFF6EE 0%, #F4B8A4 30%, #342454 75%, #0B1026 100%)',
                boxShadow: '0 0 80px rgba(232,200,141,0.9), 0 0 140px rgba(244,184,164,0.6)',
              }}
              initial={{ scale: 0.1, y: 50, opacity: 0 }}
              animate={{ scale: 4.5, y: -80, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="text-6xl animate-spin" style={{ animationDuration: '20s' }}>
                ✨
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

