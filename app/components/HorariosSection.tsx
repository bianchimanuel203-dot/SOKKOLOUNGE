import { getHorarios } from '../lib/wordpress';

const ORDEN_DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export default async function HorariosSection() {
  const horarios = await getHorarios();

  const ordenados = ORDEN_DIAS.map(dia =>
    horarios.find(h => h.acf.dia === dia) ?? null
  ).filter(Boolean) as typeof horarios;

  const hoy = new Date().toLocaleDateString('es-ES', { weekday: 'long' });
  const hoyCapital = hoy.charAt(0).toUpperCase() + hoy.slice(1);

  return (
    <section id="horarios" style={{ background: '#E8DCC4', padding: '6rem 2rem', borderTop: '3px solid rgba(201,168,76,.3)' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <p style={{ fontSize: '.65rem', letterSpacing: '.5em', color: '#8A6E2F', textTransform: 'uppercase' }}>
          05 — Horarios
        </p>
        <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#1A1208', letterSpacing: '.15em', marginTop: '1rem' }}>
          Cuándo Visitarnos
        </h2>
        <div style={{ width: '60px', height: '2px', background: '#C9A84C', margin: '1.5rem auto' }} />
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {ordenados.map((h) => {
          const esHoy = h.acf.dia === hoyCapital;
          return (
            <div key={h.id} style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              padding: '1.2rem 1.8rem',
              background: esHoy ? '#C9A84C' : '#F2E8D0',
              border: `1px solid rgba(201,168,76,.25)`,
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {esHoy && (
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1A1208', flexShrink: 0 }} />
                )}
                <p style={{
                  fontFamily: 'var(--font-cinzel)', fontSize: '.8rem',
                  letterSpacing: '.1em', color: esHoy ? '#1A1208' : '#1A1208'
                }}>
                  {h.acf.dia}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                {h.acf.cerrado ? (
                  <p style={{ fontSize: '.7rem', letterSpacing: '.2em', color: esHoy ? '#1A1208' : '#8A6E2F', textTransform: 'uppercase' }}>
                    Cerrado
                  </p>
                ) : (
                  <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: '.8rem', color: esHoy ? '#1A1208' : '#5C4A1E' }}>
                    {h.acf.apertura} — {h.acf.cierre}
                  </p>
                )}
                {h.acf.nota && (
                  <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: '.75rem', color: esHoy ? '#1A1208' : '#8A6E2F', marginTop: '.2rem' }}>
                    {h.acf.nota}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}