'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Spotlight = ({ style, ...props }: { style?: React.CSSProperties; [key: string]: any }) => (
  <motion.div
    {...props}
    style={{
      position: 'absolute',
      borderRadius: '50%',
      filter: 'blur(80px)',
      pointerEvents: 'none',
      ...style,
    }}
  />
);

export function SokkoSpotlight({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>

      {/* Spotlight dorado izquierda */}
      <Spotlight
        initial={{ x: '-50%', y: '-50%' }}
        animate={{
          x: ['-50%', '-30%', '-70%', '-50%'],
          y: ['-50%', '-70%', '-30%', '-50%'],
        }}
        transition={{ duration: 12, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
        style={{
          top: '20%', left: '25%',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(212,152,46,0.12) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />

      {/* Spotlight ámbar centro */}
      <Spotlight
        initial={{ x: '0%', y: '0%' }}
        animate={{
          x: ['0%', '20%', '-20%', '0%'],
          y: ['0%', '30%', '10%', '0%'],
        }}
        transition={{ duration: 15, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror', delay: 3 }}
        style={{
          top: '40%', right: '20%',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(232,184,75,0.08) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />

      {/* Spotlight terracota abajo */}
      <Spotlight
        initial={{ x: '0%', y: '0%' }}
        animate={{
          x: ['0%', '-30%', '10%', '0%'],
          y: ['0%', '-20%', '20%', '0%'],
        }}
        transition={{ duration: 18, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror', delay: 5 }}
        style={{
          bottom: '10%', right: '30%',
          width: '350px', height: '350px',
          background: 'radial-gradient(circle, rgba(180,100,30,0.10) 0%, transparent 70%)',
          zIndex: 0,
        }}
      />

      {/* Contenido encima de los spotlights */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
