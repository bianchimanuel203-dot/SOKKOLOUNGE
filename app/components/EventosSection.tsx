'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const eventos = [
  {
    slug: 'apertura-general',
    badge: 'APERTURA GENERAL',
    titulo: 'DRAG SHOW',
    subtitulo: 'Dayana + Gabriela · DJ Jony · DJ Lemus',
    fecha: 'SÁBADO',
    dia: '13',
    mes: 'JUNIO',
    horario: '20:00 — 02:00',
    precio: 'ENTRADA LIBRE',
    imagen: '/eventos/apertura-general.jpg',
    destacado: true,
    color: '#C8922A',
  },
  {
    slug: 'apertura-vip',
    badge: 'APERTURA VIP',
    titulo: 'DJ DOA',
    subtitulo: 'Presentación Dayana + SOKKO · Brindis',
    fecha: 'VIERNES',
    dia: '12',
    mes: 'JUNIO',
    horario: '20:00 — 00:00',
    precio: 'SOLO INVITADOS',
    imagen: '/eventos/apertura-vip.jpg',
    destacado: false,
    color: '#4080E0',
  },
  {
    slug: 'domingo-familiar',
    badge: 'DOMINGO FAMILIAR',
    titulo: 'MAGO SENA',
    subtitulo: 'Torneos PS5 · Billar · Bebida + Tapa Gratis',
    fecha: 'DOMINGO',
    dia: '14',
    mes: 'JUNIO',
    horario: '12:00 — 02:00',
    precio: 'ENTRADA LIBRE',
    imagen: '/eventos/domingo-familiar.jpg',
    destacado: false,
    color: '#40B060',
  },
]

const eventoHero = eventos.find(e => e.destacado)!
const eventosGrid = eventos.filter(e => !e.destacado)

