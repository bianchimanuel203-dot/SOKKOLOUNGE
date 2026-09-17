'use client';
import { useState } from 'react';
import { islas } from './islas-data';

const MESES_LARGO = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const DIAS_SEMANA_CORTO = ['L', 'M', 'Mi', 'J', 'V', 'S', 'D'];

function CalendarioSOKKO({ fecha, onSelect }: { fecha: Date | null; onSelect: (d: Date) => void }) {
  const [mes, setMes] = useState(new Date());
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const primerDia = new Date(mes.getFullYear(), mes.getMonth(), 1);
  const ultimoDia = new Date(mes.getFullYear(), mes.getMonth() + 1, 0);
  const diasEnMes = ultimoDia.getDate();
  const inicioSemana = (primerDia.getDay() + 6) % 7;

  const celdas: (Date | null)[] = [
    ...Array(inicioSemana).fill(null),
    ...Array.from({ length: diasEnMes }, (_, i) => new Date(mes.getFullYear(), mes.getMonth(), i + 1))
  ];

  return (
    <div className="sokko-calendario" style={{
      background: 'rgba(200,146,42,.03)',
      border: '1px solid rgba(200,146,42,.15)',
      borderRadius: '4px', padding: '1.5rem',
      maxWidth: '360px'
    }}>
      <style>{`
        @media (max-width: 480px) {
          .sokko-calendario { padding: .75rem !important; }
          .sokko-calendario .cal-nav-btn { width: 44px !important; height: 44px !important; }
          .sokko-calendario .cal-day-grid { gap: 2px !important; }
        }
      `}</style>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <button
          className="cal-nav-btn"
          onClick={() => setMes(new Date(mes.getFullYear(), mes.getMonth() - 1, 1))}
          style={{
            background: 'transparent', border: '1px solid rgba(200,146,42,.2)',
            color: '#8A6E2F', width: '32px', height: '32px',
            cursor: 'pointer', fontSize: '1rem', borderRadius: '2px'
          }}
        >‹</button>
        <p style={{ fontFamily: 'var(--font-cinzel)', color: '#C8922A', fontSize: '.85rem', letterSpacing: '.15em' }}>
          {MESES_LARGO[mes.getMonth()]} {mes.getFullYear()}
        </p>
        <button
          className="cal-nav-btn"
          onClick={() => setMes(new Date(mes.getFullYear(), mes.getMonth() + 1, 1))}
          style={{
            background: 'transparent', border: '1px solid rgba(200,146,42,.2)',
            color: '#8A6E2F', width: '32px', height: '32px',
            cursor: 'pointer', fontSize: '1rem', borderRadius: '2px'
          }}
        >›</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '8px' }}>
        {DIAS_SEMANA_CORTO.map(d => (
          <div key={d} style={{
            textAlign: 'center', fontSize: '.55rem',
            letterSpacing: '.15em', color: '#8A6E2F',
            textTransform: 'uppercase', padding: '4px 0'
          }}>
            {d}
          </div>
        ))}
      </div>

      <div className="cal-day-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
        {celdas.map((dia, i) => {
          if (!dia) return <div key={`empty-${i}`} />;
          const pasado = dia < hoy;
          const seleccionado = fecha?.toDateString() === dia.toDateString();
          const esHoy = dia.toDateString() === hoy.toDateString();
          return (
            <button
              key={i}
              onClick={() => !pasado && onSelect(dia)}
              disabled={pasado}
              style={{
                width: '100%', aspectRatio: '1',
                border: seleccionado ? '1px solid #C8922A'
                  : esHoy ? '1px solid rgba(200,146,42,.4)'
                  : '1px solid transparent',
                background: seleccionado ? 'rgba(200,146,42,.15)' : 'transparent',
                color: pasado ? 'rgba(138,110,47,.3)' : seleccionado ? '#C8922A' : '#B8A980',
                fontFamily: 'var(--font-cinzel)', fontSize: '.75rem',
                cursor: pasado ? 'default' : 'pointer',
                borderRadius: '2px', transition: 'all .2s'
              }}
            >
              {dia.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function IslaPageClient({ islaSlug }: { islaSlug: string }) {
  const isla = islas[islaSlug];

  const [step, setStep] = useState(1);
  const [personas, setPersonas] = useState(2);
  const [fecha, setFecha] = useState<Date | null>(null);
  const [horario, setHorario] = useState('');
  const [form, setForm] = useState({ nombre: '', correo: '', telefono: '' });
  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);

  const nombreIsla = islaSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const labelStyle = {
    fontSize: '.6rem', letterSpacing: '.35em', textTransform: 'uppercase' as const,
    color: '#8A6E2F', display: 'block', marginBottom: '.8rem'
  };

  const inputStyle = {
    width: '100%', background: 'transparent',
    border: 'none', borderBottom: '1px solid rgba(200,146,42,.3)',
    padding: '.8rem 0', color: '#B8A980', fontSize: '.85rem',
    fontFamily: 'var(--font-raleway)', outline: 'none', letterSpacing: '.05em'
  };

  const handleSubmit = async () => {
    setCargando(true);
    try {
      const fechaISO = fecha
        ? `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`
        : ''
      const res = await fetch('/api/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.nombre, email: form.correo, fecha: fechaISO,
          personas, mensaje: `Isla: ${nombreIsla} · Horario: ${horario}h · Teléfono: ${form.telefono}`
        })
      });
      if (!res.ok) throw new Error();
      setEnviado(true);
    } catch {
      alert('Error al enviar. Inténtalo de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  if (!isla) return (
    <div style={{ background: '#1A0E05', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#C8922A', fontFamily: 'var(--font-cinzel)' }}>Isla no encontrada</p>
    </div>
  );

  return (
    <div style={{ background: '#1A0E05', minHeight: '100vh' }}>

      {/* NAV */}
      <style>{`
        @media (max-width: 768px) {
          .isla-nav { padding: 1rem 1rem !important; }
        }
      `}</style>
      <nav className="isla-nav" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '1.2rem 3rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(26,14,5,0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(200,146,42,0.15)',
      }}>
        <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <img src="/logo-sokko.svg" alt="SOKKO LOUNGE" style={{ height: '40px' }} />
        </a>
        <a href="/" style={{
          fontFamily: 'var(--font-raleway)', fontSize: '.65rem',
          letterSpacing: '.3em', textTransform: 'uppercase',
          color: '#C4A882', textDecoration: 'none',
        }}>
          ← VOLVER
        </a>
      </nav>

      {/* HERO */}
      <div style={{ position: 'relative', height: '60vh', overflow: 'hidden', marginTop: 0 }}>
        <img
          src={isla.imagen}
          alt={nombreIsla}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(26,18,8,.4) 0%, rgba(26,18,8,.95) 100%)'
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'flex-end',
          padding: '3rem 2rem', textAlign: 'center'
        }}>
          <p style={{
            fontSize: '.65rem', letterSpacing: '.5em',
            color: '#8A7560', textTransform: 'uppercase', marginBottom: '1rem'
          }}>
            Terraza · Las Ocho Islas
          </p>
          <h1 style={{
            fontFamily: 'var(--font-cinzel)',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            color: '#C8922A', letterSpacing: '.15em', marginBottom: '1rem'
          }}>
            {nombreIsla}
          </h1>
          <p style={{
            fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
            fontSize: '1.1rem', color: '#C4A882', maxWidth: '500px'
          }}>
            {isla.desc}
          </p>
        </div>
      </div>

      {/* RESERVA */}
      <style>{`
        @media (max-width: 480px) {
          .isla-reserva { padding: 4rem 1rem !important; }
        }
      `}</style>
      <div className="isla-reserva" style={{ maxWidth: '700px', margin: '0 auto', padding: '4rem 2rem' }}>

        {enviado ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div style={{ width: '60px', height: '1px', background: '#C8922A', margin: '0 auto 2rem' }} />
            <p style={{ fontFamily: 'var(--font-cinzel)', color: '#C8922A', fontSize: '1.3rem', letterSpacing: '.15em' }}>
              Reserva Confirmada
            </p>
            <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', color: '#C4A882', marginTop: '1rem' }}>
              Te esperamos en la isla {nombreIsla}. Nos pondremos en contacto contigo pronto.
            </p>
            <a href="/" style={{
              display: 'inline-block', marginTop: '2rem',
              border: '1px solid rgba(200,146,42,.3)', color: '#C8922A',
              padding: '.8rem 2rem', fontSize: '.6rem', letterSpacing: '.3em',
              textTransform: 'uppercase', fontFamily: 'var(--font-raleway)',
              textDecoration: 'none'
            }}>
              Volver al inicio
            </a>
          </div>
        ) : (
          <>
            {/* Steps */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem' }}>
              {[{ n: 1, label: 'Encontrar' }, { n: 2, label: 'Información' }, { n: 3, label: 'Confirmación' }].map(s => (
                <div key={s.n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.5rem' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    border: `1px solid ${step >= s.n ? '#C8922A' : 'rgba(200,146,42,.2)'}`,
                    background: step === s.n ? 'rgba(200,146,42,.1)' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-cinzel)', fontSize: '.8rem',
                    color: step >= s.n ? '#C8922A' : '#8A6E2F'
                  }}>{s.n}</div>
                  <span style={{ fontSize: '.55rem', letterSpacing: '.2em', color: step >= s.n ? '#C8922A' : '#8A6E2F', textTransform: 'uppercase' }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* STEP 1 */}
            {step === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                <div>
                  <label style={labelStyle}>Número de personas</label>
                  <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
                    {[1,2,3,4,5,6,7,8].map(n => (
                      <button key={n} onClick={() => setPersonas(n)} style={{
                        width: '44px', height: '44px',
                        border: `1px solid ${personas === n ? '#C8922A' : 'rgba(200,146,42,.2)'}`,
                        background: personas === n ? 'rgba(200,146,42,.1)' : 'transparent',
                        color: personas === n ? '#C8922A' : '#8A6E2F',
                        fontFamily: 'var(--font-cinzel)', fontSize: '.8rem',
                        cursor: 'pointer', borderRadius: '2px', transition: 'all .2s'
                      }}>{n}</button>
                    ))}
                    <button onClick={() => setPersonas(9)} style={{
                      padding: '0 1rem', height: '44px',
                      border: `1px solid ${personas === 9 ? '#C8922A' : 'rgba(200,146,42,.2)'}`,
                      background: personas === 9 ? 'rgba(200,146,42,.1)' : 'transparent',
                      color: personas === 9 ? '#C8922A' : '#8A6E2F',
                      fontFamily: 'var(--font-raleway)', fontSize: '.6rem', letterSpacing: '.2em',
                      cursor: 'pointer', borderRadius: '2px'
                    }}>9+</button>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Selecciona la fecha</label>
                  <CalendarioSOKKO fecha={fecha} onSelect={setFecha} />
                </div>

                {fecha && (
                  <div>
                    <label style={labelStyle}>Selecciona el horario</label>
                    <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
                      {isla.horarios.map(h => (
                        <button key={h} onClick={() => setHorario(h)} style={{
                          padding: '.5rem 1rem',
                          border: `1px solid ${horario === h ? '#C8922A' : 'rgba(200,146,42,.2)'}`,
                          background: horario === h ? 'rgba(200,146,42,.1)' : 'transparent',
                          color: horario === h ? '#C8922A' : '#8A6E2F',
                          fontFamily: 'var(--font-cinzel)', fontSize: '.75rem',
                          cursor: 'pointer', borderRadius: '2px', transition: 'all .2s'
                        }}>{h}</button>
                      ))}
                    </div>
                  </div>
                )}

                <button onClick={() => setStep(2)} disabled={!fecha || !horario} style={{
                  alignSelf: 'center', marginTop: '1rem',
                  background: fecha && horario ? 'rgba(200,146,42,.1)' : 'transparent',
                  border: `1px solid ${fecha && horario ? '#C8922A' : 'rgba(200,146,42,.2)'}`,
                  color: fecha && horario ? '#C8922A' : '#8A6E2F',
                  padding: '1rem 3rem', fontSize: '.65rem', letterSpacing: '.35em',
                  textTransform: 'uppercase', cursor: 'pointer',
                  fontFamily: 'var(--font-raleway)', transition: 'all .3s'
                }}>Continuar →</button>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                <div style={{ padding: '1.5rem', border: '1px solid rgba(200,146,42,.1)', background: 'rgba(200,146,42,.03)' }}>
                  <p style={{ fontSize: '.6rem', letterSpacing: '.3em', color: '#8A7560', textTransform: 'uppercase', marginBottom: '.8rem' }}>Resumen</p>
                  <p style={{ fontFamily: 'var(--font-cinzel)', color: '#C8922A', fontSize: '.85rem' }}>
                    {nombreIsla} · {personas} {personas === 1 ? 'persona' : 'personas'}
                  </p>
                  <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', color: '#C4A882', fontSize: '.9rem', marginTop: '.3rem' }}>
                    {fecha?.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })} · {horario}h
                  </p>
                </div>
                <div>
                  <label style={labelStyle}>Nombre completo</label>
                  <input style={inputStyle} type="text" placeholder="Tu nombre"
                    value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} />
                </div>
                <div>
                  <label style={labelStyle}>Correo electrónico</label>
                  <input style={inputStyle} type="email" placeholder="tu@correo.com"
                    value={form.correo} onChange={e => setForm({ ...form, correo: e.target.value })} />
                </div>
                <div>
                  <label style={labelStyle}>Teléfono</label>
                  <input style={inputStyle} type="tel" placeholder="+34 600 000 000"
                    value={form.telefono} onChange={e => setForm({ ...form, telefono: e.target.value })} />
                </div>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <button onClick={() => setStep(1)} style={{
                    background: 'transparent', border: '1px solid rgba(200,146,42,.2)',
                    color: '#8A6E2F', padding: '1rem 2rem', fontSize: '.65rem',
                    letterSpacing: '.35em', textTransform: 'uppercase',
                    cursor: 'pointer', fontFamily: 'var(--font-raleway)'
                  }}>← Atrás</button>
                  <button onClick={() => setStep(3)} disabled={!form.nombre || !form.correo || !form.telefono} style={{
                    background: form.nombre && form.correo && form.telefono ? 'rgba(200,146,42,.1)' : 'transparent',
                    border: `1px solid ${form.nombre && form.correo && form.telefono ? '#C8922A' : 'rgba(200,146,42,.2)'}`,
                    color: form.nombre && form.correo && form.telefono ? '#C8922A' : '#8A6E2F',
                    padding: '1rem 2rem', fontSize: '.65rem', letterSpacing: '.35em',
                    textTransform: 'uppercase', cursor: 'pointer',
                    fontFamily: 'var(--font-raleway)', transition: 'all .3s'
                  }}>Continuar →</button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div style={{ padding: '2rem', border: '1px solid rgba(200,146,42,.15)', background: 'rgba(200,146,42,.03)' }}>
                  <p style={{ fontSize: '.6rem', letterSpacing: '.3em', color: '#8A7560', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                    Confirma tu reserva
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '.8rem' }}>
                    {[
                      ['Isla', nombreIsla],
                      ['Personas', `${personas} ${personas === 1 ? 'persona' : 'personas'}`],
                      ['Fecha', fecha?.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) ?? ''],
                      ['Horario', `${horario}h`],
                      ['Nombre', form.nombre],
                      ['Correo', form.correo],
                      ['Teléfono', form.telefono],
                    ].map(([k, v]) => (
                      <div key={k} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(200,146,42,.06)', paddingBottom: '.8rem' }}>
                        <span style={{ fontSize: '.6rem', letterSpacing: '.2em', color: '#8A7560', textTransform: 'uppercase' }}>{k}</span>
                        <span style={{ fontFamily: 'var(--font-cormorant)', color: '#C4A882', fontSize: '.9rem' }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <button onClick={() => setStep(2)} style={{
                    background: 'transparent', border: '1px solid rgba(200,146,42,.2)',
                    color: '#8A6E2F', padding: '1rem 2rem', fontSize: '.65rem',
                    letterSpacing: '.35em', textTransform: 'uppercase',
                    cursor: 'pointer', fontFamily: 'var(--font-raleway)'
                  }}>← Atrás</button>
                  <button onClick={handleSubmit} disabled={cargando} style={{
                    background: 'rgba(200,146,42,.1)', border: '1px solid #C8922A',
                    color: '#C8922A', padding: '1rem 2.5rem', fontSize: '.65rem',
                    letterSpacing: '.35em', textTransform: 'uppercase', cursor: 'pointer',
                    fontFamily: 'var(--font-raleway)', transition: 'all .3s'
                  }}>{cargando ? 'Enviando...' : 'Confirmar Reserva'}</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}