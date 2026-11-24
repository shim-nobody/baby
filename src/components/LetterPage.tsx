// src/components/LetterPage.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { Chapter } from '../config/content';

interface LetterPageProps {
  chapter: Chapter;
  pageIndex: number;
  totalPages: number;
  chapterIndex: number;
  totalChapters: number;
  direction: number;
  onPrev: () => void;
  onNext: () => void;
}

const pageVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
    rotateY: dir > 0 ? 8 : -8,
  }),
  center: { x: 0, opacity: 1, rotateY: 0 },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
    rotateY: dir > 0 ? -8 : 8,
  }),
};

export function LetterPage({
  chapter,
  pageIndex,
  totalPages,
  chapterIndex,
  totalChapters,
  direction,
  onPrev,
  onNext,
}: LetterPageProps) {
  const paragraphs = chapter.pages[pageIndex] ?? chapter.pages[0];
  const isFirstPage = chapterIndex === 0 && pageIndex === 0;
  const isLastChapterPage =
    chapterIndex === totalChapters - 1 &&
    pageIndex === totalPages - 1;

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full h-full"
      style={{ perspective: '1500px' }}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={`${chapterIndex}-${pageIndex}`}
          custom={direction}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative w-full max-w-2xl paper-texture letter-shadow rounded-2xl"
          style={{
            background: 'linear-gradient(160deg, #FFFDF8 0%, #FFF9F0 60%, #FFFAF2 100%)',
            transformStyle: 'preserve-3d',
            minHeight: 500,
            maxHeight: 'calc(100vh - 220px)',
          }}
        >
          {/* Top decorative border */}
          <div
            className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl"
            style={{
              background: 'linear-gradient(90deg, #F8C8DC, #D4AF76, #E9789C, #D4AF76, #F8C8DC)',
            }}
          />

          {/* Corner decorations */}
          <div className="absolute top-4 left-4 text-xl opacity-40 select-none">🌸</div>
          <div className="absolute top-4 right-4 text-xl opacity-40 select-none">🌸</div>
          <div className="absolute bottom-14 left-4 text-xl opacity-30 select-none">❤️</div>
          <div className="absolute bottom-14 right-4 text-xl opacity-30 select-none">❤️</div>

          {/* Chapter badge */}
          <div className="flex justify-center pt-6 pb-2">
            <div
              className="px-4 py-1 rounded-full text-xs font-dm tracking-widest uppercase"
              style={{
                background: 'linear-gradient(135deg, #F8C8DC, #E9789C)',
                color: '#fff',
                boxShadow: '0 2px 8px rgba(228,120,156,0.35)',
              }}
            >
              Chapter {chapterIndex + 1} of {totalChapters} {chapter.decorativeEmoji}
            </div>
          </div>

          {/* Title */}
          <h2
            className="font-playfair text-center px-8 pb-4"
            style={{
              fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)',
              color: '#C45C7A',
              fontStyle: 'italic',
              lineHeight: 1.3,
            }}
          >
            {chapter.title}
          </h2>

          {/* Divider */}
          <div className="flex items-center justify-center gap-3 pb-5 px-8">
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, #E9789C)' }} />
            <span className="text-sm select-none">❧</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, #E9789C, transparent)' }} />
          </div>

          {/* Letter body */}
          <div
            className="letter-body px-10 pb-6"
            style={{
              maxHeight: 'calc(100vh - 380px)',
              overflowY: 'auto',
            }}
          >
            {paragraphs.map((para, i) => (
              <p
                key={i}
                className="font-dm mb-4 leading-relaxed"
                style={{
                  fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
                  color: '#49333B',
                  lineHeight: 1.85,
                  fontStyle: isLastChapterPage && i >= paragraphs.length - 3 ? 'italic' : 'normal',
                  fontWeight: isLastChapterPage && i === paragraphs.length - 1 ? 500 : 400,
                }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Page indicator dots */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-1.5 pb-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === pageIndex ? 20 : 6,
                    height: 6,
                    background: i === pageIndex ? '#E9789C' : '#F8C8DC',
                  }}
                />
              ))}
            </div>
          )}

          {/* Bottom navigation */}
          <div className="flex items-center justify-between px-8 py-4 mt-auto border-t" style={{ borderColor: '#F8C8DC' }}>
            <button
              onClick={onPrev}
              disabled={isFirstPage}
              className="flex items-center gap-2 px-4 py-2 rounded-full font-dm text-sm transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background: isFirstPage ? 'transparent' : 'linear-gradient(135deg, #F8C8DC, #E9789C)',
                color: isFirstPage ? '#C0A0A8' : '#fff',
                boxShadow: isFirstPage ? 'none' : '0 2px 10px rgba(228,120,156,0.3)',
              }}
            >
              ← Previous
            </button>

            <span className="font-dm text-xs" style={{ color: '#B08090' }}>
              {pageIndex + 1} / {totalPages}
            </span>

            <button
              onClick={onNext}
              className="flex items-center gap-2 px-4 py-2 rounded-full font-dm text-sm transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #E9789C, #C45C7A)',
                color: '#fff',
                boxShadow: '0 2px 10px rgba(228,120,156,0.3)',
              }}
            >
            {isLastChapterPage ? 'Continue →' : 'Next →'}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
