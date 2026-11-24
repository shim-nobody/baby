// src/components/HiddenLoveNote.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface HiddenLoveNoteProps {
  icon: string;
  message: string;
  color: string;
  style?: React.CSSProperties;
}

export function HiddenLoveNote({ icon, message, color, style }: HiddenLoveNoteProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="relative" style={style}>
      {/* Trigger button */}
      <motion.button
        onClick={() => setRevealed((r: boolean) => !r)}
        className="relative text-2xl select-none cursor-pointer border-none bg-transparent p-0"
        whileHover={{ scale: 1.3, rotate: 15 }}
        whileTap={{ scale: 0.85 }}
        animate={
          revealed
            ? {}
            : { y: [0, -6, 0], rotate: [-5, 5, -5] }
        }
        transition={
          revealed
            ? {}
            : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
        }
        title="Click me ✨"
      >
        {icon}
      </motion.button>

      {/* Revealed note */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            className="absolute z-30 bottom-full mb-3 left-1/2 whitespace-nowrap"
            style={{ x: '-50%' }}
            initial={{ opacity: 0, y: 10, scale: 0.6 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.6 }}
            transition={{ type: 'spring', damping: 15, stiffness: 300 }}
          >
            <div
              className="relative px-4 py-2.5 rounded-2xl font-dm text-sm shadow-xl text-white text-center max-w-xs"
              style={{
                background: `linear-gradient(135deg, ${color}, #fff2)`,
                border: `1.5px solid ${color}`,
                backdropFilter: 'blur(8px)',
                boxShadow: `0 8px 24px ${color}66`,
              }}
            >
              {message}
              {/* Triangle pointer */}
              <div
                className="absolute top-full left-1/2"
                style={{
                  transform: 'translateX(-50%)',
                  borderLeft: '8px solid transparent',
                  borderRight: '8px solid transparent',
                  borderTop: `8px solid ${color}`,
                  width: 0,
                  height: 0,
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
