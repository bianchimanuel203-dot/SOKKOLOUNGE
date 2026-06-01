'use client';
import { useState, useEffect } from 'react';

export default function ContactoSection() {
  const [formData, setFormData] = useState({
    nombre: '', email: '', fecha: '', personas: '2', mensaje: ''
  });
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const check = () => setMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    try {
      const res = await fetch('/api/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, isla: 'general', horario: '' }),
      });
      if (res.ok) setEnviado(true);
    } catch (err) {
      console.error(err);
    } finally {
      setEnviando(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(200,146,42,0.2)',
    borderRadius: '6px',
    padding: '12px 16px',
    color: '#F5F0E8',
    fontFamily: 'var(--font-raleway)',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s ease',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-raleway)',
    fontSize: '11px',
    letterSpacing: '0.15em',
    textTransform: 'uppercase' as const,
    color: '#8A7560',
    marginBottom: '8px',
    display: 'block',
  };

  return (
    <section id="contacto" style={{ background: '#1A0E05', padding: '100px 40px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p style={{
            fontFamily: 'var(--font-raleway)',
            fontSize: '11px', letterSpacing: '0.3em',
            color: '#8A7560', textTransform: 'uppercase', marginBottom: '16px',
          }}>
            07 — CONTACTO
          </p>
          <h2 style={{
            fontFamily: 'var(--font-cinzel)',
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 400, color: '#F5F0E8',
            letterSpacing: '0.06em', textTransform: 'uppercase',
            marginBottom: '16px',
          }}>
            Tu refugio te <span style={{ color: '#C8922A' }}>espera</span>
          </h2>
          <div style={{ width: '40px', height: '1px', background: '#C8922A', margin: '0 auto 20px' }} />
          <p style={{
            fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
            fontSize: '17px', color: '#8A7560', maxWidth: '480px', margin: '0 auto',
          }}>
            Reserva tu mesa y vive la experiencia SOKKO.
          </p>
        </div>

        {/* Grid formulario + info */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: mobile ? '1fr' : '1fr 420px',
          gap: mobile ? '32px' : '48px',
          alignItems: 'start',
        }}>

          {/* ── Formulario ── */}
          <div style={{
            background: 'rgba(200,146,42,0.04)',
            border: '1px solid rgba(200,146,42,0.12)',
            borderRadius: '12px',
            padding: '40px',
          }}>
            {enviado ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>✓</div>
                <h3 style={{
                  fontFamily: 'var(--font-cinzel)', color: '#C8922A',
                  fontSize: '20px', letterSpacing: '0.1em', marginBottom: '12px',
                }}>
                  Reserva recibida
                </h3>
                <p style={{ fontFamily: 'var(--font-raleway)', color: '#8A7560', fontSize: '14px' }}>
                  Nos pondremos en contacto contigo en breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{
                  fontFamily: 'var(--font-cinzel)', color: '#F5F0E8',
                  fontSize: '18px', letterSpacing: '0.08em',
                  marginBottom: '32px', fontWeight: 400,
                }}>
                  Reservar Mesa
                </h3>

                {/* Nombre + Email */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                  <div>
                    <label style={labelStyle}>Nombre</label>
                    <input
                      required
                      type="text"
                      placeholder="Tu nombre"
                      value={formData.nombre}
                      onChange={e => setFormData(p => ({ ...p, nombre: e.target.value }))}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input
                      required
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* Fecha + Personas */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                  <div>
                    <label style={labelStyle}>Fecha</label>
                    <input
                      required
                      type="date"
                      value={formData.fecha}
                      onChange={e => setFormData(p => ({ ...p, fecha: e.target.value }))}
                      style={{ ...inputStyle, colorScheme: 'dark' }}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Personas</label>
                    <select
                      value={formData.personas}
                      onChange={e => setFormData(p => ({ ...p, personas: e.target.value }))}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                    >
                      {[1,2,3,4,5,6,7,8,9,10].map(n => (
                        <option key={n} value={n} style={{ background: '#1A0E05' }}>
                          {n} {n === 1 ? 'persona' : 'personas'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Mensaje */}
                <div style={{ marginBottom: '28px' }}>
                  <label style={labelStyle}>Mensaje (opcional)</label>
                  <textarea
                    placeholder="Ocasión especial, alergias, preferencias..."
                    value={formData.mensaje}
                    onChange={e => setFormData(p => ({ ...p, mensaje: e.target.value }))}
                    rows={3}
                    style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.5' }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={enviando}
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: enviando ? 'rgba(200,146,42,0.5)' : '#C8922A',
                    border: 'none',
                    borderRadius: '6px',
                    fontFamily: 'var(--font-raleway)',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: '#1A0E05',
                    cursor: enviando ? 'not-allowed' : 'pointer',
                    transition: 'background 0.2s ease',
                  }}
                >
                  {enviando ? 'Enviando...' : 'Enviar Reserva →'}
                </button>
              </form>
            )}
          </div>

          {/* ── Info lateral ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Ubicación */}
            <div style={{
              background: 'rgba(200,146,42,0.04)',
              border: '1px solid rgba(200,146,42,0.12)',
              borderRadius: '12px',
              padding: '28px',
            }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '10px',
                background: 'rgba(200,146,42,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '16px',
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5">
                  <path d="M12 21s-8-7.5-8-12a8 8 0 0116 0c0 4.5-8 12-8 12z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
              </div>
              <h4 style={{
                fontFamily: 'var(--font-cinzel)', color: '#F5F0E8',
                fontSize: '13px', letterSpacing: '0.1em', marginBottom: '10px', fontWeight: 400,
              }}>
                Ubicación
              </h4>
              <p style={{
                fontFamily: 'var(--font-raleway)', color: '#8A7560',
                fontSize: '13px', lineHeight: '1.7', margin: '0 0 14px',
              }}>
                Av. Alcalde Juan Ramón Soto Morales, 7<br />
                35610 Castillo Caleta de Fuste<br />
                Fuerteventura, Las Palmas
              </p>
              <a
                href="https://maps.google.com/?q=Av.+Alcalde+Juan+Ramón+Soto+Morales,+7,+35610+Castillo+Caleta+de+Fuste"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-raleway)',
                  fontSize: '10px', letterSpacing: '0.2em',
                  textTransform: 'uppercase', color: '#C8922A',
                  textDecoration: 'none', borderBottom: '1px solid rgba(200,146,42,0.3)',
                  paddingBottom: '2px',
                }}
              >
                Ver en Google Maps →
              </a>
            </div>

            {/* Teléfono / WhatsApp */}
            <div style={{
              background: 'rgba(200,146,42,0.04)',
              border: '1px solid rgba(200,146,42,0.12)',
              borderRadius: '12px',
              padding: '28px',
            }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '10px',
                background: 'rgba(200,146,42,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '16px',
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#C9A84C">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <h4 style={{
                fontFamily: 'var(--font-cinzel)', color: '#F5F0E8',
                fontSize: '13px', letterSpacing: '0.1em', marginBottom: '10px', fontWeight: 400,
              }}>
                Teléfono / WhatsApp
              </h4>
              <a
                href="tel:+34643830451"
                style={{
                  fontFamily: 'var(--font-raleway)', color: '#F5F0E8',
                  fontSize: '16px', fontWeight: 500, textDecoration: 'none',
                  display: 'block', marginBottom: '12px',
                }}
              >
                +34 643 830 451
              </a>
              <a
                href="https://wa.me/34643830451?text=Hola%2C%20me%20gustar%C3%ADa%20hacer%20una%20reserva%20en%20SOKKO%20Lounge%20%F0%9F%8C%8A"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '9px 18px',
                  background: '#25D366',
                  borderRadius: '6px',
                  fontFamily: 'var(--font-raleway)',
                  fontSize: '11px', fontWeight: 700,
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: '#fff', textDecoration: 'none',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Escribir por WhatsApp
              </a>
            </div>

            {/* Horario */}
            <div style={{
              background: 'rgba(200,146,42,0.04)',
              border: '1px solid rgba(200,146,42,0.12)',
              borderRadius: '12px',
              padding: '28px',
            }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '10px',
                background: 'rgba(200,146,42,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '16px',
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="9"/>
                  <path d="M12 7v5l3 3"/>
                </svg>
              </div>
              <h4 style={{
                fontFamily: 'var(--font-cinzel)', color: '#F5F0E8',
                fontSize: '13px', letterSpacing: '0.1em', marginBottom: '10px', fontWeight: 400,
              }}>
                Horario
              </h4>
              {[
                { dia: 'Lunes — Martes', hora: 'Cerrado' },
                { dia: 'Miércoles — Jueves', hora: '18:00 — 24:00' },
                { dia: 'Viernes — Sábado', hora: '18:00 — 02:00' },
                { dia: 'Domingo', hora: '17:00 — 24:00' },
              ].map(({ dia, hora }) => (
                <div key={dia} style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '8px 0',
                  borderBottom: '1px solid rgba(200,146,42,0.08)',
                }}>
                  <span style={{ fontFamily: 'var(--font-raleway)', fontSize: '12px', color: '#8A7560' }}>{dia}</span>
                  <span style={{
                    fontFamily: 'var(--font-raleway)', fontSize: '12px',
                    color: hora === 'Cerrado' ? '#5A4A3A' : '#C8922A',
                    fontWeight: 500,
                  }}>{hora}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}