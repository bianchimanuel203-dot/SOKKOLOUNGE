'use client';

import { useState } from 'react';
import { BorderRotate } from '../../components/ui/animated-gradient-border';

const SOKKO_GRADIENT = {
  primary:   '#584827',
  secondary: '#D4982E',
  accent:    '#E8B84B',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-cinzel, Cinzel, serif)',
  fontSize: '11px',
  color: '#A07850',
  letterSpacing: '.2em',
  marginBottom: '6px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(212,152,46,0.25)',
  borderRadius: '2px',
  padding: '12px 14px',
  fontFamily: 'var(--font-raleway, Raleway, sans-serif)',
  fontSize: '15px',
  color: '#F0E0C0',
  outline: 'none',
  transition: 'border-color .2s ease',
  boxSizing: 'border-box' as const,
};

export default function ContactoSection() {
  const [formData, setFormData] = useState({
    nombre: '', email: '', fecha: '', personas: '2', mensaje: '',
  });
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    try {
      await fetch('/api/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setEnviado(true);
    } catch (err) {
      console.error(err);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section id="reservar" style={{ background: '#100804', padding: '8rem 4rem' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <h2 style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: 'clamp(36px, 5vw, 72px)',
          color: '#D4982E',
          letterSpacing: '.05em', lineHeight: 1.1, margin: '0 0 1rem',
        }}>
          TU REFUGIO<br />
          <span style={{ color: '#F0E0C0' }}>TE ESPERA</span>
        </h2>
        <p style={{
          fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
          fontSize: 'clamp(17px, 1.5vw, 22px)', color: '#C8A878', margin: 0,
        }}>
          Reserva tu mesa y vive la experiencia SOKKO.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr clamp(320px, 38%, 420px)',
        gap: '2rem', maxWidth: '1100px', margin: '0 auto', alignItems: 'start',
      }}>

        {/* ── Formulario con borde animado continuo ── */}
        <BorderRotate
          animationMode="auto-rotate"
          animationSpeed={6}
          gradientColors={SOKKO_GRADIENT}
          backgroundColor="#2C1A08"
          borderWidth={1}
          borderRadius={2}
        >
          <div style={{ padding: '3rem' }}>
            <h3 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '20px', color: '#D4982E', letterSpacing: '.15em', margin: '0 0 2.5rem' }}>RESERVAR MESA</h3>

            {enviado ? (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <p style={{ fontSize: '48px', margin: '0 0 1rem' }}>✓</p>
                <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: '18px', color: '#D4982E', letterSpacing: '.15em', margin: '0 0 .75rem' }}>RESERVA ENVIADA</p>
                <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: '16px', color: '#C8A878', margin: 0 }}>Nos pondremos en contacto contigo muy pronto.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={labelStyle}>NOMBRE</label>
                    <input type="text" required placeholder="Tu nombre" value={formData.nombre}
                      onChange={e => setFormData({...formData, nombre: e.target.value})}
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = '#D4982E')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(212,152,46,0.25)')}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>EMAIL</label>
                    <input type="email" required placeholder="tu@email.com" value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = '#D4982E')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(212,152,46,0.25)')}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={labelStyle}>FECHA</label>
                    <input type="date" required value={formData.fecha}
                      onChange={e => setFormData({...formData, fecha: e.target.value})}
                      style={{ ...inputStyle, colorScheme: 'dark' } as React.CSSProperties}
                      onFocus={e => (e.target.style.borderColor = '#D4982E')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(212,152,46,0.25)')}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>PERSONAS</label>
                    <select value={formData.personas}
                      onChange={e => setFormData({...formData, personas: e.target.value})}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                    >
                      {[1,2,3,4,5,6,7,8,9,10].map(n => (
                        <option key={n} value={n} style={{ background: '#1E1005' }}>{n} {n === 1 ? 'persona' : 'personas'}</option>
                      ))}
                      <option value="10+" style={{ background: '#1E1005' }}>Más de 10</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <label style={labelStyle}>MENSAJE (OPCIONAL)</label>
                  <textarea placeholder="Ocasión especial, alergias, preferencias..." value={formData.mensaje}
                    onChange={e => setFormData({...formData, mensaje: e.target.value})}
                    rows={4}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
                    onFocus={e => (e.target.style.borderColor = '#D4982E')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(212,152,46,0.25)')}
                  />
                </div>

                <button type="submit" disabled={enviando} style={{
                  width: '100%',
                  fontFamily: 'var(--font-cinzel)', fontSize: '14px',
                  letterSpacing: '.25em', color: '#1A0E05',
                  background: enviando ? '#A07030' : '#D4982E',
                  border: 'none', padding: '18px',
                  cursor: enviando ? 'not-allowed' : 'pointer',
                  transition: 'background .2s',
                }}
                onMouseEnter={e => { if (!enviando) (e.currentTarget.style.background = '#E8B84B'); }}
                onMouseLeave={e => { if (!enviando) (e.currentTarget.style.background = '#D4982E'); }}
                >
                  {enviando ? 'ENVIANDO...' : 'ENVIAR RESERVA →'}
                </button>
              </form>
            )}
          </div>
        </BorderRotate>

        {/* ── Columna derecha: 3 cards con borde stop-on-hover ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

          {/* Ubicación */}
          <BorderRotate animationMode="stop-rotate-on-hover" animationSpeed={8}
            gradientColors={SOKKO_GRADIENT} backgroundColor="#2C1A08" borderWidth={1} borderRadius={2}>
            <div style={{ padding: '1.75rem 2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '20px' }}>📍</span>
                <h4 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '13px', color: '#D4982E', letterSpacing: '.2em', margin: 0 }}>UBICACIÓN</h4>
              </div>
              <p style={{ fontFamily: 'var(--font-raleway)', fontWeight: 300, fontSize: '15px', color: '#D4B896', lineHeight: 1.75, margin: '0 0 1rem' }}>
                Av. Alcalde Juan Ramón Soto Morales, 7<br />
                35610 Castillo Caleta de Fuste<br />
                Fuerteventura, Las Palmas
              </p>
              <a href="https://maps.google.com/?q=Av.+Alcalde+Juan+Ramon+Soto+Morales+7+Caleta+de+Fuste+Fuerteventura"
                target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: 'var(--font-cinzel)', fontSize: '11px', color: '#D4982E', letterSpacing: '.2em', textDecoration: 'none', borderBottom: '1px solid rgba(212,152,46,0.3)', paddingBottom: '2px', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#E8B84B')}
                onMouseLeave={e => (e.currentTarget.style.color = '#D4982E')}
              >VER EN GOOGLE MAPS →</a>
            </div>
          </BorderRotate>

          {/* Teléfono / WhatsApp */}
          <BorderRotate animationMode="stop-rotate-on-hover" animationSpeed={8}
            gradientColors={SOKKO_GRADIENT} backgroundColor="#2C1A08" borderWidth={1} borderRadius={2}>
            <div style={{ padding: '1.75rem 2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '20px' }}>💬</span>
                <h4 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '13px', color: '#D4982E', letterSpacing: '.2em', margin: 0 }}>TELÉFONO / WHATSAPP</h4>
              </div>
              <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: '22px', color: '#F0E0C0', letterSpacing: '.05em', margin: '0 0 1rem' }}>+34 643 830 451</p>
              <a href="https://wa.me/34643830451?text=Hola%2C%20me%20gustar%C3%ADa%20reservar%20mesa%20en%20SOKKO%20Lounge"
                target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-cinzel)', fontSize: '11px', color: '#1A0E05', background: '#25D366', padding: '10px 20px', textDecoration: 'none', letterSpacing: '.15em', transition: 'background .2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#20BA5A')}
                onMouseLeave={e => (e.currentTarget.style.background = '#25D366')}
              >
                <span>💬</span> ESCRIBIR POR WHATSAPP
              </a>
            </div>
          </BorderRotate>

          {/* Horario rápido */}
          <BorderRotate animationMode="stop-rotate-on-hover" animationSpeed={8}
            gradientColors={SOKKO_GRADIENT} backgroundColor="#2C1A08" borderWidth={1} borderRadius={2}>
            <div style={{ padding: '1.75rem 2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '20px' }}>🕐</span>
                <h4 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '13px', color: '#D4982E', letterSpacing: '.2em', margin: 0 }}>HORARIO</h4>
              </div>
              {[
                { dias: 'Lun — Mar', horario: 'Cerrado',        abierto: false },
                { dias: 'Mié — Vie', horario: '15:00 — 02:00', abierto: true  },
                { dias: 'Sábado',    horario: '12:00 — 02:00', abierto: true  },
                { dias: 'Domingo',   horario: '12:00 — 02:00', abierto: true  },
              ].map(({ dias, horario, abierto }) => (
                <div key={dias} style={{ display: 'flex', justifyContent: 'space-between', padding: '.6rem 0', borderBottom: '1px solid rgba(212,152,46,0.08)' }}>
                  <span style={{ fontFamily: 'var(--font-raleway)', fontWeight: 300, fontSize: '14px', color: abierto ? '#D4B896' : '#5A4030' }}>{dias}</span>
                  <span style={{ fontFamily: 'var(--font-raleway)', fontWeight: 300, fontSize: '14px', color: abierto ? '#E8B84B' : '#5A4030', fontStyle: abierto ? 'normal' : 'italic' }}>{horario}</span>
                </div>
              ))}
              <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: '13px', color: '#907058', margin: '1rem 0 0' }}>
                Email: sokkolounge@gmail.com
              </p>
            </div>
          </BorderRotate>

        </div>
      </div>
    </section>
  );
}
