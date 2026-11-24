// src/components/GiftBox.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { finalSurprisePhoto } from '../config/photos';

interface GiftBoxProps {
  onComplete: () => void;
}

type Stage = 'idle' | 'opening' | 'revealed';

export function GiftBox({ onComplete }: GiftBoxProps) {
  const [stage, setStage] = useState<Stage>('idle');
  const [photoError, setPhotoError] = useState(false);

  const handleOpen = () => {
    setStage('opening');
    setTimeout(() => setStage('revealed'), 1200);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      {stage === 'idle' && (
        <motion.div
          className="flex flex-col items-center gap-6 cursor-pointer"
          onClick={handleOpen}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          {/* Gift box */}
          <motion.div
            className="relative"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Ribbon vertical */}
            <div
              className="absolute left-1/2 top-0 bottom-0 w-6 z-10"
              style={{
                transform: 'translateX(-50%)',
                background: 'linear-gradient(180deg, #D4AF76, #B8963E)',
                borderRadius: 2,
              }}
            />
            {/* Ribbon horizontal */}
            <div
              className="absolute top-1/2 left-0 right-0 h-6 z-10"
              style={{
                transform: 'translateY(-50%)',
                background: 'linear-gradient(90deg, #D4AF76, #B8963E)',
                borderRadius: 2,
              }}
            />
            {/* Ribbon bow */}
            <div
              className="absolute z-20 text-3xl select-none"
              style={{ top: -24, left: '50%', transform: 'translateX(-50%)' }}
            >
              🎀
            </div>
            {/* Box body */}
            <div
              className="w-32 h-28 rounded-lg relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #F8C8DC, #E9789C)',
                boxShadow: '0 12px 32px rgba(228,120,156,0.4)',
              }}
            >
              <div className="absolute inset-0 opacity-20"
                style={{
                  background: 'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.3) 8px, rgba(255,255,255,0.3) 10px)',
                }}
              />
            </div>
          </motion.div>
          <motion.p
            className="font-dm text-base"
            style={{ color: '#C45C7A' }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Click to open your little surprise ✨
          </motion.p>
        </motion.div>
      )}

      {/* Opening animation */}
      <AnimatePresence>
        {stage === 'opening' && (
          <motion.div
            className="text-6xl select-none"
            initial={{ scale: 1, rotate: 0 }}
            animate={{ scale: [1, 1.4, 0.8, 1.2, 1], rotate: [0, -10, 10, -5, 0] }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            🎁
          </motion.div>
        )}
      </AnimatePresence>

      {/* Revealed content */}
      <AnimatePresence>
        {stage === 'revealed' && (
          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 150, damping: 18 }}
          >
            {/* Photo */}
            <div
              className="polaroid-shadow rounded-sm"
              style={{ background: '#FFFDF8', padding: '12px 12px 44px 12px' }}
            >
              <div
                style={{
                  width: 240,
                  height: 200,
                  background: '#FFF0F5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                {!photoError ? (
                  <img
                    src={finalSurprisePhoto}
                    alt="Our favourite photo"
                    style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                    onError={() => setPhotoError(true)}
                  />
                ) : (
                  <div className="flex flex-col items-center">
                    <span className="text-5xl mb-2">💕</span>
                    <p className="font-dm text-xs text-center px-4" style={{ color: '#C45C7A' }}>
                      Our favourite photo
                      <br />goes here ❤️
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Final handwritten note */}
            <motion.div
              className="max-w-sm text-center p-6 rounded-2xl"
              style={{
                background: 'linear-gradient(160deg, #FFFDF8, #FFF9F0)',
                boxShadow: '0 8px 32px rgba(228,120,156,0.15)',
                border: '1px solid #F8C8DC',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="font-vibes text-2xl mb-3" style={{ color: '#C45C7A' }}>
                If I could choose my favourite part of these two months...
              </p>
              <p className="font-playfair text-lg italic" style={{ color: '#49333B' }}>
                "It would always be you."
              </p>
              <div className="mt-4 font-vibes text-xl" style={{ color: '#D4AF76' }}>
                I love you, Baby. Forever your Captain. ❤️
              </div>
            </motion.div>

            <motion.button
              onClick={onComplete}
              className="px-8 py-3 rounded-full font-dm text-sm text-white mt-2"
              style={{
                background: 'linear-gradient(135deg, #E9789C, #C45C7A)',
                boxShadow: '0 4px 16px rgba(228,120,156,0.5)',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Relive Our Little Story 💌
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

