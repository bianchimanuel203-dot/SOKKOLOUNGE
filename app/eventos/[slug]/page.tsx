import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// ── Tipos ────────────────────────────────────────────────────────
type ProgramaItem = { hora: string; acto: string; desc: string };

type EventoCompleto = {
  slug: string;
  titulo: string;
  subtitulo: string;
  fecha: string;
  horario: string;
  precio: string;
  lugar: string;
  descripcion: string;
  programa: ProgramaItem[];
  imagen: string;
  iconos: string[];
  tags: string[];
  instagram: string;
};

// ── Datos estáticos ───────────────────────────────────────────────
// Cuando WordPress tenga los eventos, getEventoFromWP() los sobrescribe.
const eventosData: Record<string, EventoCompleto> = {
  'apertura-general': {
    slug: 'apertura-general',
    titulo: 'APERTURA GENERAL',
    subtitulo: 'DRAG SHOW — DAYANA + GABRIELA',
    fecha: 'SÁBADO 13 DE JUNIO DE 2026',
    horario: '20:00 — 02:00',
    precio: 'ENTRADA LIBRE',
    lugar: 'SOKKO LOUNGE · Caleta de Fuste, Fuerteventura',
    descripcion:
      'Una noche mágica de apertura con el espectáculo de drag más vibrante de las islas. Dayana y Gabriela junto a los mejores DJs pondrán en pie a todo SOKKO.',
    programa: [
      { hora: '20:00 — 21:30', acto: 'DJ JONY',               desc: 'Apertura musical' },
      { hora: '21:30 — 23:30', acto: 'DRAG SHOW',             desc: 'Con Dayana + Gabriela' },
      { hora: '23:30 — 02:00', acto: 'DJ LEMUS',              desc: 'Cierre de noche' },
    ],
    imagen: '/eventos/apertura-general.jpg',
    iconos: ['🎭', '🎧', '🥂'],
    tags: ['MÚSICA', 'SHOW', 'BUEN AMBIENTE'],
    instagram: '@sokkolounge.ftv',
  },
  'apertura-vip': {
    slug: 'apertura-vip',
    titulo: 'APERTURA VIP',
    subtitulo: 'NOCHE EXCLUSIVA · SOLO INVITADOS',
    fecha: 'VIERNES 12 DE JUNIO DE 2026',
    horario: '20:00 — 00:00',
    precio: 'SOLO INVITADOS',
    lugar: 'SOKKO LOUNGE · Caleta de Fuste, Fuerteventura',
    descripcion:
      'La presentación privada de SOKKO Lounge ante los invitados más especiales. Una noche exclusiva de catering, brindis y música con DJ Doa.',
    programa: [
      { hora: '20:00 — 21:00', acto: 'RECEPCIÓN Y CATERING',         desc: '' },
      { hora: '21:00 — 21:30', acto: 'PRESENTACIÓN DAYANA + SOKKO',  desc: '' },
      { hora: '21:30 — 22:00', acto: 'BRINDIS',                      desc: '' },
      { hora: '22:00 — 00:00', acto: 'DJ DOA',                       desc: '' },
    ],
    imagen: '/eventos/apertura-vip.jpg',
    iconos: ['🍾', '🎤', '🎧'],
    tags: ['CÓCTELES', 'MÚSICA', 'BUEN AMBIENTE'],
    instagram: '@sokkolounge.ftv',
  },
  'domingo-familiar': {
    slug: 'domingo-familiar',
    titulo: 'APERTURA DOMINGO FAMILIAR',
    subtitulo: 'MAGO SENA · FAMILIA Y JUEGOS',
    fecha: 'DOMINGO 14 DE JUNIO DE 2026',
    horario: '12:00 — 02:00',
    precio: 'ENTRADA LIBRE',
    lugar: 'SOKKO LOUNGE · Caleta de Fuste, Fuerteventura',
    descripcion:
      'El cierre del fin de semana de apertura. Un día completo para toda la familia con bebida y tapa gratis, torneos de PS5 y billar, magia en vivo y música hasta las 2h.',
    programa: [
      { hora: '12:00 — 15:00', acto: 'BEBIDA + TAPA GRATIS', desc: '' },
      { hora: '15:00 — 18:00', acto: 'CAFETERÍA + JUEGOS',   desc: '' },
      { hora: '18:00 — 20:00', acto: 'TORNEOS PS5 Y BILLAR', desc: '' },
      { hora: '20:00 — 22:00', acto: 'MAGO SENA',            desc: 'Magia en directo' },
      { hora: '22:00 — 02:00', acto: 'MÚSICA AMBIENTE',      desc: '' },
    ],
    imagen: '/eventos/domingo-familiar.jpg',
    iconos: ['👨‍👩‍👧', '🎮', '🎩'],
    tags: ['FAMILIA', 'JUEGOS', 'MÚSICA'],
    instagram: '@sokkolounge.ftv',
  },
};

