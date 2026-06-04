import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'

// ── Tipos ────────────────────────────────────────────────────────
type ProgramaItem = { hora: string; acto: string; desc: string }

type EventoData = {
  slug: string
  badge: string
  titulo: string
  subtitulo: string
  fecha: string
  horario: string
  precio: string
  lugar: string
  descripcion: string
  programa: ProgramaItem[]
  imagen: string
  color: string
}

// ── Datos estáticos ───────────────────────────────────────────────
const eventosData: Record<string, EventoData> = {
  'apertura-general': {
    slug: 'apertura-general',
    badge: 'APERTURA GENERAL',
    titulo: 'DRAG SHOW',
    subtitulo: 'DAYANA + GABRIELA',
    fecha: 'SÁBADO 13 DE JUNIO DE 2026',
    horario: '20:00 — 02:00',
    precio: 'ENTRADA LIBRE',
    lugar: 'SOKKO Lounge · Caleta de Fuste, Fuerteventura',
    descripcion: 'Una noche mágica de apertura con el espectáculo de drag más vibrante de las islas. Dayana y Gabriela junto a los mejores DJs pondrán en pie a todo SOKKO en su primera noche oficial.',
    programa: [
      { hora: '20:00 — 21:30', acto: 'DJ JONY',    desc: 'Apertura musical'        },
      { hora: '21:30 — 23:30', acto: 'DRAG SHOW',  desc: 'Con Dayana + Gabriela'   },
      { hora: '23:30 — 02:00', acto: 'DJ LEMUS',   desc: 'Cierre de noche'         },
    ],
    imagen: '/eventos/apertura-general.jpg',
    color: '#C8922A',
  },
  'apertura-vip': {
    slug: 'apertura-vip',
    badge: 'APERTURA VIP',
    titulo: 'DJ DOA',
    subtitulo: 'NOCHE EXCLUSIVA · SOLO INVITADOS',
    fecha: 'VIERNES 12 DE JUNIO DE 2026',
    horario: '20:00 — 00:00',
    precio: 'SOLO INVITADOS',
    lugar: 'SOKKO Lounge · Caleta de Fuste, Fuerteventura',
    descripcion: 'La presentación privada de SOKKO Lounge ante sus invitados más especiales. Una noche exclusiva de catering, brindis, presentación oficial y música con DJ Doa.',
    programa: [
      { hora: '20:00 — 21:00', acto: 'RECEPCIÓN Y CATERING',       desc: ''                         },
      { hora: '21:00 — 21:30', acto: 'PRESENTACIÓN DAYANA + SOKKO', desc: ''                         },
      { hora: '21:30 — 22:00', acto: 'BRINDIS',                    desc: ''                         },
      { hora: '22:00 — 00:00', acto: 'DJ DOA',                     desc: 'Sets de electrónica premium' },
    ],
    imagen: '/eventos/apertura-vip.jpg',
    color: '#4080E0',
  },
  'domingo-familiar': {
    slug: 'domingo-familiar',
    badge: 'DOMINGO FAMILIAR',
    titulo: 'MAGO SENA',
    subtitulo: 'FAMILIA Y JUEGOS',
    fecha: 'DOMINGO 14 DE JUNIO DE 2026',
    horario: '12:00 — 02:00',
    precio: 'ENTRADA LIBRE',
    lugar: 'SOKKO Lounge · Caleta de Fuste, Fuerteventura',
    descripcion: 'El cierre perfecto del fin de semana inaugural. Un día completo para toda la familia — bebida y tapa gratis, torneos de PS5 y billar, magia en vivo con Mago Sena y música hasta las 2h.',
    programa: [
      { hora: '12:00 — 15:00', acto: 'BEBIDA + TAPA GRATIS', desc: ''               },
      { hora: '15:00 — 18:00', acto: 'CAFETERÍA + JUEGOS',   desc: ''               },
      { hora: '18:00 — 20:00', acto: 'TORNEOS PS5 Y BILLAR', desc: ''               },
      { hora: '20:00 — 22:00', acto: 'MAGO SENA',            desc: 'Magia en directo' },
      { hora: '22:00 — 02:00', acto: 'MÚSICA AMBIENTE',      desc: ''               },
    ],
    imagen: '/eventos/domingo-familiar.jpg',
    color: '#40B060',
  },
}

// ── Metadata ──────────────────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const evento = eventosData[slug]
  if (!evento) return { title: 'Evento no encontrado — SOKKO Lounge' }
  return {
    title: `${evento.titulo} · ${evento.fecha} — SOKKO Lounge`,
    description: evento.descripcion,
  }
}

// ── Rutas estáticas ───────────────────────────────────────────────
export function generateStaticParams() {
  return Object.keys(eventosData).map(slug => ({ slug }))
}

