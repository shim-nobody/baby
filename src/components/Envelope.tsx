// src/components/Envelope.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { WaxSeal } from './WaxSeal';
import { useState } from 'react';

interface EnvelopeProps {
  onOpen: () => void;
}

export function Envelope({ onOpen }: EnvelopeProps) {
  const [sealBroken, setSealBroken] = useState(false);
  const [flapOpen, setFlapOpen] = useState(false);
  const [letterRising, setLetterRising] = useState(false);

  const handleSealClick = () => {
    if (sealBroken) return;
    setSealBroken(true);
    setTimeout(() => setFlapOpen(true), 400);
    setTimeout(() => setLetterRising(true), 900);
    setTimeout(() => onOpen(), 1700);
  };

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      {/* Envelope container with 3D perspective */}
      <div className="relative" style={{ perspective: '1200px', width: 420, height: 280 }}>

        {/* Back of envelope */}
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            background: 'linear-gradient(135deg, #F8C8DC 0%, #FABCCE 50%, #F5AABB 100%)',
            boxShadow: '0 20px 60px rgba(73,51,59,0.2), 0 8px 24px rgba(228,120,156,0.15)',
          }}
        >
          {/* Envelope diagonal lines (inside pattern) */}
          <div className="absolute inset-0 opacity-20 overflow-hidden rounded-lg">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  width: '2px',
                  height: '200%',
                  background: 'rgba(196,92,122,0.4)',
                  left: `${i * 60 - 30}px`,
                  top: '-50%',
                  transform: 'rotate(45deg)',
                  transformOrigin: 'top left',
                }}
              />
            ))}
          </div>
        </div>

        {/* Envelope flap (top triangle) */}
        <motion.div
          className="absolute left-0 right-0 top-0 overflow-hidden"
          style={{ height: '50%', transformOrigin: 'top center', zIndex: 5 }}
          animate={flapOpen ? { rotateX: -160 } : { rotateX: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: '210px solid transparent',
              borderRight: '210px solid transparent',
              borderTop: '170px solid #F0A8C0',
              filter: 'drop-shadow(0 2px 4px rgba(73,51,59,0.1))',
            }}
          />
        </motion.div>

        {/* Left triangle */}
        <div
          className="absolute bottom-0 left-0"
          style={{
            width: 0,
            height: 0,
            borderBottom: '140px solid #EBA0BC',
            borderRight: '210px solid transparent',
            zIndex: 1,
          }}
        />
        {/* Right triangle */}
        <div
          className="absolute bottom-0 right-0"
          style={{
            width: 0,
            height: 0,
            borderBottom: '140px solid #EBA0BC',
            borderLeft: '210px solid transparent',
            zIndex: 1,
          }}
        />
        {/* Bottom triangle */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            width: 0,
            height: 0,
            borderBottom: '130px solid #F3B5CC',
            borderLeft: '210px solid transparent',
            borderRight: '210px solid transparent',
            margin: '0 auto',
            zIndex: 2,
          }}
        />

        {/* Rising letter */}
        <AnimatePresence>
          {letterRising && (
            <motion.div
              className="absolute left-1/2 rounded-sm"
              style={{
                width: 320,
                height: 220,
                x: '-50%',
                background: 'linear-gradient(180deg, #FFFDF5 0%, #FFF9F0 100%)',
                boxShadow: '0 2px 20px rgba(73,51,59,0.1)',
                zIndex: 3,
                transformOrigin: 'bottom center',
              }}
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: -40, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              {/* Letter content preview */}
              <div className="p-6 flex flex-col items-center justify-center h-full">
                <span className="text-3xl mb-2">💌</span>
                <p className="font-vibes text-2xl text-romantic text-center">
                  To My Chubby
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Envelope text */}
        <AnimatePresence>
          {!flapOpen && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center z-4"
              exit={{ opacity: 0 }}
            >
              <p className="font-vibes text-3xl" style={{ color: '#C45C7A' }}>
                To My Chubby ❤️
              </p>
              <p className="font-dm text-sm mt-1" style={{ color: '#9B4D65', letterSpacing: '0.08em' }}>
                From Your Captain
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wax seal */}
        <WaxSeal broken={sealBroken} onClick={handleSealClick} />
      </div>

      {/* Rose petals decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {['🌸', '🌺', '🌸', '🌹'].map((petal, i) => (
          <motion.span
            key={i}
            className="absolute text-lg"
            style={{
              left: `${[10, 85, 5, 90][i]}%`,
              top: `${[70, 75, 40, 45][i]}%`,
              opacity: 0.7,
            }}
            animate={{ y: [0, -8, 0], rotate: [-5, 5, -5] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
          >
            {petal}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

