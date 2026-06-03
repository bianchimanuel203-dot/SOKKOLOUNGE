'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface MenuFlipCardProps {
  titulo: string
  subtitulo: string
  imagenSrc: string
  imagenAlt: string
  back: React.ReactNode
}

export default function MenuFlipCard({
  titulo,
  subtitulo,
  imagenSrc,
  imagenAlt,
  back,
}: MenuFlipCardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div style={{ width: '100%' }}>

      {/* Subtítulo + título */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <p style={{
          fontFamily: 'var(--font-cinzel, Cinzel, serif)',
          fontSize: '11px', color: '#A07850',
          letterSpacing: '0.5em', marginBottom: '0.75rem',
        }}>
          {subtitulo}
        </p>
        <h2 style={{
          fontFamily: 'var(--font-cinzel, Cinzel, serif)',
          fontSize: 'clamp(24px, 3vw, 44px)',
          color: '#D4982E', letterSpacing: '0.08em', margin: 0,
        }}>
          {titulo}
        </h2>
      </div>

      {/* Contenedor flip — paddingBottom mantiene ratio exacto 2000×1414 = 70.7% */}
      <div
        style={{
          width: '100%',
          paddingBottom: '70.7%',
          position: 'relative',
          cursor: 'pointer',
          filter: flipped
            ? 'drop-shadow(0 0 20px rgba(212,152,46,0.5))'
            : 'drop-shadow(0 0 8px rgba(212,152,46,0.2))',
          transition: 'filter 0.6s ease',
        }}
        onClick={() => setFlipped(!flipped)}
      >
        {/* Escena 3D */}
        <div style={{ position: 'absolute', inset: 0, perspective: '1200px' }}>
          <motion.div
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            style={{
              width: '100%', height: '100%',
              position: 'relative',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* CARA DELANTERA — imagen del menú */}
            <div style={{
              position: 'absolute', inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden' as React.CSSProperties['WebkitBackfaceVisibility'],
              border: '1px solid rgba(212,152,46,0.35)',
              overflow: 'hidden',
            }}>
              <img
                src={imagenSrc}
                alt={imagenAlt}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                  pointerEvents: 'none',
                }}
              />
              {/* Hint flip */}
              <div style={{
                position: 'absolute', bottom: '1rem', right: '1rem',
                fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                fontSize: '10px', color: '#D4982E', letterSpacing: '0.2em',
                background: 'rgba(10,5,2,0.8)', padding: '6px 14px',
                border: '1px solid rgba(212,152,46,0.4)',
                backdropFilter: 'blur(4px)',
                display: 'flex', alignItems: 'center', gap: '6px',
              }}>
                <span>↩</span> LEER CARTA
              </div>
            </div>

            {/* CARA TRASERA — lista interactiva */}
            <div
              style={{
                position: 'absolute', inset: 0,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden' as React.CSSProperties['WebkitBackfaceVisibility'],
                transform: 'rotateY(180deg)',
                border: '1px solid rgba(212,152,46,0.5)',
                overflow: 'hidden',
                background: '#1E1005',
              }}
              onClick={e => e.stopPropagation()}
            >
              {back}

              {/* Botón volver */}
              <button
                onClick={() => setFlipped(false)}
                style={{
                  position: 'absolute', top: '1rem', right: '1rem',
                  fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                  fontSize: '10px', color: '#D4982E', letterSpacing: '0.2em',
                  background: 'rgba(10,5,2,0.8)', padding: '6px 14px',
                  border: '1px solid rgba(212,152,46,0.4)',
                  cursor: 'pointer', backdropFilter: 'blur(4px)',
                }}
              >
                ↩ VER MENÚ
              </button>
            </div>
          </motion.div>
        </div>

        {/* Borde glow pulsante */}
        <div style={{
          position: 'absolute', inset: 0,
          pointerEvents: 'none',
          border: '1px solid transparent',
          background: `linear-gradient(#1A0E05, #1A0E05) padding-box,
                       linear-gradient(
                         135deg,
                         rgba(212,152,46,0.6) 0%,
                         rgba(232,184,75,0.3) 25%,
                         rgba(212,152,46,0.1) 50%,
                         rgba(232,184,75,0.3) 75%,
                         rgba(212,152,46,0.6) 100%
                       ) border-box`,
          animation: 'glowPulse 3s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 1;   }
        }
      `}</style>

      {/* Descarga */}
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <a
          href={imagenSrc}
          download
          onClick={e => e.stopPropagation()}
          style={{
            fontFamily: 'var(--font-cinzel, Cinzel, serif)',
            fontSize: '10px', letterSpacing: '0.2em',
            color: '#A07850', textDecoration: 'none',
            borderBottom: '1px solid rgba(160,120,80,0.3)',
            paddingBottom: '2px',
          }}
        >
          DESCARGAR ↓
        </a>
      </div>

    </div>
  )
}
