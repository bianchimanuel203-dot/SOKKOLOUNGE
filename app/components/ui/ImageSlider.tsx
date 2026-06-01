"use client";
import React from 'react';

const images = [
  "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=2152&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=2126&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?q=80&w=1965&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524799526615-766a9833dec0?q=80&w=1935&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=2070&auto=format&fit=crop",
];

const duplicated = [...images, ...images];

export default function ImageSlider() {
  return (
    <div style={{
      width: '100%', overflow: 'hidden', position: 'relative',
      maskImage: 'linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%)',
    }}>
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .slider-track {
          animation: scroll-left 25s linear infinite;
          display: flex;
          gap: 1rem;
          width: max-content;
        }
        .slider-track:hover { animation-play-state: paused; }
        .slider-img {
          transition: transform 0.3s ease, filter 0.3s ease;
          border: 1px solid rgba(201,168,76,.15);
        }
        .slider-img:hover {
          transform: scale(1.05);
          filter: brightness(1.15);
          border-color: rgba(201,168,76,.4);
        }
      `}</style>

      <div className="slider-track">
        {duplicated.map((src, i) => (
          <div key={i} className="slider-img" style={{
            flexShrink: 0, width: '280px', height: '200px',
            borderRadius: '4px', overflow: 'hidden'
          }}>
            <img
              src={src}
              alt={`Isla ${(i % images.length) + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}