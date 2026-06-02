import { getHorarios } from '../lib/wordpress';

const ORDEN_DIAS = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];

const FRANJAS = [
  { label: 'Mediodía',  hora: '12:00 — 16:00', desc: 'Cafés, brunch y ambiente tranquilo' },
  { label: 'Tarde',     hora: '16:00 — 20:00', desc: 'Talleres, juegos y planes en familia' },
  { label: 'Noche',     hora: '20:00 — cierre', desc: 'Cenas, shows y música en directo' },
];

export default async function HorariosSection() {
  const horarios = await getHorarios();

  const ordenados = ORDEN_DIAS.map(dia =>
    horarios.find(h => h.acf.dia === dia) ?? null
  ).filter(Boolean) as typeof horarios;

  const hoy = new Date().toLocaleDateString('es-ES', { weekday: 'long' });
  const hoyCapital = hoy.charAt(0).toUpperCase() + hoy.slice(1);

  return (
    <section id="horarios" style={{
      background: '#1A0E05',
      borderTop: '1px solid rgba(200,146,42,0.15)',
      padding: '7rem 2rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Fondo: imagen madera volcánica como textura */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url(/hero/hero-madera.jpg)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.18,
        filter: 'brightness(0.6)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, #1A0E05 0%, rgba(26,14,5,0.65) 50%, #1A0E05 100%)',
        pointerEvents: 'none',
      }} />

      {/* Contenido — sobre los fondos */}
      <div style={{ position: 'relative', zIndex: 1 }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <p style={{
          fontSize: '.6rem', letterSpacing: '.55em', color: '#8A6940',
          textTransform: 'uppercase', margin: 0,
        }}>
          05 — Horarios
        </p>
        <h2 style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          color: '#C8922A', letterSpacing: '.15em',
          marginTop: '1rem', marginBottom: 0,
        }}>
          CUÁNDO VISITARNOS
        </h2>
        <div style={{ width: '60px', height: '1px', background: 'rgba(200,146,42,0.4)', margin: '1.75rem auto' }} />
        <p style={{
          fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
          fontSize: '1.05rem', color: '#C4A882',
          maxWidth: '480px', margin: '0 auto', lineHeight: '1.8',
        }}>
          El ritmo de SOKKO. Cada momento del día tiene su propio carácter.
        </p>
      </div>

      {/* Franjas horarias */}
      <div style={{
        maxWidth: '900px', margin: '0 auto 5rem',
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '1px', background: 'rgba(200,146,42,0.1)',
      }}>
        {FRANJAS.map((franja, i) => (
          <div key={i} style={{
            background: '#1A0E05',
            padding: '2.5rem 2rem',
            textAlign: 'center',
            position: 'relative',
          }}>
            {/* Número romano */}
            <p style={{
              fontFamily: 'var(--font-cinzel)', fontSize: '.6rem',
              color: '#5A3A20', letterSpacing: '.3em',
              textTransform: 'uppercase', margin: '0 0 1rem',
            }}>
              {['I','II','III'][i]}
            </p>
            <p style={{
              fontFamily: 'var(--font-cinzel)',
              fontSize: '1.4rem', color: '#C8922A',
              letterSpacing: '.06em', margin: '0 0 .5rem',
            }}>
              {franja.hora}
            </p>
            <p style={{
              fontFamily: 'var(--font-cinzel)', fontSize: '.72rem',
              color: '#C4A882', letterSpacing: '.12em',
              textTransform: 'uppercase', margin: '0 0 1rem',
            }}>
              {franja.label}
            </p>
            <div style={{
              width: '30px', height: '1px',
              background: 'rgba(200,146,42,0.3)',
              margin: '0 auto 1rem',
            }} />
            <p style={{
              fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
              fontSize: '.9rem', color: '#8A6940', lineHeight: '1.6',
            }}>
              {franja.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Lista días */}
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>

        {/* Cabecera lista */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          padding: '0 1.4rem 1rem',
          borderBottom: '1px solid rgba(200,146,42,0.2)',
          marginBottom: '.5rem',
        }}>
          <p style={{
            fontFamily: 'var(--font-cinzel)', fontSize: '.52rem',
            letterSpacing: '.25em', color: '#5A3A20',
            textTransform: 'uppercase', margin: 0,
          }}>
            Día
          </p>
          <p style={{
            fontFamily: 'var(--font-cinzel)', fontSize: '.52rem',
            letterSpacing: '.25em', color: '#5A3A20',
            textTransform: 'uppercase', margin: 0,
          }}>
            Horario
          </p>
        </div>

        {ordenados.map((h) => {
          const esHoy = h.acf.dia === hoyCapital;
          const esCerrado = h.acf.cerrado;

          return (
            <div key={h.id} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '1rem 1.4rem',
              background: esHoy ? 'rgba(200,146,42,0.06)' : 'transparent',
              borderLeft: esHoy ? '2px solid #C8922A' : '2px solid transparent',
              borderBottom: '1px solid rgba(200,146,42,0.07)',
              transition: 'background .2s ease',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
                {esHoy && (
                  <div style={{
                    width: '4px', height: '4px',
                    borderRadius: '50%', background: '#C8922A',
                    flexShrink: 0,
                  }} />
                )}
                <div>
                  <p style={{
                    fontFamily: 'var(--font-cinzel)', fontSize: '.8rem',
                    letterSpacing: '.08em',
                    color: esHoy ? '#C8922A' : '#C4A882',
                    margin: 0,
                  }}>
                    {h.acf.dia}
                    {esHoy && (
                      <span style={{
                        fontFamily: 'var(--font-raleway)',
                        fontSize: '.42rem', letterSpacing: '.2em',
                        color: '#C8922A', marginLeft: '.75rem',
                        textTransform: 'uppercase', opacity: .7,
                      }}>
                        hoy
                      </span>
                    )}
                  </p>
                  {h.acf.nota && (
                    <p style={{
                      fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
                      fontSize: '.72rem', color: '#6A4A28', margin: '.15rem 0 0',
                    }}>
                      {h.acf.nota}
                    </p>
                  )}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                {esCerrado ? (
                  <p style={{
                    fontFamily: 'var(--font-raleway)',
                    fontSize: '.55rem', letterSpacing: '.2em',
                    color: '#4A2A14', textTransform: 'uppercase', margin: 0,
                  }}>
                    Cerrado
                  </p>
                ) : (
                  <p style={{
                    fontFamily: 'var(--font-cinzel)', fontSize: '.8rem',
                    color: esHoy ? '#C8922A' : '#C4A882',
                    letterSpacing: '.04em', margin: 0,
                  }}>
                    {h.acf.apertura} — {h.acf.cierre}
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {/* Nota legal */}
        <div style={{
          display: 'flex', alignItems: 'center',
          gap: '.75rem', marginTop: '2rem',
          padding: '1.2rem 1.4rem',
          background: 'rgba(200,146,42,0.03)',
          border: '1px solid rgba(200,146,42,0.08)',
        }}>
          <div style={{
            width: '3px', height: '3px',
            background: '#8A6940', borderRadius: '50%', flexShrink: 0,
          }} />
          <p style={{
            fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
            fontSize: '.82rem', color: '#6A4A28',
            margin: 0, lineHeight: '1.6',
          }}>
            Última comanda 30 min antes del cierre. Última entrada 1h antes del cierre.
          </p>
        </div>
      </div>
      </div>{/* cierre contenido zIndex */}
    </section>
  );
}