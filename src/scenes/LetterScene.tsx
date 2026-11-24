// src/scenes/LetterScene.tsx — The Complete Emotional Love Letter (Chapters 1 to 7)
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarField } from '../components/StarField';
import { MusicControl } from '../components/MusicControl';
import { chapters } from '../config/content';

interface Props {
  onFinishLetter: () => void;
  onBackToUniverse: () => void;
}

export function LetterScene({ onFinishLetter, onBackToUniverse }: Props) {
  const [currentChapter, setCurrentChapter] = useState(0);
  const chapter = chapters[currentChapter];
  const isFinalChapter = currentChapter === chapters.length - 1;

  const handleNext = () => {
    if (currentChapter < chapters.length - 1) {
      setCurrentChapter((prev: number) => prev + 1);
    } else {
      onFinishLetter();
    }
  };

  const handlePrev = () => {
    if (currentChapter > 0) {
      setCurrentChapter((prev: number) => prev - 1);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 25%, #241647 0%, #10152F 70%, #090c1c 100%)',
      }}
    >
      <StarField count={150} />
      <MusicControl />

      {/* Top Bar Navigation */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
        <button
          onClick={onBackToUniverse}
          className="glass px-4 py-2 rounded-full font-dm text-xs text-lavender/70 hover:text-warmIvory transition-colors flex items-center gap-1.5"
        >
          ← Return to Universe
        </button>

        <div className="flex items-center gap-1">
          {chapters.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentChapter(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                idx === currentChapter
                  ? 'bg-gold w-6 shadow-[0_0_8px_#E7C58B]'
                  : 'bg-lavender/25 hover:bg-lavender/50'
              }`}
              title={`Chapter ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Main Parchment Letter Sheet */}
      <AnimatePresence mode="wait">
        <motion.div
          key={chapter.id}
          className="relative max-w-2xl w-[92vw] rounded-3xl letter-scroll my-auto shadow-2xl z-10"
          style={{
            maxHeight: 'calc(100vh - 120px)',
            background: 'linear-gradient(165deg, #FFFDF8 0%, #FFF8EF 55%, #F7ECDC 100%)',
            border: '2px solid rgba(231,197,139,0.7)',
            boxShadow: '0 25px 70px rgba(0,0,0,0.7), 0 0 50px rgba(231,197,139,0.25)',
          }}
          initial={{ opacity: 0, y: 25, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.96 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          {/* Decorative Gold Header Border */}
          <div
            className="w-full h-2 rounded-t-3xl"
            style={{
              background: 'linear-gradient(90deg, #F59ABB, #E7C58B, #A78BFA, #E7C58B, #F59ABB)',
            }}
          />

          <div className="p-8 md:p-12">
            {/* Chapter Header */}
            <div className="text-center mb-6">
              <span className="font-dm text-[11px] font-semibold uppercase tracking-widest text-[#9A783A] block mb-1">
                Chapter {chapter.id} of {chapters.length} {chapter.emoji}
              </span>
              <h2 className="font-playfair text-2xl md:text-3xl text-[#39275C] font-semibold italic">
                {chapter.title}
              </h2>
              <div className="w-16 h-0.5 bg-[#E7C58B] mx-auto mt-3 rounded-full opacity-70" />
            </div>

            {/* Complete Unabridged Text Paragraphs */}
            <div className="space-y-4 my-6">
              {chapter.paragraphs.map((para, i) => (
                <p
                  key={i}
                  className="font-dm text-sm md:text-base text-[#49333B] leading-relaxed"
                  style={{
                    fontStyle:
                      isFinalChapter && i >= chapter.paragraphs.length - 3
                        ? 'italic'
                        : 'normal',
                    fontWeight:
                      isFinalChapter && i === chapter.paragraphs.length - 1
                        ? 600
                        : 400,
                  }}
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Bottom Actions inside the Letter */}
            <div className="flex items-center justify-between pt-6 mt-8 border-t border-[#E7C58B]/40">
              <button
                onClick={handlePrev}
                disabled={currentChapter === 0}
                className="px-5 py-2 rounded-full font-dm text-xs md:text-sm text-[#49333B] transition-all disabled:opacity-20 disabled:cursor-not-allowed hover:bg-black/5"
              >
                ← Previous
              </button>

              <span className="font-dm text-xs text-[#9A783A]">
                {currentChapter + 1} / {chapters.length}
              </span>

              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-full font-dm text-xs md:text-sm font-semibold transition-all shadow-md hover:scale-105"
                style={{
                  background: isFinalChapter
                    ? 'linear-gradient(135deg, #F59ABB, #E7C58B)'
                    : 'linear-gradient(135deg, #7D3E53, #492837)',
                  color: isFinalChapter ? '#10152F' : '#FFF7ED',
                }}
              >
                {isFinalChapter ? 'One Last Surprise, Baby 🎁' : 'Next Chapter →'}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
