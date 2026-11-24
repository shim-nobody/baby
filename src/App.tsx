// src/App.tsx — The Universe Where I Found You
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IntroScene } from './scenes/IntroScene';
import { UniverseScene } from './scenes/UniverseScene';
import { FinaleScene } from './scenes/FinaleScene';

type SceneMode = 'intro' | 'universe' | 'finale';

export default function App() {
  const [scene, setScene] = useState<SceneMode>('intro');

  return (
    <main className="w-full h-full relative overflow-hidden bg-midnight select-none">
      <AnimatePresence mode="wait">
        {scene === 'intro' && (
          <SceneTransition key="intro">
            <IntroScene onOpenUniverse={() => setScene('universe')} />
          </SceneTransition>
        )}

        {scene === 'universe' && (
          <SceneTransition key="universe">
            <UniverseScene onOpenCelebration={() => setScene('finale')} />
          </SceneTransition>
        )}

        {scene === 'finale' && (
          <SceneTransition key="finale">
            <FinaleScene onRestart={() => setScene('universe')} />
          </SceneTransition>
        )}
      </AnimatePresence>
    </main>
  );
}

function SceneTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="absolute inset-0 w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}
