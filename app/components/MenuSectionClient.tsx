'use client'

import { useState } from 'react'

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

const tabs = [
  { key: 'entrantes',   label: 'ENTRANTES'   },
  { key: 'principales', label: 'PRINCIPALES' },
  { key: 'postres',     label: 'POSTRES'     },
]

export default function MenuSectionClient({ menuData }: { menuData: MenuData }) {
  const [modo, setModo] = useState<'imagen' | 'carta'>('imagen')
  const [tabActiva, setTabActiva] = useState<'entrantes' | 'principales' | 'postres'>('entrantes')

  const platos = menuData[tabActiva]

  return (
    <section id="carta" style={{ background: '#1A0E05', padding: '8rem 4rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{
            fontFamily: 'var(--font-cinzel, Cinzel, serif)',
            fontSize: '11px', color: '#A07850',
            letterSpacing: '0.5em', marginBottom: '1rem',
          }}>NUESTRA CARTA</p>
          <h2 style={{
            fontFamily: 'var(--font-cinzel, Cinzel, serif)',
            fontSize: 'clamp(28px, 4vw, 48px)',
            color: '#D4982E', letterSpacing: '0.08em',
            marginBottom: '0.5rem',
          }}>GASTRONOMÍA CANARIA</h2>
          <p style={{
            fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(15px, 1.4vw, 19px)',
            color: '#D4B896',
          }}>Sabores de las islas con un toque moderno y creativo.</p>
        </div>

        {/* TOGGLE */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
          <div style={{
            display: 'flex',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(212,152,46,0.2)',
            borderRadius: '2px', padding: '3px', gap: '3px',
          }}>
            {[
              { key: 'imagen', label: 'VER MENÚ',   icon: '🖼' },
              { key: 'carta',  label: 'LEER CARTA',  icon: '📋' },
            ].map(btn => (
              <button key={btn.key} onClick={() => setModo(btn.key as 'imagen' | 'carta')} style={{
                fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                fontSize: '11px', letterSpacing: '0.2em',
                padding: '10px 28px', border: 'none', borderRadius: '1px',
                cursor: 'pointer', transition: 'all 0.2s ease',
                background: modo === btn.key ? '#D4982E' : 'transparent',
                color: modo === btn.key ? '#1A0E05' : '#A07850',
              }}>
                {btn.icon} {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* MODO: VER MENÚ */}
        {modo === 'imagen' && (
          <div style={{ display: 'flex', justifyContent: 'center', animation: 'fadeIn 0.3s ease' }}>
            <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }`}</style>
            <div style={{
              position: 'relative', maxWidth: '900px', width: '100%',
              border: '1px solid rgba(212,152,46,0.3)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}>
              <img
                src="/menus/menu-comida.png"
                alt="Carta SOKKO Lounge"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
              <div style={{ position: 'absolute', bottom: '1rem', right: '1rem' }}>
                <a href="/menus/menu-comida.png" download="carta-sokko-lounge.png" style={{
                  fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                  fontSize: '10px', letterSpacing: '0.2em',
                  color: '#1A0E05', background: 'rgba(212,152,46,0.9)',
                  padding: '8px 16px', textDecoration: 'none', display: 'inline-block',
                }}>DESCARGAR ↓</a>
              </div>
            </div>
          </div>
        )}

        {/* MODO: LEER CARTA */}
        {modo === 'carta' && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '300px 1fr',
              gap: '3rem', alignItems: 'start',
            }}>
              {/* Thumbnail izquierda */}
              <div style={{ position: 'sticky', top: '100px' }}>
                <img src="/menus/menu-comida.png" alt="Carta SOKKO" style={{
                  width: '100%', height: 'auto',
                  border: '1px solid rgba(212,152,46,0.25)', opacity: 0.85,
                }} />
                <p style={{
                  fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                  fontStyle: 'italic', fontSize: '13px', color: '#A07850',
                  textAlign: 'center', marginTop: '0.75rem',
                }}>Carta sujeta a temporada</p>
              </div>

              {/* Lista con tabs */}
              <div>
                {/* Tabs */}
                <div style={{
                  display: 'flex', gap: '0', marginBottom: '2rem',
                  borderBottom: '1px solid rgba(212,152,46,0.2)',
                }}>
                  {tabs.map(tab => (
                    <button key={tab.key} onClick={() => setTabActiva(tab.key as 'entrantes' | 'principales' | 'postres')} style={{
                      fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                      fontSize: '11px', letterSpacing: '0.25em',
                      color: tabActiva === tab.key ? '#D4982E' : '#A07850',
                      background: 'transparent', border: 'none',
                      borderBottom: tabActiva === tab.key ? '2px solid #D4982E' : '2px solid transparent',
                      padding: '0.75rem 1.5rem', cursor: 'pointer',
                      transition: 'all 0.2s ease', marginBottom: '-1px',
                    }}>
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Lista platos */}
                {platos.map((plato, i) => (
                  <div key={i} style={{
                    display: 'grid', gridTemplateColumns: '1fr auto',
                    gap: '1.5rem', padding: '1.5rem 0',
                    borderBottom: '1px solid rgba(212,152,46,0.08)',
                    alignItems: 'start',
                  }}>
                    <div>
                      {plato.destacado && (
                        <span style={{
                          fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                          fontSize: '9px', color: '#1A0E05',
                          background: '#D4982E', padding: '2px 10px',
                          letterSpacing: '0.2em', marginBottom: '6px',
                          display: 'inline-block',
                        }}>RECOMENDADO</span>
                      )}
                      <p style={{
                        fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                        fontSize: 'clamp(13px, 1.2vw, 15px)', color: '#F4EDD8',
                        letterSpacing: '0.05em',
                        margin: plato.destacado ? '4px 0 4px' : '0 0 4px',
                        lineHeight: 1.3,
                      }}>{plato.nombre}</p>
                      <p style={{
                        fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                        fontStyle: 'italic', fontSize: '15px',
                        color: '#D4B896', margin: 0, lineHeight: 1.5,
                      }}>{plato.desc}</p>
                    </div>
                    <p style={{
                      fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                      fontSize: '15px', color: '#D4982E',
                      margin: 0, whiteSpace: 'nowrap',
                      paddingTop: plato.destacado ? '20px' : '0',
                    }}>{plato.precio}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
