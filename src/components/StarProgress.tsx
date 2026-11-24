// src/components/StarProgress.tsx — HUD star collector
import { motion, AnimatePresence } from 'framer-motion';

interface StarProgressProps {
  total: number;    // max 4
  earned: number;
}

export function StarProgress({ total = 4, earned }: StarProgressProps) {
  return (
    <div
      className="fixed top-5 right-5 z-30 glass rounded-2xl px-4 py-2.5 flex items-center gap-2 select-none"
      title={`${earned} of ${total} stars collected`}
    >
      <span className="font-dm text-xs" style={{ color: '#E7C58B' }}>Stars</span>
      {Array.from({ length: total }).map((_, i) => (
        <AnimatePresence key={i}>
          {i < earned ? (
            <motion.div
              key="earned"
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              className="text-base select-none"
              style={{ filter: 'drop-shadow(0 0 6px #E7C58B)' }}
            >
              ⭐
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              className="text-base select-none opacity-25"
            >
              ☆
            </motion.div>
          )}
        </AnimatePresence>
      ))}
      {earned >= total && (
        <motion.span
          className="text-xs font-dm ml-1"
          style={{ color: '#E7C58B' }}
          initial={{ opacity: 0, x: 6 }}
          animate={{ opacity: 1, x: 0 }}
        >
          ✨ Full
        </motion.span>
      )}
    </div>
  );
}

