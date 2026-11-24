// src/components/MagicalGiftBox.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface Props { onOpen: () => void; }

type Stage = 'idle' | 'opening' | 'done';

function Particle({ i }: { i: number }) {
  const angle  = (i / 20) * Math.PI * 2;
  const dist   = 60 + Math.random() * 100;
  const color  = ['#F59ABB','#E7C58B','#A78BFA','#FFF7ED'][i % 4];
  return (
    <motion.div
      className="absolute rounded-full"
      style={{ width: 6, height: 6, background: color, top: '50%', left: '50%' }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, opacity: 0, scale: 0 }}
      transition={{ duration: 0.9, delay: i * 0.02, ease: 'easeOut' }}
    />
  );
}

export function MagicalGiftBox({ onOpen }: Props) {
  const [stage, setStage] = useState<Stage>('idle');

  const handleClick = () => {
    if (stage !== 'idle') return;
    setStage('opening');
    setTimeout(onOpen, 1800);
  };

  return (
    <div className="relative flex flex-col items-center gap-8">
      {/* Moonlit glow behind box */}
      <div className="absolute rounded-full" style={{ width: 320, height: 320, background: 'radial-gradient(circle, rgba(167,139,250,0.18) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />

      {/* Gift box assembly */}
      <motion.div
        className="relative cursor-pointer select-none"
        onClick={handleClick}
        animate={stage === 'idle' ? { y: [0, -16, 0] } : {}}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ width: 180, height: 160 }}
        whileHover={stage === 'idle' ? { scale: 1.06 } : {}}
      >
        {/* Lid */}
        <motion.div
          className="absolute left-0 right-0 h-10 rounded-t-lg flex items-center justify-center overflow-hidden"
          style={{
            top: 0, zIndex: 10,
            background: 'linear-gradient(135deg, #5B3FA0, #39275C)',
            border: '1px solid rgba(167,139,250,0.4)',
            transformOrigin: 'top center',
          }}
          animate={stage === 'opening' ? { rotateX: -130, y: -40, opacity: 0 } : { rotateX: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Gold ribbon horizontal on lid */}
          <div className="absolute inset-x-0 top-1/2 h-3" style={{ transform: 'translateY(-50%)', background: 'linear-gradient(90deg, #E7C58B, #FFF7ED, #E7C58B)' }} />
        </motion.div>

        {/* Bow */}
        <motion.div
          className="absolute text-4xl select-none"
          style={{ top: -24, left: '50%', transform: 'translateX(-50%)', zIndex: 11, filter: 'drop-shadow(0 0 8px #E7C58B)' }}
          animate={stage === 'opening' ? { y: -60, opacity: 0, rotate: 20 } : { rotate: [-3, 3, -3] }}
          transition={stage === 'opening' ? { duration: 0.5 } : { duration: 2.5, repeat: Infinity }}
        >
          🎀
        </motion.div>

        {/* Box body */}
        <div
          className="absolute left-0 right-0 bottom-0 rounded-b-lg overflow-hidden"
          style={{
            top: 32,
            background: 'linear-gradient(160deg, #4B2D8E, #2D1B6E)',
            border: '1px solid rgba(167,139,250,0.3)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(167,139,250,0.2)',
          }}
        >
          {/* Polka dot pattern */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #A78BFA 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          {/* Ribbon vertical */}
          <div className="absolute inset-y-0 left-1/2 w-4" style={{ transform: 'translateX(-50%)', background: 'linear-gradient(180deg, #E7C58B, #D4A860)' }} />
        </div>

        {/* Particle burst */}
        <AnimatePresence>
          {stage === 'opening' && (
            <div className="absolute inset-0" style={{ zIndex: 20 }}>
              {Array.from({ length: 24 }).map((_, i) => <Particle key={i} i={i} />)}
            </div>
          )}
        </AnimatePresence>

        {/* Rising planet / glow */}
        <AnimatePresence>
          {stage === 'opening' && (
            <motion.div
              className="absolute left-1/2 rounded-full"
              style={{ width: 60, height: 60, bottom: 60, transform: 'translateX(-50%)', background: 'radial-gradient(circle at 35% 35%, #A78BFA, #39275C)', boxShadow: '0 0 40px rgba(167,139,250,0.9)', zIndex: 15 }}
              initial={{ y: 0, scale: 0, opacity: 0 }}
              animate={{ y: -120, scale: 1.4, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

