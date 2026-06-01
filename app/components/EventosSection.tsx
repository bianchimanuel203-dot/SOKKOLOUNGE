import { getEventos } from '../lib/wordpress';

const categoriaLabel: Record<string, string> = {
  musica:      'Música en Directo',
  dj:          'Sesión DJ',
  gastronomia: 'Cena Temática',
  taller:      'Taller Creativo',
  especial:    'Evento Especial',
};

const MESES = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];

const categoriaColor: Record<string, string> = {
  musica:      '#C4693E',
  dj:          '#C8922A',
  gastronomia: '#7A9B7E',
  taller:      '#8A7EC9',
  especial:    '#C8922A',
};

export default async function EventosSection() {
  const eventos = await getEventos();
  const activos = eventos.filter(e => e.acf.activo);

  return (
    <section id="eventos" style={{
      background: '#1A0E05',
      padding: '7rem 2rem',
      borderTop: '1px solid rgba(200,146,42,0.2)',
    }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <p style={{
          fontSize: '.6rem', letterSpacing: '.55em', color: '#8A6940',
          textTransform: 'uppercase', margin: 0,
        }}>
          04 — Agenda
        </p>
        <h2 style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          color: '#C8922A', letterSpacing: '.18em',
          marginTop: '1rem', marginBottom: 0,
        }}>
          PRÓXIMOS EVENTOS
        </h2>
        <div style={{ width: '60px', height: '1px', background: 'rgba(200,146,42,0.4)', margin: '1.75rem auto' }} />
        <p style={{
          fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
          fontSize: '1.05rem', color: '#C4A882',
          maxWidth: '480px', margin: '0 auto', lineHeight: '1.8',
        }}>
          Cada noche en SOKKO es una experiencia única. Consulta nuestra agenda y reserva tu momento.
        </p>
      </div>

      {activos.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <div style={{
            width: '60px', height: '1px',
            background: 'rgba(200,146,42,0.3)',
            margin: '0 auto 2rem',
          }} />
          <p style={{
            fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
            color: '#8A6940', fontSize: '1.1rem', letterSpacing: '.05em',
          }}>
            Próximamente nuevos eventos.
          </p>
          <p style={{
            fontFamily: 'var(--font-raleway)', fontSize: '.55rem',
            letterSpacing: '.25em', color: '#5A3A20',
            textTransform: 'uppercase', marginTop: '.75rem',
          }}>
            Síguenos para no perderte nada
          </p>
        </div>
      ) : (
        <div style={{
          maxWidth: '1200px', margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: activos.length === 1 ? '1fr' : activos.length === 2 ? '1fr 1fr' : 'repeat(3, 1fr)',
          gap: '2px',
        }}>
          {activos.map((evento) => {
            const catColor = categoriaColor[evento.acf.categoria] ?? '#C8922A';
            const dia    = evento.acf.fecha_evento ? parseInt(evento.acf.fecha_evento.substring(6, 8)) : null;
            const mesIdx = evento.acf.fecha_evento ? parseInt(evento.acf.fecha_evento.substring(4, 6)) - 1 : null;
            const anio   = evento.acf.fecha_evento ? evento.acf.fecha_evento.substring(0, 4) : null;

            return (
              <div key={evento.id} style={{
                position: 'relative',
                minHeight: '520px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                overflow: 'hidden',
                cursor: 'pointer',
              }}>
                {/* Imagen de fondo */}
                {evento.acf.imagen_evento ? (
                  <img
                    src={evento.acf.imagen_evento}
                    alt={evento.title.rendered}
                    style={{
                      position: 'absolute', inset: 0,
                      width: '100%', height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: `linear-gradient(135deg, #2A1608 0%, #1A0E05 50%, #0D0703 100%)`,
                  }} />
                )}

                {/* Overlay degradado */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(10,5,0,0.97) 0%, rgba(10,5,0,0.6) 50%, rgba(10,5,0,0.2) 100%)',
                }} />

                {/* Fecha — esquina superior */}
                {dia !== null && (
                  <div style={{
                    position: 'absolute', top: '2rem', left: '2rem',
                    textAlign: 'center',
                    background: 'rgba(10,5,0,0.7)',
                    border: `1px solid ${catColor}44`,
                    padding: '.6rem 1rem',
                    backdropFilter: 'blur(8px)',
                  }}>
                    <p style={{
                      fontFamily: 'var(--font-cinzel)',
                      fontSize: '2.2rem', color: '#C8922A',
                      lineHeight: 1, margin: 0,
                    }}>
                      {String(dia).padStart(2, '0')}
                    </p>
                    <p style={{
                      fontSize: '.5rem', letterSpacing: '.2em',
                      color: '#8A6940', textTransform: 'uppercase',
                      margin: '.2rem 0 0',
                    }}>
                      {mesIdx !== null ? MESES[mesIdx] : ''} {anio}
                    </p>
                  </div>
                )}

                {/* Categoría badge */}
                <div style={{
                  position: 'absolute', top: '2rem', right: '2rem',
                }}>
                  <span style={{
                    fontSize: '.42rem', letterSpacing: '.25em',
                    textTransform: 'uppercase', color: catColor,
                    padding: '.3rem .8rem',
                    border: `1px solid ${catColor}55`,
                    background: `rgba(10,5,0,0.7)`,
                    backdropFilter: 'blur(8px)',
                  }}>
                    {categoriaLabel[evento.acf.categoria] ?? evento.acf.categoria}
                  </span>
                </div>

                {/* Contenido inferior */}
                <div style={{
                  position: 'relative', zIndex: 2,
                  padding: '2.5rem 2rem',
                }}>
                  {evento.acf.hora_evento && (
                    <p style={{
                      fontFamily: 'var(--font-cinzel)', fontSize: '.62rem',
                      color: catColor, letterSpacing: '.2em',
                      textTransform: 'uppercase', margin: '0 0 .6rem',
                    }}>
                      {evento.acf.hora_evento}h
                    </p>
                  )}

                  <h3 style={{
                    fontFamily: 'var(--font-cinzel)',
                    fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                    color: '#F5E8D0', letterSpacing: '.06em',
                    margin: '0 0 .8rem', lineHeight: '1.2',
                  }}>
                    {evento.title.rendered}
                  </h3>

                  {evento.acf.description && (
                    <p style={{
                      fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
                      fontSize: '.95rem', color: '#C4A882',
                      lineHeight: '1.6', margin: '0 0 1.5rem',
                    }}>
                      {evento.acf.description}
                    </p>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      {evento.acf.precio > 0 && (
                        <div>
                          <p style={{ fontSize: '.42rem', letterSpacing: '.2em', color: '#8A6940', textTransform: 'uppercase', margin: 0 }}>
                            Desde
                          </p>
                          <p style={{
                            fontFamily: 'var(--font-cinzel)', fontSize: '1.3rem',
                            color: '#C8922A', margin: '.1rem 0 0', lineHeight: 1,
                          }}>
                            {evento.acf.precio}€
                          </p>
                        </div>
                      )}
                      {evento.acf.aforo > 0 && (
                        <p style={{
                          fontSize: '.42rem', letterSpacing: '.15em', color: '#5A3A20',
                          textTransform: 'uppercase', margin: '.4rem 0 0',
                        }}>
                          {evento.acf.aforo} plazas
                        </p>
                      )}
                    </div>
                    <a href="/terraza/lanzarote" style={{
                      fontFamily: 'var(--font-raleway)', fontSize: '.52rem',
                      letterSpacing: '.25em', textTransform: 'uppercase',
                      color: '#1A0E05', background: '#C8922A',
                      padding: '.75rem 1.5rem', textDecoration: 'none',
                      border: '1px solid #C8922A',
                      whiteSpace: 'nowrap',
                    }}>
                      RESERVAR
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}