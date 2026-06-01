import { getEventos } from '../lib/wordpress';

const categoriaLabel: Record<string, string> = {
  musica: 'Música en Directo',
  dj: 'Sesión DJ',
  gastronomia: 'Cena Temática',
  taller: 'Taller Creativo',
  especial: 'Evento Especial',
};

const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

const categoriaColor: Record<string, string> = {
  musica: '#C4693E',
  dj: '#C9A84C',
  gastronomia: '#7A9B7E',
  taller: '#8A7EC9',
  especial: '#C9A84C',
};

export default async function EventosSection() {
  const eventos = await getEventos();
  const activos = eventos.filter(e => e.acf.activo);

  return (
    <section id="eventos" style={{
      background: '#160F08',
      padding: '6rem 2rem',
      borderTop: '3px solid rgba(201,168,76,.15)',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <p style={{ fontSize: '.65rem', letterSpacing: '.5em', color: '#8A6E2F', textTransform: 'uppercase' }}>
          04 — Agenda
        </p>
        <h2 style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          color: '#C9A84C', letterSpacing: '.15em', marginTop: '1rem'
        }}>
          Próximos Eventos
        </h2>
        <div style={{ width: '60px', height: '1px', background: '#8A6E2F', margin: '1.5rem auto' }} />
        <p style={{
          fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
          fontSize: '1.05rem', color: '#B8A980',
          maxWidth: '520px', margin: '0 auto', lineHeight: '1.8'
        }}>
          Cada noche en SOKKO es una experiencia única. Consulta nuestra agenda y reserva tu momento.
        </p>
      </div>

      {activos.length === 0 ? (
        <p style={{
          textAlign: 'center', fontFamily: 'var(--font-cormorant)',
          fontStyle: 'italic', color: '#6A5832', fontSize: '1rem'
        }}>
          Próximamente nuevos eventos. Síguenos para no perderte nada.
        </p>
      ) : (
        <div style={{
          maxWidth: '1200px', margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '2px',
        }}>
          {activos.map((evento) => {
            const hasImage = evento.acf.imagen_evento && typeof evento.acf.imagen_evento === 'object';
            const imageUrl = hasImage ? (evento.acf.imagen_evento as { url: string }).url : null;
            const catColor = categoriaColor[evento.acf.categoria] ?? '#C9A84C';
            const dia = evento.acf.fecha_evento ? parseInt(evento.acf.fecha_evento.substring(6, 8)) : null;
            const mesIdx = evento.acf.fecha_evento ? parseInt(evento.acf.fecha_evento.substring(4, 6)) - 1 : null;
            const anio = evento.acf.fecha_evento ? evento.acf.fecha_evento.substring(0, 4) : null;

            return (
              <div key={evento.id} style={{
                position: 'relative',
                minHeight: '440px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                background: '#1C1510',
              }}>
                {/* Background image */}
                {imageUrl && (
                  <>
                    <div style={{
                      position: 'absolute', inset: 0,
                      backgroundImage: `url(${imageUrl})`,
                      backgroundSize: 'cover', backgroundPosition: 'center',
                      filter: 'brightness(0.3) saturate(0.8)',
                    }} />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(28,21,16,.98) 0%, rgba(28,21,16,.6) 55%, rgba(28,21,16,.2) 100%)',
                    }} />
                  </>
                )}

                {/* Content */}
                <div style={{
                  position: 'relative', flex: 1,
                  padding: '2rem', display: 'flex',
                  flexDirection: 'column', justifyContent: 'space-between',
                }}>
                  {/* Top: category badge */}
                  <div>
                    <span style={{
                      display: 'inline-block',
                      fontSize: '.45rem', letterSpacing: '.3em', textTransform: 'uppercase',
                      color: catColor, padding: '.2rem .8rem',
                      border: `1px solid ${catColor}55`,
                      background: `${catColor}12`,
                    }}>
                      {categoriaLabel[evento.acf.categoria] ?? evento.acf.categoria}
                    </span>
                  </div>

                  {/* Bottom: date + title + desc + CTA */}
                  <div style={{ marginTop: '3rem' }}>
                    {/* Date row */}
                    {dia !== null && mesIdx !== null && (
                      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '.6rem' }}>
                          <p style={{
                            fontFamily: 'var(--font-cinzel)',
                            fontSize: '3.2rem', color: '#C9A84C',
                            lineHeight: 1, letterSpacing: '-.02em', margin: 0
                          }}>
                            {dia}
                          </p>
                          <div>
                            <p style={{ fontSize: '.65rem', letterSpacing: '.25em', color: '#8A6E2F', textTransform: 'uppercase', margin: 0 }}>
                              {MESES[mesIdx]}
                            </p>
                            <p style={{ fontSize: '.55rem', letterSpacing: '.15em', color: '#6A5832', marginTop: '.1rem', marginBottom: 0 }}>
                              {anio}
                            </p>
                          </div>
                        </div>
                        <p style={{
                          fontFamily: 'var(--font-cinzel)', fontSize: '.9rem',
                          color: '#8A6E2F', letterSpacing: '.1em', margin: 0
                        }}>
                          {evento.acf.hora_evento}h
                        </p>
                      </div>
                    )}

                    {/* Title */}
                    <h3 style={{
                      fontFamily: 'var(--font-cinzel)',
                      fontSize: 'clamp(1rem, 2vw, 1.35rem)',
                      color: '#E8D8A8', letterSpacing: '.08em',
                      marginBottom: '.7rem', lineHeight: '1.3', marginTop: 0
                    }}>
                      {evento.title.rendered}
                    </h3>

                    {/* Description */}
                    {evento.acf.description && (
                      <p style={{
                        fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
                        fontSize: '.9rem', color: '#6A5832',
                        lineHeight: '1.6', marginBottom: '1.5rem', marginTop: 0
                      }}>
                        {evento.acf.description}
                      </p>
                    )}

                    {/* Footer */}
                    <div style={{
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'space-between',
                      borderTop: '1px solid rgba(201,168,76,.12)',
                      paddingTop: '1.2rem', gap: '1rem',
                    }}>
                      <div>
                        {evento.acf.precio > 0 && (
                          <>
                            <p style={{ fontSize: '.5rem', letterSpacing: '.3em', color: '#6A5832', textTransform: 'uppercase', margin: 0 }}>
                              Desde
                            </p>
                            <p style={{
                              fontFamily: 'var(--font-cinzel)',
                              fontSize: '1.2rem', color: '#C9A84C', margin: 0
                            }}>
                              {evento.acf.precio}€
                            </p>
                          </>
                        )}
                        {evento.acf.aforo > 0 && (
                          <p style={{ fontSize: '.55rem', color: '#6A5832', letterSpacing: '.12em', margin: 0, marginTop: '.3rem' }}>
                            Aforo: {evento.acf.aforo}
                          </p>
                        )}
                      </div>
                      <a href="/terraza/lanzarote" style={{
                        fontSize: '.55rem', letterSpacing: '.3em', textTransform: 'uppercase',
                        color: '#C9A84C', border: '1px solid rgba(201,168,76,.4)',
                        padding: '.6rem 1.4rem', textDecoration: 'none',
                        background: 'rgba(201,168,76,.06)',
                        fontFamily: 'var(--font-raleway)',
                        flexShrink: 0,
                      }}>
                        Reservar
                      </a>
                    </div>
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
