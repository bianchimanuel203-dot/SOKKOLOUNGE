import { getHorarios } from '../lib/wordpress';

const ORDEN_DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const DIAS_EN: Record<string, string> = {
  Lunes: 'Monday', Martes: 'Tuesday', Miércoles: 'Wednesday',
  Jueves: 'Thursday', Viernes: 'Friday', Sábado: 'Saturday', Domingo: 'Sunday',
};
const WEEKEND = ['Viernes', 'Sábado', 'Domingo'];

export default async function HorariosSection() {
  const horarios = await getHorarios();

  const ordenados = ORDEN_DIAS.map(dia =>
    horarios.find(h => h.acf.dia === dia) ?? null
  ).filter(Boolean) as typeof horarios;

  const hoy = new Date().toLocaleDateString('es-ES', { weekday: 'long' });
  const hoyCapital = hoy.charAt(0).toUpperCase() + hoy.slice(1);

  return (
    <section id="horarios" style={{
      background: '#F5F0E8',
      borderTop: '3px solid rgba(201,168,76,.25)',
    }}>
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '0',
        minHeight: '520px',
      }}>

        {/* LEFT — decorative panel */}
        <div style={{
          background: '#1A1208',
          padding: '5rem 4rem',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          borderRight: '1px solid rgba(201,168,76,.15)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Large watermark */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: 'var(--font-cinzel)',
            fontSize: 'clamp(5rem, 12vw, 10rem)',
            color: 'rgba(201,168,76,.04)', letterSpacing: '.05em',
            whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none',
          }}>
            HOURS
          </div>

          <p style={{ fontSize: '.6rem', letterSpacing: '.55em', color: '#8A6E2F', textTransform: 'uppercase', margin: 0 }}>
            05 — Opening Hours
          </p>
          <h2 style={{
            fontFamily: 'var(--font-cinzel)',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            color: '#C9A84C', letterSpacing: '.15em',
            marginTop: '1rem', marginBottom: 0, lineHeight: '1.2',
          }}>
            WHEN TO<br />VISIT US
          </h2>
          <div style={{ width: '50px', height: '2px', background: '#C9A84C', margin: '2rem 0' }} />
          <p style={{
            fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
            fontSize: '1.05rem', color: '#B8A980',
            maxWidth: '320px', lineHeight: '1.8', margin: 0,
          }}>
            SOKKO awaits you every evening. We recommend reserving your island in advance.
          </p>

          {/* CTA */}
          <a href="#terraza" style={{
            display: 'inline-block', marginTop: '2.5rem', width: 'fit-content',
            fontFamily: 'var(--font-raleway)', fontSize: '.58rem',
            letterSpacing: '.3em', textTransform: 'uppercase',
            color: '#1A1208', background: '#C9A84C',
            padding: '.8rem 2rem', textDecoration: 'none',
          }}>
            MAKE A RESERVATION
          </a>
        </div>

        {/* RIGHT — hours table */}
        <div style={{ padding: '4rem 3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

          {/* Week indicator */}
          <div style={{ display: 'flex', gap: '.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => {
              const dia = ORDEN_DIAS[i];
              const esHoy = dia === hoyCapital;
              return (
                <div key={i} style={{
                  width: '32px', height: '32px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '.55rem', letterSpacing: '.1em',
                  fontFamily: 'var(--font-cinzel)',
                  background: esHoy ? '#C9A84C' : 'transparent',
                  color: esHoy ? '#1A1208' : WEEKEND.includes(dia) ? '#C9A84C' : '#8A6E2F',
                  border: esHoy ? 'none' : '1px solid rgba(201,168,76,.2)',
                }}>
                  {d}
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {ordenados.map((h, i) => {
              const esHoy = h.acf.dia === hoyCapital;
              const esWeekend = WEEKEND.includes(h.acf.dia);

              return (
                <div key={h.id} style={{
                  display: 'grid', gridTemplateColumns: '1fr auto',
                  alignItems: 'center', gap: '1rem',
                  padding: '1.1rem 1.4rem',
                  background: esHoy ? '#C9A84C' : esWeekend ? 'rgba(201,168,76,.06)' : 'transparent',
                  borderTop: i === 0 ? '1px solid rgba(201,168,76,.15)' : 'none',
                  borderBottom: '1px solid rgba(201,168,76,.15)',
                  position: 'relative',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
                    {esHoy && (
                      <div style={{
                        width: '5px', height: '5px', borderRadius: '50%',
                        background: '#1A1208', flexShrink: 0,
                      }} />
                    )}
                    <div>
                      <p style={{
                        fontFamily: 'var(--font-cinzel)', fontSize: '.78rem',
                        letterSpacing: '.08em',
                        color: esHoy ? '#1A1208' : '#1A1208',
                        margin: 0,
                      }}>
                        {DIAS_EN[h.acf.dia]}
                      </p>
                      {h.acf.nota && (
                        <p style={{
                          fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
                          fontSize: '.72rem', color: esHoy ? '#3D2A00' : '#8A6E2F',
                          margin: '.15rem 0 0',
                        }}>
                          {h.acf.nota}
                        </p>
                      )}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    {h.acf.cerrado ? (
                      <p style={{
                        fontSize: '.65rem', letterSpacing: '.2em',
                        color: esHoy ? '#3D2A00' : '#8A6E2F',
                        textTransform: 'uppercase', margin: 0,
                      }}>
                        Closed
                      </p>
                    ) : (
                      <p style={{
                        fontFamily: 'var(--font-cinzel)', fontSize: '.78rem',
                        color: esHoy ? '#1A1208' : '#5C4A1E',
                        letterSpacing: '.04em', margin: 0,
                      }}>
                        {h.acf.apertura} — {h.acf.cierre}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <p style={{
            fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
            fontSize: '.78rem', color: '#8A6E2F',
            marginTop: '1.5rem', lineHeight: '1.6',
          }}>
            * Last orders 30 min before closing. Last entry 1h before closing.
          </p>
        </div>

      </div>
    </section>
  );
}
