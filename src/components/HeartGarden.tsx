// src/components/HeartGarden.tsx — Activity 1
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import { heartMessages, heartGardenComplete } from '../config/content';

interface Props {
  onComplete: () => void;
  onSkip: () => void;
  alreadyDone: boolean;
}

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  dur: number;
  delay: number;
  collected: boolean;
}

function makeHearts(): Heart[] {
  const positions = [
    { x: 20, y: 35 }, { x: 42, y: 20 }, { x: 65, y: 30 },
    { x: 55, y: 60 }, { x: 28, y: 65 },
  ];
  return positions.map((p, i) => ({
    id: i,
    x: p.x, y: p.y,
    size: 48 + Math.random() * 20,
    dur: 3 + Math.random() * 2,
    delay: i * 0.4,
    collected: false,
  }));
}

export function HeartGarden({ onComplete, onSkip, alreadyDone }: Props) {
  const [hearts, setHearts]       = useState<Heart[]>(makeHearts);
  const [revealed, setRevealed]   = useState<string | null>(null);
  const [collected, setCollected] = useState(0);
  const [done, setDone]           = useState(alreadyDone);

  const collect = useCallback((id: number) => {
    setHearts((prev) => prev.map((h) => h.id === id ? { ...h, collected: true } : h));
    setRevealed(heartMessages[id]);
    const newCount = collected + 1;
    setCollected(newCount);
    if (newCount >= heartMessages.length) {
      setTimeout(() => setDone(true), 1200);
    } else {
      setTimeout(() => setRevealed(null), 2200);
    }
  }, [collected]);

  if (done) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(16,21,47,0.92)', backdropFilter: 'blur(12px)' }}>
      <motion.div
        className="text-center px-8 max-w-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 150 }}
      >
        <div className="text-7xl mb-6 select-none" style={{ filter: 'drop-shadow(0 0 20px #F59ABB)' }}>💗</div>
        <h2 className="font-playfair text-3xl italic mb-3" style={{ color: '#F59ABB' }}>
          {heartGardenComplete.title}
        </h2>
        <p className="font-dm text-sm mb-2" style={{ color: 'rgba(248,246,255,0.85)', lineHeight: 1.6 }}>
          {heartGardenComplete.message}
        </p>
        {heartGardenComplete.quote && (
          <p className="font-playfair italic text-xs mb-4" style={{ color: '#D4AF76' }}>
            "{heartGardenComplete.quote}"
          </p>
        )}
        <div className="flex justify-center gap-2 mb-6">
          {heartMessages.map((_, i) => (
            <motion.span key={i} className="text-2xl" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.1 }}>💗</motion.span>
          ))}
        </div>
        <motion.div className="text-5xl mb-6 select-none gold-pulse rounded-full inline-block p-3" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring' }}>⭐</motion.div>
        <p className="font-dm mb-6" style={{ color: '#E7C58B' }}>You earned a golden star!</p>
        <button onClick={onComplete} className="px-8 py-3 rounded-full font-dm text-sm" style={{ background: 'linear-gradient(135deg, #A78BFA, #39275C)', color: '#FFF7ED', boxShadow: '0 4px 20px rgba(167,139,250,0.4)' }}>
          Return to Universe ✨
        </button>
      </motion.div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at center, #1a0a2e 0%, #10152F 100%)' }}
    >
      {/* Header */}
      <div className="absolute top-6 left-1/2 text-center" style={{ transform: 'translateX(-50%)', zIndex: 10 }}>
        <h2 className="font-vibes text-4xl mb-1" style={{ color: '#F59ABB', textShadow: '0 0 20px rgba(245,154,187,0.5)' }}>
          The Heart Garden
        </h2>
        <p className="font-dm text-sm" style={{ color: 'rgba(248,246,255,0.6)' }}>
          Click the floating hearts to collect Captain's little messages ✨
        </p>
        <div className="flex justify-center gap-2 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-lg" style={{ opacity: i < collected ? 1 : 0.2 }}>💗</span>
          ))}
        </div>
      </div>

      {/* Skip */}
      <button onClick={onSkip} className="absolute top-6 right-6 z-10 glass px-4 py-2 rounded-full font-dm text-xs" style={{ color: 'rgba(248,246,255,0.5)' }}>
        Skip →
      </button>

      {/* Floating hearts */}
      {hearts.map((h) => !h.collected && (
        <motion.button
          key={h.id}
          className="absolute cursor-pointer select-none border-none bg-transparent p-0"
          style={{ left: `${h.x}%`, top: `${h.y}%`, fontSize: h.size }}
          animate={{ y: [0, -20, 0], rotate: [-8, 8, -8], scale: [1, 1.08, 1] }}
          transition={{ duration: h.dur, delay: h.delay, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.3, filter: 'drop-shadow(0 0 16px #F59ABB)' }}
          whileTap={{ scale: 0.85 }}
          onClick={() => collect(h.id)}
        >
          💗
        </motion.button>
      ))}

      {/* Message reveal */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            className="absolute left-1/2 bottom-24 glass rounded-2xl px-8 py-5 text-center max-w-md"
            style={{ transform: 'translateX(-50%)', border: '1px solid rgba(245,154,187,0.4)' }}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <p className="font-playfair italic text-lg" style={{ color: '#FFF7ED', lineHeight: 1.6 }}>
              "{revealed}"
            </p>
            <p className="font-dm text-xs mt-2" style={{ color: '#F59ABB' }}>— Captain 💗</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient petals */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="petal absolute text-xl pointer-events-none select-none"
          style={{
            left: `${10 + i * 11}%`,
            top: '-5%',
            '--dur': `${7 + i}s`,
            '--delay': `${i * 0.9}s`,
          } as React.CSSProperties}
        >
          🌸
        </div>
      ))}
    </div>
  );
}

