'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export interface EventoData {
  slug: string
  titulo: string
  subtitulo: string
  fecha: string
  dia: string
  mes: string
  horario: string
  precio: string
  imagen: string
  badge: string
  categoria: string
}

interface Props {
  talleres: EventoData[]
  shows: EventoData[]
  artistas: EventoData[]
}

// ── Card de evento ─────────────────────────────────────────────
function EventoCard({ evento, accentColor, tall = false }: {
  evento: EventoData
  accentColor: string
  tall?: boolean
}) {
  const router = useRouter()
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={() => router.push(`/eventos/${evento.slug}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        height: tall ? '320px' : '240px',
        overflow: 'hidden',
        cursor: 'pointer',
        border: `1px solid ${hovered ? accentColor + '60' : accentColor + '25'}`,
        transition: 'border-color 0.3s ease',
      }}
    >
      {/* Imagen */}
      <motion.img
        src={evento.imagen}
        alt={evento.titulo}
        animate={{ scale: hovered ? 1.06 : 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center top',
        }}
      />

      {/* Overlay base */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(10,5,2,0.92) 0%, rgba(10,5,2,0.3) 60%, transparent 100%)',
        transition: 'opacity 0.4s ease',
        opacity: hovered ? 0 : 1,
      }} />

      {/* Overlay hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 12 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(to top, rgba(10,5,2,0.97) 0%, rgba(10,5,2,0.8) 100%)`,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-end', padding: '1.5rem',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-cinzel, Cinzel, serif)',
          fontSize: '9px', color: accentColor,
          letterSpacing: '0.35em', marginBottom: '6px', display: 'block',
        }}>{evento.badge}</span>
        <p style={{
          fontFamily: 'var(--font-cinzel, Cinzel, serif)',
          fontSize: tall ? 'clamp(16px, 2vw, 22px)' : '15px',
          color: '#F4EDD8', margin: '0 0 4px', lineHeight: 1.1,
        }}>{evento.titulo}</p>
        <p style={{
          fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
          fontStyle: 'italic', fontSize: '14px',
          color: '#D4B896', margin: '0 0 10px',
        }}>{evento.subtitulo}</p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' as const, alignItems: 'center' }}>
          <span style={{
            fontFamily: 'var(--font-cinzel, Cinzel, serif)',
            fontSize: '10px', color: accentColor,
            border: `1px solid ${accentColor}50`,
            padding: '3px 10px', letterSpacing: '0.15em',
          }}>{evento.precio}</span>
          <span style={{
            fontFamily: 'var(--font-raleway, Raleway, sans-serif)',
            fontSize: '11px', color: '#8A6940',
          }}>{evento.fecha} · {evento.horario}</span>
        </div>
        <p style={{
          fontFamily: 'var(--font-cinzel, Cinzel, serif)',
          fontSize: '9px', color: accentColor,
          letterSpacing: '0.2em', marginTop: '12px', marginBottom: 0,
        }}>VER MÁS →</p>
      </motion.div>

      {/* Info mínima siempre visible */}
      <motion.div
        animate={{ opacity: hovered ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem' }}
      >
        <p style={{
          fontFamily: 'var(--font-cinzel, Cinzel, serif)',
          fontSize: '9px', color: accentColor,
          letterSpacing: '0.3em', margin: '0 0 3px',
        }}>{evento.fecha}</p>
        <p style={{
          fontFamily: 'var(--font-cinzel, Cinzel, serif)',
          fontSize: 'clamp(13px, 1.5vw, 18px)',
          color: '#F4EDD8', margin: 0, lineHeight: 1.1,
        }}>{evento.titulo}</p>
      </motion.div>
    </div>
  )
}

// ── Columna de categoría ───────────────────────────────────────
function ColumnaEvento({ icono, titulo, horario, color, eventos, destacada = false, proximamente }: {
  icono: string
  titulo: string
  horario: string
  color: string
  eventos: EventoData[]
  destacada?: boolean
  proximamente?: string
}) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      borderRight: '1px solid rgba(212,152,46,0.08)',
    }}>
      {/* Header */}
      <div style={{
        padding: '2rem 1.5rem 1.5rem',
        borderBottom: `1px solid ${color}20`,
        background: destacada
          ? `linear-gradient(to bottom, ${color}08, transparent)`
          : 'transparent',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '22px' }}>{icono}</span>
          <div>
            <p style={{
              fontFamily: 'var(--font-cinzel, Cinzel, serif)',
              fontSize: destacada ? '14px' : '12px',
              color: color, letterSpacing: '0.15em', margin: 0,
            }}>{titulo}</p>
            <p style={{
              fontFamily: 'var(--font-raleway, Raleway, sans-serif)',
              fontSize: '11px', color: '#8A6940',
              letterSpacing: '0.1em', margin: 0,
            }}>{horario}</p>
          </div>
        </div>
        {/* Separador ornamental */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '0.75rem' }}>
          <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, transparent, ${color}40)` }} />
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M4 0L5 3L8 4L5 5L4 8L3 5L0 4L3 3Z" fill={color} fillOpacity="0.6" />
          </svg>
          <div style={{ flex: 1, height: '1px', background: `linear-gradient(to left, transparent, ${color}40)` }} />
        </div>
      </div>

      {/* Cards */}
      <div style={{ flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {eventos.length > 0 ? (
          eventos.map((ev, i) => (
            <EventoCard
              key={ev.slug}
              evento={ev}
              accentColor={color}
              tall={destacada && i === 0}
            />
          ))
        ) : (
          <div style={{
            flex: 1, minHeight: '200px',
            border: `1px dashed ${color}25`,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: '0.75rem', padding: '2rem',
          }}>
            <div style={{
              width: '40px', height: '40px',
              border: `1px solid ${color}30`,
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '18px',
            }}>{icono}</div>
            <p style={{
              fontFamily: 'var(--font-cinzel, Cinzel, serif)',
              fontSize: '11px', color: color,
              letterSpacing: '0.35em', margin: 0, textAlign: 'center',
            }}>PRÓXIMAMENTE</p>
            <p style={{
              fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
              fontStyle: 'italic', fontSize: '14px',
              color: '#8A6940', margin: 0, textAlign: 'center', lineHeight: 1.5,
            }}>
              {proximamente ?? 'Nuevos eventos en preparación'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Componente principal (client) ──────────────────────────────
export default function EventosSectionClient({ talleres, shows, artistas }: Props) {
  return (
    <section id="eventos" style={{ background: '#100804', padding: '8rem 0' }}>

      {/* HEADER */}
      <div style={{ textAlign: 'center', padding: '0 4rem', marginBottom: '4rem' }}>
        <p style={{
          fontFamily: 'var(--font-cinzel, Cinzel, serif)',
          fontSize: '11px', color: '#8A6940',
          letterSpacing: '0.5em', marginBottom: '1rem',
        }}>PRÓXIMOS EVENTOS</p>
        <h2 style={{
          fontFamily: 'var(--font-cinzel, Cinzel, serif)',
          fontSize: 'clamp(28px, 4vw, 56px)',
          color: '#D4982E', letterSpacing: '0.08em', marginBottom: '1rem',
        }}>VIVE LA EXPERIENCIA SOKKO</h2>
        <p style={{
          fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
          fontStyle: 'italic',
          fontSize: 'clamp(15px, 1.4vw, 20px)',
          color: '#D4B896', margin: 0,
        }}>Cada noche, una experiencia única en Caleta de Fuste</p>

        {/* Separador ornamental */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '1.5rem' }}>
          <div style={{ width: '60px', height: '1px', background: 'linear-gradient(to right, transparent, #D4982E)' }} />
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5Z" fill="none" stroke="#D4982E" strokeWidth="1" />
          </svg>
          <div style={{ width: '60px', height: '1px', background: 'linear-gradient(to left, transparent, #D4982E)' }} />
        </div>
      </div>

      {/* GRID 3 COLUMNAS */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.4fr 1fr',
        maxWidth: '1400px',
        margin: '0 auto',
        border: '1px solid rgba(212,152,46,0.12)',
        borderLeft: 'none', borderRight: 'none',
      }}>
        <ColumnaEvento
          icono="🎨"
          titulo="TALLERES Y CURSOS"
          horario="15:00 — 20:00"
          color="#E8A020"
          eventos={talleres}
          destacada={false}
          proximamente="Talleres y cursos en preparación"
        />
        <ColumnaEvento
          icono="🎭"
          titulo="SHOWS PARA CENAS"
          horario="20:00 — 23:00"
          color="#D4982E"
          eventos={shows}
          destacada={true}
        />
        <ColumnaEvento
          icono="🎧"
          titulo="ARTISTAS Y DJS"
          horario="23:00 — 02:00"
          color="#5090E8"
          eventos={artistas}
          destacada={false}
        />
      </div>

      {/* Nota Instagram */}
      <p style={{
        fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
        fontStyle: 'italic', fontSize: '14px',
        color: '#5A3A20', textAlign: 'center',
        marginTop: '3rem', padding: '0 4rem',
      }}>
        Síguenos en{' '}
        <a
          href="https://www.instagram.com/sokkolounge.ftv/"
          target="_blank" rel="noopener noreferrer"
          style={{ color: '#8A6940', textDecoration: 'none' }}
        >
          @sokkolounge.ftv
        </a>{' '}
        para no perderte ningún evento
      </p>
    </section>
  )
}
