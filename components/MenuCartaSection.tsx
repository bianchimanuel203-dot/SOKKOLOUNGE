'use client'

import MenuFlipCard from '@/components/MenuFlipCard'
import ListaComida from '@/components/ListaComida'
import ListaCocteles from '@/components/ListaCocteles'

export default function MenuCartaSection() {
  return (
    <section
      id="carta"
      style={{ background: '#1A0E05', padding: '6rem 4rem' }}
    >
      {/* HEADER común */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <p style={{
          fontFamily: 'var(--font-cinzel, Cinzel, serif)',
          fontSize: '11px', color: '#A07850',
          letterSpacing: '0.5em', marginBottom: '0.75rem',
        }}>
          SOKKO LOUNGE
        </p>
        <h2 style={{
          fontFamily: 'var(--font-cinzel, Cinzel, serif)',
          fontSize: 'clamp(24px, 3.5vw, 48px)',
          color: '#D4982E', letterSpacing: '0.08em', margin: 0,
        }}>
          NUESTRA CARTA
        </h2>
        <p style={{
          fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
          fontStyle: 'italic',
          fontSize: 'clamp(14px, 1.3vw, 18px)',
          color: '#D4B896', marginTop: '0.5rem', marginBottom: 0,
        }}>
          Haz click en cada menú para explorar
        </p>
      </div>

      {/* GRID 2 COLUMNAS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        alignItems: 'start',
      }}>
        <MenuFlipCard
          titulo="GASTRONOMÍA"
          subtitulo="NUESTRA CARTA"
          imagenSrc="/menus/menu-comida.png"
          imagenAlt="Carta SOKKO Lounge"
          back={<ListaComida />}
        />

        <MenuFlipCard
          titulo="MIXOLOGÍA"
          subtitulo="CÓCTELES PREMIUM"
          imagenSrc="/menus/menu-cocteles.png"
          imagenAlt="Carta de cócteles SOKKO Lounge"
          back={<ListaCocteles />}
        />
      </div>
    </section>
  )
}
