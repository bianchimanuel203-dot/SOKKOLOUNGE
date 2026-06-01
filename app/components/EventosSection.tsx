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
      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <p style={{
          fontSize: '.6rem', letterSpacing: '.55em', color: '#8A7560',
          textTransform: 'uppercase', margin: 0,
        }}>
          04 — Agenda
        </p>
        <h2 style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          color: '#D4A843', letterSpacing: '.18em',
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
        <p style={{
          textAlign: 'center', fontFamily: 'var(--font-cormorant)',
          fontStyle: 'italic', color: '#8A7560', fontSize: '1rem',
        }}>
          Próximamente nuevos eventos. Síguenos para no perderte nada.
        </p>
      ) : (
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
          {activos.map((evento, idx) => {
            const catColor = categoriaColor[evento.acf.categoria] ?? '#C8922A';
            const dia    = evento.acf.fecha_evento ? parseInt(evento.acf.fecha_evento.substring(6, 8)) : null;
            const mesIdx = evento.acf.fecha_evento ? parseInt(evento.acf.fecha_evento.substring(4, 6)) - 1 : null;
            const anio   = evento.acf.fecha_evento ? evento.acf.fecha_evento.substring(0, 4) : null;

            return (
              <div key={evento.id} style={{
                display: 'grid',
                gridTemplateColumns: '110px 1fr auto',
                gap: '2.5rem', alignItems: 'start',
                padding: '2.5rem 0',
                borderBottom: '1px solid rgba(200,146,42,0.15)',
                borderTop: idx === 0 ? '1px solid rgba(200,146,42,0.15)' : 'none',
              }}>
                <div style={{ textAlign: 'center', paddingTop: '.2rem' }}>
                  {dia !== null ? (
                    <>
                      <p style={{
                        fontFamily: 'var(--font-cinzel)',
                        fontSize: '3.5rem', color: '#C8922A',
                        lineHeight: 1, letterSpacing: '-.02em', margin: 0,
                      }}>
                        {String(dia).padStart(2, '0')}
                      </p>
                      <p style={{
                        fontSize: '.6rem', letterSpacing: '.25em',
                        color: '#8A7560', textTransform: 'uppercase',
                        margin: '.35rem 0 0',
                      }}>
                        {mesIdx !== null ? MESES[mesIdx] : ''} {anio}
                      </p>
                      {evento.acf.hora_evento && (
                        <p style={{
                          fontFamily: 'var(--font-cinzel)', fontSize: '.72rem',
                          color: '#C4A882', letterSpacing: '.08em', margin: '.3rem 0 0',
                        }}>
                          {evento.acf.hora_evento}h
                        </p>
                      )}
                    </>
                  ) : (
                    <p style={{ fontFamily: 'var(--font-cinzel)', color: '#8A7560', fontSize: '.75rem' }}>—</p>
                  )}
                </div>

                <div>
                  <span style={{
                    display: 'inline-block',
                    fontSize: '.45rem', letterSpacing: '.28em', textTransform: 'uppercase',
                    color: catColor, padding: '.2rem .8rem',
                    border: `1px solid ${catColor}55`,
                    background: `${catColor}10`,
                    marginBottom: '1rem',
                  }}>
                    {categoriaLabel[evento.acf.categoria] ?? evento.acf.categoria}
                  </span>
                  <h3 style={{
                    fontFamily: 'var(--font-cinzel)',
                    fontSize: 'clamp(1rem, 2vw, 1.4rem)',
                    color: '#F5F0E8', letterSpacing: '.07em',
                    margin: '0 0 .6rem', lineHeight: '1.25',
                  }}>
                    {evento.title.rendered}
                  </h3>
                  {evento.acf.description && (
                    <p style={{
                      fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
                      fontSize: '.95rem', color: '#8A7560',
                      lineHeight: '1.65', margin: 0,
                    }}>
                      {evento.acf.description}
                    </p>
                  )}
                  {evento.acf.aforo > 0 && (
                    <p style={{
                      fontSize: '.5rem', letterSpacing: '.2em', color: '#8A7560',
                      textTransform: 'uppercase', marginTop: '.75rem',
                    }}>
                      Aforo: {evento.acf.aforo} personas
                    </p>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem', paddingTop: '.2rem' }}>
                  {evento.acf.precio > 0 && (
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '.48rem', letterSpacing: '.25em', color: '#8A7560', textTransform: 'uppercase', margin: 0 }}>
                        Desde
                      </p>
                      <p style={{
                        fontFamily: 'var(--font-cinzel)', fontSize: '1.4rem',
                        color: '#C8922A', margin: '.2rem 0 0',
                      }}>
                        {evento.acf.precio}€
                      </p>
                    </div>
                  )}
                  <a href="/terraza/lanzarote" style={{
                    fontFamily: 'var(--font-raleway)', fontSize: '.55rem',
                    letterSpacing: '.28em', textTransform: 'uppercase',
                    color: '#C8922A', textDecoration: 'none',
                    border: '1px solid rgba(200,146,42,0.5)',
                    background: 'rgba(200,146,42,0.06)',
                    padding: '.65rem 1.4rem', whiteSpace: 'nowrap',
                  }}>
                    RESERVAR
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
