// src/components/HeartVault.tsx — Activity 5: The Locked Glass Heart Vault
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  starsCollected: number;
  totalRequired: number;
  onUnlock: () => void;
  onClose: () => void;
}

export function HeartVault({ starsCollected, totalRequired, onUnlock, onClose }: Props) {
  const [unlocking, setUnlocking] = useState(false);
  const canUnlock = starsCollected >= totalRequired;

  const handleTurnKey = () => {
    if (!canUnlock || unlocking) return;
    setUnlocking(true);
    setTimeout(() => {
      onUnlock();
    }, 1800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(10, 14, 30, 0.92)', backdropFilter: 'blur(16px)' }}
    >
      <motion.div
        className="glass-dark rounded-3xl max-w-md w-full p-8 text-center relative border border-rosepink/30 shadow-2xl"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-lavender/60 hover:text-warmIvory text-sm px-2 py-1 rounded-full glass"
        >
          ✕
        </button>

        {/* Vault Icon */}
        <div className="relative my-6 flex justify-center">
          <motion.div
            className="w-36 h-36 rounded-full flex items-center justify-center relative"
            style={{
              background: canUnlock
                ? 'radial-gradient(circle, rgba(245,154,187,0.3) 0%, rgba(231,197,139,0.15) 60%, transparent 80%)'
                : 'radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%)',
              boxShadow: canUnlock ? '0 0 50px rgba(245,154,187,0.5)' : 'none',
            }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <motion.span
              className="text-7xl select-none"
              animate={unlocking ? { rotate: [0, -15, 15, 0], scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 1 }}
            >
              {canUnlock ? (unlocking ? '💖' : '💝') : '🔒'}
            </motion.span>
          </motion.div>
        </div>

        <h3 className="font-playfair text-2xl text-warmIvory mb-2">
          {canUnlock ? 'The Heart Vault Is Ready' : 'The Glass Heart Vault'}
        </h3>

        <p className="font-dm text-sm text-lavender/80 mb-6 leading-relaxed">
          {canUnlock
            ? 'Your four golden stars have forged a celestial key. Captain\'s full love letter awaits inside.'
            : 'Inside rests a handwritten letter from your Captain. Collect all 4 celestial stars from the universe activities to unlock it.'}
        </p>

        {/* Stars Progress Indicator */}
        <div className="glass rounded-xl p-3 flex items-center justify-center gap-3 mb-6">
          <span className="font-dm text-xs text-gold">Stars:</span>
          {Array.from({ length: totalRequired }).map((_, i) => (
            <span
              key={i}
              className={`text-lg transition-transform ${
                i < starsCollected ? 'text-gold scale-110 drop-shadow' : 'opacity-25'
              }`}
            >
              ⭐
            </span>
          ))}
          <span className="font-dm text-xs text-lavender/70 ml-2">
            ({starsCollected}/{totalRequired})
          </span>
        </div>

        {/* Action Button */}
        {canUnlock ? (
          <motion.button
            onClick={handleTurnKey}
            disabled={unlocking}
            className="w-full py-3.5 rounded-full font-dm text-sm font-semibold text-navy transition-all shadow-xl"
            style={{
              background: 'linear-gradient(135deg, #E7C58B, #F59ABB)',
              boxShadow: '0 4px 25px rgba(231,197,139,0.5)',
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {unlocking ? 'Opening Captain\'s Vault ✨...' : 'Turn Golden Key & Read Letter 💌'}
          </motion.button>
        ) : (
          <button
            onClick={onClose}
            className="w-full py-3 rounded-full font-dm text-sm text-warmIvory glass hover:border-lavender/50 transition-colors"
          >
            Continue Exploring Our World →
          </button>
        )}
      </motion.div>
    </div>
  );
}

