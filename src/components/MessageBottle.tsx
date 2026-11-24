// src/components/MessageBottle.tsx — Activity 4: Message in a Bottle
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { bottleLines } from '../config/content';

interface Props {
  onComplete: () => void;
  onSkip: () => void;
  alreadyDone: boolean;
}

export function MessageBottle({ onComplete, onSkip, alreadyDone }: Props) {
  const [opened, setOpened] = useState(alreadyDone);
  const [currentLine, setCurrentLine] = useState(0);

  const handleOpenBottle = () => {
    setOpened(true);
  };

  const handleNextLine = () => {
    if (currentLine < bottleLines.length - 1) {
      setCurrentLine(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at bottom, #162447 0%, #10152F 70%)',
      }}
    >
      {/* Header */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-10 w-full px-4">
        <h2 className="font-vibes text-4xl mb-1 text-rosepink" style={{ textShadow: '0 0 20px rgba(245,154,187,0.5)' }}>
          Message in a Bottle
        </h2>
        <p className="font-dm text-sm text-lavender/80">
          A secret note floating peacefully on the celestial pond
        </p>
      </div>

      {/* Skip */}
      <button
        onClick={onSkip}
        className="absolute top-8 right-8 z-20 glass px-4 py-2 rounded-full font-dm text-xs text-lavender/60 hover:text-white"
      >
        Skip →
      </button>

      {/* Pond Ripples & Bottle Stage */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Animated Water Ripples */}
        <div className="relative w-80 h-36 flex items-center justify-center mb-8">
          <motion.div
            className="absolute rounded-full border border-lavender/20"
            style={{ width: '100%', height: '100%' }}
            animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute rounded-full border border-rosepink/25"
            style={{ width: '70%', height: '70%' }}
            animate={{ scale: [1, 1.35, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 3.2, delay: 0.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Floating Bottle Icon / Graphic */}
          {!opened && (
            <motion.div
              onClick={handleOpenBottle}
              className="relative cursor-pointer select-none z-10 group"
              animate={{
                y: [0, -12, 0],
                rotate: [-6, 6, -6],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className="w-20 h-32 rounded-3xl relative flex items-center justify-center glass border-2 border-lavender/50 shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(167,139,250,0.15) 100%)',
                  boxShadow: '0 0 30px rgba(167,139,250,0.4)',
                }}
              >
                {/* Bottle Cork */}
                <div
                  className="absolute -top-3 w-6 h-4 rounded-t-sm"
                  style={{ background: '#C29B53', border: '1px solid #E7C58B' }}
                />
                {/* Rolled parchment inside */}
                <div
                  className="w-8 h-16 rounded-md shadow-inner flex items-center justify-center"
                  style={{ background: 'linear-gradient(180deg, #FFF7ED, #E7C58B)', border: '1px solid #D4A860' }}
                >
                  <span className="text-xs text-navy font-vibes">❤️</span>
                </div>
              </div>
              <p className="text-center font-dm text-xs text-gold mt-3 font-medium opacity-90 group-hover:opacity-100">
                Click to Uncork 💌
              </p>
            </motion.div>
          )}
        </div>

        {/* Unfolded Letter Parchment Display */}
        <AnimatePresence>
          {opened && (
            <motion.div
              className="relative rounded-2xl max-w-lg p-8 mx-4 text-center shadow-2xl"
              style={{
                background: 'linear-gradient(160deg, #FFFDF8 0%, #FFF7ED 60%, #F5E8D3 100%)',
                border: '2px solid #E7C58B',
                boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(231,197,139,0.3)',
              }}
              initial={{ scale: 0.3, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 180, damping: 18 }}
            >
              {/* Decorative stamp in corner */}
              <div className="absolute top-4 right-4 text-2xl opacity-80 select-none">💌</div>
              <div className="absolute top-4 left-4 text-xs font-dm uppercase tracking-widest text-[#8A6A32]">
                Captain's Note
              </div>

              <div className="my-6 min-h-[90px] flex items-center justify-center">
                <motion.p
                  key={currentLine}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="font-playfair text-xl md:text-2xl text-[#2F2116] leading-relaxed italic px-2"
                >
                  "{bottleLines[currentLine]}"
                </motion.p>
              </div>

              {/* Progress & Navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-[#D4AF76]/40">
                <div className="flex gap-1.5">
                  {bottleLines.map((_, i) => (
                    <div
                      key={i}
                      className="w-2.5 h-2.5 rounded-full transition-all"
                      style={{
                        background: i <= currentLine ? '#C29B53' : '#EAD5B7',
                        transform: i === currentLine ? 'scale(1.2)' : 'scale(1)',
                      }}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNextLine}
                  className="px-6 py-2.5 rounded-full font-dm text-sm text-warmIvory font-medium transition-all shadow-md hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #7D3E53, #492837)' }}
                >
                  {currentLine < bottleLines.length - 1 ? 'Read Next Line →' : 'Keep Note & Collect Star ⭐'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

