'use client'

import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

// Datos placeholder — reemplazar con getMenu() de WordPress cuando esté listo
const menuData = {
  entrantes: [
    { nombre: 'CEVICHE DE CORVINA',      desc: 'Corvina fresca marinada en limón canario, ají amarillo y cilantro',                           precio: '14€', destacado: true  },
    { nombre: 'TATAKI DE ATÚN ROJO',     desc: 'Atún rojo del Atlántico sellado con sésamo negro, aguacate y salsa ponzu',                    precio: '16€', destacado: false },
    { nombre: 'TABLA DE QUESOS CANARIOS',desc: 'Selección de quesos de las islas con miel de palma y membrillo',                              precio: '12€', destacado: false },
    { nombre: 'PAPAS ARRUGADAS CON MOJO',desc: 'Patatas canarias tradicionales con mojo rojo y mojo verde de la casa',                        precio: '8€',  destacado: false },
  ],
  principales: [
    { nombre: 'LUBINA A LA SAL NEGRA',   desc: 'Lubina entera a la sal volcánica negra con aceite de oliva virgen y hierbas frescas',         precio: '26€', destacado: true  },
    { nombre: 'SOLOMILLO LANZAROTEÑO',   desc: 'Lomo de res madurado con reducción de vino tinto, patatas volcánicas y trufa',                precio: '28€', destacado: false },
    { nombre: 'ROPA VIEJA CANARIA',      desc: 'Garbanzo, pollo y ternera estofados. Receta tradicional de las islas',                       precio: '16€', destacado: false },
    { nombre: 'RISOTTO DE MARISCOS',     desc: 'Arroz cremoso con gambas, almejas y azafrán canario',                                         precio: '19€', destacado: false },
  ],
  postres: [
    { nombre: 'TARTA DE MANGO VOLCÁNICO',desc: 'Mousse de mango canario con base de bizcocho de almendra y coulis de maracuyá',               precio: '9€',  destacado: true  },
    { nombre: 'COULANT DE CHOCOLATE',    desc: 'Coulant de chocolate negro 70% con helado de vainilla bourbon y sal volcánica',               precio: '8€',  destacado: false },
    { nombre: 'BIENMESABE',              desc: 'Crema tradicional canaria de almendra, canela y limón con helado artesanal',                   precio: '7€',  destacado: false },
  ],
}

const categorias = [
  { key: 'entrantes',   label: 'ENTRANTES'   },
  { key: 'principales', label: 'PRINCIPALES' },
  { key: 'postres',     label: 'POSTRES'     },
] as const

type CatKey = typeof categorias[number]['key']

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

export default function MenuSection() {
  const [modo, setModo] = useState<'imagen' | 'carta'>('imagen')

  return (
    <section id="carta" style={{ background: '#1A0E05', padding: '8rem 4rem' }}>
      <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }`}</style>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{
            fontFamily: 'var(--font-cinzel, Cinzel, serif)',
            fontSize: '11px', color: '#A07850',
            letterSpacing: '0.5em', marginBottom: '1rem',
          }}>
            NUESTRA CARTA
          </p>
          <h2 style={{
            fontFamily: 'var(--font-cinzel, Cinzel, serif)',
            fontSize: 'clamp(28px, 4vw, 48px)',
            color: '#D4982E', letterSpacing: '0.08em', marginBottom: '0.5rem',
          }}>
            GASTRONOMÍA CANARIA
          </h2>
          <p style={{
            fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(15px, 1.4vw, 19px)',
            color: '#D4B896', margin: 0,
          }}>
            Sabores de las islas con un toque moderno y creativo.
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
            <button onClick={() => setModo('imagen')} style={toggleBtnStyle(modo === 'imagen')}>🖼 VER MENÚ</button>
            <button onClick={() => setModo('carta')}  style={toggleBtnStyle(modo === 'carta')}>📋 LEER CARTA</button>
          </div>
        </div>

        {/* MODO: VER MENÚ — imagen Canva */}
        {modo === 'imagen' && (
          <div style={{ display: 'flex', justifyContent: 'center', animation: 'fadeIn 0.3s ease' }}>
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
                <a
                  href="/menus/menu-comida.png"
                  download="carta-sokko-lounge.png"
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

        {/* MODO: LEER CARTA — thumbnail izq + tabs derecha */}
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
                src="/menus/menu-comida.png"
                alt="Carta SOKKO"
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
                Carta sujeta a temporada
              </p>
            </div>

            {/* Tabs shadcn */}
            <Tabs defaultValue="entrantes">
              <TabsList style={{
                background: 'transparent',
                borderBottom: '1px solid rgba(212,152,46,0.2)',
                borderRadius: 0, padding: 0, height: 'auto',
                marginBottom: '2rem', width: '100%',
                justifyContent: 'flex-start', gap: 0,
              }}>
                {categorias.map(cat => (
                  <TabsTrigger
                    key={cat.key}
                    value={cat.key}
                    style={{
                      fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                      fontSize: '11px', letterSpacing: '0.2em',
                      borderRadius: 0, padding: '0.75rem 1.5rem',
                      background: 'transparent', border: 'none',
                      borderBottom: '2px solid transparent',
                      marginBottom: '-1px',
                    }}
                    className="text-[#A07850] data-[state=active]:text-[#D4982E] data-[state=active]:border-b-[#D4982E] data-[state=active]:border-b-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    {cat.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categorias.map(cat => (
                <TabsContent key={cat.key} value={cat.key}>
                  {menuData[cat.key].map((plato, i) => (
                    <div key={i} style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr auto',
                      gap: '1.5rem',
                      padding: '1.5rem 0',
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
                          }}>
                            RECOMENDADO
                          </span>
                        )}
                        <p style={{
                          fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                          fontSize: 'clamp(13px, 1.2vw, 15px)',
                          color: '#F4EDD8', letterSpacing: '0.05em',
                          margin: plato.destacado ? '4px 0 4px' : '0 0 4px',
                          lineHeight: 1.3,
                        }}>
                          {plato.nombre}
                        </p>
                        <p style={{
                          fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                          fontStyle: 'italic', fontSize: '15px',
                          color: '#D4B896', margin: 0, lineHeight: 1.5,
                        }}>
                          {plato.desc}
                        </p>
                      </div>
                      <p style={{
                        fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                        fontSize: '15px', color: '#D4982E', margin: 0,
                        whiteSpace: 'nowrap',
                        paddingTop: plato.destacado ? '20px' : '0',
                      }}>
                        {plato.precio}
                      </p>
                    </div>
                  ))}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        )}

      </div>
    </section>
  )
}
