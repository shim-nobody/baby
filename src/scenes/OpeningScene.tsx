// src/scenes/OpeningScene.tsx
import { motion } from 'framer-motion';
import { Envelope } from '../components/Envelope';
import { FloatingParticles } from '../components/FloatingParticles';

interface OpeningSceneProps {
  onOpen: () => void;
}

export function OpeningScene({ onOpen }: OpeningSceneProps) {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #FFF0F5 0%, #FFF5F7 50%, #FFE8F0 100%)',
      }}
    >
      <FloatingParticles opacity={0.4} />

      {/* Soft light orbs */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(248,200,220,0.25) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Top decorative text */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <p className="font-vibes text-5xl" style={{ color: '#C45C7A' }}>
          Something special is waiting for you
        </p>
        <div className="flex justify-center gap-2 mt-2 text-xl select-none">
          {'❤️ 💕 ❤️'.split(' ').map((e, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
            >
              {e}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Envelope stage */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.3, type: 'spring', stiffness: 150 }}
      >
        {/* Surface */}
        <div
          className="relative flex flex-col items-center px-16 py-12 rounded-3xl"
          style={{
            background: 'linear-gradient(160deg, #FFFDF8 0%, #FFF5EE 100%)',
            boxShadow:
              '0 32px 80px rgba(73,51,59,0.12), 0 8px 24px rgba(228,120,156,0.1), inset 0 1px 0 rgba(255,255,255,0.9)',
          }}
        >
          {/* Scattered petals on surface */}
          {['🌸', '🌹', '🌸', '🌺', '🌸'].map((p, i) => (
            <motion.span
              key={i}
              className="absolute text-lg select-none opacity-60"
              style={{
                top: [`15%`, `70%`, `80%`, `20%`, `60%`][i],
                left: [`8%`, `6%`, `85%`, `88%`, `92%`][i],
              }}
              animate={{ rotate: [-8, 8, -8], y: [0, -4, 0] }}
              transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.4 }}
            >
              {p}
            </motion.span>
          ))}

          {/* Satin ribbon top */}
          <div
            className="absolute top-0 left-1/2 w-3 rounded-b-full"
            style={{
              transform: 'translateX(-50%)',
              height: 40,
              background: 'linear-gradient(180deg, #F8C8DC, #E9789C)',
              boxShadow: '0 2px 8px rgba(228,120,156,0.3)',
            }}
          />

          <Envelope onOpen={onOpen} />

          {/* Below envelope text */}
          <motion.p
            className="font-dm text-sm text-center mt-8"
            style={{ color: '#B08090', fontStyle: 'italic' }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            "A little piece of my heart is waiting for you."
          </motion.p>

          {/* Open button — backup click */}
          <motion.button
            onClick={onOpen}
            className="mt-6 px-8 py-3 rounded-full font-dm text-sm text-white relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #E9789C, #C45C7A)',
              boxShadow: '0 4px 20px rgba(228,120,156,0.5)',
              letterSpacing: '0.03em',
            }}
            whileHover={{ scale: 1.05, boxShadow: '0 6px 28px rgba(228,120,156,0.65)' }}
            whileTap={{ scale: 0.96 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.span
              className="absolute inset-0 bg-white opacity-0"
              whileHover={{ opacity: 0.08 }}
            />
            Open Your Surprise 💌
          </motion.button>
        </div>
      </motion.div>

      {/* Bottom caption */}
      <motion.p
        className="mt-8 font-vibes text-2xl"
        style={{ color: '#D4AF76' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        To My Chubby, From Your Captain ❤️
      </motion.p>
    </div>
  );
}

