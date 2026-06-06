import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  getEventoBySlug,
  getEventos,
  formatFechaACF,
  getDiaSemana,
  getLabelCategoria,
  formatPrecioEvento,
  getImagenUrl,
} from '@/app/lib/wordpress'

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

// ── Datos estáticos de fallback (eventos de apertura) ─────────────
const eventosEstaticos: Record<string, EventoData> = {
  'apertura-general': {
    slug: 'apertura-general',
    badge: 'APERTURA GENERAL',
    titulo: 'DRAG SHOW',
    subtitulo: 'DAYANA + GABRIELA',
    fecha: 'SÁBADO 13 DE JUNIO DE 2026',
    horario: '20:00 — 02:00',
    precio: 'ENTRADA LIBRE',
    lugar: 'SOKKO Lounge · Caleta de Fuste, Fuerteventura',
    descripcion: 'Una noche mágica de apertura con el espectáculo de drag más vibrante de las islas. Dayana y Gabriela junto a los mejores DJs pondrán en pie a todo SOKKO.',
    programa: [
      { hora: '20:00 — 21:30', acto: 'DJ JONY',   desc: 'Apertura musical'      },
      { hora: '21:30 — 23:30', acto: 'DRAG SHOW', desc: 'Con Dayana + Gabriela' },
      { hora: '23:30 — 02:00', acto: 'DJ LEMUS',  desc: 'Cierre de noche'       },
    ],
    imagen: '/eventos/apertura-general.jpg',
    color: '#D4982E',
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
    descripcion: 'La presentación privada de SOKKO Lounge ante sus invitados más especiales. Una noche exclusiva de catering, brindis, presentación oficial y música premium.',
    programa: [
      { hora: '20:00 — 21:00', acto: 'RECEPCIÓN Y CATERING',      desc: ''                          },
      { hora: '21:00 — 21:30', acto: 'PRESENTACIÓN SOKKO',        desc: 'Con Dayana + Gabriela'     },
      { hora: '21:30 — 22:00', acto: 'BRINDIS',                   desc: ''                          },
      { hora: '22:00 — 00:00', acto: 'DJ DOA',                    desc: 'Sets de electrónica premium' },
    ],
    imagen: '/eventos/apertura-vip.jpg',
    color: '#5090E8',
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
    descripcion: 'El cierre perfecto del fin de semana inaugural. Un día completo para toda la familia con bebida y tapa gratis, torneos de PS5 y billar, magia en vivo y música hasta las 2h.',
    programa: [
      { hora: '12:00 — 15:00', acto: 'BEBIDA + TAPA GRATIS', desc: ''                 },
      { hora: '15:00 — 18:00', acto: 'CAFETERÍA + JUEGOS',   desc: ''                 },
      { hora: '18:00 — 20:00', acto: 'TORNEOS PS5 Y BILLAR', desc: ''                 },
      { hora: '20:00 — 22:00', acto: 'MAGO SENA',            desc: 'Magia en directo' },
      { hora: '22:00 — 02:00', acto: 'MÚSICA AMBIENTE',      desc: ''                 },
    ],
    imagen: '/eventos/domingo-familiar.jpg',
    color: '#D4982E',
  },
  'apertura-general-djs': {
    slug: 'apertura-general-djs',
    badge: 'APERTURA GENERAL',
    titulo: 'DJ JONY + DJ LEMUS',
    subtitulo: 'APERTURA GENERAL · NOCHE COMPLETA',
    fecha: 'SÁBADO 13 DE JUNIO DE 2026',
    horario: '20:00 — 02:00',
    precio: 'ENTRADA LIBRE',
    lugar: 'SOKKO Lounge · Caleta de Fuste, Fuerteventura',
    descripcion: 'La noche más larga del fin de semana inaugural. DJ Jony abre la noche y DJ Lemus la cierra en la madrugada, con el Drag Show de Dayana y Gabriela en el centro de la velada.',
    programa: [
      { hora: '20:00 — 21:30', acto: 'DJ JONY',   desc: 'Apertura'             },
      { hora: '21:30 — 23:30', acto: 'DRAG SHOW', desc: 'Con Dayana + Gabriela' },
      { hora: '23:30 — 02:00', acto: 'DJ LEMUS',  desc: 'Cierre'               },
    ],
    imagen: '/eventos/apertura-general.jpg',
    color: '#5090E8',
  },
}

// ── Metadata ──────────────────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params

  const wpEvento = await getEventoBySlug(slug)
  if (wpEvento) {
    return {
      title: `${wpEvento.title.rendered} · ${formatFechaACF(wpEvento.acf.fecha_evento)} — SOKKO Lounge`,
      description: wpEvento.acf.description,
    }
  }

  const e = eventosEstaticos[slug]
  if (!e) return { title: 'Evento — SOKKO Lounge' }
  return {
    title: `${e.titulo} · ${e.fecha} — SOKKO Lounge`,
    description: e.descripcion,
  }
}

// ── Rutas estáticas — combinar WP + estáticos ─────────────────────
export async function generateStaticParams() {
  try {
    const eventosWP = await getEventos()
    const slugsWP = eventosWP.map(e => ({ slug: e.slug }))
    const slugsEstaticos = Object.keys(eventosEstaticos).map(s => ({ slug: s }))
    const todos = [...slugsWP, ...slugsEstaticos]
    return todos.filter((item, index) =>
      todos.findIndex(t => t.slug === item.slug) === index
    )
  } catch {
    return Object.keys(eventosEstaticos).map(s => ({ slug: s }))
  }
}

