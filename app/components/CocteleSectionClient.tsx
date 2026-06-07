'use client'

import type React from 'react'
import MenuFlipCard from '@/components/MenuFlipCard'

export interface Coctel {
  nombre: string
  desc: string
  precio: string
  destacado: boolean
}

export interface CoctelesData {
  firma: Coctel[]
  clasicos: Coctel[]
}

interface Props {
  coctelesData: CoctelesData
}

const colHeaderStyle: React.CSSProperties = {
  fontFamily: 'var(--font-cinzel, Cinzel, serif)',
  fontSize: '11px', color: '#D4982E', letterSpacing: '0.2em',
  borderBottom: '1px solid rgba(212,152,46,0.25)',
  paddingBottom: '0.5rem', marginBottom: '0.75rem',
}

function ListaCocteles({ coctelesData }: { coctelesData: CoctelesData }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: '#0A0502',
      display: 'flex', flexDirection: 'column',
      padding: '2rem 2.5rem',
      overflowY: 'auto',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem', flexShrink: 0 }}>
        <p style={{
          fontFamily: 'var(--font-cinzel, Cinzel, serif)',
          fontSize: 'clamp(14px, 1.8vw, 20px)',
          color: '#D4982E', letterSpacing: '0.15em', margin: 0,
        }}>CÓCTELES PREMIUM</p>
        <div style={{ width: '40px', height: '1px', background: '#D4982E', margin: '6px auto', opacity: 0.5 }} />
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '2rem', flex: 1, overflowY: 'auto',
      }}>
        {([
          { key: 'clasicos', label: 'CLÁSICOS',    items: coctelesData.clasicos },
          { key: 'firma',    label: 'FIRMA SOKKO', items: coctelesData.firma    },
        ] as const).map(col => (
          <div key={col.key}>
            <p style={colHeaderStyle}>{col.label}</p>
            {col.items.map((c, i) => (
              <div key={i} style={{
                padding: '0.6rem 0',
                borderBottom: '1px solid rgba(212,152,46,0.06)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                  <p style={{
                    fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                    fontSize: 'clamp(10px, 0.9vw, 12px)', color: '#F4EDD8',
                    margin: 0,
                  }}>{c.nombre}</p>
                  <p style={{
                    fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                    fontSize: 'clamp(10px, 0.9vw, 12px)', color: '#D4982E',
                    margin: 0, whiteSpace: 'nowrap', marginLeft: '8px',
                  }}>{c.precio}</p>
                </div>
                <p style={{
                  fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                  fontStyle: 'italic', fontSize: 'clamp(11px, 0.9vw, 13px)',
                  color: '#D4B896', margin: 0, lineHeight: 1.4,
                }}>{c.desc}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      <p style={{
        fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
        fontStyle: 'italic', fontSize: '12px', color: '#A07850',
        textAlign: 'center', marginTop: '0.75rem', flexShrink: 0,
      }}>
        Bajo las estrellas de Fuerteventura
      </p>
    </div>
  )
}

export default function CocteleSectionClient({ coctelesData }: Props) {
  return (
    <section id="cocteles" style={{ background: '#1A0E05', padding: '6rem 4rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <MenuFlipCard
          titulo="CÓCTELES PREMIUM"
          subtitulo="MIXOLOGÍA CANARIA"
          imagenSrc="/menus/menu-cocteles.png"
          imagenAlt="Carta de cócteles SOKKO Lounge"
          back={<ListaCocteles coctelesData={coctelesData} />}
        />
      </div>
    </section>
  )
}
