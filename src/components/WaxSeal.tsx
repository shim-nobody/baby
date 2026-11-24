// src/components/WaxSeal.tsx
import { motion } from 'framer-motion';

interface WaxSealProps {
  broken: boolean;
  onClick: () => void;
}

export function WaxSeal({ broken, onClick }: WaxSealProps) {
  return (
    <motion.div
      className="absolute left-1/2 cursor-pointer select-none"
      style={{ bottom: '-22px', x: '-50%', zIndex: 10 }}
      onClick={onClick}
      whileHover={{ scale: broken ? 1 : 1.08 }}
      whileTap={{ scale: 0.92 }}
    >
      {!broken ? (
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ scale: 1 }}
          animate={{ rotate: [0, -3, 3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Wax seal body */}
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
            style={{
              background: 'radial-gradient(circle at 35% 35%, #E9789C, #C45C7A, #9B2C4A)',
              boxShadow: '0 4px 16px rgba(196,92,122,0.5), inset 0 2px 4px rgba(255,255,255,0.3)',
            }}
          >
            <span className="text-2xl select-none">❤️</span>
          </div>
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 60%)',
              pointerEvents: 'none',
            }}
          />
          {/* Shimmer ring */}
          <motion.div
            className="absolute inset-[-4px] rounded-full"
            style={{ border: '1.5px solid rgba(212,175,118,0.6)' }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      ) : (
        /* Broken seal pieces */
        <div className="relative w-16 h-16">
          <motion.div
            className="absolute w-9 h-9 rounded-tl-full rounded-tr-full"
            style={{
              background: 'radial-gradient(circle, #E9789C, #C45C7A)',
              top: 0,
              left: 0,
            }}
            initial={{ rotate: 0, x: 0, y: 0, opacity: 1 }}
            animate={{ rotate: -40, x: -12, y: -10, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
          <motion.div
            className="absolute w-9 h-9 rounded-tr-full rounded-br-full"
            style={{
              background: 'radial-gradient(circle, #C45C7A, #9B2C4A)',
              bottom: 0,
              right: 0,
            }}
            initial={{ rotate: 0, x: 0, y: 0, opacity: 1 }}
            animate={{ rotate: 40, x: 12, y: 10, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      )}
    </motion.div>
  );
}

