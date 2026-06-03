'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Book from '@/components/smoothui/book'

// ── Datos ─────────────────────────────────────────────────────
const coctelesData = {
  firma: [
    { nombre: 'SOKKO SIGNATURE',     desc: 'Ron añejo, flor de hibisco, cítrico y espuma de coco',      precio: '13€'    },
    { nombre: 'BRISA DEL ATLÁNTICO', desc: 'Ginebra botánica, pepino, aloe vera y agua tónica',         precio: '12€'    },
    { nombre: 'VOLCÁN DE FUEGO',     desc: 'Mezcal, maracuyá, jengibre y chile ahumado',                precio: '13.50€' },
    { nombre: 'ROSA CANARIA',        desc: 'Hibisco, frambuesa, lima y jarabe natural',                 precio: '7€'     },
    { nombre: 'OASIS VERDE',         desc: 'Pepino, menta, limón y agua de coco',                       precio: '7.50€'  },
    { nombre: 'NOCHE ESTRELLADA',    desc: 'Mora, lavanda, limón y soda artesanal',                     precio: '8€'     },
  ],
  clasicos: [
    { nombre: 'MOJITO CANARIO',      desc: 'Ron blanco, lima fresca, menta y azúcar de caña',          precio: '9€'     },
    { nombre: 'NEGRONI CLÁSICO',     desc: 'Ginebra, vermú rojo y Campari con naranja',                precio: '10€'    },
    { nombre: 'DAIQUIRI DE MANGO',   desc: 'Ron blanco, mango tropical, lima y jarabe natural',        precio: '9.50€'  },
    { nombre: 'OLD FASHIONED',       desc: 'Bourbon premium, azúcar moreno y angostura',              precio: '11€'    },
    { nombre: 'APEROL SPRITZ',       desc: 'Aperol, prosecco seco y un toque de naranja',             precio: '9€'     },
    { nombre: 'MARGARITA PICANTE',   desc: 'Tequila, triple sec, lima y jalapeño fresco',             precio: '10.50€' },
  ],
}

