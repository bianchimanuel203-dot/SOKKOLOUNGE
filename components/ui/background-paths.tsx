'use client';

import { motion } from 'framer-motion';
import React from 'react';

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.3 + i * 0.02,
    opacity: 0.03 + i * 0.012,
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <svg
        style={{ width: '100%', height: '100%' }}
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="#D4982E"
            strokeWidth={path.width}
            strokeOpacity={path.opacity}
            initial={{ pathLength: 0.3, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: [path.opacity * 0.5, path.opacity * 1.8, path.opacity * 0.5],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + (path.id % 10) * 2,
              repeat: Infinity,
              ease: 'linear',
              delay: path.id * 0.3,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function SokkoBackgroundPaths({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Capa de paths — detrás de todo */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>
      {/* Contenido — encima */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
