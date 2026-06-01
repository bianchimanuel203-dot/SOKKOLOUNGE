import { getEventos } from '../lib/wordpress';

const categoriaLabel: Record<string, string> = {
  musica: 'Live Music',
  dj: 'DJ Session',
  gastronomia: 'Themed Dinner',
  taller: 'Creative Workshop',
  especial: 'Special Event',
};

const MESES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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
    <section id="eventos" style={{ background: '#12100A', padding: '7rem 2rem', borderTop: '3px solid rgba(201,168,76,.15)' }}>

      {/* HEADER */}
      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <p style={{ fontSize: '.6rem', letterSpacing: '.55em', color: '#8A6E2F', textTransform: 'uppercase', margin: 0 }}>
          04 — Agenda
        </p>
        <h2 style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          color: '#C9A84C', letterSpacing: '.18em', marginTop: '1rem', marginBottom: 0,
        }}>
          UPCOMING EVENTS
        </h2>
        <div style={{ width: '60px', height: '1px', background: '#8A6E2F', margin: '1.75rem auto' }} />
        <p style={{
          fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
          fontSize: '1.05rem', color: '#B8A980',
          maxWidth: '480px', margin: '0 auto', lineHeight: '1.8',
        }}>
          Every night at SOKKO is a singular experience. Check our agenda and book your moment.
        </p>
      </div>

      {activos.length === 0 ? (
        <p style={{
          textAlign: 'center', fontFamily: 'var(--font-cormorant)',
          fontStyle: 'italic', color: '#6A5832', fontSize: '1rem',
        }}>
          New events coming soon. Follow us so you don't miss anything.
        </p>
      ) : (
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

          {/* Featured first event */}
          {activos.length > 0 && (() => {
            const evento = activos[0];
            const hasImage = evento.acf.imagen_evento && typeof evento.acf.imagen_evento === 'object';
            const imageUrl = hasImage ? (evento.acf.imagen_evento as { url: string }).url : null;
            const catColor = categoriaColor[evento.acf.categoria] ?? '#C9A84C';
            const dia = evento.acf.fecha_evento ? parseInt(evento.acf.fecha_evento.substring(6, 8)) : null;
            const mesIdx = evento.acf.fecha_evento ? parseInt(evento.acf.fecha_evento.substring(4, 6)) - 1 : null;

            return (
              <div style={{
                display: 'grid', gridTemplateColumns: imageUrl ? '1fr 1fr' : '1fr',
                gap: '0', marginBottom: '2px',
                minHeight: '480px', overflow: 'hidden',
              }}>
                {imageUrl && (
                  <div style={{ position: 'relative', minHeight: '480px' }}>
                    <img src={imageUrl} alt={evento.title.rendered} style={{
                      position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
                      filter: 'brightness(0.55) saturate(0.9)',
                    }} />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to right, transparent 60%, #12100A 100%)',
                    }} />
                    {/* Date badge on image */}
                    {dia !== null && mesIdx !== null && (
                      <div style={{
                        position: 'absolute', top: '2.5rem', left: '2.5rem',
                        background: 'rgba(26,18,8,.8)',
                        border: '1px solid rgba(201,168,76,.3)',
                        padding: '1rem 1.4rem', textAlign: 'center',
                        backdropFilter: 'blur(8px)',
                      }}>
                        <p style={{
                          fontFamily: 'var(--font-cinzel)', fontSize: '2.5rem',
                          color: '#C9A84C', lineHeight: 1, letterSpacing: '-.02em', margin: 0,
                        }}>
                          {dia}
                        </p>
                        <p style={{ fontSize: '.6rem', letterSpacing: '.2em', color: '#8A6E2F', textTransform: 'uppercase', margin: '.3rem 0 0' }}>
                          {MESES[mesIdx]}
                        </p>
                      </div>
                    )}
                  </div>
                )}
                <div style={{
                  background: '#1C1510', padding: '3rem',
                  display: 'flex', flexDirection: 'column', justifyContent: 'center',
                }}>
                  <span style={{
                    display: 'inline-block', width: 'fit-content',
                    fontSize: '.45rem', letterSpacing: '.3em', textTransform: 'uppercase',
                    color: catColor, padding: '.25rem .9rem',
                    border: `1px solid ${catColor}55`,
                    background: `${catColor}10`,
                    marginBottom: '2rem',
                  }}>
                    {categoriaLabel[evento.acf.categoria] ?? evento.acf.categoria}
                  </span>
                  {!imageUrl && dia !== null && mesIdx !== null && (
                    <p style={{
                      fontFamily: 'var(--font-cinzel)', fontSize: '3.5rem',
                      color: '#C9A84C', lineHeight: 1, marginBottom: '1rem',
                    }}>
                      {dia} <span style={{ fontSize: '1.2rem', letterSpacing: '.2em' }}>{MESES[mesIdx!]}</span>
                    </p>
                  )}
                  <h3 style={{
                    fontFamily: 'var(--font-cinzel)',
                    fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                    color: '#E8D8A8', letterSpacing: '.08em',
                    marginBottom: '1rem', lineHeight: '1.2', marginTop: 0,
                  }}>
                    {evento.title.rendered}
                  </h3>
                  {evento.acf.description && (
                    <p style={{
                      fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
                      fontSize: '1rem', color: '#6A5832',
                      lineHeight: '1.7', marginBottom: '2rem', marginTop: 0,
                    }}>
                      {evento.acf.description}
                    </p>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                    {evento.acf.hora_evento && (
                      <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: '.8rem', color: '#8A6E2F', letterSpacing: '.1em', margin: 0 }}>
                        {evento.acf.hora_evento}h
                      </p>
                    )}
                    {evento.acf.precio > 0 && (
                      <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.1rem', color: '#C9A84C', margin: 0 }}>
                        From {evento.acf.precio}€
                      </p>
                    )}
                    <a href="/terraza/lanzarote" style={{
                      fontSize: '.55rem', letterSpacing: '.3em', textTransform: 'uppercase',
                      color: '#1A1208', background: '#C9A84C',
                      padding: '.7rem 1.8rem', textDecoration: 'none',
                      fontFamily: 'var(--font-raleway)',
                    }}>
                      Reserve
                    </a>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Remaining events — compact row */}
          {activos.length > 1 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '2px',
            }}>
              {activos.slice(1).map((evento) => {
                const hasImage = evento.acf.imagen_evento && typeof evento.acf.imagen_evento === 'object';
                const imageUrl = hasImage ? (evento.acf.imagen_evento as { url: string }).url : null;
                const catColor = categoriaColor[evento.acf.categoria] ?? '#C9A84C';
                const dia = evento.acf.fecha_evento ? parseInt(evento.acf.fecha_evento.substring(6, 8)) : null;
                const mesIdx = evento.acf.fecha_evento ? parseInt(evento.acf.fecha_evento.substring(4, 6)) - 1 : null;

                return (
                  <div key={evento.id} style={{
                    position: 'relative', minHeight: '380px',
                    display: 'flex', flexDirection: 'column',
                    overflow: 'hidden', background: '#1C1510',
                  }}>
                    {imageUrl && (
                      <>
                        <div style={{
                          position: 'absolute', inset: 0,
                          backgroundImage: `url(${imageUrl})`,
                          backgroundSize: 'cover', backgroundPosition: 'center',
                          filter: 'brightness(0.28) saturate(0.7)',
                        }} />
                        <div style={{
                          position: 'absolute', inset: 0,
                          background: 'linear-gradient(to top, rgba(28,21,16,.98) 0%, rgba(28,21,16,.5) 60%, transparent 100%)',
                        }} />
                      </>
                    )}
                    <div style={{
                      position: 'relative', flex: 1, padding: '2rem',
                      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                    }}>
                      <span style={{
                        display: 'inline-block', width: 'fit-content',
                        fontSize: '.42rem', letterSpacing: '.25em', textTransform: 'uppercase',
                        color: catColor, padding: '.2rem .7rem',
                        border: `1px solid ${catColor}55`,
                        background: `${catColor}10`,
                      }}>
                        {categoriaLabel[evento.acf.categoria] ?? evento.acf.categoria}
                      </span>
                      <div>
                        {dia !== null && mesIdx !== null && (
                          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '.6rem', marginBottom: '1rem' }}>
                            <p style={{
                              fontFamily: 'var(--font-cinzel)', fontSize: '2.8rem',
                              color: '#C9A84C', lineHeight: 1, margin: 0,
                            }}>
                              {dia}
                            </p>
                            <div>
                              <p style={{ fontSize: '.6rem', letterSpacing: '.2em', color: '#8A6E2F', textTransform: 'uppercase', margin: 0 }}>
                                {MESES[mesIdx]}
                              </p>
                              {evento.acf.hora_evento && (
                                <p style={{ fontSize: '.55rem', color: '#6A5832', letterSpacing: '.1em', margin: '.1rem 0 0' }}>
                                  {evento.acf.hora_evento}h
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                        <h3 style={{
                          fontFamily: 'var(--font-cinzel)',
                          fontSize: 'clamp(.9rem, 2vw, 1.2rem)',
                          color: '#E8D8A8', letterSpacing: '.07em',
                          marginBottom: '.6rem', lineHeight: '1.3', marginTop: 0,
                        }}>
                          {evento.title.rendered}
                        </h3>
                        {evento.acf.description && (
                          <p style={{
                            fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
                            fontSize: '.88rem', color: '#6A5832',
                            lineHeight: '1.6', marginBottom: '1.2rem', marginTop: 0,
                          }}>
                            {evento.acf.description}
                          </p>
                        )}
                        <div style={{
                          display: 'flex', alignItems: 'center',
                          justifyContent: 'space-between',
                          borderTop: '1px solid rgba(201,168,76,.1)',
                          paddingTop: '1rem', gap: '1rem',
                        }}>
                          {evento.acf.precio > 0 && (
                            <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1rem', color: '#C9A84C', margin: 0 }}>
                              {evento.acf.precio}€
                            </p>
                          )}
                          <a href="/terraza/lanzarote" style={{
                            fontSize: '.5rem', letterSpacing: '.28em', textTransform: 'uppercase',
                            color: '#C9A84C', border: '1px solid rgba(201,168,76,.4)',
                            padding: '.55rem 1.2rem', textDecoration: 'none',
                            background: 'rgba(201,168,76,.06)',
                            fontFamily: 'var(--font-raleway)',
                          }}>
                            Reserve
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
