'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Props {
  text?: string;
  speed?: number;
}

export default function HorizontalMarquee({
  text = 'SOKKO LOUNGE · EL RESGUARDO DEL VIENTO · FUERTEVENTURA · ',
  speed = 30,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const totalWidth = track.scrollWidth / 2;

    gsap.to(track, {
      x: -totalWidth,
      duration: speed,
      ease: 'none',
      repeat: -1,
    });
  }, [speed]);

  const repeated = Array(6).fill(text).join('');

  return (
    <div style={{
      overflow: 'hidden',
      padding: '1.5rem 0',
      borderTop: '1px solid rgba(200,146,42,0.15)',
      borderBottom: '1px solid rgba(200,146,42,0.15)',
      background: '#1A0E05',
    }}>
      <div ref={trackRef} style={{ display: 'flex', whiteSpace: 'nowrap', willChange: 'transform' }}>
        {[repeated, repeated].map((t, i) => (
          <span key={i} style={{
            fontFamily: 'var(--font-cinzel)',
            fontSize: '.65rem',
            letterSpacing: '.4em',
            color: '#8A6940',
            textTransform: 'uppercase',
            paddingRight: '2rem',
          }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}