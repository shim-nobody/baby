// src/components/PhotoFrame.tsx
import { motion } from 'framer-motion';
import { useState } from 'react';
import { PhotoEntry } from '../config/photos';

interface PhotoFrameProps {
  photo: PhotoEntry;
  rotation: number;
  onClick: () => void;
  delay?: number;
}

export function PhotoFrame({ photo, rotation, onClick, delay = 0 }: PhotoFrameProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      className="cursor-pointer select-none"
      style={{ rotate: rotation }}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: delay * 0.08, duration: 0.4, ease: 'easeOut' }}
      whileHover={{
        scale: 1.07,
        rotate: 0,
        zIndex: 20,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
    >
      {/* Polaroid outer */}
      <div
        className="polaroid-shadow rounded-sm"
        style={{
          background: '#FFFDF8',
          padding: '10px 10px 32px 10px',
          width: 160,
          border: '1px solid rgba(212,175,118,0.2)',
        }}
      >
        {/* Photo area */}
        <div
          className="relative overflow-hidden rounded-sm"
          style={{ width: 140, height: 140, background: '#FFF0F5' }}
        >
          {!imageError ? (
            <img
              src={photo.src}
              alt={photo.caption}
              className="w-full h-full"
              style={{ objectFit: 'cover' }}
              onError={() => setImageError(true)}
            />
          ) : (
            /* Placeholder when no image */
            <div
              className="w-full h-full flex flex-col items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #FFF0F5, #FFF5F7)',
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl mb-2 select-none"
              >
                💕
              </motion.div>
              <p className="font-dm text-xs text-center px-2" style={{ color: '#C45C7A', fontSize: '0.65rem' }}>
                Our Photo
                <br />Coming Soon
              </p>
              {/* Decorative corner hearts */}
              <span className="absolute top-1 left-1 text-xs opacity-40 select-none">❤️</span>
              <span className="absolute bottom-1 right-1 text-xs opacity-40 select-none">❤️</span>
            </div>
          )}

          {/* Paper tape overlay */}
          <div
            className="absolute top-[-5px] left-1/2 w-10 h-4 rounded-sm opacity-60"
            style={{
              transform: 'translateX(-50%) rotate(-2deg)',
              background: 'rgba(248,200,220,0.7)',
              border: '1px solid rgba(228,120,156,0.3)',
            }}
          />
        </div>

        {/* Caption */}
        <div className="mt-2 px-1">
          <p
            className="font-vibes text-center leading-tight"
            style={{ fontSize: '0.9rem', color: '#C45C7A' }}
          >
            {photo.caption}
          </p>
          {photo.date && (
            <p
              className="font-dm text-center mt-0.5"
              style={{ fontSize: '0.6rem', color: '#B08090' }}
            >
              {photo.date}
            </p>
          )}
        </div>

        {/* Heart sticker */}
        <div className="absolute bottom-1 right-1 text-xs select-none opacity-70">🩷</div>
      </div>
    </motion.div>
  );
}

