// src/scenes/FinaleScene.tsx — The Grand Anniversary Finale
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarField } from '../components/StarField';
import { MusicControl } from '../components/MusicControl';
import { finalePhoto } from '../config/photos';
import { finaleCelebration } from '../config/content';

interface Props {
  onRestart: () => void;
}

export function FinaleScene({ onRestart }: Props) {
  const [boxOpened, setBoxOpened] = useState(false);
  const [photoError, setPhotoError] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden p-6 select-none"
      style={{
        background: 'radial-gradient(ellipse at 50% 35%, #2B1647 0%, #0B1026 65%, #040714 100%)',
      }}
    >
      <StarField count={240} />
      <MusicControl />

      {/* ── GENTLE CELEBRATORY PINK & GOLD CONFETTI ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
        {Array.from({ length: 45 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: (i % 3) * 3 + 4,
              height: (i % 3) * 3 + 4,
              background: ['#E8C88D', '#D98FA8', '#F4B8A4', '#FFF6EE'][i % 4],
              left: `${(i * 13) % 100}%`,
              top: '-5%',
            }}
            animate={{
              y: ['0vh', '105vh'],
              x: [i % 2 === 0 ? -20 : 20, i % 2 === 0 ? 20 : -20],
              rotate: [0, 360],
              opacity: [1, 0.85, 0],
            }}
            transition={{
              duration: 5.5 + (i % 4),
              delay: (i * 0.2) % 4,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div className="relative z-20 flex flex-col items-center text-center max-w-xl my-auto">
        {/* Constellation Glow: SHIM ♡ SABA */}
        <motion.div
          className="glass-cinematic px-7 py-2.5 rounded-full mb-6 border border-champagnegold/60 shadow-2xl flex items-center gap-2.5"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-champagnegold">✨</span>
          <span className="font-playfair text-base md:text-lg tracking-widest text-softIvory font-semibold">
            {finaleCelebration.coupleSign}
          </span>
          <span className="text-dustyrose">✨</span>
        </motion.div>

        {/* Anniversary Title */}
        <motion.h1
          className="font-vibes text-4xl md:text-6xl text-rose-gradient leading-tight mb-2 drop-shadow-lg"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {finaleCelebration.heading}
        </motion.h1>

        <motion.p
          className="font-playfair text-base md:text-lg text-softIvory/90 italic mb-6 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          "{finaleCelebration.subheading}"
        </motion.p>

        {/* Interactive Couple Photo Box Reveal */}
        {!boxOpened ? (
          <motion.div
            onClick={() => setBoxOpened(true)}
            className="cursor-pointer group flex flex-col items-center my-4"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              className="w-24 h-24 rounded-3xl flex items-center justify-center relative shadow-2xl transition-transform"
              style={{
                background: 'linear-gradient(135deg, #FFF6EE 0%, #E8C88D 50%, #F4B8A4 100%)',
                boxShadow: '0 0 50px rgba(232, 200, 141, 0.7), 0 0 80px rgba(217, 143, 168, 0.4)',
              }}
            >
              <span className="text-5xl group-hover:scale-110 transition-transform">🎁</span>
            </div>
            <p className="font-dm text-xs text-champagnegold mt-3 font-semibold tracking-wide">
              Click to Open Our Special Photo ✨
            </p>
          </motion.div>
        ) : (
          <AnimatePresence>
            <motion.div
              className="flex flex-col items-center"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 180, damping: 18 }}
            >
              {/* Couple Polaroid Frame */}
              <div
                className="relative rounded-sm p-4 pb-8 mb-6 shadow-2xl"
                style={{
                  background: '#FFFDF9',
                  border: '1.5px solid rgba(232, 200, 141, 0.6)',
                  boxShadow: '0 25px 60px rgba(0,0,0,0.85), 0 0 40px rgba(217, 143, 168, 0.35)',
                }}
              >
                <div
                  className="rounded-xs flex items-center justify-center overflow-hidden"
                  style={{
                    width: 'min(75vw, 320px)',
                    height: 'min(65vw, 260px)',
                    background: 'linear-gradient(135deg, #2D1B6E, #39275C)',
                  }}
                >
                  {!photoError ? (
                    <img
                      src={finalePhoto}
                      alt="Our Favourite Memory"
                      className="w-full h-full object-contain"
                      onError={() => setPhotoError(true)}
                    />
                  ) : (
                    <div className="flex flex-col items-center p-6 text-center">
                      <span className="text-5xl mb-2">💕</span>
                      <p className="font-playfair text-sm text-[#342454] font-semibold">Our Favourite Photo</p>
                      <p className="font-dm text-[11px] text-[#7D3E53] mt-1">
                        Add to public/memories/our-photo.jpg
                      </p>
                    </div>
                  )}
                </div>

                <p className="font-vibes text-2xl text-[#342454] text-center mt-3">
                  Forever and always. ❤️
                </p>
              </div>

              {/* Final Personal Vow Card */}
              <div className="glass-cinematic rounded-2xl p-6 border border-champagnegold/50 shadow-2xl max-w-md text-center">
                <p className="font-playfair text-base md:text-lg text-softIvory italic leading-relaxed mb-3">
                  "{finaleCelebration.finalVow}"
                </p>
                <p className="font-dm text-sm text-dustyrose font-medium">
                  I love you, Baby.
                </p>
                <p className="font-vibes text-2xl text-champagnegold mt-1">
                  Forever Your Captain. ❤️
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Explore Our Universe Again Button */}
        <motion.button
          onClick={onRestart}
          className="mt-8 px-8 py-3 rounded-full font-dm text-xs md:text-sm text-softIvory glass-cinematic border border-champagnegold/40 hover:border-champagnegold transition-all hover:scale-105 cursor-pointer shadow-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {finaleCelebration.buttonLabel} ✨
        </motion.button>
      </div>
    </div>
  );
}
