'use client'

import { StickyCard002 } from '@/components/ui/sticky-card'

const menuCards = [
  {
    id: 'comida',
    image: '/menus/menu-comida.png',
    alt: 'Carta de cocina SOKKO Lounge',
  },
  {
    id: 'cocteles',
    image: '/menus/menu-cocteles.png',
    alt: 'Carta de cócteles SOKKO Lounge',
  },
]

export default function MenuTransicion() {
  return (
    <section
      style={{
        background: '#1A0E05',
        // Altura = 100vh × número de cartas — espacio para el pin
        height: `${100 * menuCards.length}vh`,
        position: 'relative',
      }}
    >
      {/* Label encima — visible antes del sticky */}
      <div style={{
        position: 'absolute',
        top: '4rem',
        left: 0, right: 0,
        textAlign: 'center',
        zIndex: 10,
        pointerEvents: 'none',
      }}>
        <p style={{
          fontFamily: 'var(--font-cinzel, Cinzel, serif)',
          fontSize: '11px',
          color: '#A07850',
          letterSpacing: '0.5em',
          margin: 0,
        }}>
          NUESTRA CARTA · SCROLL PARA EXPLORAR
        </p>
      </div>

      <StickyCard002
        cards={menuCards}
        className="h-screen"
        containerClassName="border border-[rgba(212,152,46,0.2)]"
        imageClassName="object-contain bg-[#1A0E05]"
      />
    </section>
  )
}
