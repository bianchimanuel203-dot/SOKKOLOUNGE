'use client'

import { useState } from 'react'
import AnimatedTabs from '@/components/smoothui/animated-tabs'
import MenuFlipCard from '@/components/MenuFlipCard'

export interface Plato {
  nombre: string
  desc: string
  precio: string
  destacado: boolean
  imagen: string
}

export interface MenuData {
  entrantes: Plato[]
  principales: Plato[]
  postres: Plato[]
}

interface Props {
  menuData: MenuData
}

const tabs = [
  { id: 'entrantes',   label: 'ENTRANTES'   },
  { id: 'principales', label: 'PRINCIPALES' },
  { id: 'postres',     label: 'POSTRES'     },
]

function ListaComida({ menuData }: { menuData: MenuData }) {
  const [tabActiva, setTabActiva] = useState('entrantes')
  const platos = menuData[tabActiva as keyof MenuData]

  return (
    <div style={{
      width: '100%', height: '100%',
      background: '#1E1005',
      display: 'flex', flexDirection: 'column',
      padding: '2rem 2.5rem',
      overflowY: 'auto',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '1.25rem', flexShrink: 0 }}>
        <p style={{
          fontFamily: 'var(--font-cinzel, Cinzel, serif)',
          fontSize: 'clamp(14px, 1.8vw, 20px)',
          color: '#D4982E', letterSpacing: '0.15em', margin: 0,
        }}>GASTRONOMÍA CANARIA</p>
        <div style={{ width: '40px', height: '1px', background: '#D4982E', margin: '6px auto', opacity: 0.5 }} />
      </div>

      <div style={{ flexShrink: 0, marginBottom: '1.25rem' }}>
        <AnimatedTabs
          tabs={tabs}
          defaultTab="entrantes"
          onChange={(id: string) => setTabActiva(id)}
        />
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {platos.map((plato, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '1fr auto', gap: '1rem',
            padding: '0.85rem 0',
            borderBottom: '1px solid rgba(212,152,46,0.08)',
            alignItems: 'start',
          }}>
            <div>
              {plato.destacado && (
                <span style={{
                  fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                  fontSize: '8px', color: '#1A0E05',
                  background: '#D4982E', padding: '2px 8px',
                  letterSpacing: '0.2em', marginBottom: '4px',
                  display: 'inline-block',
                }}>RECOMENDADO</span>
              )}
              <p style={{
                fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                fontSize: 'clamp(11px, 1vw, 14px)', color: '#F4EDD8',
                margin: plato.destacado ? '3px 0 3px' : '0 0 3px', lineHeight: 1.2,
              }}>{plato.nombre}</p>
              <p style={{
                fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                fontStyle: 'italic', fontSize: 'clamp(12px, 1vw, 14px)',
                color: '#D4B896', margin: 0, lineHeight: 1.4,
              }}>{plato.desc}</p>
            </div>
            <p style={{
              fontFamily: 'var(--font-cinzel, Cinzel, serif)',
              fontSize: 'clamp(12px, 1vw, 14px)', color: '#D4982E',
              margin: 0, whiteSpace: 'nowrap',
              paddingTop: plato.destacado ? '18px' : '0',
            }}>{plato.precio}</p>
          </div>
        ))}
      </div>

      <p style={{
        fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
        fontStyle: 'italic', fontSize: '12px', color: '#A07850',
        textAlign: 'center', marginTop: '0.75rem', flexShrink: 0,
      }}>
        Alérgenos disponibles bajo petición
      </p>
    </div>
  )
}

export default function MenuSectionClient({ menuData }: Props) {
  return (
    <section id="carta" style={{ background: '#1A0E05', padding: '6rem 4rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <MenuFlipCard
          titulo="GASTRONOMÍA CANARIA"
          subtitulo="NUESTRA CARTA"
          imagenSrc="/menus/menu-comida.png"
          imagenAlt="Carta SOKKO Lounge"
          back={<ListaComida menuData={menuData} />}
        />
      </div>
    </section>
  )
}
