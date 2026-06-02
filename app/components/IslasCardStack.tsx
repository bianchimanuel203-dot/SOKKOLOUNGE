'use client';

import { CardStack, CardStackItem } from './ui/card-stack';

const islasData: CardStackItem[] = [
  { id: 1, title: 'LANZAROTE',     description: 'Volcánica y única.',      imageSrc: '/islas/lanzarote.jpg',     href: '/terraza/lanzarote' },
  { id: 2, title: 'FUERTEVENTURA', description: 'Salvaje y libre.',         imageSrc: '/islas/Fuerteventura.jpg', href: '/terraza/fuerteventura' },
  { id: 3, title: 'GRAN CANARIA',  description: 'Vibrante y cosmopolita.',  imageSrc: '/islas/Gran canaria.jpg',  href: '/terraza/gran-canaria' },
  { id: 4, title: 'TENERIFE',      description: 'Intensa y majestuosa.',    imageSrc: '/islas/Tenerife.jpg',      href: '/terraza/tenerife' },
  { id: 5, title: 'LA PALMA',      description: 'Verde y soñadora.',        imageSrc: '/islas/la palma.jpg',      href: '/terraza/la-palma' },
  { id: 6, title: 'LA GOMERA',     description: 'Auténtica y esencial.',    imageSrc: '/islas/La gomera.jpg',     href: '/terraza/la-gomera' },
  { id: 7, title: 'EL HIERRO',     description: 'Salvaje y espiritual.',    imageSrc: '/islas/el hierro.jpg',     href: '/terraza/el-hierro' },
  { id: 8, title: 'LA GRACIOSA',   description: 'Serena y exclusiva.',      imageSrc: '/islas/La graciosa.jpg',   href: '/terraza/la-graciosa' },
];

export default function IslasCardStack() {
  return (
    <section
      id="islas"
      style={{
        background: '#1A0E05',
        padding: '8rem 2rem',
        borderTop: '1px solid rgba(200,146,42,0.15)',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <p style={{
          fontFamily: 'var(--font-cinzel, Cinzel, serif)',
          fontSize: '11px',
          color: '#8A6940',
          letterSpacing: '0.5em',
          textTransform: 'uppercase',
          margin: '0 0 1rem',
        }}>
          LA TERRAZA
        </p>
        <h2 style={{
          fontFamily: 'var(--font-cinzel, Cinzel, serif)',
          fontSize: 'clamp(28px, 4vw, 52px)',
          color: '#C8922A',
          letterSpacing: '0.1em',
          margin: '0 0 1rem',
        }}>
          LAS OCHO ISLAS
        </h2>
        <p style={{
          fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
          fontStyle: 'italic',
          fontSize: 'clamp(16px, 1.5vw, 20px)',
          color: '#C4A882',
          maxWidth: '520px',
          margin: '0 auto',
          lineHeight: 1.7,
        }}>
          Cada espacio lleva el nombre de una de las ocho islas Canarias,
          un guiño a nuestra tierra y a nuestra identidad.
        </p>
      </div>

      {/* CardStack 3D fan con glow dorado */}
      <CardStack
        items={islasData}
        cardWidth={480}
        cardHeight={360}
        overlap={0.52}
        spreadDeg={50}
        depthPx={120}
        tiltXDeg={10}
        activeLiftPx={28}
        activeScale={1.04}
        inactiveScale={0.92}
        autoAdvance={true}
        intervalMs={3500}
        pauseOnHover={true}
        showDots={true}
        loop={true}
        springStiffness={260}
        springDamping={26}
        maxVisible={7}
      />
    </section>
  );
}
