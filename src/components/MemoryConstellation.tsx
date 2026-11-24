// src/components/MemoryConstellation.tsx — Activity 2
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { photos } from '../config/photos';
import { constellationTitle, constellationSubtitle } from '../config/content';

interface Props { onComplete: () => void; onSkip: () => void; alreadyDone: boolean; }

// Heart-shaped star positions (normalized 0-100)
const STAR_POSITIONS = [
  { x: 50, y: 20 },
  { x: 35, y: 15 }, { x: 65, y: 15 },
  { x: 22, y: 25 }, { x: 78, y: 25 },
  { x: 15, y: 38 }, { x: 85, y: 38 },
  { x: 18, y: 52 }, { x: 82, y: 52 },
  { x: 28, y: 64 }, { x: 72, y: 64 },
  { x: 50, y: 78 },
];

function PhotoCard({ photo, onClose }: { photo: typeof photos[0]; onClose: () => void }) {
  const [err, setErr] = useState(false);
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center"
      style={{ background: 'rgba(10,14,30,0.9)', backdropFilter: 'blur(16px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="relative rounded-sm"
        style={{ background: '#FFF7ED', padding: '14px 14px 50px 14px', boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}
        initial={{ scale: 0.7, rotate: -4 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0.7, rotate: 4 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        <div style={{ width: 280, height: 240, background: 'linear-gradient(135deg, #2D1B6E, #39275C)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          {!err
            ? <img src={photo.src} alt={photo.caption} style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }} onError={() => setErr(true)} />
            : <div className="flex flex-col items-center gap-2 p-6"><span className="text-5xl">💫</span><p className="font-dm text-xs text-center" style={{ color: '#A78BFA' }}>Our photo goes here ❤️</p></div>
          }
        </div>
        <p className="font-vibes text-center mt-3 text-xl" style={{ color: '#39275C' }}>{photo.caption}</p>
        {photo.date && <p className="font-dm text-xs text-center" style={{ color: '#A78BFA' }}>{photo.date}</p>}
        <button onClick={onClose} className="absolute top-2 right-2 text-xs rounded-full px-2 py-0.5" style={{ background: 'rgba(57,39,92,0.1)', color: '#39275C' }}>✕</button>
      </motion.div>
    </motion.div>
  );
}

export function MemoryConstellation({ onComplete, onSkip, alreadyDone }: Props) {
  const [viewed, setViewed]   = useState<Set<number>>(new Set());
  const [active, setActive]   = useState<number | null>(null);
  const [done, setDone]       = useState(alreadyDone);

  const handleStar = (idx: number) => {
    setActive(idx);
    const newViewed = new Set([...viewed, idx]);
    setViewed(newViewed);
    if (!done && newViewed.size >= 3) {
      setTimeout(() => setDone(true), 400);
    }
  };

  const closeCard = () => setActive(null);

  if (done && active === null) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(16,21,47,0.92)', backdropFilter: 'blur(12px)' }}>
      <motion.div className="text-center px-8 max-w-lg" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 150 }}>
        <div className="text-6xl mb-4 select-none">🌟</div>
        <h2 className="font-playfair text-3xl italic mb-3" style={{ color: '#E7C58B' }}>Little Moments, Big Feelings</h2>
        <p className="font-dm mb-6" style={{ color: 'rgba(248,246,255,0.7)' }}>Every star holds a little piece of us.</p>
        <motion.div className="text-5xl mb-4 gold-pulse rounded-full inline-block p-3" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring' }}>⭐</motion.div>
        <p className="font-dm mb-6" style={{ color: '#E7C58B' }}>You earned a golden star!</p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => setDone(false)} className="px-6 py-2.5 rounded-full font-dm text-sm glass" style={{ color: '#F59ABB' }}>View More Photos</button>
          <button onClick={onComplete} className="px-6 py-2.5 rounded-full font-dm text-sm" style={{ background: 'linear-gradient(135deg, #A78BFA, #39275C)', color: '#FFF7ED' }}>Return to Universe ✨</button>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" style={{ background: 'radial-gradient(ellipse at center, #0A0E1E 0%, #10152F 100%)' }}>
      {/* Title */}
      <div className="absolute top-6 left-1/2 text-center z-10" style={{ transform: 'translateX(-50%)' }}>
        <h2 className="font-vibes text-4xl mb-1" style={{ color: '#E7C58B', textShadow: '0 0 20px rgba(231,197,139,0.5)' }}>{constellationTitle}</h2>
        <p className="font-dm text-sm" style={{ color: 'rgba(248,246,255,0.5)' }}>{constellationSubtitle}</p>
        <p className="font-dm text-xs mt-1" style={{ color: 'rgba(167,139,250,0.6)' }}>Click the glowing stars ✨ &nbsp;|&nbsp; {viewed.size}/12 discovered</p>
      </div>

      <button onClick={onSkip} className="absolute top-6 right-6 z-10 glass px-4 py-2 rounded-full font-dm text-xs" style={{ color: 'rgba(248,246,255,0.5)' }}>Skip →</button>

      {/* SVG constellation lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.15 }}>
        {STAR_POSITIONS.slice(0, -1).map((s, i) => (
          <line key={i} x1={`${s.x}%`} y1={`${s.y}%`} x2={`${STAR_POSITIONS[i + 1].x}%`} y2={`${STAR_POSITIONS[i + 1].y}%`} stroke="#A78BFA" strokeWidth="1" />
        ))}
      </svg>

      {/* Stars */}
      {STAR_POSITIONS.map((pos, i) => {
        const photo = photos[i];
        const isViewed = viewed.has(i);
        return (
          <motion.button
            key={i}
            className="absolute cursor-pointer border-none bg-transparent p-0 select-none"
            style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%,-50%)', zIndex: 5 }}
            onClick={() => photo && handleStar(i)}
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.9 }}
            animate={{ opacity: [0.5, 1, 0.5], scale: isViewed ? [1, 1.1, 1] : [0.8, 1, 0.8] }}
            transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
          >
            <div
              className="relative flex items-center justify-center rounded-full"
              style={{
                width: 28, height: 28,
                background: isViewed
                  ? 'radial-gradient(circle, #E7C58B, #D4A860)'
                  : 'radial-gradient(circle, #A78BFA, #39275C)',
                boxShadow: isViewed
                  ? '0 0 16px rgba(231,197,139,0.8), 0 0 40px rgba(231,197,139,0.4)'
                  : '0 0 12px rgba(167,139,250,0.6)',
              }}
            >
              <span className="text-xs">{isViewed ? '★' : '✦'}</span>
            </div>
          </motion.button>
        );
      })}

      {/* Photo viewer */}
      <AnimatePresence>
        {active !== null && photos[active] && (
          <PhotoCard photo={photos[active]} onClose={closeCard} />
        )}
      </AnimatePresence>

      {/* Star award hint */}
      {!done && (
        <div className="absolute bottom-6 left-1/2 text-center" style={{ transform: 'translateX(-50%)' }}>
          <p className="font-dm text-xs" style={{ color: 'rgba(167,139,250,0.5)' }}>View 3 memories to earn a star ✨</p>
        </div>
      )}
    </div>
  );
}

