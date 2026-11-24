// src/components/MusicToggle.tsx
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const audio = new Audio('/audio/romantic-background.mp3');
    audio.loop = true;
    audio.volume = 0.35;

    audio.addEventListener('error', () => setAvailable(false));
    audio.addEventListener('canplaythrough', () => setAvailable(true));

    audioRef.current = audio;
    return () => {
      audio.pause();
    };
  }, []);

  const toggle = () => {
    if (!audioRef.current || !available) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => setAvailable(false));
    }
    setPlaying((p) => !p);
  };

  if (!available) return null;

  return (
    <motion.button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
      style={{
        background: playing
          ? 'linear-gradient(135deg, #E9789C, #C45C7A)'
          : 'rgba(255,255,255,0.85)',
        border: '1.5px solid #E9789C',
        backdropFilter: 'blur(8px)',
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={playing ? 'Pause music' : 'Play music'}
    >
      {playing ? (
        <motion.div
          className="flex gap-0.5 items-end h-5"
          animate={{}}
        >
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-1 rounded-sm"
              style={{ background: '#fff' }}
              animate={{ height: ['8px', '20px', '8px'] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>
      ) : (
        <span className="text-lg select-none">🎵</span>
      )}
    </motion.button>
  );
}

