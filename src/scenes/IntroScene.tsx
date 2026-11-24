// src/scenes/IntroScene.tsx — The Enchanted Opening: A World Made for My Chubby
// Inspired directly by Reference Image 2 (The Illuminated Storybook in the Library)
import { useState } from 'react';
import { motion } from 'framer-motion';
import { StarField } from '../components/StarField';
import { EnchantedStorybookOpening } from '../components/EnchantedStorybookOpening';
import { CinematicGiftBox } from '../components/CinematicGiftBox';
import { MusicControl } from '../components/MusicControl';
import { META } from '../config/content';

interface Props {
  onOpenUniverse: () => void;
}

export function IntroScene({ onOpenUniverse }: Props) {
  const [mode, setMode] = useState<'storybook' | 'giftbox'>('storybook');

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 35%, #1d1538 0%, #0d1e38 55%, #050c18 100%)',
      }}
    >
      <StarField count={220} />
      <MusicControl />

      {/* Floating Stardust Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
        {Array.from({ length: 32 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: (i % 3) * 2 + 2,
              height: (i % 3) * 2 + 2,
              background: ['#E8C88D', '#D98FA8', '#F4B8A4', '#FFF6EE', '#90e0ef'][i % 5],
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`,
              opacity: 0.6,
            }}
            animate={{
              y: [0, -35, 0],
              opacity: [0.3, 0.85, 0.3],
              scale: [1, 1.35, 1],
            }}
            transition={{
              duration: 4 + (i % 4),
              delay: (i * 0.3) % 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Ambient Celestial Warm Glow */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 620,
          height: 620,
          background: 'radial-gradient(circle, rgba(232,200,141,0.18) 0%, rgba(52,36,84,0.25) 50%, transparent 70%)',
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.7, 0.95, 0.7] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Opening Header Text */}
      <motion.div
        className="text-center z-20 px-6 mb-4 max-w-xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <span className="font-dm text-xs uppercase tracking-widest text-champagnegold/80 block mb-1">
          {META.occasion}
        </span>

        <h1 className="font-vibes text-4xl sm:text-5xl md:text-6xl text-rose-gradient mb-2 drop-shadow-lg">
          {META.openingHeading}
        </h1>

        <p className="font-playfair text-base sm:text-lg text-softIvory/90 italic font-light max-w-md mx-auto leading-relaxed">
          "{META.openingSubtitle}"
        </p>
      </motion.div>

      {/* Centerpiece: The Enchanted Open Storybook (Reference Image 2) or Floating Gift Box */}
      <motion.div
        className="z-20 flex flex-col items-center w-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {mode === 'storybook' ? (
          <EnchantedStorybookOpening onOpenUniverse={onOpenUniverse} />
        ) : (
          <div className="flex flex-col items-center">
            <CinematicGiftBox onOpened={onOpenUniverse} />
            <button
              onClick={onOpenUniverse}
              className="mt-6 px-8 py-3 rounded-full font-dm text-sm font-semibold text-midnight shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #FFF6EE 0%, #E8C88D 50%, #F4B8A4 100%)',
              }}
            >
              Open Captain's Gift 🎁
            </button>
          </div>
        )}

        {/* View Mode Switcher */}
        <div className="mt-4 flex items-center gap-3 z-30">
          <button
            onClick={() => setMode('storybook')}
            className={`font-dm text-xs px-3.5 py-1 rounded-full transition-all cursor-pointer ${
              mode === 'storybook'
                ? 'bg-champagnegold text-midnight font-bold shadow-md'
                : 'text-softIvory/60 hover:text-white glass-cinematic'
            }`}
          >
            📖 Enchanted Storybook
          </button>
          <button
            onClick={() => setMode('giftbox')}
            className={`font-dm text-xs px-3.5 py-1 rounded-full transition-all cursor-pointer ${
              mode === 'giftbox'
                ? 'bg-champagnegold text-midnight font-bold shadow-md'
                : 'text-softIvory/60 hover:text-white glass-cinematic'
            }`}
          >
            🎁 Floating Gift Box
          </button>
        </div>
      </motion.div>
    </div>
  );
}
