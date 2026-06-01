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
    <section id="horarios" style={{
      background: '#1A0E05',
      borderTop: '1px solid rgba(200,146,42,0.15)',
      padding: '6rem 2rem',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <p style={{ fontSize: '.6rem', letterSpacing: '.55em', color: '#8A6940', textTransform: 'uppercase', margin: 0 }}>
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
        <div style={{ width: '60px', height: '2px', background: '#C8922A', margin: '1.75rem auto' }} />
      </div>

      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        {ordenados.map((h) => {
          const esHoy = h.acf.dia === hoyCapital;
          const esCerrado = h.acf.cerrado;

          return (
            <div key={h.id} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '1.1rem 1.4rem',
              background: esHoy ? 'rgba(200,146,42,0.08)' : 'transparent',
              borderLeft: esHoy ? '3px solid #C8922A' : '3px solid transparent',
              borderBottom: '1px solid rgba(200,146,42,0.1)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
                {esHoy && (
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#C8922A', flexShrink: 0 }} />
                )}
                <div>
                  <p style={{
                    fontFamily: 'var(--font-cinzel)', fontSize: '.82rem',
                    letterSpacing: '.08em',
                    color: esHoy ? '#C8922A' : '#C4A882',
                    margin: 0,
                  }}>
                    {h.acf.dia}
                  </p>
                  {h.acf.nota && (
                    <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: '.75rem', color: '#8A6940', margin: '.15rem 0 0' }}>
                      {h.acf.nota}
                    </p>
                  )}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                {esCerrado ? (
                  <p style={{ fontSize: '.68rem', letterSpacing: '.2em', color: '#5A3A20', textTransform: 'uppercase', margin: 0 }}>
                    Cerrado
                  </p>
                ) : (
                  <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: '.82rem', color: esHoy ? '#C8922A' : '#C4A882', letterSpacing: '.04em', margin: 0 }}>
                    {h.acf.apertura} — {h.acf.cierre}
                  </p>
                )}
              </div>
            </div>
          );
        })}
        <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: '.8rem', color: '#8A6940', marginTop: '1.5rem', lineHeight: '1.6', textAlign: 'center' }}>
          * Última comanda 30 min antes del cierre. Última entrada 1h antes del cierre.
        </p>
      </div>
    </section>
  );
}
