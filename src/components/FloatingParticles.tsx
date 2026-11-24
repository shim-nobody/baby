// src/components/FloatingParticles.tsx
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  emoji: string;
}

function generateParticles(count: number): Particle[] {
  const emojis = ['❤️', '💕', '💗', '🌸', '✨', '💫', '🌹'];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 16 + 10,
    delay: Math.random() * 4,
    duration: Math.random() * 4 + 5,
    emoji: emojis[Math.floor(Math.random() * emojis.length)],
  }));
}

const particles = generateParticles(18);

export function FloatingParticles({ opacity = 0.5 }: { opacity?: number }) {
  const reduced = useReducedMotion();
  if (reduced) return null;

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" style={{ opacity }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute select-none"
          style={{ left: `${p.x}%`, top: `${p.y}%`, fontSize: p.size }}
          animate={{
            y: [0, -30, 0],
            rotate: [-10, 10, -10],
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  );
}

