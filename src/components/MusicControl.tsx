// src/components/MusicControl.tsx — Romantic Background Music Toggle
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export function MusicControl() {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const audio = new Audio('/audio/background.mp3');
    audio.loop = true;
    audio.volume = 0.35;
    audio.addEventListener('error', () => setAvailable(false));
    ref.current = audio;
    return () => {
      audio.pause();
    };
  }, []);

  if (!available) return null;

  const toggle = () => {
    if (!ref.current) return;
    if (playing) {
      ref.current.pause();
      setPlaying(false);
    } else {
      ref.current.play().catch(() => setAvailable(false));
      setPlaying(true);
    }
  };

  return (
    <motion.button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full glass-cinematic flex items-center justify-center cursor-pointer shadow-xl"
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.9 }}
      title={playing ? 'Mute music' : 'Play music'}
      style={{
        border: `1.5px solid ${playing ? '#E8C88D' : 'rgba(232,200,141,0.35)'}`,
        boxShadow: playing ? '0 0 20px rgba(232,200,141,0.5)' : 'none',
      }}
    >
      {playing ? (
        <div className="flex gap-1 items-end h-4">
          {[1, 2, 3].map(i => (
            <motion.div
              key={i}
              className="w-1 rounded-sm"
              style={{ background: '#E8C88D' }}
              animate={{ height: ['5px', '16px', '5px'] }}
              transition={{ duration: 0.5, delay: i * 0.12, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>
      ) : (
        <span className="text-lg select-none">🎵</span>
      )}
    </motion.button>
  );
}
