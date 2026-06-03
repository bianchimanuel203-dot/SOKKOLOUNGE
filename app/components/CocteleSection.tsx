'use client'

import { useState } from 'react'

const coctelesData = {
  firma: [
    { nombre: 'SOKKO SIGNATURE',     desc: 'Ron añejo, flor de hibisco, cítrico y espuma de coco',          precio: '13€',    destacado: true  },
    { nombre: 'BRISA DEL ATLÁNTICO', desc: 'Ginebra botánica, pepino, aloe vera y agua tónica',             precio: '12€',    destacado: false },
    { nombre: 'VOLCÁN DE FUEGO',     desc: 'Mezcal, maracuyá, jengibre y chile ahumado',                    precio: '13.50€', destacado: false },
    { nombre: 'NOCHE ESTRELLADA',    desc: 'Mora, lavanda, limón y soda artesanal',                         precio: '8€',     destacado: false },
    { nombre: 'ROSA CANARIA',        desc: 'Hibisco, frambuesa, lima y jarabe natural',                     precio: '7€',     destacado: false },
    { nombre: 'OASIS VERDE',         desc: 'Pepino, menta, limón y agua de coco',                           precio: '7.50€',  destacado: false },
  ],
  clasicos: [
    { nombre: 'MOJITO CANARIO',      desc: 'Ron blanco, lima fresca, menta y azúcar de caña',              precio: '9€',     destacado: false },
    { nombre: 'NEGRONI CLÁSICO',     desc: 'Ginebra, vermú rojo y Campari con naranja',                    precio: '10€',    destacado: false },
    { nombre: 'DAIQUIRI DE MANGO',   desc: 'Ron blanco, mango tropical, lima y jarabe natural',            precio: '9.50€',  destacado: false },
    { nombre: 'OLD FASHIONED',       desc: 'Bourbon premium, azúcar moreno y angostura',                   precio: '11€',    destacado: false },
    { nombre: 'APEROL SPRITZ',       desc: 'Aperol, prosecco seco y un toque de naranja',                  precio: '9€',     destacado: false },
    { nombre: 'MARGARITA PICANTE',   desc: 'Tequila, triple sec, lima y jalapeño fresco',                  precio: '10.50€', destacado: false },
  ],
}

const toggleBtnStyle = (active: boolean): React.CSSProperties => ({
  fontFamily: 'var(--font-cinzel, Cinzel, serif)',
  fontSize: '11px',
  letterSpacing: '0.2em',
  padding: '10px 28px',
  border: 'none',
  borderRadius: '1px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  background: active ? '#D4982E' : 'transparent',
  color:      active ? '#1A0E05' : '#A07850',
})

const seccionHeaderStyle: React.CSSProperties = {
  fontFamily: 'var(--font-cinzel, Cinzel, serif)',
  fontSize: '14px',
  color: '#D4982E',
  letterSpacing: '0.2em',
  marginBottom: '0.5rem',
}

export default function CocteleSection() {
  const [modo, setModo] = useState<'imagen' | 'carta'>('imagen')

  return (
    <section id="cocteles" style={{ background: '#1A0E05', padding: '8rem 4rem', minHeight: '100vh' }}>
      <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }`}</style>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{
            fontFamily: 'var(--font-cinzel, Cinzel, serif)',
            fontSize: '11px', color: '#A07850',
            letterSpacing: '0.5em', marginBottom: '1rem',
          }}>
            MIXOLOGÍA CANARIA
          </p>
          <h2 style={{
            fontFamily: 'var(--font-cinzel, Cinzel, serif)',
            fontSize: 'clamp(28px, 4vw, 48px)',
            color: '#D4982E', letterSpacing: '0.08em', marginBottom: '0.5rem',
          }}>
            CÓCTELES PREMIUM
          </h2>
          <p style={{
            fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(15px, 1.4vw, 19px)',
            color: '#D4B896', margin: 0,
          }}>
            Sabores del archipiélago en cada trago.
          </p>
        </div>

        {/* TOGGLE */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
          <div style={{
            display: 'flex',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(212,152,46,0.2)',
            borderRadius: '2px',
            padding: '3px', gap: '3px',
          }}>
            <button onClick={() => setModo('imagen')} style={toggleBtnStyle(modo === 'imagen')}>🖼 VER CARTA</button>
            <button onClick={() => setModo('carta')}  style={toggleBtnStyle(modo === 'carta')}>📋 LEER LISTA</button>
          </div>
        </div>

        {/* MODO: VER CARTA — imagen Canva */}
        {modo === 'imagen' && (
          <div style={{ display: 'flex', justifyContent: 'center', animation: 'fadeIn 0.3s ease' }}>
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '600px',
              /* Imagen vertical ~1000×1400 → ratio ~0.71:1
                 600px / 0.71 ≈ 845px de alto */
              height: 'clamp(500px, 80vw, 850px)',
              border: '1px solid rgba(212,152,46,0.3)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              background: '#0A0502',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}>
              <img
                src="/menus/menu-cocteles.png"
                alt="Carta de cócteles SOKKO Lounge"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
              <div style={{ position: 'absolute', bottom: '1rem', right: '1rem' }}>
                <a
                  href="/menus/menu-cocteles.png"
                  download="cocteleria-sokko-lounge.png"
                  style={{
                    fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                    fontSize: '10px', letterSpacing: '0.2em',
                    color: '#1A0E05', background: 'rgba(212,152,46,0.9)',
                    padding: '8px 16px', textDecoration: 'none', display: 'inline-block',
                  }}
                >
                  DESCARGAR ↓
                </a>
              </div>
            </div>
          </div>
        )}

        {/* MODO: LEER LISTA — thumbnail izq + dos columnas derecha */}
        {modo === 'carta' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '280px 1fr',
            gap: '3rem',
            alignItems: 'start',
            animation: 'fadeIn 0.3s ease',
          }}>
            {/* Thumbnail sticky */}
            <div style={{ position: 'sticky', top: '100px' }}>
              <img
                src="/menus/menu-cocteles.png"
                alt="Cócteles SOKKO"
                style={{
                  width: '100%', height: 'auto',
                  border: '1px solid rgba(212,152,46,0.25)', opacity: 0.85,
                }}
              />
              <p style={{
                fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                fontStyle: 'italic', fontSize: '13px', color: '#A07850',
                textAlign: 'center', marginTop: '0.75rem',
              }}>
                Bajo las estrellas de Fuerteventura
              </p>
            </div>

            {/* Dos columnas: Firma + Clásicos */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem' }}>

              {/* FIRMA SOKKO */}
              <div>
                <h3 style={seccionHeaderStyle}>FIRMA SOKKO</h3>
                <div style={{ width: '40px', height: '1px', background: '#D4982E', marginBottom: '1.5rem', opacity: 0.5 }} />
                {coctelesData.firma.map((c, i) => (
                  <div key={i} style={{
                    padding: '1rem 0',
                    borderBottom: '1px solid rgba(212,152,46,0.08)',
                  }}>
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

              {/* CLÁSICOS */}
              <div>
                <h3 style={seccionHeaderStyle}>CLÁSICOS</h3>
                <div style={{ width: '40px', height: '1px', background: '#D4982E', marginBottom: '1.5rem', opacity: 0.5 }} />
                {coctelesData.clasicos.map((c, i) => (
                  <div key={i} style={{
                    padding: '1rem 0',
                    borderBottom: '1px solid rgba(212,152,46,0.08)',
                  }}>
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

            </div>
          </div>
        )}

      </div>
    </section>
  )
}
