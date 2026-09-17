'use client'

import { useState } from 'react'

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

export default function CocteleSectionClient({ coctelesData }: { coctelesData: CoctelesData }) {
  const [modo, setModo] = useState<'imagen' | 'carta'>('imagen')

  return (
    <section className="coctel-section" style={{ background: '#1A0E05', padding: '8rem 4rem' }}>
      <style>{`
        @media (max-width: 768px) {
          .coctel-section { padding: 4rem 1rem !important; }
          .coctel-carta-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .coctel-carta-thumb { position: static !important; max-width: 220px; margin: 0 auto; }
          .coctel-listas-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
        }
      `}</style>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{
            fontFamily: 'var(--font-cinzel, Cinzel, serif)',
            fontSize: '11px', color: '#A07850',
            letterSpacing: '0.5em', marginBottom: '1rem',
          }}>MIXOLOGÍA CANARIA</p>
          <h2 style={{
            fontFamily: 'var(--font-cinzel, Cinzel, serif)',
            fontSize: 'clamp(28px, 4vw, 48px)',
            color: '#D4982E', letterSpacing: '0.08em', marginBottom: '0.5rem',
          }}>CÓCTELES PREMIUM</h2>
          <p style={{
            fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
            fontStyle: 'italic', fontSize: 'clamp(15px, 1.4vw, 19px)',
            color: '#D4B896',
          }}>Sabores del archipiélago en cada trago.</p>
        </div>

        {/* TOGGLE */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
          <div style={{
            display: 'flex', background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(212,152,46,0.2)',
            borderRadius: '2px', padding: '3px', gap: '3px',
          }}>
            <button onClick={() => setModo('imagen')} style={{
              fontFamily: 'var(--font-cinzel, Cinzel, serif)',
              fontSize: '11px', letterSpacing: '0.2em',
              padding: '10px 28px', minHeight: '44px', border: 'none', borderRadius: '1px',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.2s ease',
              background: modo === 'imagen' ? '#D4982E' : 'transparent',
              color: modo === 'imagen' ? '#1A0E05' : '#A07850',
            }}>🖼 VER CARTA</button>
            <button onClick={() => setModo('carta')} style={{
              fontFamily: 'var(--font-cinzel, Cinzel, serif)',
              fontSize: '11px', letterSpacing: '0.2em',
              padding: '10px 28px', minHeight: '44px', border: 'none', borderRadius: '1px',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.2s ease',
              background: modo === 'carta' ? '#D4982E' : 'transparent',
              color: modo === 'carta' ? '#1A0E05' : '#A07850',
            }}>📋 LEER LISTA</button>
          </div>
        </div>

        {/* MODO: VER CARTA — imagen Canva */}
        {modo === 'imagen' && (
          <div style={{ display: 'flex', justifyContent: 'center', animation: 'fadeIn 0.3s ease' }}>
            <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }`}</style>
            <div style={{
              position: 'relative', maxWidth: '900px', width: '100%',
              border: '1px solid rgba(212,152,46,0.3)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}>
              <img
                src="/menus/menu-cocteles.png"
                alt="Carta de cócteles SOKKO Lounge"
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
              <div style={{ position: 'absolute', bottom: '1rem', right: '1rem' }}>
                <a href="/menus/menu-cocteles.png" download="cocteleria-sokko-lounge.png" style={{
                  fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                  fontSize: '10px', letterSpacing: '0.2em',
                  color: '#1A0E05', background: 'rgba(212,152,46,0.9)',
                  padding: '8px 16px', textDecoration: 'none', display: 'inline-block',
                }}>DESCARGAR ↓</a>
              </div>
            </div>
          </div>
        )}

        {/* MODO: LEER LISTA — dos columnas */}
        {modo === 'carta' && (
          <div className="coctel-carta-grid" style={{
            display: 'grid', gridTemplateColumns: '300px 1fr',
            gap: '3rem', alignItems: 'start', animation: 'fadeIn 0.3s ease',
          }}>
            {/* Thumbnail */}
            <div className="coctel-carta-thumb" style={{ position: 'sticky', top: '100px' }}>
              <img src="/menus/menu-cocteles.png" alt="Cócteles SOKKO" style={{
                width: '100%', height: 'auto',
                border: '1px solid rgba(212,152,46,0.25)', opacity: 0.85,
              }} />
              <p style={{
                fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                fontStyle: 'italic', fontSize: '13px', color: '#A07850',
                textAlign: 'center', marginTop: '0.75rem',
              }}>Bajo las estrellas de Fuerteventura</p>
            </div>

            {/* Dos columnas */}
            <div className="coctel-listas-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>
              {[
                { titulo: 'FIRMA SOKKO', items: coctelesData.firma    },
                { titulo: 'CLÁSICOS',   items: coctelesData.clasicos  },
              ].map(col => (
                <div key={col.titulo}>
                  <h3 style={{
                    fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                    fontSize: '14px', color: '#D4982E',
                    letterSpacing: '0.2em', marginBottom: '0.5rem',
                  }}>{col.titulo}</h3>
                  <div style={{ width: '40px', height: '1px', background: '#D4982E', marginBottom: '1.5rem', opacity: 0.5 }} />
                  {col.items.map((c, i) => (
                    <div key={i} style={{ padding: '1rem 0', borderBottom: '1px solid rgba(212,152,46,0.08)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                        <p style={{
                          fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                          fontSize: '12px', color: '#F4EDD8',
                          letterSpacing: '0.05em', margin: 0,
                        }}>{c.nombre}</p>
                        <p style={{
                          fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                          fontSize: '12px', color: '#D4982E',
                          margin: 0, whiteSpace: 'nowrap', marginLeft: '8px',
                        }}>{c.precio}</p>
                      </div>
                      <p style={{
                        fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                        fontStyle: 'italic', fontSize: '13px',
                        color: '#D4B896', margin: 0, lineHeight: 1.4,
                      }}>{c.desc}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