// ── Página ────────────────────────────────────────────────────────
export default async function EventoPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const evento = eventosData[slug]
  if (!evento) notFound()

  return (
    <main style={{ background: '#100804', minHeight: '100vh' }}>

      {/* Navbar mínimo */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(16,8,4,0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(212,152,46,0.15)',
        padding: '0 3rem', height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link href="/#eventos" style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '13px', color: '#D4982E',
          letterSpacing: '0.2em', textDecoration: 'none',
        }}>
          ← EVENTOS
        </Link>
        <Link href="/" style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '14px', color: '#D4982E',
          letterSpacing: '0.3em', textDecoration: 'none',
        }}>
          SOKKO LOUNGE
        </Link>
        <Link href="/#reservar" style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '11px', letterSpacing: '0.2em',
          color: '#D4982E', border: '1px solid #D4982E',
          padding: '8px 20px', textDecoration: 'none',
        }}>
          RESERVAR
        </Link>
      </nav>

      <div style={{ paddingTop: '64px' }}>

        {/* FLYER COMPLETO */}
        <div style={{
          position: 'relative',
          width: '100%', maxWidth: '700px',
          margin: '3rem auto 0', padding: '0 2rem',
        }}>
          <img
            src={evento.imagen}
            alt={evento.titulo}
            style={{
              width: '100%', height: 'auto', display: 'block',
              border: `1px solid ${evento.color}40`,
              boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
            }}
          />
        </div>

        {/* CONTENIDO */}
        <div style={{
          maxWidth: '700px', margin: '0 auto',
          padding: '3rem 2rem 6rem',
        }}>

          {/* Badge + título */}
          <span style={{
            fontFamily: 'Cinzel, serif',
            fontSize: '10px', color: evento.color,
            letterSpacing: '0.4em', display: 'block', marginBottom: '0.75rem',
          }}>
            {evento.badge}
          </span>
          <h1 style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(28px, 5vw, 56px)',
            color: '#D4982E', lineHeight: 1.0,
            letterSpacing: '0.05em', marginBottom: '0.5rem',
          }}>
            {evento.titulo}
          </h1>
          <p style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontStyle: 'italic',
            fontSize: 'clamp(16px, 2vw, 22px)',
            color: '#F4EDD8', marginBottom: '2.5rem',
          }}>
            {evento.subtitulo}
          </p>

          {/* Info rápida */}
          <div style={{
            background: 'rgba(44,26,8,0.5)',
            border: `1px solid ${evento.color}30`,
            padding: '1.5rem 2rem',
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: '1.25rem', marginBottom: '2.5rem',
          }}>
            {[
              { label: 'FECHA',   valor: evento.fecha   },
              { label: 'HORARIO', valor: evento.horario },
              { label: 'PRECIO',  valor: evento.precio  },
              { label: 'LUGAR',   valor: evento.lugar   },
            ].map(({ label, valor }) => (
              <div key={label}>
                <p style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: '10px', color: '#A07850',
                  letterSpacing: '0.3em', marginBottom: '4px', margin: '0 0 4px',
                }}>{label}</p>
                <p style={{
                  fontFamily: 'Raleway, sans-serif',
                  fontSize: '15px', color: '#F4EDD8',
                  lineHeight: 1.4, margin: 0,
                }}>{valor}</p>
              </div>
            ))}
          </div>

          {/* Descripción */}
          <p style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontStyle: 'italic', fontSize: '18px',
            color: '#D4B896', lineHeight: 1.75,
            marginBottom: '2.5rem',
            borderLeft: `2px solid ${evento.color}60`,
            paddingLeft: '1.25rem',
          }}>
            {evento.descripcion}
          </p>

          {/* Programa */}
          {evento.programa.length > 0 && (
            <div style={{ marginBottom: '2.5rem' }}>
              <h2 style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '13px', color: '#D4982E',
                letterSpacing: '0.35em', marginBottom: '1.25rem',
              }}>PROGRAMA</h2>
              {evento.programa.map((p, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '150px 1fr',
                  gap: '1rem', padding: '0.85rem 0',
                  borderBottom: '1px solid rgba(212,152,46,0.08)',
                  alignItems: 'baseline',
                }}>
                  <span style={{
                    fontFamily: 'Cinzel, serif',
                    fontSize: '12px', color: evento.color,
                    letterSpacing: '0.08em',
                  }}>{p.hora}</span>
                  <div>
                    <span style={{
                      fontFamily: 'Raleway, sans-serif',
                      fontSize: '15px', color: '#F4EDD8', fontWeight: 500,
                    }}>{p.acto}</span>
                    {p.desc && (
                      <span style={{
                        fontFamily: '"Cormorant Garamond", serif',
                        fontStyle: 'italic', fontSize: '14px',
                        color: '#A07850', marginLeft: '8px',
                      }}>{p.desc}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <Link href="/#reservar" style={{
            display: 'block', textAlign: 'center',
            fontFamily: 'Cinzel, serif',
            fontSize: '13px', letterSpacing: '0.25em',
            color: '#100804', background: '#D4982E',
            padding: '18px', textDecoration: 'none',
          }}>
            RESERVAR PLAZA
          </Link>

        </div>
      </div>
    </main>
  )
}
