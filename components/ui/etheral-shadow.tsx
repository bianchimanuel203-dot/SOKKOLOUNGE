'use client'

import React, { useId, CSSProperties } from 'react'

interface ShadowOverlayProps {
  sizing?: 'fill' | 'stretch'
  color?: string
  speed?: number      // segundos por ciclo — default 8
  scale?: number      // intensidad 1-100 — default 45
  noiseOpacity?: number
  style?: CSSProperties
  className?: string
}

export function EtherealShadow({
  sizing = 'fill',
  color = 'rgba(212, 152, 46, 0.22)',
  speed = 8,
  scale = 45,
  noiseOpacity = 0.4,
  style,
  className,
}: ShadowOverlayProps) {
  const rawId    = useId().replace(/:/g, '')
  const filterId = `eth-${rawId}`
  const animId   = `eth-anim-${rawId}`

  // mapear scale 1-100 a baseFrequency y displacement
  const baseFreqX   = 0.001 + (scale / 100) * 0.003
  const baseFreqY   = 0.004 + (scale / 100) * 0.008
  const displacement = 20 + (scale / 100) * 80

  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        ...style,
      }}
    >
      {/* CSS @keyframes → el navegador lo procesa en el compositor, siempre funciona */}
      <style>{`
        @keyframes ${animId} {
          from { values: 0; }
          to   { values: 360; }
        }
        #${filterId}-hue {
          animation: ${animId} ${speed}s linear infinite;
        }
      `}</style>

      <svg
        style={{
          position: 'absolute',
          top: `-${displacement}px`,
          left: `-${displacement}px`,
          width: `calc(100% + ${displacement * 2}px)`,
          height: `calc(100% + ${displacement * 2}px)`,
        }}
        width="100%"
        height="100%"
      >
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="turbulence"
              baseFrequency={`${baseFreqX} ${baseFreqY}`}
              numOctaves="3"
              seed="2"
              result="turbulence"
            />
            {/* hueRotate animado con CSS id — fiable en todos los navegadores */}
            <feColorMatrix
              id={`${filterId}-hue`}
              in="turbulence"
              type="hueRotate"
              values="0"
              result="rotated"
            />
            <feColorMatrix
              in="rotated"
              type="matrix"
              values="3 0 0 0 0.5  3 0 0 0 0.5  3 0 0 0 0.5  1 0 0 0 0"
              result="amplified"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="amplified"
              scale={displacement}
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feGaussianBlur in="displaced" stdDeviation="4" />
          </filter>
        </defs>

        {/* Rectángulo de color — el filtro lo distorsiona y mueve */}
        <rect
          width="100%"
          height="100%"
          fill={color}
          filter={`url(#${filterId})`}
        />
      </svg>

      {/* Ruido sutil encima */}
      {noiseOpacity > 0 && (
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png")`,
          backgroundSize: '240px',
          backgroundRepeat: 'repeat',
          opacity: noiseOpacity * 0.5,
          mixBlendMode: 'overlay',
        }} />
      )}
    </div>
  )
}
