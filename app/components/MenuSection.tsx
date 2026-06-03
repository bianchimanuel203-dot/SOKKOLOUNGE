'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Book from '@/components/smoothui/book'
import AnimatedTabs from '@/components/smoothui/animated-tabs'

// ── Datos ─────────────────────────────────────────────────────
const menuData = {
  entrantes: [
    { nombre: 'CEVICHE DE CORVINA',      desc: 'Corvina fresca marinada en limón canario, ají amarillo y cilantro',                    precio: '14€', destacado: true  },
    { nombre: 'TATAKI DE ATÚN ROJO',     desc: 'Atún rojo del Atlántico sellado con sésamo negro, aguacate y salsa ponzu',             precio: '16€', destacado: false },
    { nombre: 'TABLA DE QUESOS',         desc: 'Selección de quesos canarios con miel de palma y membrillo',                           precio: '12€', destacado: false },
    { nombre: 'PAPAS ARRUGADAS',         desc: 'Patatas canarias tradicionales con mojo rojo y mojo verde de la casa',                precio: '8€',  destacado: false },
  ],
  principales: [
    { nombre: 'LUBINA A LA SAL NEGRA',   desc: 'Lubina entera a la sal volcánica negra con aceite de oliva virgen y hierbas frescas', precio: '26€', destacado: true  },
    { nombre: 'SOLOMILLO LANZAROTEÑO',   desc: 'Lomo de res madurado con reducción de vino tinto, patatas volcánicas y trufa',        precio: '28€', destacado: false },
    { nombre: 'ROPA VIEJA CANARIA',      desc: 'Garbanzo, pollo y ternera estofados. Receta tradicional de las islas',               precio: '16€', destacado: false },
    { nombre: 'RISOTTO DE MARISCOS',     desc: 'Arroz cremoso con gambas, almejas y azafrán canario',                                 precio: '19€', destacado: false },
  ],
  postres: [
    { nombre: 'TARTA DE MANGO VOLCÁNICO',desc: 'Mousse de mango canario con base de bizcocho de almendra y coulis de maracuyá',       precio: '9€',  destacado: true  },
    { nombre: 'COULANT DE CHOCOLATE',    desc: 'Coulant chocolate negro 70% con helado de vainilla bourbon y sal volcánica',          precio: '8€',  destacado: false },
    { nombre: 'BIENMESABE',              desc: 'Crema tradicional canaria de almendra, canela y limón con helado artesanal',           precio: '7€',  destacado: false },
  ],
}

const tabsDef = [
  { id: 'entrantes',   label: 'ENTRANTES'   },
  { id: 'principales', label: 'PRINCIPALES' },
  { id: 'postres',     label: 'POSTRES'     },
]

type TabKey = 'entrantes' | 'principales' | 'postres'

