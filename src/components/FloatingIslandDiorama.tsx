// src/components/FloatingIslandDiorama.tsx — Rich Isometric Fantasy Island Diorama
// Inspired by Japanese architectural miniature diorama, glowing waterfall, cherry blossoms & starry sky
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onSelectLandmark: (landmark: string) => void;
  starsCollected: number;
}

export function FloatingIslandDiorama({ onSelectLandmark, starsCollected }: Props) {
  const [hoveredLandmark, setHoveredLandmark] = useState<string | null>(null);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none overflow-hidden">
      {/* ── AMBIENT DRIFTING PARTICLES & LANTERNS ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating Paper Sky Lanterns */}
        {[
          { left: '15%', delay: '0s', dur: '16s' },
          { left: '78%', delay: '4s', dur: '18s' },
          { left: '85%', delay: '9s', dur: '14s' },
          { left: '25%', delay: '12s', dur: '20s' },
        ].map((lantern, idx) => (
          <div
            key={idx}
            className="animate-lantern-float absolute bottom-0 flex flex-col items-center"
            style={{
              left: lantern.left,
              animationDelay: lantern.delay,
              animationDuration: lantern.dur,
            }}
          >
            <div
              className="w-5 h-7 rounded-sm relative shadow-lg"
              style={{
                background: 'linear-gradient(180deg, #FFE0A6 0%, #E8A856 70%, #A85A22 100%)',
                boxShadow: '0 0 16px rgba(232, 168, 86, 0.8), 0 0 35px rgba(244, 184, 164, 0.4)',
              }}
            >
              <div className="absolute inset-x-1 bottom-1 h-1 bg-white/70 rounded-full animate-pulse" />
            </div>
            <div className="w-1 h-2 bg-champagnegold/40" />
          </div>
        ))}

        {/* Drifting Cherry Blossom Petals */}
        {Array.from({ length: 18 }).map((_, idx) => (
          <div
            key={idx}
            className="animate-petal absolute text-base select-none pointer-events-none"
            style={{
              left: `${(idx * 7) % 95}%`,
              top: '-5%',
              '--dur': `${8 + (idx % 6)}s`,
              '--delay': `${(idx * 0.8) % 5}s`,
            } as React.CSSProperties}
          >
            🌸
          </div>
        ))}
      </div>

      {/* ── THE COMPLETE FLOATING ISLAND DIORAMA (65–75% of viewport) ── */}
      <motion.div
        className="relative w-[92vw] max-w-[960px] h-[72vh] max-h-[640px] flex items-center justify-center"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Soft Ethereal Ground Glow under island */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
          style={{
            width: '80%',
            height: '25%',
            background: 'radial-gradient(ellipse, rgba(52,36,84,0.7) 0%, rgba(11,16,38,0.3) 60%, transparent 80%)',
            filter: 'blur(25px)',
          }}
        />

        {/* ── SVG ART: DETAILED ISOMETRIC ISLAND & ARCHITECTURE ── */}
        <svg
          viewBox="0 0 1000 700"
          className="w-full h-full filter drop-shadow-[0_30px_60px_rgba(0,0,0,0.85)]"
          style={{ overflow: 'visible' }}
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="grassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4A6547" />
              <stop offset="50%" stopColor="#324A30" />
              <stop offset="100%" stopColor="#20331E" />
            </linearGradient>
            <linearGradient id="cliffGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2E2838" />
              <stop offset="40%" stopColor="#221C2C" />
              <stop offset="80%" stopColor="#171220" />
              <stop offset="100%" stopColor="#0D0914" />
            </linearGradient>
            <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2DE2E6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#028090" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#0B2B38" />
            </linearGradient>
            <linearGradient id="roofGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B5A59" />
              <stop offset="50%" stopColor="#243E3E" />
              <stop offset="100%" stopColor="#162929" />
            </linearGradient>
            <linearGradient id="timberGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5A3A2C" />
              <stop offset="100%" stopColor="#331E15" />
            </linearGradient>
            <linearGradient id="sakuraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFAEC8" />
              <stop offset="50%" stopColor="#F59ABB" />
              <stop offset="100%" stopColor="#D98FA8" />
            </linearGradient>
            <linearGradient id="goldGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF6EE" />
              <stop offset="50%" stopColor="#E8C88D" />
              <stop offset="100%" stopColor="#A87A36" />
            </linearGradient>
            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* ── 1. FLOATING ROCK CLIFF BASE (STRATA & HANGING VINES) ── */}
          <path
            d="M 220 480 Q 150 530 240 600 Q 320 660 500 680 Q 680 660 760 600 Q 850 530 780 480 Q 820 440 760 410 L 240 410 Z"
            fill="url(#cliffGrad)"
            stroke="#4A3D5E"
            strokeWidth="2"
          />
          {/* Rock strata highlights */}
          <path d="M 260 520 Q 360 560 500 550 Q 640 560 740 510" stroke="#3D324F" strokeWidth="3" fill="none" />
          <path d="M 300 570 Q 420 610 500 600 Q 580 610 700 565" stroke="#251C33" strokeWidth="4" fill="none" />
          {/* Hanging starlight crystal stalactites under the island */}
          <polygon points="480,670 485,710 490,670" fill="#E8C88D" opacity="0.8" filter="url(#softGlow)" />
          <polygon points="520,660 524,695 528,660" fill="#F4B8A4" opacity="0.7" />
          <polygon points="440,650 443,680 447,650" fill="#D98FA8" opacity="0.7" />

          {/* ── 2. UPPER LUSH GREEN ISLAND DIORAMA PLATFORM ── */}
          <path
            d="M 180 420 C 180 370, 320 330, 500 330 C 680 330, 820 370, 820 420 C 820 470, 680 510, 500 510 C 320 510, 180 470, 180 420 Z"
            fill="url(#grassGrad)"
            stroke="#678D63"
            strokeWidth="3"
          />

          {/* ── 3. CRYSTAL CELESTIAL POND & REFLECTIONS ── */}
          <path
            d="M 380 420 C 380 390, 440 370, 530 370 C 620 370, 680 390, 680 420 C 680 450, 620 470, 530 470 C 440 470, 380 450, 380 420 Z"
            fill="url(#waterGrad)"
            stroke="#5DE4E8"
            strokeWidth="2"
          />
          {/* Water ripples and lily pads */}
          <ellipse cx="480" cy="415" rx="14" ry="7" fill="#204A26" stroke="#4DA058" strokeWidth="1" />
          <ellipse cx="580" cy="430" rx="18" ry="9" fill="#204A26" stroke="#4DA058" strokeWidth="1" />
          <circle cx="585" cy="428" r="3" fill="#FFAEC8" />

          {/* ── 4. CASCADING GLOWING WATERFALL (LEFT CLIFF) ── */}
          <g
            id="landmark-waterfall"
            className="cursor-pointer group"
            onMouseEnter={() => setHoveredLandmark('waterfall')}
            onMouseLeave={() => setHoveredLandmark(null)}
            onClick={() => onSelectLandmark('waterfall')}
          >
            {/* Waterfall cliff face */}
            <path d="M 230 330 L 270 330 L 290 440 L 220 440 Z" fill="#1C1826" />
            {/* Waterfall stream */}
            <path
              d="M 245 330 Q 255 380 250 435 Q 265 435 270 435 Q 275 380 265 330 Z"
              fill="#64DFDF"
              opacity="0.85"
              className="animate-waterfall"
              filter="url(#softGlow)"
            />
            {/* Foaming splash at pond base */}
            <ellipse cx="260" cy="440" rx="28" ry="10" fill="#E0FBFC" opacity="0.8" />
          </g>

          {/* ── 5. WOODEN FOOTBRIDGE ACROSS THE STREAM ── */}
          <g
            id="landmark-bridge"
            className="cursor-pointer group"
            onMouseEnter={() => setHoveredLandmark('bridge')}
            onMouseLeave={() => setHoveredLandmark(null)}
            onClick={() => onSelectLandmark('bridge')}
          >
            {/* Arched wooden bridge */}
            <path
              d="M 450 455 Q 510 440 570 455 L 565 470 Q 510 455 455 470 Z"
              fill="url(#timberGrad)"
              stroke="#D4A860"
              strokeWidth="2"
            />
            {/* Bridge planks */}
            <line x1="475" y1="452" x2="477" y2="466" stroke="#8A5A36" strokeWidth="2" />
            <line x1="510" y1="448" x2="510" y2="463" stroke="#8A5A36" strokeWidth="2" />
            <line x1="545" y1="452" x2="543" y2="466" stroke="#8A5A36" strokeWidth="2" />
            {/* Bridge Lantern post */}
            <line x1="508" y1="448" x2="508" y2="430" stroke="#E8C88D" strokeWidth="2" />
            <circle cx="508" cy="428" r="5" fill="#FFE0A6" filter="url(#softGlow)" />
          </g>

          {/* ── 6. COZY TWO-STORY JAPANESE COTTAGE (CENTER-LEFT) ── */}
          <g
            id="landmark-cottage"
            className="cursor-pointer group"
            onMouseEnter={() => setHoveredLandmark('cottage')}
            onMouseLeave={() => setHoveredLandmark(null)}
            onClick={() => onSelectLandmark('cottage')}
          >
            {/* Lower floor walls */}
            <rect x="330" y="270" width="130" height="90" fill="#FFFDF8" stroke="#42281D" strokeWidth="3" rx="4" />
            {/* Timber framing */}
            <line x1="375" y1="270" x2="375" y2="360" stroke="#5A3A2C" strokeWidth="3" />
            <line x1="420" y1="270" x2="420" y2="360" stroke="#5A3A2C" strokeWidth="3" />

            {/* Warm Candlelit Lower Shoji Windows (Glowing) */}
            <rect x="340" y="285" width="30" height="40" fill="#FFEAA7" filter="url(#softGlow)" rx="2" />
            <rect x="385" y="285" width="30" height="40" fill="#FFEAA7" filter="url(#softGlow)" rx="2" />
            {/* Window windowpane lattice */}
            <line x1="355" y1="285" x2="355" y2="325" stroke="#8A5A36" strokeWidth="1.5" />
            <line x1="340" y1="305" x2="370" y2="305" stroke="#8A5A36" strokeWidth="1.5" />
            <line x1="400" y1="285" x2="400" y2="325" stroke="#8A5A36" strokeWidth="1.5" />
            <line x1="385" y1="305" x2="415" y2="305" stroke="#8A5A36" strokeWidth="1.5" />

            {/* Mid-tier awning roof */}
            <polygon points="310,270 480,270 460,250 330,250" fill="url(#roofGrad)" stroke="#162929" strokeWidth="2" />

            {/* Upper floor story */}
            <rect x="340" y="195" width="110" height="60" fill="#FFFDF8" stroke="#42281D" strokeWidth="3" rx="3" />
            {/* Upper floor balcony railing */}
            <line x1="335" y1="240" x2="455" y2="240" stroke="#C29B53" strokeWidth="3" />
            {/* Upper story lit window with romantic silhouette */}
            <rect x="375" y="205" width="40" height="30" fill="#FFD166" filter="url(#softGlow)" rx="2" />
            {/* Subtle silhouette of someone sitting by the window */}
            <ellipse cx="395" cy="225" rx="6" ry="8" fill="#5A3A2C" />
            <circle cx="395" cy="214" r="4" fill="#5A3A2C" />

            {/* Main gabled Japanese roof */}
            <polygon points="315,200 395,130 475,200 465,205 395,145 325,205" fill="url(#roofGrad)" stroke="#162929" strokeWidth="3" />
            <polygon points="325,200 395,140 465,200" fill="#1C3333" />

            {/* Stone chimney with soft smoke */}
            <rect x="425" y="140" width="14" height="30" fill="#4A3D5E" stroke="#251C33" strokeWidth="2" />
            <circle cx="432" cy="125" r="5" fill="#FFF6EE" opacity="0.4" className="animate-pulse" />
            <circle cx="436" cy="112" r="8" fill="#FFF6EE" opacity="0.3" className="animate-pulse" />
          </g>

          {/* ── 7. CHERRY BLOSSOM SAKURA TREES (LEFT & RIGHT) ── */}
          <g
            id="landmark-tree"
            className="cursor-pointer group"
            onMouseEnter={() => setHoveredLandmark('tree')}
            onMouseLeave={() => setHoveredLandmark(null)}
            onClick={() => onSelectLandmark('tree')}
          >
            {/* Right Large Sakura Tree Trunk */}
            <path
              d="M 680 440 Q 690 350 670 280 Q 640 240 620 220 M 670 280 Q 720 250 760 220"
              stroke="#4A2E1F"
              strokeWidth="20"
              strokeLinecap="round"
              fill="none"
            />
            {/* Right Sakura Tree Canopy Clouds */}
            <circle cx="620" cy="190" r="55" fill="url(#sakuraGrad)" opacity="0.95" filter="url(#softGlow)" />
            <circle cx="680" cy="170" r="65" fill="url(#sakuraGrad)" opacity="0.95" filter="url(#softGlow)" />
            <circle cx="750" cy="190" r="50" fill="url(#sakuraGrad)" opacity="0.9" filter="url(#softGlow)" />
            <circle cx="670" cy="220" r="45" fill="#FFAEC8" opacity="0.85" />

            {/* Left Accompanying Sakura Tree on upper terrace */}
            <path d="M 260 380 Q 250 300 230 240" stroke="#4A2E1F" strokeWidth="12" strokeLinecap="round" fill="none" />
            <circle cx="220" cy="210" r="45" fill="url(#sakuraGrad)" opacity="0.9" filter="url(#softGlow)" />
            <circle cx="260" cy="190" r="40" fill="url(#sakuraGrad)" opacity="0.9" filter="url(#softGlow)" />
          </g>

          {/* ── 8. GLOWING BOTANICAL HEART GARDEN (RIGHT LAWN) ── */}
          <g
            id="landmark-garden"
            className="cursor-pointer group"
            onMouseEnter={() => setHoveredLandmark('garden')}
            onMouseLeave={() => setHoveredLandmark(null)}
            onClick={() => onSelectLandmark('garden')}
          >
            <ellipse cx="640" cy="460" rx="45" ry="22" fill="#3D5A38" stroke="#D98FA8" strokeWidth="1.5" />
            {/* Cluster of glowing rosebuds */}
            <circle cx="625" cy="455" r="7" fill="#F59ABB" filter="url(#softGlow)" />
            <circle cx="642" cy="450" r="9" fill="#FFAEC8" filter="url(#softGlow)" />
            <circle cx="658" cy="458" r="8" fill="#F59ABB" filter="url(#softGlow)" />
            {/* Golden embroidered handkerchief resting on stone table */}
            <rect x="632" y="462" width="16" height="12" fill="#FFFDF8" stroke="#E8C88D" strokeWidth="1" rx="2" transform="rotate(-8 632 462)" />
            <text x="635" y="471" fontSize="8" fill="#D98FA8">❤️</text>
          </g>

          {/* ── 9. FLOATING GLASS HEART VAULT (HOVERING TOP-CENTER) ── */}
          <g
            id="landmark-vault"
            className="cursor-pointer group"
            onMouseEnter={() => setHoveredLandmark('vault')}
            onMouseLeave={() => setHoveredLandmark(null)}
            onClick={() => onSelectLandmark('vault')}
          >
            {/* Outer Starlight Aura */}
            <circle cx="500" cy="95" r="42" fill="radial-gradient(circle, rgba(232,200,141,0.4) 0%, transparent 70%)" filter="url(#softGlow)" />
            {/* Glass Heart */}
            <path
              d="M 500 120 C 475 90 455 75 470 58 C 485 40 500 60 500 65 C 500 60 515 40 530 58 C 545 75 525 90 500 120 Z"
              fill="linear-gradient(135deg, rgba(255,246,238,0.9) 0%, rgba(217,143,168,0.7) 60%, rgba(52,36,84,0.85) 100%)"
              stroke="#E8C88D"
              strokeWidth="2.5"
              filter="url(#softGlow)"
            />
            {/* Golden Keyhole */}
            <circle cx="500" cy="85" r="4" fill="#0B1026" stroke="#E8C88D" strokeWidth="1.5" />
            <polygon points="498,87 502,87 503,96 497,96" fill="#E8C88D" />
          </g>

          {/* ── 10. CELESTIAL MEMORY CONSTELLATION & MOON (SKY) ── */}
          <g
            id="landmark-constellation"
            className="cursor-pointer group"
            onMouseEnter={() => setHoveredLandmark('constellation')}
            onMouseLeave={() => setHoveredLandmark(null)}
            onClick={() => onSelectLandmark('constellation')}
          >
            {/* Golden Constellation Lines in Sky */}
            <polyline
              points="150,70 240,55 310,95 380,65"
              fill="none"
              stroke="#E8C88D"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              opacity="0.85"
            />
            {/* Constellation Stars */}
            <circle cx="150" cy="70" r="5" fill="#FFF6EE" filter="url(#softGlow)" />
            <circle cx="240" cy="55" r="6" fill="#E8C88D" filter="url(#softGlow)" />
            <circle cx="310" cy="95" r="5" fill="#F4B8A4" filter="url(#softGlow)" />
            <circle cx="380" cy="65" r="7" fill="#FFF6EE" filter="url(#softGlow)" />

            {/* Hanging mini polaroid cards on clothesline (as in reference Image 3) */}
            <rect x="225" y="65" width="22" height="26" fill="#FFF6EE" stroke="#E8C88D" strokeWidth="0.8" rx="1" />
            <rect x="228" y="68" width="16" height="15" fill="#342454" />
            <rect x="295" y="105" width="22" height="26" fill="#FFF6EE" stroke="#E8C88D" strokeWidth="0.8" rx="1" />
            <rect x="298" y="108" width="16" height="15" fill="#342454" />
          </g>

          {/* Glowing Moon Landmark (Top Right Sky) */}
          <g
            id="landmark-moon"
            className="cursor-pointer group"
            onMouseEnter={() => setHoveredLandmark('moon')}
            onMouseLeave={() => setHoveredLandmark(null)}
            onClick={() => onSelectLandmark('moon')}
          >
            <circle cx="820" cy="90" r="38" fill="url(#goldGlowGrad)" filter="url(#softGlow)" />
            {/* Moon craters */}
            <circle cx="808" cy="80" r="7" fill="#C29B53" opacity="0.3" />
            <circle cx="832" cy="102" r="9" fill="#C29B53" opacity="0.25" />
            <circle cx="824" cy="74" r="4" fill="#C29B53" opacity="0.25" />
          </g>
        </svg>

        {/* ── CONTEXTUAL HOVER TOOLTIP / LABEL ── */}
        <AnimatePresence>
          {hoveredLandmark && (
            <motion.div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 glass-cinematic px-6 py-2.5 rounded-full pointer-events-none z-30 flex items-center gap-2 border border-champagnegold/60"
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.25 }}
            >
              <span className="text-champagnegold">✨</span>
              <span className="font-playfair text-sm text-softIvory tracking-wide font-medium">
                {hoveredLandmark === 'cottage' && 'Chapter 1: The Boy Who Loved Silence (Quiet Cottage)'}
                {hoveredLandmark === 'tree' && 'Chapter 2: The Smile Under the Tree (Cherry Blossom)'}
                {hoveredLandmark === 'bridge' && 'Chapter 3: The Moment You Chose Me (Lantern Bridge)'}
                {hoveredLandmark === 'garden' && 'Chapter 4: The Little Things (Handkerchief Garden)'}
                {hoveredLandmark === 'waterfall' && 'Chapter 5: The Girl Who Brought Sunshine (Waterfall)'}
                {hoveredLandmark === 'constellation' && 'Chapter 6: Our Little Memories (Photo Constellation)'}
                {hoveredLandmark === 'moon' && 'Chapter 7: Every Tomorrow, With You (Moonlit Sky)'}
                {hoveredLandmark === 'vault' && 'The Heart Vault: Final Love Letter 💌'}
              </span>
              <span className="font-dm text-xs text-warmpeach/90 ml-1">
                — Click to enter
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