// ── Página ────────────────────────────────────────────────────────
export default async function EventoPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  // Intentar obtener de WordPress primero
  const wpEvento = await getEventoBySlug(slug)

  let evento: EventoData

  if (wpEvento) {
    evento = {
      slug: wpEvento.slug,
      badge: getLabelCategoria(wpEvento.acf.categoria),
      titulo: wpEvento.title.rendered,
      subtitulo: wpEvento.acf.hora_evento,
      fecha: `${getDiaSemana(wpEvento.acf.fecha_evento)} ${formatFechaACF(wpEvento.acf.fecha_evento)}`,
      horario: wpEvento.acf.hora_evento,
      precio: formatPrecioEvento(wpEvento.acf.precio),
      lugar: 'SOKKO Lounge · Caleta de Fuste, Fuerteventura',
      descripcion: wpEvento.acf.description,
      imagen: getImagenUrl(wpEvento.acf.imagen_evento),
      color: '#D4982E',
      programa: [],
    }
  } else {
    // Fallback a datos estáticos
    const estatico = eventosEstaticos[slug]
    if (!estatico) notFound()
    evento = estatico
  }

  return (
    <main style={{ background: '#100804', minHeight: '100vh' }}>

      {/* Navbar mínimo */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(16,8,4,0.95)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(212,152,46,0.15)',
        padding: '0 3rem', height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link href="/#eventos" style={{
          fontFamily: 'var(--font-cinzel, Cinzel, serif)',
          fontSize: '12px', color: '#D4982E',
          letterSpacing: '0.2em', textDecoration: 'none',
        }}>← EVENTOS</Link>
        <Link href="/" style={{
          fontFamily: 'var(--font-cinzel, Cinzel, serif)',
          fontSize: '14px', color: '#D4982E',
          letterSpacing: '0.3em', textDecoration: 'none',
        }}>SOKKO LOUNGE</Link>
        <Link href="/#reservar" style={{
          fontFamily: 'var(--font-cinzel, Cinzel, serif)',
          fontSize: '11px', color: '#D4982E',
          border: '1px solid #D4982E', padding: '8px 20px',
          textDecoration: 'none', letterSpacing: '0.2em',
        }}>RESERVAR</Link>
      </nav>

      <div style={{ paddingTop: '64px' }}>

        {/* FLYER COMPLETO */}
        <div style={{ maxWidth: '680px', margin: '3rem auto 0', padding: '0 2rem' }}>
          <img
            src={evento.imagen}
            alt={evento.titulo}
            style={{
              width: '100%', height: 'auto', display: 'block',
              border: `1px solid ${evento.color}35`,
              boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px ${evento.color}20`,
            }}
          />
        </div>

        {/* CONTENIDO */}
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '3rem 2rem 6rem' }}>

          <span style={{
            fontFamily: 'var(--font-cinzel, Cinzel, serif)',
            fontSize: '10px', color: evento.color,
            letterSpacing: '0.4em', display: 'block', marginBottom: '0.75rem',
          }}>{evento.badge}</span>

          <h1 style={{
            fontFamily: 'var(--font-cinzel, Cinzel, serif)',
            fontSize: 'clamp(28px, 5vw, 56px)',
            color: '#D4982E', lineHeight: 1.0,
            letterSpacing: '0.05em', marginBottom: '0.5rem',
          }}>{evento.titulo}</h1>

          <p style={{
            fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
            fontStyle: 'italic', fontSize: 'clamp(16px, 2vw, 22px)',
            color: '#F4EDD8', marginBottom: '2.5rem',
          }}>{evento.subtitulo}</p>

          {/* Info grid */}
          <div style={{
            background: 'rgba(44,26,8,0.5)',
            border: `1px solid ${evento.color}25`,
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
                  fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                  fontSize: '10px', color: '#8A6940',
                  letterSpacing: '0.3em', margin: '0 0 4px',
                }}>{label}</p>
                <p style={{
                  fontFamily: 'var(--font-raleway, Raleway, sans-serif)',
                  fontSize: '15px', color: '#F4EDD8', lineHeight: 1.4, margin: 0,
                }}>{valor}</p>
              </div>
            ))}
          </div>

          {/* Descripción */}
          <p style={{
            fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
            fontStyle: 'italic', fontSize: '18px',
            color: '#D4B896', lineHeight: 1.75,
            marginBottom: '2.5rem',
            borderLeft: `2px solid ${evento.color}50`,
            paddingLeft: '1.25rem',
          }}>{evento.descripcion}</p>

          {/* Programa */}
          {evento.programa.length > 0 && (
            <div style={{ marginBottom: '2.5rem' }}>
              <h2 style={{
                fontFamily: 'var(--font-cinzel, Cinzel, serif)',
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
                    fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                    fontSize: '12px', color: evento.color, letterSpacing: '0.08em',
                  }}>{p.hora}</span>
                  <div>
                    <span style={{
                      fontFamily: 'var(--font-raleway, Raleway, sans-serif)',
                      fontSize: '15px', color: '#F4EDD8', fontWeight: 500,
                    }}>{p.acto}</span>
                    {p.desc && (
                      <span style={{
                        fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                        fontStyle: 'italic', fontSize: '14px',
                        color: '#8A6940', marginLeft: '8px',
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
            fontFamily: 'var(--font-cinzel, Cinzel, serif)',
            fontSize: '13px', letterSpacing: '0.25em',
            color: '#100804', background: '#D4982E',
            padding: '18px', textDecoration: 'none',
          }}>RESERVAR PLAZA</Link>

        </div>
      </div>
    </main>
  )
}
