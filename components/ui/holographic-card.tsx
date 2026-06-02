'use client';

import React, { useRef } from 'react';

interface HolographicCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number; // 0-20, default 8
}

const HolographicCard = ({ children, className = '', intensity = 8 }: HolographicCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / rect.height) * intensity;
    const rotateY = ((centerX - x) / rect.width) * intensity;

    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
    card.style.setProperty('--bg-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--bg-y', `${(y / rect.height) * 100}%`);
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01,1.01,1.01)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    card.style.setProperty('--x', '50%');
    card.style.setProperty('--y', '50%');
    card.style.setProperty('--bg-x', '50%');
    card.style.setProperty('--bg-y', '50%');
  };

  return (
    <>
      <style>{`
        .holo-card {
          --x: 50%;
          --y: 50%;
          --bg-x: 50%;
          --bg-y: 50%;
          transition: transform 0.15s ease;
          transform-style: preserve-3d;
          will-change: transform;
        }
        .holo-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at var(--bg-x) var(--bg-y),
            rgba(200, 146, 42, 0.12) 0%,
            rgba(212, 168, 67, 0.06) 30%,
            transparent 70%
          );
          border-radius: inherit;
          pointer-events: none;
          z-index: 10;
          transition: opacity 0.3s ease;
          opacity: 0;
        }
        .holo-card:hover::after {
          opacity: 1;
        }
        .holo-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 40%,
            rgba(200,146,42,0.08) 50%,
            transparent 60%
          );
          background-size: 200% 200%;
          background-position: var(--bg-x) var(--bg-y);
          border-radius: inherit;
          pointer-events: none;
          z-index: 11;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .holo-card:hover .holo-shimmer {
          opacity: 1;
        }
      `}</style>
      <div
        ref={cardRef}
        className={`holo-card ${className}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
        <div className="holo-shimmer" />
      </div>
    </>
  );
};

export default HolographicCard;
