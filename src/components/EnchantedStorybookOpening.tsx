// src/components/EnchantedStorybookOpening.tsx — Inspired directly by Reference Image 2
// An antique illuminated book with golden cursive light rising from the pages
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { META } from '../config/content';

interface Props {
  onOpenUniverse: () => void;
}

export function EnchantedStorybookOpening({ onOpenUniverse }: Props) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => {
      onOpenUniverse();
    }, 2000);
  };

  return (
    <div className="relative flex flex-col items-center justify-center select-none w-full max-w-4xl px-4">
      {/* ── 1. AMBIENT CELESTIAL BACKLIGHT HALO ── */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(232,200,141,0.25) 0%, rgba(217,143,168,0.18) 40%, transparent 70%)',
        }}
        animate={{
          scale: isOpening ? [1, 1.8, 3] : [1, 1.08, 1],
          opacity: isOpening ? [0.8, 1, 0] : [0.6, 0.9, 0.6],
        }}
        transition={{ duration: isOpening ? 2 : 5, repeat: isOpening ? 0 : Infinity, ease: 'easeInOut' }}
      />

      {/* ── 2. ETHEREAL SWIRLING GOLDEN CURSIVE LIGHT RIBBON (From Reference Image 2) ── */}
      <div className="absolute -top-36 inset-x-0 h-64 pointer-events-none overflow-visible z-30 flex items-center justify-center">
        <svg className="w-full h-full max-w-2xl overflow-visible" viewBox="0 0 700 250">
          <defs>
            <linearGradient id="goldScriptGlow" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D98FA8" stopOpacity="0.3" />
              <stop offset="40%" stopColor="#E8C88D" stopOpacity="1" />
              <stop offset="70%" stopColor="#FFF6EE" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#F4B8A4" stopOpacity="0.2" />
            </linearGradient>
            <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Golden luminous swirl wave */}
          <motion.path
            d="M 180 220 Q 250 140 350 160 T 520 80 Q 600 40 660 70"
            fill="none"
            stroke="url(#goldScriptGlow)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={300}
            filter="url(#glowFilter)"
            initial={{ strokeDashoffset: 300, opacity: 0 }}
            animate={{
              strokeDashoffset: [300, 0, -60],
              opacity: [0.4, 0.95, 0.6],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Glowing cursive romantic script in the light trail */}
          <motion.text
            x="320"
            y="135"
            fill="#FFF6EE"
            fontFamily="'Great Vibes', cursive"
            fontSize="26"
            filter="drop-shadow(0 0 8px #E8C88D)"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.6, 1, 0.7], y: [135, 130, 135] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            Two months of you, my forever...
          </motion.text>
        </svg>
      </div>

      {/* ── 3. THE ILLUMINATED ENCHANTED OPEN BOOK (From Reference Image 2) ── */}
      <motion.div
        className="relative z-20 cursor-pointer group"
        onClick={handleOpen}
        animate={
          isOpening
            ? { scale: [1, 1.05, 1.3], y: [0, -20, 80], opacity: [1, 1, 0] }
            : { y: [0, -8, 0] }
        }
        transition={{ duration: isOpening ? 2 : 4, repeat: isOpening ? 0 : Infinity, ease: 'easeInOut' }}
      >
        {/* Soft cast shadow on library mahogany desk */}
        <div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-4/5 h-12 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.7) 0%, rgba(11,16,38,0.2) 60%, transparent 80%)',
          }}
        />

        {/* The Open Book Structure */}
        <div
          className="relative w-[340px] sm:w-[480px] md:w-[620px] h-[280px] sm:h-[340px] md:h-[380px] rounded-2xl p-4 flex shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, #2c1a1d 0%, #1a0f12 50%, #2c1a1d 100%)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.85), 0 0 40px rgba(232, 200, 141, 0.25)',
            border: '2px solid rgba(232, 200, 141, 0.4)',
          }}
        >
          {/* Gold embossed corners */}
          <div className="absolute top-2 left-2 text-champagnegold text-sm opacity-80">⚜️</div>
          <div className="absolute top-2 right-2 text-champagnegold text-sm opacity-80">⚜️</div>
          <div className="absolute bottom-2 left-2 text-champagnegold text-sm opacity-80">⚜️</div>
          <div className="absolute bottom-2 right-2 text-champagnegold text-sm opacity-80">⚜️</div>

          {/* Left Aged Parchment Page */}
          <div
            className="flex-1 rounded-l-xl p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden"
            style={{
              background: 'linear-gradient(to right, #FFF8EB 0%, #FDF3DF 85%, #E8D6B8 100%)',
              borderRight: '1.5px solid rgba(138, 90, 54, 0.3)',
              boxShadow: 'inset 0 0 30px rgba(138, 90, 54, 0.15)',
            }}
          >
            {/* Page Header */}
            <div>
              <span className="font-dm text-[10px] sm:text-xs uppercase tracking-widest text-[#8A5A36] block font-semibold">
                {META.occasion}
              </span>
              <h2 className="font-playfair text-xl sm:text-2xl md:text-3xl text-[#342454] font-bold italic mt-1 leading-tight">
                To My Chubby
              </h2>
              <p className="font-dm text-[11px] sm:text-xs text-[#7D3E53] mt-1 font-medium">
                From Your Captain ❤️
              </p>
              <div className="w-12 h-0.5 bg-[#E8C88D] my-2 sm:my-3 rounded-full" />
            </div>

            {/* Poetic Opening Extract */}
            <p className="font-dm text-xs sm:text-sm text-[#49333B] leading-relaxed italic">
              "Somewhere in this vast universe, there is a little world suspended among clouds and double moons, created with every memory, smile, and moment that belongs only to us..."
            </p>

            {/* Decorative Quill / Wax Seal Icon on Left Corner */}
            <div className="flex items-center gap-2 pt-2 border-t border-[#8A5A36]/20">
              <span className="text-base">🪶</span>
              <span className="font-playfair italic text-[11px] sm:text-xs text-[#8A5A36]">
                Written with all my heart
              </span>
            </div>
          </div>

          {/* Right Aged Parchment Page */}
          <div
            className="flex-1 rounded-r-xl p-5 sm:p-7 flex flex-col justify-between items-center text-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(to left, #FFF8EB 0%, #FDF3DF 85%, #E8D6B8 100%)',
              borderLeft: '1.5px solid rgba(138, 90, 54, 0.3)',
              boxShadow: 'inset 0 0 30px rgba(138, 90, 54, 0.15)',
            }}
          >
            {/* Center Golden Wax Seal */}
            <div className="my-auto flex flex-col items-center">
              <motion.div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-xl cursor-pointer"
                style={{
                  background: 'radial-gradient(circle, #F4B8A4 0%, #D98FA8 50%, #9E4765 100%)',
                  border: '2px solid #E8C88D',
                  boxShadow: '0 8px 25px rgba(217, 143, 168, 0.5)',
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    '0 0 15px rgba(232,200,141,0.4)',
                    '0 0 25px rgba(232,200,141,0.8)',
                    '0 0 15px rgba(232,200,141,0.4)',
                  ],
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <span className="text-2xl sm:text-3xl drop-shadow">💖</span>
              </motion.div>

              <h3 className="font-vibes text-2xl sm:text-3xl text-[#342454] mt-3">
                Captain's Little Universe
              </h3>

              <p className="font-dm text-[11px] sm:text-xs text-[#7D3E53] max-w-[200px] mt-1">
                Touch the seal to enter our magical floating world
              </p>
            </div>

            {/* Bottom Call to Action */}
            <div className="w-full">
              <button
                className="w-full py-2 sm:py-2.5 px-4 rounded-full font-dm text-xs sm:text-sm font-semibold transition-all shadow-md group-hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #7D3E53 0%, #492837 100%)',
                  color: '#FFF6EE',
                  boxShadow: '0 4px 15px rgba(125, 62, 83, 0.4)',
                }}
              >
                Turn The Page & Enter ✨
              </button>
            </div>
          </div>

          {/* Book Spine Center Crease */}
          <div
            className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 100%)',
            }}
          />

          {/* Red Silk Ribbon Bookmark Hanging Below */}
          <div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-5 h-12 shadow-lg"
            style={{
              background: 'linear-gradient(180deg, #A82040 0%, #D93858 80%, transparent 100%)',
              clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)',
            }}
          />
        </div>

        {/* Violet Flower in Crystal Vase beside book (Direct homage to Reference Image 2) */}
        <div className="absolute -left-12 sm:-left-16 bottom-2 flex flex-col items-center pointer-events-none">
          <motion.div
            className="text-3xl sm:text-4xl drop-shadow-[0_0_12px_#A78BFA]"
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            🪻
          </motion.div>
          <div className="w-6 h-8 rounded-b-lg bg-white/20 backdrop-blur-sm border border-white/40 shadow-lg -mt-2" />
        </div>

        {/* Brass Wax Seal Stamp beside book (Direct homage to Reference Image 2) */}
        <div className="absolute -right-8 sm:-right-12 bottom-4 text-2xl sm:text-3xl drop-shadow-[0_0_10px_#E8C88D] pointer-events-none rotate-45">
          🖋️
        </div>
      </motion.div>

      {/* Floating Transition Flash during Opening */}
      <AnimatePresence>
        {isOpening && (
          <motion.div
            className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            style={{
              background: 'radial-gradient(circle, rgba(232,200,141,0.95) 0%, rgba(217,143,168,0.8) 50%, #0d2748 100%)',
            }}
          >
            <motion.div
              className="text-center text-midnight px-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="font-vibes text-5xl md:text-6xl text-[#342454] mb-3">
                Entering Our Universe...
              </h2>
              <p className="font-playfair text-lg text-[#49333B] italic">
                Hold on tight, Chubby ❤️
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

