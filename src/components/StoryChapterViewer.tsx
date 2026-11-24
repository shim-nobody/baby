// src/components/StoryChapterViewer.tsx — Enchanted Double-Page Fairytale Storybook
// Inspired by Reference Image 2 (Illuminated Library Book) and Reference Image 3 (Clipped Polaroid Memory)
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StoryChapter, storyChapters } from '../config/content';
import { photos } from '../config/photos';

interface Props {
  initialChapterId: number;
  onClose: () => void;
  onOpenVault: () => void;
}

export function StoryChapterViewer({ initialChapterId, onClose, onOpenVault }: Props) {
  const [currentId, setCurrentId] = useState(initialChapterId);
  const [pageDirection, setPageDirection] = useState<'next' | 'prev'>('next');
  const [photoError, setPhotoError] = useState(false);

  const chapter = storyChapters.find(c => c.id === currentId) || storyChapters[0];
  const photoIndex = (currentId - 1) % photos.length;
  const currentPhoto = photos[photoIndex];

  const handleNext = () => {
    if (currentId < storyChapters.length) {
      setPageDirection('next');
      setPhotoError(false);
      setCurrentId(prev => prev + 1);
    } else {
      onOpenVault();
    }
  };

  const handlePrev = () => {
    if (currentId > 1) {
      setPageDirection('prev');
      setPhotoError(false);
      setCurrentId(prev => prev - 1);
    }
  };

  const handleJumpToChapter = (id: number) => {
    setPageDirection(id > currentId ? 'next' : 'prev');
    setPhotoError(false);
    setCurrentId(id);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-between overflow-hidden p-4 md:p-6 select-none"
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, #1c1335 0%, #0d1e38 55%, #050b18 100%)',
      }}
    >
      {/* ── TOP NAV BAR & CHAPTER BOOKMARK TABS ── */}
      <div className="w-full max-w-5xl flex items-center justify-between z-30">
        <button
          onClick={onClose}
          className="glass-cinematic px-4 py-2 rounded-full font-dm text-xs text-softIvory hover:border-champagnegold/60 transition-all flex items-center gap-1.5 cursor-pointer shadow-lg"
        >
          <span>←</span>
          <span>Return to Island</span>
        </button>

        {/* Chapter Ribbon Bookmark Tabs */}
        <div className="hidden sm:flex items-center gap-2">
          {storyChapters.map(ch => (
            <button
              key={ch.id}
              onClick={() => handleJumpToChapter(ch.id)}
              className={`px-3 py-1 rounded-t-lg font-dm text-xs transition-all cursor-pointer relative ${ch.id === currentId
                  ? 'bg-[#E8C88D] text-midnight font-bold shadow-lg scale-105'
                  : 'bg-white/10 text-softIvory/70 hover:bg-white/20'
                }`}
            >
              Ch. {ch.id}
              {ch.id === currentId && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#E8C88D] rotate-45" />
              )}
            </button>
          ))}
        </div>

        <div className="text-right">
          <span className="font-dm text-xs text-champagnegold font-semibold">
            Chapter {currentId} of {storyChapters.length}
          </span>
        </div>
      </div>

      {/* ── THE ENCHANTED DOUBLE-PAGE STORYBOOK ── */}
      <div className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-2 sm:my-4">
        {/* Soft shadow cast by the book */}
        <div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-11/12 h-14 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.85) 0%, rgba(13,30,56,0.3) 65%, transparent 85%)',
          }}
        />

        {/* The Open Leather Tome Container */}
        <div
          className="relative w-full h-[520px] md:h-[580px] rounded-3xl p-3 sm:p-5 flex shadow-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #2a1820 0%, #180d13 50%, #2a1820 100%)',
            border: '2px solid rgba(232, 200, 141, 0.45)',
            boxShadow: '0 25px 70px rgba(0,0,0,0.9), 0 0 40px rgba(232, 200, 141, 0.25)',
          }}
        >
          {/* Gold Filigree Corner Ornaments */}
          <span className="absolute top-3 left-3 text-champagnegold text-base opacity-75">⚜️</span>
          <span className="absolute top-3 right-3 text-champagnegold text-base opacity-75">⚜️</span>
          <span className="absolute bottom-3 left-3 text-champagnegold text-base opacity-75">⚜️</span>
          <span className="absolute bottom-3 right-3 text-champagnegold text-base opacity-75">⚜️</span>

          {/* Book Spine Center Crease with realistic shadow */}
          <div
            className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 z-20 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.35) 100%)',
            }}
          />

          {/* Hanging Red Silk Bookmark Ribbon */}
          <div
            className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-16 z-30 shadow-lg pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, #8b1e3f 0%, #c9184a 80%, #ff4d6d 100%)',
              clipPath: 'polygon(0 0, 100 0, 100% 85%, 50% 100%, 0 85%)',
            }}
          />

          {/* ── ANIMATED PAGE TURN TRANSITION ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={chapter.id}
              className="w-full h-full flex flex-col md:flex-row relative z-10"
              initial={{
                opacity: 0,
                rotateY: pageDirection === 'next' ? 18 : -18,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                rotateY: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                rotateY: pageDirection === 'next' ? -18 : 18,
                scale: 0.98,
              }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
            >
              {/* ── LEFT PARCHMENT PAGE: THE STORY LETTER ── */}
              <div
                className="w-full md:w-1/2 h-full rounded-l-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto pr-3 scroll-smooth"
                style={{
                  background: 'linear-gradient(to right, #FFF8EC 0%, #FDF4E2 85%, #EFE1C6 100%)',
                  borderRight: '1px solid rgba(138, 90, 54, 0.25)',
                  boxShadow: 'inset 0 0 35px rgba(138, 90, 54, 0.12)',
                }}
              >
                <div>
                  {/* Chapter Roman Crest & Title */}
                  <div className="border-b border-[#8A5A36]/25 pb-3 mb-4">
                    <span className="font-dm text-[11px] uppercase tracking-widest text-[#8A5A36] font-bold block">
                      Chapter {chapter.id} • {chapter.locationLabel}
                    </span>
                    <h2 className="font-playfair text-2xl sm:text-3xl text-[#342454] font-bold italic mt-1">
                      {chapter.title}
                    </h2>
                    <p className="font-playfair italic text-xs sm:text-sm text-[#7D3E53] mt-2 font-medium leading-relaxed bg-[#FFF6EE]/90 px-3.5 py-2 rounded-xl border border-[#E8C88D]/40 shadow-xs">
                      "{chapter.subtitle}"
                    </p>
                  </div>

                  {/* Story Paragraphs with Illuminated Drop Cap & Romantic Highlights */}
                  <div className="space-y-3.5 text-[#49333B] font-dm text-xs sm:text-sm leading-relaxed">
                    {chapter.paragraphs.map((p, idx) => {
                      if (idx === 0) {
                        const firstLetter = p.charAt(0);
                        const rest = p.slice(1);
                        return (
                          <p key={idx} className="leading-relaxed">
                            <span
                              className="float-left text-3xl sm:text-4xl font-playfair font-bold text-[#8A5A36] mr-2 -mt-1 leading-none p-1 rounded bg-[#E8C88D]/25 border border-[#8A5A36]/30"
                              style={{ textShadow: '0 0 5px rgba(232, 200, 141, 0.5)' }}
                            >
                              {firstLetter}
                            </span>
                            {rest}
                          </p>
                        );
                      }

                      // Highlighted emotional callout sentence (e.g. marked with **...**)
                      if (p.startsWith('**') && p.endsWith('**')) {
                        const cleanText = p.replace(/^\*\*|\*\*$/g, '');
                        return (
                          <div
                            key={idx}
                            className="my-4 p-4 rounded-xl bg-gradient-to-r from-[#F6ECDF] via-[#FFF9F0] to-[#F6ECDF] border-l-4 border-[#C29B53] shadow-md text-center"
                          >
                            <p className="font-playfair italic font-bold text-xs sm:text-sm md:text-base text-[#7D3E53] leading-relaxed">
                              "{cleanText}"
                            </p>
                          </div>
                        );
                      }

                      // Elegant sign-off line
                      if (p.startsWith('—')) {
                        return (
                          <p key={idx} className="font-playfair italic text-right text-[#7D3E53] font-semibold text-xs sm:text-sm pt-3 pr-2">
                            {p}
                          </p>
                        );
                      }

                      return <p key={idx}>{p}</p>;
                    })}
                  </div>
                </div>

                {/* Left Page Bottom: Poetic Quote Highlight */}
                {chapter.quoteHighlight && (
                  <div className="mt-4 p-3 rounded-xl bg-[#F6ECDF] border-l-4 border-[#C29B53] text-center">
                    <p className="font-playfair italic text-xs sm:text-sm text-[#342454] font-semibold">
                      "{chapter.quoteHighlight}"
                    </p>
                  </div>
                )}
              </div>

              {/* ── RIGHT PARCHMENT PAGE: MEMORY POLAROID & NEXT CHAPTER ── */}
              <div
                className="w-full md:w-1/2 h-full rounded-r-2xl p-6 sm:p-8 flex flex-col justify-between items-center text-center overflow-y-auto"
                style={{
                  background: 'linear-gradient(to left, #FFF8EC 0%, #FDF4E2 85%, #EFE1C6 100%)',
                  borderLeft: '1px solid rgba(138, 90, 54, 0.25)',
                  boxShadow: 'inset 0 0 35px rgba(138, 90, 54, 0.12)',
                }}
              >
                {/* ── CLIPPED MEMORY POLAROID (Homage to Reference Image 3) ── */}
                <div className="my-auto flex flex-col items-center">
                  <motion.div
                    className="relative p-3 pb-3 rounded-sm shadow-2xl transition-all cursor-pointer group"
                    style={{
                      width: 220,
                      background: '#FFFFFF',
                      border: '1px solid #E2D9CC',
                      boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
                      rotate: 3,
                    }}
                    whileHover={{ scale: 1.05, rotate: 0 }}
                  >
                    {/* Wooden Clothespin Peg (From Image 3) */}
                    <div
                      className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-7 rounded-t-sm shadow-md z-20 flex flex-col items-center justify-between py-0.5"
                      style={{ background: '#C29B53', border: '1px solid #A87D38' }}
                    >
                      <div className="w-full h-1 bg-black/40 mt-1" />
                      <div className="text-[10px] -mt-1 text-champagnegold">🎀</div>
                    </div>

                    {/* Polaroid Photo Image */}
                    <div className="w-full h-44 rounded-sm overflow-hidden bg-[#241530] flex items-center justify-center relative">
                      {!photoError ? (
                        <img
                          src={currentPhoto.src}
                          alt="Memory"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={() => setPhotoError(true)}
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center p-3 text-center">
                          <span className="text-3xl mb-1">💑</span>
                          <span className="font-playfair text-[11px] text-champagnegold italic">
                            Captain & Chubby
                          </span>
                        </div>
                      )}
                      {/* Photo Glare */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                    </div>
                  </motion.div>
                </div>

                {/* ── BOTTOM CONTROLS & "NEXT CHAPTER" BUTTON (Upgraded Style) ── */}
                <div className="w-full flex items-center justify-between pt-4 border-t border-[#8A5A36]/25 mt-4">
                  <button
                    onClick={handlePrev}
                    disabled={currentId === 1}
                    className="px-4 py-2 rounded-full font-dm text-xs text-[#49333B] hover:bg-black/5 disabled:opacity-20 transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span>←</span>
                    <span>Previous Page</span>
                  </button>

                  {/* Upgraded "Next Chapter" Wax Seal Button */}
                  <motion.button
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-full font-dm text-xs sm:text-sm font-semibold transition-all shadow-xl cursor-pointer flex items-center gap-2"
                    style={{
                      background:
                        currentId === storyChapters.length
                          ? 'linear-gradient(135deg, #FFF6EE 0%, #E8C88D 50%, #F4B8A4 100%)'
                          : 'linear-gradient(135deg, #7D3E53 0%, #492837 100%)',
                      color: currentId === storyChapters.length ? '#0B1026' : '#FFF6EE',
                      boxShadow:
                        currentId === storyChapters.length
                          ? '0 0 25px rgba(232, 200, 141, 0.7)'
                          : '0 4px 20px rgba(125, 62, 83, 0.4)',
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>
                      {currentId === storyChapters.length ? 'Unlock Final Heart Vault 💖' : 'Turn Page to Chapter ' + (currentId + 1) + ' →'}
                    </span>
                    <span className="text-sm">✨</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── BOTTOM INSTRUCTION ── */}
      <div className="text-center z-20">
        <span className="font-dm text-[11px] text-softIvory/50">
          Use the buttons or top tabs to turn pages • Click "Return to Island" to explore the 3D world
        </span>
      </div>
    </div>
  );
}