// ── Componente principal ──────────────────────────────────────
export default function CocteleSection() {
  const [flipped, setFlipped] = useState(false)

  return (
    <section id="cocteles" style={{ background: '#1A0E05', padding: '6rem 4rem' }}>
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

            {/* CARA DELANTERA — Book + imagen cócteles */}
            <div style={{
              position: 'absolute', inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden' as React.CSSProperties['WebkitBackfaceVisibility'],
              border: '1px solid rgba(212,152,46,0.25)',
              overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '3.5rem',
              background: '#100804',
              padding: '2.5rem',
              cursor: 'pointer',
            }}
              onClick={() => setFlipped(true)}
            >
              {/* Book SmoothUI — portada decorativa */}
              <div style={{ flexShrink: 0 }}>
                <Book
                  title="CÓCTELES"
                  variant="simple"
                  color="#8B3A1A"
                  textColor="#E8B84B"
                  width={170}
                  logo={
                    <p style={{
                      fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                      fontStyle: 'italic', fontSize: '11px',
                      color: '#D4B896', margin: 0,
                    }}>SOKKO LOUNGE</p>
                  }
                />
              </div>

              {/* Texto + CTA */}
              <div style={{ textAlign: 'center' }}>
                <p style={{
                  fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                  fontSize: '11px', color: '#A07850',
                  letterSpacing: '0.4em', marginBottom: '1rem',
                }}>MIXOLOGÍA CANARIA</p>
                <h2 style={{
                  fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                  fontSize: 'clamp(22px, 3vw, 38px)',
                  color: '#D4982E', letterSpacing: '0.08em',
                  marginBottom: '0.75rem',
                }}>
                  CÓCTELES<br />PREMIUM
                </h2>
                <p style={{
                  fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(14px, 1.3vw, 17px)',
                  color: '#D4B896', marginBottom: '2rem',
                }}>
                  Sabores del archipiélago en cada trago
                </p>
                <span style={{
                  fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                  fontSize: '11px', color: '#D4982E',
                  letterSpacing: '0.25em',
                  border: '1px solid rgba(212,152,46,0.4)',
                  padding: '12px 28px',
                  display: 'inline-block',
                }}>
                  VER COCTELERÍA →
                </span>
              </div>
            </div>

            {/* CARA TRASERA — dos columnas FIRMA + CLÁSICOS */}
            <div style={{
              position: 'absolute', inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden' as React.CSSProperties['WebkitBackfaceVisibility'],
              transform: 'rotateY(180deg)',
              border: '1px solid rgba(212,152,46,0.25)',
              overflow: 'hidden',
              background: '#2C1A08',
              padding: '2rem 2.5rem',
              display: 'flex', flexDirection: 'column',
            }}>
              {/* Header */}
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
                }}>CÓCTELES PREMIUM</p>
                <button onClick={() => setFlipped(false)} style={{
                  fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                  fontSize: '10px', color: '#A07850',
                  letterSpacing: '0.15em', background: 'none',
                  border: '1px solid rgba(160,120,80,0.3)',
                  padding: '6px 14px', cursor: 'pointer',
                }}>← VOLVER</button>
              </div>

              {/* Dos columnas scrollable */}
              <div style={{
                flex: 1, overflowY: 'auto',
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem 2.5rem',
                alignContent: 'start',
              }}>
                {/* FIRMA SOKKO */}
                <div>
                  <p style={{
                    fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                    fontSize: '11px', color: '#D4982E',
                    letterSpacing: '0.2em',
                    borderBottom: '1px solid rgba(212,152,46,0.25)',
                    paddingBottom: '0.5rem', marginBottom: '0.75rem',
                  }}>FIRMA SOKKO</p>
                  {coctelesData.firma.map((c, i) => (
                    <div key={i} style={{
                      padding: '0.65rem 0',
                      borderBottom: '1px solid rgba(212,152,46,0.07)',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                        <p style={{
                          fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                          fontSize: '11px', color: '#F4EDD8',
                          letterSpacing: '0.04em', margin: 0,
                        }}>{c.nombre}</p>
                        <p style={{
                          fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                          fontSize: '11px', color: '#D4982E',
                          margin: 0, whiteSpace: 'nowrap', marginLeft: '6px',
                        }}>{c.precio}</p>
                      </div>
                      <p style={{
                        fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                        fontStyle: 'italic', fontSize: '12px',
                        color: '#D4B896', margin: 0, lineHeight: 1.4,
                      }}>{c.desc}</p>
                    </div>
                  ))}
                </div>

                {/* CLÁSICOS */}
                <div>
                  <p style={{
                    fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                    fontSize: '11px', color: '#D4982E',
                    letterSpacing: '0.2em',
                    borderBottom: '1px solid rgba(212,152,46,0.25)',
                    paddingBottom: '0.5rem', marginBottom: '0.75rem',
                  }}>CLÁSICOS</p>
                  {coctelesData.clasicos.map((c, i) => (
                    <div key={i} style={{
                      padding: '0.65rem 0',
                      borderBottom: '1px solid rgba(212,152,46,0.07)',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                        <p style={{
                          fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                          fontSize: '11px', color: '#F4EDD8',
                          letterSpacing: '0.04em', margin: 0,
                        }}>{c.nombre}</p>
                        <p style={{
                          fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                          fontSize: '11px', color: '#D4982E',
                          margin: 0, whiteSpace: 'nowrap', marginLeft: '6px',
                        }}>{c.precio}</p>
                      </div>
                      <p style={{
                        fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                        fontStyle: 'italic', fontSize: '12px',
                        color: '#D4B896', margin: 0, lineHeight: 1.4,
                      }}>{c.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </motion.div>
        </div>

        {/* Descarga */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <a href="/menus/menu-cocteles.png" download="cocteleria-sokko-lounge.png"
            style={{
              fontFamily: 'var(--font-cinzel, Cinzel, serif)',
              fontSize: '10px', letterSpacing: '0.2em', color: '#A07850',
              textDecoration: 'none', borderBottom: '1px solid rgba(160,120,80,0.3)',
              paddingBottom: '2px',
            }}>
            DESCARGAR CARTA DE CÓCTELES ↓
          </a>
        </div>

      </div>
    </section>
  )
}
