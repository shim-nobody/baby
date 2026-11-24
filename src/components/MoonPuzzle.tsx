// src/components/MoonPuzzle.tsx — Activity 3: Build Our Moon
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { moonMessages } from '../config/content';

interface Props {
  onComplete: () => void;
  onSkip: () => void;
  alreadyDone: boolean;
}

interface Fragment {
  id: number;
  label: string;
  symbol: string;
  hint: string;
}

const FRAGMENTS: Fragment[] = [
  { id: 1, label: 'First Spark', symbol: '✨', hint: 'The day we first met' },
  { id: 2, label: 'Warm Light', symbol: '🌙', hint: 'Your gentle care & smile' },
  { id: 3, label: 'Star Dust', symbol: '💫', hint: 'Standing together as one' },
  { id: 4, label: 'Pure Radiance', symbol: '🌕', hint: 'Every tomorrow with you' },
];

export function MoonPuzzle({ onComplete, onSkip, alreadyDone }: Props) {
  const [placed, setPlaced] = useState<number[]>(alreadyDone ? [1, 2, 3, 4] : []);
  const [stepMessage, setStepMessage] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(alreadyDone);

  const handleFragmentClick = (id: number) => {
    if (placed.includes(id)) return;
    const next = [...placed, id];
    setPlaced(next);

    if (next.length === 4) {
      setTimeout(() => {
        setIsCompleted(true);
      }, 700);
    }
  };

  const handleNextMessage = () => {
    if (stepMessage < moonMessages.length - 1) {
      setStepMessage(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(circle at center, #1b1238 0%, #10152F 85%)' }}
    >
      {/* Top Header */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-10 w-full px-4">
        <h2 className="font-vibes text-4xl mb-1 text-gold" style={{ textShadow: '0 0 20px rgba(231,197,139,0.5)' }}>
          Build Our Moon
        </h2>
        <p className="font-dm text-sm text-lavender/80">
          Restore the glowing moon pieces to illuminate our little world
        </p>
      </div>

      {/* Skip Button */}
      <button
        onClick={onSkip}
        className="absolute top-8 right-8 z-20 glass px-4 py-2 rounded-full font-dm text-xs text-lavender/60 hover:text-white transition-colors"
      >
        Skip →
      </button>

      {/* Main Moon Display Stage */}
      <div className="relative flex flex-col items-center justify-center my-6">
        {/* Glow halo that expands when whole */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          animate={{
            width: isCompleted ? 450 : 260,
            height: isCompleted ? 450 : 260,
            background: isCompleted
              ? 'radial-gradient(circle, rgba(231,197,139,0.45) 0%, rgba(167,139,250,0.15) 50%, transparent 75%)'
              : 'radial-gradient(circle, rgba(167,139,250,0.2) 0%, transparent 65%)',
          }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />

        {/* Central Moon Body */}
        <motion.div
          className="relative rounded-full flex items-center justify-center shadow-2xl select-none"
          style={{
            width: 220,
            height: 220,
            background: isCompleted
              ? 'radial-gradient(circle at 35% 35%, #FFFDF8 0%, #FFF7ED 25%, #E7C58B 65%, #C29B53 100%)'
              : `radial-gradient(circle at 35% 35%, #2a1f4b 0%, #1f1638 60%, #150f26 100%)`,
            border: `2px solid ${isCompleted ? '#E7C58B' : 'rgba(167,139,250,0.3)'}`,
            boxShadow: isCompleted
              ? '0 0 60px rgba(231,197,139,0.7), inset 0 0 30px rgba(255,255,255,0.8)'
              : '0 0 25px rgba(57,39,92,0.6)',
          }}
          animate={isCompleted ? { rotate: [0, 360] } : {}}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        >
          {/* Craters & texture details */}
          <div className="absolute inset-0 rounded-full opacity-20 pointer-events-none overflow-hidden">
            <div className="absolute w-12 h-12 rounded-full bg-black/30 top-6 left-8" />
            <div className="absolute w-16 h-16 rounded-full bg-black/25 bottom-8 right-8" />
            <div className="absolute w-8 h-8 rounded-full bg-black/20 top-24 right-14" />
          </div>

          {!isCompleted ? (
            <div className="text-center p-4">
              <span className="text-4xl block mb-1">🌙</span>
              <p className="font-dm text-xs text-lavender/60">
                {placed.length}/4 Shards Restored
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <span className="text-5xl block select-none drop-shadow-md">🌕</span>
            </motion.div>
          )}
        </motion.div>

        {/* Orbiting / Surrounding Fragment Pieces to click */}
        {!isCompleted && (
          <div className="flex flex-wrap justify-center gap-4 mt-12 max-w-lg z-10">
            {FRAGMENTS.map((frag, idx) => {
              const isPlaced = placed.includes(frag.id);
              return (
                <motion.button
                  key={frag.id}
                  onClick={() => handleFragmentClick(frag.id)}
                  disabled={isPlaced}
                  className={`glass px-5 py-3 rounded-2xl flex items-center gap-3 transition-all ${
                    isPlaced
                      ? 'opacity-30 cursor-default border-lavender/10'
                      : 'hover:border-gold/60 hover:scale-105 cursor-pointer shadow-lg'
                  }`}
                  whileHover={!isPlaced ? { y: -4 } : {}}
                  whileTap={!isPlaced ? { scale: 0.95 } : {}}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <span className="text-2xl">{frag.symbol}</span>
                  <div className="text-left">
                    <p className="font-dm text-sm font-medium text-warmIvory">{frag.label}</p>
                    <p className="font-dm text-xs text-lavender/60">{frag.hint}</p>
                  </div>
                  {isPlaced && <span className="text-xs text-gold ml-2">✓</span>}
                </motion.button>
              );
            })}
          </div>
        )}
      </div>

      {/* Completed Story Reveal Card */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            className="glass-dark rounded-3xl p-8 max-w-lg text-center mx-4 z-20 border border-gold/40 shadow-2xl"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <div className="text-4xl mb-3">⭐</div>
            <p className="font-playfair italic text-lg text-warmIvory leading-relaxed mb-6">
              "{moonMessages[stepMessage]}"
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-lavender/20">
              <span className="font-dm text-xs text-lavender/60">
                {stepMessage + 1} of {moonMessages.length}
              </span>

              <button
                onClick={handleNextMessage}
                className="px-6 py-2.5 rounded-full font-dm text-sm text-navy font-semibold transition-all shadow-lg hover:shadow-gold/30 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #E7C58B, #FFF7ED)' }}
              >
                {stepMessage < moonMessages.length - 1 ? 'Next Whisper →' : 'Collect Star & Return ✨'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

