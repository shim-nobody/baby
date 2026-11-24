// src/scenes/FinalSurpriseScene.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { GiftBox } from '../components/GiftBox';
import { FloatingParticles } from '../components/FloatingParticles';

interface FinalSurpriseSceneProps {
  onRestart: () => void;
}

type Stage = 'celebrate' | 'surprise';

function Confetti() {
  const pieces = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: ['#F8C8DC', '#D4AF76', '#E9789C', '#FFF9F0', '#F5D79E'][Math.floor(Math.random() * 5)],
    size: Math.random() * 10 + 6,
    delay: Math.random() * 1.5,
    duration: Math.random() * 2 + 2,
    isCircle: Math.random() > 0.5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute top-0"
          style={{ left: `${p.x}%` }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{
            y: ['0vh', '110vh'],
            rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
            repeatDelay: Math.random() * 2,
          }}
        >
          <div
            style={{
              width: p.size,
              height: p.size,
              background: p.color,
              borderRadius: p.isCircle ? '50%' : '2px',
              boxShadow: `0 0 4px ${p.color}80`,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

export function FinalSurpriseScene({ onRestart }: FinalSurpriseSceneProps) {
  const [stage, setStage] = useState<Stage>('celebrate');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #FFF0F5 0%, #FFF5F7 50%, #FFE8F0 100%)',
      }}
    >
      <FloatingParticles opacity={0.3} />
      {showConfetti && <Confetti />}

      <AnimatePresence mode="wait">
        {stage === 'celebrate' && (
          <motion.div
            key="celebrate"
            className="flex flex-col items-center gap-8 text-center px-8 relative z-20"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 150 }}
          >
            {/* Main celebration heading */}
            <motion.h1
              className="font-playfair"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                color: '#C45C7A',
                fontStyle: 'italic',
                lineHeight: 1.2,
              }}
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              HAPPY TWO MONTHS,<br />MY CHUBBY ❤️
            </motion.h1>

            <p className="font-dm max-w-lg" style={{ color: '#B08090', fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', lineHeight: 1.7 }}>
              Two months of love, laughter, comfort, and countless little reasons to smile.
            </p>

            {/* Glowing heart */}
            <motion.div
              className="relative flex items-center justify-center"
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Glow */}
              <div
                className="absolute rounded-full"
                style={{
                  width: 180,
                  height: 180,
                  background: 'radial-gradient(circle, rgba(228,120,156,0.35) 0%, transparent 70%)',
                }}
              />
              {/* Heart card */}
              <div
                className="relative w-44 h-44 rounded-full flex flex-col items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #F8C8DC, #E9789C, #C45C7A)',
                  boxShadow: '0 12px 48px rgba(228,120,156,0.5), 0 4px 16px rgba(228,120,156,0.3)',
                }}
              >
                <span className="text-4xl select-none mb-1">❤️</span>
                <p className="font-playfair text-white font-semibold text-lg tracking-wide">
                  SHIM ♡ SABA
                </p>
              </div>
            </motion.div>

            <p className="font-vibes text-3xl" style={{ color: '#D4AF76' }}>
              Every tomorrow, I choose you.
            </p>

            <motion.button
              onClick={() => setStage('surprise')}
              className="px-10 py-3.5 rounded-full font-dm text-sm text-white mt-2 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #E9789C, #C45C7A)',
                boxShadow: '0 6px 24px rgba(228,120,156,0.5)',
                fontSize: '1rem',
              }}
              whileHover={{ scale: 1.05, boxShadow: '0 8px 32px rgba(228,120,156,0.65)' }}
              whileTap={{ scale: 0.96 }}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              One Last Little Surprise 🎁
            </motion.button>
          </motion.div>
        )}

        {stage === 'surprise' && (
          <motion.div
            key="surprise"
            className="flex flex-col items-center gap-6 text-center px-8 relative z-20 w-full max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-playfair text-3xl italic" style={{ color: '#C45C7A' }}>
              One last thing, my Chubby ❤️
            </h2>

            <GiftBox onComplete={onRestart} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