// ── Fetch WordPress (fallback WP → datos estáticos) ───────────────
async function getEventoFromWP(slug: string): Promise<EventoCompleto | null> {
  try {
    const base = process.env.NEXT_PUBLIC_WP_API;
    if (!base) return null;
    const res = await fetch(`${base}/eventos?slug=${slug}&_embed`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return null;
    const post = data[0];
    return {
      slug: post.slug,
      titulo: (post.title?.rendered ?? '').toUpperCase(),
      subtitulo: post.acf?.subtitulo || '',
      fecha: post.acf?.fecha_evento || '',
      horario: post.acf?.hora_evento ? `${post.acf.hora_evento} — Cierre` : '',
      precio: post.acf?.precio || 'ENTRADA LIBRE',
      lugar: 'SOKKO LOUNGE · Caleta de Fuste, Fuerteventura',
      descripcion: post.acf?.description || '',
      programa: [],
      imagen: post.acf?.imagen_evento || '',
      iconos: [],
      tags: [post.acf?.categoria || 'EVENTO'],
      instagram: '@sokkolounge.ftv',
    };
  } catch {
    return null;
  }
}

// ── Metadata ──────────────────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const evento = (await getEventoFromWP(slug)) ?? eventosData[slug];
  if (!evento) return { title: 'Evento no encontrado — SOKKO Lounge' };
  return {
    title: `${evento.titulo} — SOKKO Lounge`,
    description: evento.descripcion,
    openGraph: {
      images: [{ url: evento.imagen }],
    },
  };
}

// ── Rutas estáticas ───────────────────────────────────────────────
export function generateStaticParams() {
  return Object.keys(eventosData).map((slug) => ({ slug }));
}

// ── Página ────────────────────────────────────────────────────────
export default async function EventoPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const eventoWP = await getEventoFromWP(slug);
  const evento = eventoWP ?? eventosData[slug];
  if (!evento) notFound();

  return (
    <main style={{ background: '#100804', minHeight: '100vh' }}>

      {/* Mini navbar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(16,8,4,0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(212,152,46,0.15)',
        padding: '0 3rem', height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <a href="/" style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '14px', color: '#D4982E',
          letterSpacing: '0.3em', textDecoration: 'none',
        }}>← SOKKO LOUNGE</a>
        <a href="/#reservar" style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '11px', letterSpacing: '0.2em',
          color: '#D4982E', border: '1px solid #D4982E',
          padding: '8px 20px', textDecoration: 'none',
        }}>RESERVAR</a>
      </div>

      <div style={{ paddingTop: '64px' }}>

        {/* FLYER COMPLETO — protagonista */}
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '3rem 2rem 0' }}>
          <img
            src={evento.imagen}
            alt={evento.titulo}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              border: '1px solid rgba(212,152,46,0.25)',
            }}
          />
        </div>

        {/* CONTENIDO DETALLADO */}
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '3rem 2rem 6rem' }}>

          {/* Tags */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            {evento.tags.map((tag) => (
              <span key={tag} style={{
                fontFamily: 'Cinzel, serif',
                fontSize: '10px', color: '#D4982E',
                border: '1px solid rgba(212,152,46,0.35)',
                padding: '4px 14px', letterSpacing: '0.2em',
              }}>{tag}</span>
            ))}
          </div>

          {/* Título */}
          <h1 style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(28px, 5vw, 52px)',
            color: '#D4982E',
            lineHeight: 1.05,
            letterSpacing: '0.05em',
            marginBottom: '0.75rem',
          }}>{evento.titulo}</h1>

          <p style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontStyle: 'italic',
            fontSize: 'clamp(18px, 2vw, 24px)',
            color: '#F4EDD8',
            marginBottom: '2rem',
          }}>{evento.subtitulo}</p>

          {/* Info rápida */}
          <div style={{
            background: '#2C1A08',
            border: '1px solid rgba(212,152,46,0.2)',
            padding: '1.5rem 2rem',
            marginBottom: '2rem',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
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
                  fontSize: '15px', color: '#F4EDD8', lineHeight: 1.4, margin: 0,
                }}>{valor}</p>
              </div>
            ))}
          </div>

          {/* Descripción */}
          {evento.descripcion && (
            <p style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontStyle: 'italic',
              fontSize: '18px',
              color: '#D4B896',
              lineHeight: 1.75,
              marginBottom: '2.5rem',
              borderLeft: '2px solid rgba(212,152,46,0.4)',
              paddingLeft: '1.25rem',
            }}>{evento.descripcion}</p>
          )}

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
                  display: 'grid',
                  gridTemplateColumns: '160px 1fr',
                  gap: '1rem',
                  padding: '0.9rem 0',
                  borderBottom: '1px solid rgba(212,152,46,0.08)',
                  alignItems: 'baseline',
                }}>
                  <span style={{
                    fontFamily: 'Cinzel, serif',
                    fontSize: '12px', color: '#D4982E',
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
                        fontStyle: 'italic',
                        fontSize: '14px', color: '#A07850',
                        marginLeft: '8px',
                      }}>{p.desc}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Instagram */}
          <p style={{
            fontFamily: 'Raleway, sans-serif',
            fontSize: '14px', color: '#A07850',
            textAlign: 'center', marginBottom: '2rem',
          }}>
            Síguenos en Instagram:{' '}
            <a
              href="https://instagram.com/sokkolounge.ftv"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#D4982E', textDecoration: 'none' }}
            >
              {evento.instagram}
            </a>
          </p>

          {/* CTA RESERVAR */}
          <a
            href="/#reservar"
            style={{
              display: 'block',
              textAlign: 'center',
              fontFamily: 'Cinzel, serif',
              fontSize: '13px', letterSpacing: '0.25em',
              color: '#100804', background: '#D4982E',
              padding: '18px', textDecoration: 'none',
            }}
          >
            RESERVAR PLAZA
          </a>

        </div>
      </div>
    </main>
  );
}
