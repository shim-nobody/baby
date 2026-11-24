// src/components/StarField.tsx — ambient twinkling stars
import { useMemo } from 'react';

interface Star { id: number; x: number; y: number; r: number; dur: number; delay: number; opacity: number; }

function gen(n: number): Star[] {
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 80,
    r: Math.random() * 1.8 + 0.4,
    dur: Math.random() * 4 + 2,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.5 + 0.3,
  }));
}

export function StarField({ count = 160 }: { count?: number }) {
  const stars = useMemo(() => gen(count), [count]);
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {stars.map((s) => (
        <div
          key={s.id}
          className="twinkle-star absolute rounded-full bg-white"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.r * 2,
            height: s.r * 2,
            opacity: s.opacity,
            '--dur': `${s.dur}s`,
            '--delay': `${s.delay}s`,
          } as React.CSSProperties}
        />
      ))}
      {/* Nebula blobs */}
      <div className="absolute rounded-full" style={{ width: 500, height: 300, top: '5%', left: '15%', background: 'radial-gradient(ellipse, rgba(167,139,250,0.08) 0%, transparent 70%)' }} />
      <div className="absolute rounded-full" style={{ width: 400, height: 250, top: '20%', right: '10%', background: 'radial-gradient(ellipse, rgba(245,154,187,0.07) 0%, transparent 70%)' }} />
    </div>
  );
}

