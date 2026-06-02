'use client';

import HolographicCard from '../../components/ui/holographic-card';

/* ── Dato del evento — UN SOLO EVENTO PROTAGONISTA ───────────────── */
/* Cuando WordPress tenga datos, reemplazar con getEventos()[0]        */
const EVENTO_ACTUAL = {
  categoria:   'EVENTO DE LA SEMANA',
  titulo:      'VIVE UNA NOCHE MÁGICA\nDE JAZZ EN VIVO',
  subtitulo:   'Con el cuarteto de Carlos Mendoza',
  fecha:       'PRÓXIMAMENTE',
  diaSemana:   'VIERNES',
  hora:        '21:00H',
  precio:      'ENTRADA LIBRE',
  imagen:      '/eventos/evento-jazz.jpg',
  descripcion: 'Una velada íntima con los mejores músicos de las islas. Jazz en estado puro, bajo la luz cálida de SOKKO Lounge.',
};

/* ── Separador ornamental ────────────────────────────────────────── */
function OrnamentalDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', margin: '1.5rem 0' }}>
      <div style={{ width: '60px', height: '1px', background: 'linear-gradient(to right, transparent, #C8922A)' }} />
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5Z" stroke="#C8922A" strokeWidth="1" />
      </svg>
      <div style={{ width: '60px', height: '1px', background: 'linear-gradient(to left, transparent, #C8922A)' }} />
    </div>
  );
}

export default function EventosSection() {
  return (
    <section
      id="eventos"
      style={{
        background: '#1A0E05',
        padding: 'clamp(5rem, 8vw, 8rem) clamp(1.5rem, 4vw, 4rem)',
        borderTop: '1px solid rgba(200,146,42,0.15)',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 5vw, 4rem)' }}>
        <p style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: '11px', color: '#8A6940',
          letterSpacing: '.5em', textTransform: 'uppercase', margin: '0 0 1rem',
        }}>
          PRÓXIMOS EVENTOS
        </p>
        <h2 style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          color: '#C8922A', letterSpacing: '.1em', margin: '0 0 .5rem',
        }}>
          VIVE LA EXPERIENCIA SOKKO
        </h2>
        <OrnamentalDivider />
      </div>

      {/* ── CARD ÚNICA — estilo venue Londres / Fabric ── */}
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <HolographicCard intensity={6}>
          <div style={{
            position: 'relative',
            height: '82vh',
            minHeight: '560px',
            maxHeight: '800px',
            borderRadius: '2px',
            overflow: 'hidden',
            border: '1px solid rgba(200,146,42,0.25)',
            cursor: 'default',
          }}>

            {/* Foto fullcard */}
            <img
              src={EVENTO_ACTUAL.imagen}
              alt={EVENTO_ACTUAL.titulo}
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'center 20%',
              }}
            />

            {/* Overlay dramático desde abajo */}
            <div style={{
              position: 'absolute', inset: 0,
              background: `linear-gradient(to top,
                rgba(10,6,2,0.97) 0%,
                rgba(10,6,2,0.75) 35%,
                rgba(10,6,2,0.2)  65%,
                transparent       100%
              )`,
              pointerEvents: 'none',
            }} />

            {/* Vignette lateral izquierda */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to right, rgba(10,6,2,0.6) 0%, transparent 50%)',
              pointerEvents: 'none',
            }} />

            {/* Badge categoría — arriba izquierda */}
            <div style={{
              position: 'absolute', top: '2rem', left: '2.5rem',
              display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              <div style={{ width: '24px', height: '1px', background: '#C8922A' }} />
              <span style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: '10px', color: '#C8922A', letterSpacing: '.45em',
              }}>
                {EVENTO_ACTUAL.categoria}
              </span>
            </div>

            {/* Fecha decorativa enorme — arriba derecha */}
            <div style={{ position: 'absolute', top: '1.5rem', right: '2.5rem', textAlign: 'right' }}>
              <p style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: 'clamp(32px, 5vw, 64px)',
                color: 'rgba(200,146,42,0.15)',
                lineHeight: 1, letterSpacing: '.05em',
                margin: 0, userSelect: 'none' as const,
              }}>
                {EVENTO_ACTUAL.diaSemana}
              </p>
              <p style={{
                fontFamily: 'var(--font-raleway)', fontWeight: 300,
                fontSize: '12px', color: 'rgba(200,146,42,0.5)',
                letterSpacing: '.3em', margin: 0,
              }}>
                {EVENTO_ACTUAL.hora}
              </p>
            </div>

            {/* Contenido principal — abajo izquierda */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 2.5rem 2.5rem' }}>

              {/* Título enorme */}
              <h3 style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: 'clamp(28px, 4.5vw, 64px)',
                color: '#F5EDD8',
                lineHeight: 1.05, letterSpacing: '.02em',
                whiteSpace: 'pre-line' as const, margin: '0 0 .75rem',
                textShadow: '0 2px 40px rgba(0,0,0,0.8)',
              }}>
                {EVENTO_ACTUAL.titulo}
              </h3>

              {/* Subtítulo — artista */}
              <p style={{
                fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
                fontSize: 'clamp(17px, 2vw, 24px)',
                color: '#C4A882', margin: '0 0 1.25rem',
              }}>
                {EVENTO_ACTUAL.subtitulo}
              </p>

              {/* Descripción */}
              <p style={{
                fontFamily: 'var(--font-raleway)', fontWeight: 300,
                fontSize: '14px', color: 'rgba(197,168,130,0.7)',
                maxWidth: '520px', lineHeight: 1.65, margin: '0 0 2rem',
              }}>
                {EVENTO_ACTUAL.descripcion}
              </p>

              {/* Fila inferior: precio + fecha + CTA */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' as const }}>

                <span style={{
                  fontFamily: 'var(--font-cinzel)', fontSize: '11px',
                  color: '#C8922A',
                  border: '1px solid rgba(200,146,42,0.4)',
                  padding: '6px 16px', letterSpacing: '.2em',
                }}>
                  {EVENTO_ACTUAL.precio}
                </span>

                <span style={{ color: 'rgba(200,146,42,0.3)', fontSize: '18px' }}>·</span>

                <span style={{
                  fontFamily: 'var(--font-raleway)', fontWeight: 300,
                  fontSize: '13px', color: '#8A6940', letterSpacing: '.15em',
                }}>
                  {EVENTO_ACTUAL.fecha} · {EVENTO_ACTUAL.hora}
                </span>

                <a
                  href="#contacto"
                  style={{
                    marginLeft: 'auto',
                    fontFamily: 'var(--font-cinzel)', fontSize: '11px',
                    letterSpacing: '.25em', textTransform: 'uppercase' as const,
                    color: '#1A0E05', background: '#C8922A',
                    padding: '14px 36px',
                    textDecoration: 'none',
                    transition: 'background .2s ease',
                    display: 'inline-block',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#D4A843')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#C8922A')}
                >
                  RESERVAR PLAZA
                </a>
              </div>
            </div>
          </div>
        </HolographicCard>
      </div>
    </section>
  );
}
