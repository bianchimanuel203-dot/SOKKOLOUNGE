'use client'

import { useState } from 'react'

const menuPlaceholder = {
  entrantes: [
    { nombre: 'PAPAS ARRUGADAS CON MOJO', desc: 'Patatas canarias con mojo rojo y verde de la casa', precio: '8€', destacado: false },
    { nombre: 'TABLA DE QUESOS CANARIOS', desc: 'Selección de quesos de las islas con miel de palma', precio: '12€', destacado: true },
    { nombre: 'CROQUETAS DE ROPA VIEJA', desc: 'Ropa vieja canaria en croqueta crujiente, alioli de cilantro', precio: '9€', destacado: false },
    { nombre: 'CARPACCIO DE ATÚN ROJO', desc: 'Atún rojo local, aceite de oliva, alcaparras y parmesano', precio: '14€', destacado: false },
  ],
  principales: [
    { nombre: 'ROPA VIEJA CANARIA', desc: 'Garbanzo, pollo y ternera estofados. Receta tradicional de las islas', precio: '16€', destacado: true },
    { nombre: 'ATÚN EN ADOBO CANARIO', desc: 'Atún local marinado en adobo de la isla, papas bonitas y mojo verde', precio: '18€', destacado: false },
    { nombre: 'COSTILLAS AL MOJO', desc: 'Costillas confitadas, mojo picón, batata asada', precio: '17€', destacado: false },
    { nombre: 'RISOTTO DE MARISCOS', desc: 'Arroz cremoso con gambas, almejas y azafrán canario', precio: '19€', destacado: false },
  ],
  postres: [
    { nombre: 'BIENMESABE', desc: 'Crema tradicional canaria de almendra, canela y limón', precio: '6€', destacado: true },
    { nombre: 'MOUSSE DE GOFIO', desc: 'Mousse aireada de gofio tostado con miel de palma', precio: '7€', destacado: false },
    { nombre: 'TARTA DE QUESO MAJORERO', desc: 'Tarta cremosa de queso de cabra, mermelada de higo', precio: '7€', destacado: false },
  ],
}

const tabs = [
  { key: 'entrantes',   label: 'ENTRANTES' },
  { key: 'principales', label: 'PRINCIPALES' },
  { key: 'postres',     label: 'POSTRES' },
] as const

type TabKey = typeof tabs[number]['key']

export default function MenuSection() {
  const [tabActiva, setTabActiva] = useState<TabKey>('entrantes')
  const platos = menuPlaceholder[tabActiva]

  return (
    <section id="carta" style={{ padding: '8rem 4rem' }}>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{
            fontFamily: 'var(--font-cinzel, Cinzel, serif)',
            fontSize: '11px',
            color: '#A07850',
            letterSpacing: '0.5em',
            marginBottom: '1rem',
          }}>
            NUESTRA CARTA
          </p>
          <h2 style={{
            fontFamily: 'var(--font-cinzel, Cinzel, serif)',
            fontSize: 'clamp(28px, 4vw, 48px)',
            color: '#D4982E',
            letterSpacing: '0.08em',
            marginBottom: '1rem',
          }}>
            GASTRONOMÍA CANARIA
          </h2>
          <p style={{
            fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(15px, 1.4vw, 19px)',
            color: '#D4B896',
            margin: 0,
          }}>
            Sabores de las islas con un toque moderno y creativo.
          </p>
        </div>

        {/* TABS */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0',
          marginBottom: '3rem',
          borderBottom: '1px solid rgba(212,152,46,0.2)',
        }}>
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setTabActiva(tab.key)}
              style={{
                fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                fontSize: '11px',
                letterSpacing: '0.25em',
                color: tabActiva === tab.key ? '#D4982E' : '#A07850',
                background: 'transparent',
                border: 'none',
                borderBottom: tabActiva === tab.key
                  ? '2px solid #D4982E'
                  : '2px solid transparent',
                padding: '0.75rem 2rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                marginBottom: '-1px',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* LISTA PLATOS — editorial */}
        <div>
          {platos.map(plato => (
            <div key={plato.nombre} style={{
              padding: '1.5rem 0',
              borderBottom: '1px solid rgba(212,152,46,0.1)',
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '1.5rem',
              alignItems: 'start',
            }}>
              <div>
                {plato.destacado && (
                  <span style={{
                    fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                    fontSize: '9px',
                    color: '#1A0E05',
                    background: '#D4982E',
                    padding: '2px 10px',
                    letterSpacing: '0.2em',
                    marginBottom: '6px',
                    display: 'inline-block',
                  }}>
                    RECOMENDADO
                  </span>
                )}
                <p style={{
                  fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                  fontSize: 'clamp(13px, 1.2vw, 16px)',
                  color: '#F4EDD8',
                  letterSpacing: '0.05em',
                  margin: plato.destacado ? '4px 0 4px' : '0 0 4px',
                  lineHeight: 1.3,
                }}>
                  {plato.nombre}
                </p>
                <p style={{
                  fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                  fontStyle: 'italic',
                  fontSize: '15px',
                  color: '#D4B896',
                  margin: 0,
                  lineHeight: 1.5,
                }}>
                  {plato.desc}
                </p>
              </div>
              <p style={{
                fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                fontSize: '15px',
                color: '#D4982E',
                margin: 0,
                whiteSpace: 'nowrap',
                paddingTop: plato.destacado ? '20px' : '0',
              }}>
                {plato.precio}
              </p>
            </div>
          ))}
        </div>

        <p style={{
          fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
          fontStyle: 'italic',
          fontSize: '14px',
          color: '#A07850',
          textAlign: 'center',
          marginTop: '3rem',
          marginBottom: 0,
        }}>
          Alérgenos disponibles bajo petición · Carta sujeta a temporada
        </p>

      </div>
    </section>
  )
}