export default function EventosSection() {
  const router = useRouter()
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null)

  return (
    <section id="eventos" style={{ background: '#100804', padding: '8rem 0 0' }}>

      {/* HEADER */}
      <div style={{ textAlign: 'center', padding: '0 4rem', marginBottom: '4rem' }}>
        <p style={{
          fontFamily: 'var(--font-cinzel, Cinzel, serif)',
          fontSize: '11px', color: '#A07850',
          letterSpacing: '0.5em', marginBottom: '1rem',
        }}>
          PRÓXIMOS EVENTOS
        </p>
        <h2 style={{
          fontFamily: 'var(--font-cinzel, Cinzel, serif)',
          fontSize: 'clamp(28px, 4vw, 56px)',
          color: '#D4982E', letterSpacing: '0.08em', margin: 0,
        }}>
          VIVE LA EXPERIENCIA SOKKO
        </h2>
        <p style={{
          fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
          fontStyle: 'italic',
          fontSize: 'clamp(15px, 1.4vw, 20px)',
          color: '#D4B896', marginTop: '0.5rem', marginBottom: 0,
        }}>
          Noches únicas en Caleta de Fuste, Fuerteventura
        </p>
      </div>

      {/* ── EVENTO HERO — flyer full width ── */}
      <div
        onClick={() => router.push(`/eventos/${eventoHero.slug}`)}
        style={{
          position: 'relative',
          width: '100%',
          height: '90vh',
          minHeight: '500px',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
      >
        {/* Flyer zoom on hover */}
        <motion.img
          src={eventoHero.imagen}
          alt={eventoHero.titulo}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center top',
          }}
        />

        {/* Overlay gradiente */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(10,5,2,0.95) 0%, rgba(10,5,2,0.3) 50%, rgba(10,5,2,0.1) 100%)',
        }} />

        {/* Badge arriba izquierda */}
        <div style={{
          position: 'absolute', top: '2.5rem', left: '3rem',
          display: 'flex', alignItems: 'center', gap: '12px',
        }}>
          <div style={{ width: '24px', height: '1px', background: '#D4982E' }} />
          <span style={{
            fontFamily: 'var(--font-cinzel, Cinzel, serif)',
            fontSize: '11px', color: '#D4982E', letterSpacing: '0.4em',
          }}>
            {eventoHero.badge}
          </span>
        </div>

        {/* Fecha arriba derecha — grande y sutil */}
        <div style={{ position: 'absolute', top: '1.5rem', right: '3rem', textAlign: 'right' }}>
          <p style={{
            fontFamily: 'var(--font-cinzel, Cinzel, serif)',
            fontSize: 'clamp(72px, 10vw, 140px)',
            color: 'rgba(212,152,46,0.1)', lineHeight: 1, margin: 0,
          }}>
            {eventoHero.dia}
          </p>
          <p style={{
            fontFamily: 'var(--font-cinzel, Cinzel, serif)',
            fontSize: '13px', color: 'rgba(212,152,46,0.35)',
            letterSpacing: '0.3em', margin: 0,
          }}>
            {eventoHero.mes}
          </p>
        </div>

        {/* Contenido abajo */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '0 3rem 3rem',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-cinzel, Cinzel, serif)',
            fontSize: 'clamp(32px, 6vw, 96px)',
            color: '#F4EDD8', lineHeight: 1.0,
            margin: '0 0 0.5rem', letterSpacing: '0.03em',
          }}>
            {eventoHero.titulo}
          </h3>
          <p style={{
            fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(16px, 1.8vw, 24px)',
            color: '#D4B896', margin: '0 0 2rem',
          }}>
            {eventoHero.subtitulo}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' as const }}>
            <span style={{
              fontFamily: 'var(--font-cinzel, Cinzel, serif)',
              fontSize: '12px', color: '#D4982E',
              border: '1px solid rgba(212,152,46,0.5)',
              padding: '8px 20px', letterSpacing: '0.15em',
            }}>
              {eventoHero.precio}
            </span>
            <span style={{
              fontFamily: 'var(--font-raleway, Raleway, sans-serif)',
              fontSize: '13px', color: '#A07850', letterSpacing: '0.15em',
            }}>
              {eventoHero.fecha} {eventoHero.dia} · {eventoHero.horario}
            </span>
            <motion.span
              whileHover={{ x: 6 }}
              style={{
                marginLeft: 'auto',
                fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                fontSize: '12px', color: '#D4982E',
                letterSpacing: '0.2em', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}
            >
              VER EVENTO COMPLETO →
            </motion.span>
          </div>
        </div>
      </div>

      {/* ── GRID DE FLYERS — hover reveal ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${eventosGrid.length}, 1fr)`,
      }}>
        {eventosGrid.map(evento => (
          <div
            key={evento.slug}
            onClick={() => router.push(`/eventos/${evento.slug}`)}
            onMouseEnter={() => setHoveredSlug(evento.slug)}
            onMouseLeave={() => setHoveredSlug(null)}
            style={{
              position: 'relative',
              height: '55vh',
              minHeight: '320px',
              overflow: 'hidden',
              cursor: 'pointer',
              borderTop: '1px solid rgba(212,152,46,0.15)',
              borderRight: '1px solid rgba(212,152,46,0.08)',
            }}
          >
            {/* Flyer */}
            <motion.img
              src={evento.imagen}
              alt={evento.titulo}
              animate={{ scale: hoveredSlug === evento.slug ? 1.08 : 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'center top',
              }}
            />

            {/* Overlay base — siempre visible */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(10,5,2,0.9) 0%, rgba(10,5,2,0.2) 60%, transparent 100%)',
              transition: 'opacity 0.4s ease',
              opacity: hoveredSlug === evento.slug ? 0 : 1,
            }} />

            {/* Overlay hover — info completa */}
            <motion.div
              animate={{
                opacity: hoveredSlug === evento.slug ? 1 : 0,
                y: hoveredSlug === evento.slug ? 0 : 20,
              }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(10,5,2,0.97) 0%, rgba(10,5,2,0.75) 100%)',
                display: 'flex', flexDirection: 'column',
                justifyContent: 'flex-end', padding: '2rem',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                fontSize: '10px', color: evento.color,
                letterSpacing: '0.35em', marginBottom: '0.75rem', display: 'block',
              }}>
                {evento.badge}
              </span>
              <h4 style={{
                fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                fontSize: 'clamp(20px, 2.5vw, 32px)',
                color: '#F4EDD8', margin: '0 0 0.4rem', lineHeight: 1.1,
              }}>
                {evento.titulo}
              </h4>
              <p style={{
                fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                fontStyle: 'italic',
                fontSize: 'clamp(14px, 1.3vw, 18px)',
                color: '#D4B896', margin: '0 0 1.25rem',
              }}>
                {evento.subtitulo}
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' as const, alignItems: 'center' }}>
                <span style={{
                  fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                  fontSize: '11px', color: evento.color,
                  border: `1px solid ${evento.color}60`,
                  padding: '5px 14px', letterSpacing: '0.15em',
                }}>
                  {evento.precio}
                </span>
                <span style={{
                  fontFamily: 'var(--font-raleway, Raleway, sans-serif)',
                  fontSize: '12px', color: '#A07850',
                }}>
                  {evento.fecha} {evento.dia} · {evento.horario}
                </span>
              </div>
              <p style={{
                fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                fontSize: '10px', color: evento.color,
                letterSpacing: '0.2em', marginTop: '1.25rem', marginBottom: 0,
              }}>
                VER MÁS →
              </p>
            </motion.div>

            {/* Info mínima siempre visible */}
            <motion.div
              animate={{ opacity: hoveredSlug === evento.slug ? 0 : 1 }}
              transition={{ duration: 0.25 }}
              style={{
                position: 'absolute', bottom: '1.5rem',
                left: '1.5rem', right: '1.5rem',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                fontSize: '10px', color: '#A07850',
                letterSpacing: '0.3em', display: 'block', marginBottom: '4px',
              }}>
                {evento.badge}
              </span>
              <p style={{
                fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                fontSize: 'clamp(14px, 1.8vw, 22px)',
                color: '#F4EDD8', margin: 0,
              }}>
                {evento.titulo}
              </p>
            </motion.div>
          </div>
        ))}
      </div>

    </section>
  )
}
