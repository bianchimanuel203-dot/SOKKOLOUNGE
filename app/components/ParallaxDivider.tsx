'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ParallaxDivider() {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Imagen se mueve más lento que el scroll — efecto parallax
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])

  return (
    <div
      ref={ref}
      style={{ height: '50vh', overflow: 'hidden', position: 'relative' }}
    >
      {/* Imagen del local con parallax */}
      <motion.div
        style={{
          y,
          position: 'absolute',
          inset: '-20%',
          backgroundImage: 'url(/zonas/zona-terraza.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Overlay + texto centrado */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(10,5,2,0.65)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: '1rem',
      }}>
        {/* Ornamento superior */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '60px', height: '1px', background: 'rgba(212,152,46,0.5)' }}/>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5Z"
              stroke="#D4982E" strokeWidth="1" strokeOpacity="0.8" fill="none"/>
          </svg>
          <div style={{ width: '60px', height: '1px', background: 'rgba(212,152,46,0.5)' }}/>
        </div>

        <p style={{
          fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
          fontStyle: 'italic',
          fontSize: 'clamp(18px, 2.5vw, 28px)',
          color: '#F4EDD8', letterSpacing: '0.05em',
          textAlign: 'center', margin: 0,
        }}>
          Bajo las estrellas de Fuerteventura
        </p>

        {/* Ornamento inferior */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '60px', height: '1px', background: 'rgba(212,152,46,0.5)' }}/>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5Z"
              stroke="#D4982E" strokeWidth="1" strokeOpacity="0.8" fill="none"/>
          </svg>
          <div style={{ width: '60px', height: '1px', background: 'rgba(212,152,46,0.5)' }}/>
        </div>
      </div>
    </div>
  )
}
