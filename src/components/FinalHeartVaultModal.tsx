// src/components/FinalHeartVaultModal.tsx — Final Love Letter (Styled with reference Image 2: Illuminated Open Tome)
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { finalLoveLetter } from '../config/content';

interface Props {
  onProceedToCelebration: () => void;
  onClose: () => void;
}

export function FinalHeartVaultModal({ onProceedToCelebration, onClose }: Props) {
  const [opened, setOpened] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, #291B42 0%, #0B1026 70%, #03050F 100%)',
      }}
    >
      {/* ── TOP CLOSE BUTTON ── */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-30 glass-cinematic px-4 py-1.5 rounded-full font-dm text-xs text-softIvory/80 hover:text-white"
      >
        ✕ Return to Island
      </button>

      {/* Floating Ethereal Cursive Stardust (Inspired by reference Image 2) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 opacity-70">
        <svg className="w-full h-full">
          <path
            d="M 150 650 Q 350 400 500 350 T 850 150"
            fill="none"
            stroke="url(#glowStardust)"
            strokeWidth="3"
            filter="drop-shadow(0 0 10px #E8C88D)"
            strokeDasharray="8 6"
            className="animate-pulse"
          />
          <defs>
            <linearGradient id="glowStardust" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D98FA8" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#E8C88D" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FFF6EE" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {!opened ? (
        /* ── STEP 1: GLOWING FLOATING GLASS HEART VAULT ── */
        <motion.div
          className="flex flex-col items-center text-center z-20 cursor-pointer"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          onClick={() => setOpened(true)}
        >
          <div className="relative mb-6">
            {/* Pulsing Aura */}
            <motion.div
              className="absolute -inset-10 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(232,200,141,0.3) 0%, rgba(217,143,168,0.2) 50%, transparent 70%)',
              }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Glass Heart */}
            <motion.div
              className="w-36 h-36 rounded-full glass-cinematic flex items-center justify-center relative shadow-2xl border-2 border-champagnegold/60"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-6xl drop-shadow-[0_0_20px_#E8C88D]">💝</span>
            </motion.div>
          </div>

          <h2 className="font-playfair text-2xl md:text-3xl text-gold-gradient font-bold mb-2">
            The Heart Vault
          </h2>
          <p className="font-dm text-sm text-softIvory/80 max-w-sm mb-6">
            Inside rests Captain's full anniversary love letter, written with everything in his heart.
          </p>

          <button
            className="px-8 py-3 rounded-full font-dm text-sm font-semibold text-midnight shadow-2xl cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #FFF6EE 0%, #E8C88D 50%, #F4B8A4 100%)',
              boxShadow: '0 4px 25px rgba(232, 200, 141, 0.6)',
            }}
          >
            Unlock & Read Love Letter ✨
          </button>
        </motion.div>
      ) : (
        /* ── STEP 2: ILLUMINATED OPEN LETTER / TOME (Inspired by Image 2) ── */
        <AnimatePresence>
          <motion.div
            className="relative w-full max-w-3xl glass-parchment rounded-3xl p-8 md:p-12 shadow-2xl z-20 overflow-y-auto"
            style={{ maxHeight: 'calc(100vh - 100px)' }}
            initial={{ scale: 0.7, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 20 }}
          >
            {/* Decorative Corner Ornaments (Quill & Violet Flower like Image 2) */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E8C88D]/40">
              <div className="flex items-center gap-2">
                <span className="text-2xl select-none">🪶</span>
                <span className="font-dm text-xs uppercase tracking-widest text-[#9A783A] font-semibold">
                  Handwritten by Captain
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-dm text-xs text-[#7D3E53]">To My Chubby</span>
                <span className="text-2xl select-none">🌸</span>
              </div>
            </div>

            {/* Letter Title */}
            <div className="text-center my-4">
              <h2 className="font-vibes text-4xl md:text-5xl text-[#342454] leading-snug">
                {finalLoveLetter.title}
              </h2>
              <p className="font-playfair text-lg text-[#7D3E53] italic font-medium mt-1">
                {finalLoveLetter.greeting}
              </p>
              <div className="w-20 h-0.5 bg-[#E8C88D] mx-auto mt-2 rounded-full" />
            </div>

            {/* Complete Uncut Letter Paragraphs */}
            <div className="space-y-4 my-6">
              {finalLoveLetter.paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  className="font-dm text-sm md:text-base text-[#49333B] leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Signoff */}
            <div className="text-right mt-8 pt-4 border-t border-[#E8C88D]/40">
              <p className="font-playfair text-base text-[#342454] italic font-semibold whitespace-pre-line">
                {finalLoveLetter.signoff}
              </p>
            </div>

            {/* Final Celebration Trigger */}
            <div className="flex justify-center mt-8">
              <motion.button
                onClick={onProceedToCelebration}
                className="px-9 py-3.5 rounded-full font-dm text-sm font-semibold text-midnight shadow-2xl cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #FFF6EE 0%, #E8C88D 50%, #F4B8A4 100%)',
                  boxShadow: '0 4px 30px rgba(232, 200, 141, 0.7)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                One Last Surprise, Baby 🎁
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