// ── Componente principal ──────────────────────────────────────
export default function MenuSection() {
  const [flipped, setFlipped]       = useState(false)
  const [tabActiva, setTabActiva]   = useState<TabKey>('entrantes')
  const platos = menuData[tabActiva]

  return (
    <section id="carta" style={{ background: '#1A0E05', padding: '6rem 4rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* ── Flip card ────────────────────────────────── */}
        <div style={{
          perspective: '1200px',
          width: '100%',
          aspectRatio: '16/9',
          maxHeight: '520px',
        }}>
          <motion.div
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            style={{
              width: '100%', height: '100%',
              position: 'relative',
              transformStyle: 'preserve-3d',
            }}
          >

            {/* CARA DELANTERA — Book decorativo + CTA */}
            <div style={{
              position: 'absolute', inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden' as React.CSSProperties['WebkitBackfaceVisibility'],
              border: '1px solid rgba(212,152,46,0.25)',
              overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '3.5rem',
              background: '#1A0E05',
              padding: '2.5rem',
              cursor: 'pointer',
            }}
              onClick={() => setFlipped(true)}
            >
              {/* Book SmoothUI — portada decorativa */}
              <div style={{ flexShrink: 0 }}>
                <Book
                  title="SOKKO LOUNGE"
                  variant="stripe"
                  color="#D4982E"
                  textColor="#1A0E05"
                  width={170}
                  illustration={
                    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                      <img
                        src="/menus/menu-comida.png"
                        alt=""
                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75 }}
                      />
                    </div>
                  }
                />
              </div>

              {/* Texto + CTA */}
              <div style={{ textAlign: 'center' }}>
                <p style={{
                  fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                  fontSize: '11px', color: '#A07850',
                  letterSpacing: '0.4em', marginBottom: '1rem',
                }}>NUESTRA CARTA</p>
                <h2 style={{
                  fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                  fontSize: 'clamp(22px, 3vw, 38px)',
                  color: '#D4982E', letterSpacing: '0.08em',
                  marginBottom: '0.75rem',
                }}>
                  GASTRONOMÍA<br />CANARIA
                </h2>
                <p style={{
                  fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(14px, 1.3vw, 17px)',
                  color: '#D4B896', marginBottom: '2rem',
                }}>
                  Sabores de las islas con un toque moderno
                </p>
                <span style={{
                  fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                  fontSize: '11px', color: '#D4982E',
                  letterSpacing: '0.25em',
                  border: '1px solid rgba(212,152,46,0.4)',
                  padding: '12px 28px',
                  display: 'inline-block',
                }}>
                  VER CARTA COMPLETA →
                </span>
              </div>
            </div>

            {/* CARA TRASERA — AnimatedTabs + lista de platos */}
            <div style={{
              position: 'absolute', inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden' as React.CSSProperties['WebkitBackfaceVisibility'],
              transform: 'rotateY(180deg)',
              border: '1px solid rgba(212,152,46,0.25)',
              overflow: 'hidden',
              background: '#2C1A08',
              display: 'flex', flexDirection: 'column',
              padding: '2rem 2.5rem',
            }}>
              {/* Header cara trasera */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: '1.25rem',
                borderBottom: '1px solid rgba(212,152,46,0.15)',
                paddingBottom: '1rem',
              }}>
                <p style={{
                  fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                  fontSize: '15px', color: '#D4982E',
                  letterSpacing: '0.15em', margin: 0,
                }}>GASTRONOMÍA CANARIA</p>
                <button onClick={() => setFlipped(false)} style={{
                  fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                  fontSize: '10px', color: '#A07850',
                  letterSpacing: '0.15em', background: 'none',
                  border: '1px solid rgba(160,120,80,0.3)',
                  padding: '6px 14px', cursor: 'pointer',
                }}>← VOLVER</button>
              </div>

              {/* AnimatedTabs SmoothUI */}
              <div style={{ marginBottom: '1.25rem' }}>
                <AnimatedTabs
                  tabs={tabsDef}
                  defaultTab="entrantes"
                  variant="pill"
                  onChange={(id) => setTabActiva(id as TabKey)}
                />
              </div>

              {/* Lista scrollable */}
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
                        fontSize: '12px', color: '#F4EDD8',
                        letterSpacing: '0.04em',
                        margin: plato.destacado ? '3px 0 3px' : '0 0 3px',
                        lineHeight: 1.2,
                      }}>{plato.nombre}</p>
                      <p style={{
                        fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                        fontStyle: 'italic', fontSize: '13px',
                        color: '#D4B896', margin: 0, lineHeight: 1.4,
                      }}>{plato.desc}</p>
                    </div>
                    <p style={{
                      fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                      fontSize: '13px', color: '#D4982E', margin: 0,
                      whiteSpace: 'nowrap', paddingTop: plato.destacado ? '16px' : '0',
                    }}>{plato.precio}</p>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>

        {/* Descarga */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <a href="/menus/menu-comida.png" download="carta-sokko-lounge.png"
            style={{
              fontFamily: 'var(--font-cinzel, Cinzel, serif)',
              fontSize: '10px', letterSpacing: '0.2em', color: '#A07850',
              textDecoration: 'none', borderBottom: '1px solid rgba(160,120,80,0.3)',
              paddingBottom: '2px',
            }}>
            DESCARGAR CARTA ↓
          </a>
        </div>

      </div>
    </section>
  )
}
