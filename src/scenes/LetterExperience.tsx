// src/scenes/LetterExperience.tsx
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { LetterPage } from '../components/LetterPage';
import { HiddenLoveNote } from '../components/HiddenLoveNote';
import { FloatingParticles } from '../components/FloatingParticles';
import { chapters } from '../config/content';
import { hiddenNotes } from '../config/content';

interface LetterExperienceProps {
  onComplete: () => void;
  startChapter?: number;
  endChapter?: number;
}

export function LetterExperience({ onComplete, startChapter = 0, endChapter }: LetterExperienceProps) {
  const lastChapterIdx = endChapter ?? chapters.length - 1;
  const slicedChapters = chapters.slice(startChapter, lastChapterIdx + 1);

  const [chapterIndex, setChapterIndex] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const currentChapter = slicedChapters[chapterIndex];
  const totalPages = currentChapter.pages.length;

  const goNext = () => {
    if (pageIndex < totalPages - 1) {
      setDirection(1);
      setPageIndex((p) => p + 1);
    } else if (chapterIndex < slicedChapters.length - 1) {
      setDirection(1);
      setChapterIndex((c) => c + 1);
      setPageIndex(0);
    } else {
      onComplete();
    }
  };

  const goPrev = () => {
    if (pageIndex > 0) {
      setDirection(-1);
      setPageIndex((p) => p - 1);
    } else if (chapterIndex > 0) {
      setDirection(-1);
      const prevChapter = slicedChapters[chapterIndex - 1];
      setChapterIndex((c) => c - 1);
      setPageIndex(prevChapter.pages.length - 1);
    }
  };

  const isVeryFirst = chapterIndex === 0 && pageIndex === 0;
  // For global chapter display (1-based including offset)
  const globalChapterIndex = startChapter + chapterIndex;

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at top, #FFF0F5 0%, #FFF5F7 60%, #FFE8F0 100%)',
      }}
    >
      <FloatingParticles opacity={0.25} />

      {/* Chapter progress bar */}
      <motion.div
        className="absolute top-0 left-0 h-1"
        style={{
          background: 'linear-gradient(90deg, #F8C8DC, #E9789C, #D4AF76)',
          width: `${((globalChapterIndex + 1) / chapters.length) * 100}%`,
          transition: 'width 0.5s ease',
          zIndex: 10,
        }}
      />

      {/* Top brand */}
      <motion.div
        className="absolute top-5 left-1/2 text-center"
        style={{ x: '-50%', zIndex: 10 }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <p className="font-vibes text-2xl" style={{ color: '#D4AF76' }}>
          To My Chubby, From Your Captain ❤️
        </p>
      </motion.div>

      {/* Hidden love notes — scattered around */}
      {hiddenNotes.map((note, i) => (
        <HiddenLoveNote
          key={note.id}
          icon={note.icon}
          message={note.message}
          color={note.color}
          style={{
            position: 'absolute',
            zIndex: 20,
            ...([
              { top: '12%', left: '4%' },
              { top: '50%', left: '3%' },
              { bottom: '12%', left: '6%' },
              { top: '15%', right: '4%' },
              { bottom: '15%', right: '5%' },
            ][i] ?? {}),
          }}
        />
      ))}

      {/* Main letter area */}
      <motion.div
        className="relative w-full max-w-3xl px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ zIndex: 5 }}
      >
        <LetterPage
          chapter={currentChapter}
          pageIndex={pageIndex}
          totalPages={totalPages}
          chapterIndex={globalChapterIndex}
          totalChapters={chapters.length}
          direction={direction}
          onPrev={goPrev}
          onNext={goNext}
        />
      </motion.div>

      {/* Bottom hint on first page */}
      <AnimatePresence>
        {isVeryFirst && (
          <motion.p
            className="absolute bottom-5 font-dm text-xs"
            style={{ color: '#C0A0A8', fontStyle: 'italic' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.5 }}
          >
            ✨ Click the little icons around the page — they have secrets for you ✨
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
