'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SokkoSpotlight } from '@/components/ui/spotlight-background';
import { SokkoBackgroundPaths } from '@/components/ui/background-paths';
import { EtherealShadow } from '@/components/ui/etheral-shadow';
import type React from 'react';

// ── Estilos compartidos ───────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-cinzel, Cinzel, serif)',
  fontSize: '11px',
  color: '#A07850',
  letterSpacing: '0.2em',
  marginBottom: '6px',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(212,152,46,0.3)',
  borderRadius: '2px',
  padding: '12px 14px',
  fontFamily: 'var(--font-raleway, Raleway, sans-serif)',
  fontSize: '15px',
  color: '#F4EDD8',
  outline: 'none',
  transition: 'border-color 0.2s ease',
  boxSizing: 'border-box' as const,
};

const cardCristalStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.07)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(212,152,46,0.35)',
  borderRadius: '2px',
  padding: '1.75rem 2rem',
  transition: 'border-color 0.3s ease',
  boxShadow: '0 4px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
};

const cardHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  marginBottom: '1rem',
};

const cardTitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-cinzel, Cinzel, serif)',
  fontSize: '13px',
  color: '#D4982E',
  letterSpacing: '0.2em',
  margin: 0,
};

const cardTextStyle: React.CSSProperties = {
  fontFamily: 'var(--font-raleway, Raleway, sans-serif)',
  fontSize: '15px',
  color: '#D4B896',
  lineHeight: 1.75,
  marginBottom: '1rem',
};

const linkStyle: React.CSSProperties = {
  fontFamily: 'var(--font-cinzel, Cinzel, serif)',
  fontSize: '11px',
  color: '#D4982E',
  letterSpacing: '0.2em',
  textDecoration: 'none',
  borderBottom: '1px solid rgba(212,152,46,0.3)',
  paddingBottom: '2px',
  transition: 'color 0.2s',
};

// ── Componente ────────────────────────────────────────────────────

export default function ContactoSection() {
  const [formData, setFormData] = useState({
    nombre: '', email: '', fecha: '', personas: '2', mensaje: '',
  });
  const [enviado, setEnviado]   = useState(false);
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
    <SokkoBackgroundPaths>
    <SokkoSpotlight>
      <section
        id="reservar"
        className="contacto-section"
        style={{
          background: '#3A2210',
          padding: '8rem 4rem',
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <style>{`
          @media (max-width: 768px) {
            .contacto-section { padding: 4rem 1rem !important; }
            .contacto-grid { grid-template-columns: 1fr !important; }
            .contacto-form-row { grid-template-columns: 1fr !important; }
            .contacto-form-card { padding: 1.75rem 1.25rem !important; }
          }
        `}</style>
        {/* FONDO ETHERAL — z-index 0, absoluto, no interfiere con clicks */}
        <EtherealShadow
          color="rgba(212, 152, 46, 0.22)"
          animation={{ scale: 45, speed: 72 }}
          noise={{ opacity: 0.4, scale: 1.2 }}
          sizing="fill"
        />

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
        >
          <p style={{
            fontFamily: 'var(--font-cinzel, Cinzel, serif)',
            fontSize: '11px',
            color: '#A07850',
            letterSpacing: '0.5em',
            marginBottom: '1.25rem',
          }}>
            RESERVA TU MESA
          </p>
          <h2 style={{
            fontFamily: 'var(--font-cinzel, Cinzel, serif)',
            fontSize: 'clamp(36px, 5vw, 72px)',
            lineHeight: 1.05,
            marginBottom: '1rem',
          }}>
            <span style={{ color: '#D4982E' }}>TU REFUGIO</span>
            <br />
            <span style={{ color: '#F4EDD8' }}>TE ESPERA</span>
          </h2>
          <p style={{
            fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(17px, 1.5vw, 22px)',
            color: '#D4B896',
            margin: 0,
          }}>
            Reserva tu mesa y vive la experiencia SOKKO.
          </p>
        </motion.div>

        <div className="contacto-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr clamp(320px, 36%, 400px)',
          gap: '1.5rem',
          maxWidth: '1100px',
          margin: '0 auto',
          alignItems: 'start',
        }}>

          {/* ── FORMULARIO — glassmorphism ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="contacto-form-card"
            style={{
              background: 'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(212,152,46,0.35)',
              borderRadius: '2px',
              padding: '3rem',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            <h3 style={{
              fontFamily: 'var(--font-cinzel, Cinzel, serif)',
              fontSize: '18px',
              color: '#D4982E',
              letterSpacing: '0.2em',
              marginBottom: '2.5rem',
            }}>
              RESERVAR MESA
            </h3>

            {enviado ? (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <div style={{ fontSize: '48px', marginBottom: '1rem' }}>✓</div>
                <p style={{
                  fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                  fontSize: '16px', color: '#D4982E',
                  letterSpacing: '0.15em', marginBottom: '0.5rem',
                }}>RESERVA ENVIADA</p>
                <p style={{
                  fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                  fontStyle: 'italic', fontSize: '16px', color: '#D4B896',
                }}>
                  Nos pondremos en contacto contigo muy pronto.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="contacto-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={labelStyle}>NOMBRE</label>
                    <input
                      type="text" required
                      placeholder="Tu nombre"
                      value={formData.nombre}
                      onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = '#D4982E')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(212,152,46,0.3)')}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>EMAIL</label>
                    <input
                      type="email" required
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderColor = '#D4982E')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(212,152,46,0.3)')}
                    />
                  </div>
                </div>

                <div className="contacto-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={labelStyle}>FECHA</label>
                    <input
                      type="date" required
                      value={formData.fecha}
                      onChange={e => setFormData({ ...formData, fecha: e.target.value })}
                      style={{ ...inputStyle, colorScheme: 'dark' } as React.CSSProperties}
                      onFocus={e => (e.target.style.borderColor = '#D4982E')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(212,152,46,0.3)')}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>PERSONAS</label>
                    <select
                      value={formData.personas}
                      onChange={e => setFormData({ ...formData, personas: e.target.value })}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                    >
                      {[1,2,3,4,5,6,7,8,9,10].map(n => (
                        <option key={n} value={n} style={{ background: '#3A2210' }}>
                          {n} {n === 1 ? 'persona' : 'personas'}
                        </option>
                      ))}
                      <option value="10+" style={{ background: '#3A2210' }}>Más de 10</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <label style={labelStyle}>MENSAJE (OPCIONAL)</label>
                  <textarea
                    placeholder="Ocasión especial, alergias, preferencias..."
                    value={formData.mensaje}
                    onChange={e => setFormData({ ...formData, mensaje: e.target.value })}
                    rows={4}
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
                    onFocus={e => (e.target.style.borderColor = '#D4982E')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(212,152,46,0.3)')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={enviando}
                  style={{
                    width: '100%',
                    fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                    fontSize: '13px',
                    letterSpacing: '0.25em',
                    color: '#1A0E05',
                    background: enviando ? '#A07030' : '#D4982E',
                    border: 'none',
                    padding: '18px',
                    cursor: enviando ? 'not-allowed' : 'pointer',
                    transition: 'background 0.2s ease, transform 0.1s ease',
                  }}
                  onMouseEnter={e => { if (!enviando) (e.currentTarget.style.background = '#E8B84B'); }}
                  onMouseLeave={e => { if (!enviando) (e.currentTarget.style.background = '#D4982E'); }}
                  onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.99)')}
                  onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  {enviando ? 'ENVIANDO...' : 'ENVIAR RESERVA →'}
                </button>
              </form>
            )}
          </motion.div>

          {/* ── COLUMNA DERECHA — 3 cards cristal ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Ubicación */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              viewport={{ once: true }}
              style={cardCristalStyle}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,152,46,0.6)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,152,46,0.35)')}
            >
              <div style={cardHeaderStyle}>
                <span style={{ fontSize: '18px' }}>📍</span>
                <h4 style={cardTitleStyle}>UBICACIÓN</h4>
              </div>
              <p style={cardTextStyle}>
                Av. Alcalde Juan Ramón Soto Morales, 7<br />
                35610 Castillo Caleta de Fuste<br />
                Fuerteventura, Las Palmas
              </p>
              <a
                href="https://maps.google.com/?q=Av.+Alcalde+Juan+Ramon+Soto+Morales+7+Caleta+de+Fuste+Fuerteventura"
                target="_blank" rel="noopener noreferrer"
                style={linkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = '#E8B84B')}
                onMouseLeave={e => (e.currentTarget.style.color = '#D4982E')}
              >
                VER EN GOOGLE MAPS →
              </a>
            </motion.div>

            {/* Teléfono / WhatsApp */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              viewport={{ once: true }}
              style={cardCristalStyle}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,152,46,0.6)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,152,46,0.35)')}
            >
              <div style={cardHeaderStyle}>
                <span style={{ fontSize: '18px' }}>💬</span>
                <h4 style={cardTitleStyle}>TELÉFONO / WHATSAPP</h4>
              </div>
              <p style={{
                fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                fontSize: '22px',
                color: '#F4EDD8',
                letterSpacing: '0.05em',
                marginBottom: '1rem',
              }}>
                +34 643 830 451
              </p>
              <a
                href="https://wa.me/34643830451?text=Hola%2C%20me%20gustar%C3%ADa%20reservar%20mesa%20en%20SOKKO%20Lounge"
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  minHeight: '44px',
                  fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                  fontSize: '11px',
                  color: '#1A0E05',
                  background: '#25D366',
                  padding: '10px 20px',
                  textDecoration: 'none',
                  letterSpacing: '0.15em',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#20BA5A')}
                onMouseLeave={e => (e.currentTarget.style.background = '#25D366')}
              >
                💬 ESCRIBIR POR WHATSAPP
              </a>
            </motion.div>

            {/* Horario */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              viewport={{ once: true }}
              style={cardCristalStyle}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,152,46,0.6)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,152,46,0.35)')}
            >
              <div style={cardHeaderStyle}>
                <span style={{ fontSize: '18px' }}>🕐</span>
                <h4 style={cardTitleStyle}>HORARIO</h4>
              </div>
              {[
                { dias: 'Lun — Mar', horario: 'Cerrado',        abierto: false },
                { dias: 'Mié — Vie', horario: '15:00 — 02:00', abierto: true  },
                { dias: 'Sábado',    horario: '12:00 — 02:00', abierto: true  },
                { dias: 'Domingo',   horario: '12:00 — 02:00', abierto: true  },
              ].map(({ dias, horario, abierto }) => (
                <div key={dias} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.6rem 0',
                  borderBottom: '1px solid rgba(212,152,46,0.08)',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-raleway, Raleway, sans-serif)',
                    fontSize: '14px',
                    color: abierto ? '#D4B896' : '#5A3A20',
                  }}>{dias}</span>
                  <span style={{
                    fontFamily: 'var(--font-raleway, Raleway, sans-serif)',
                    fontSize: '14px',
                    color: abierto ? '#E8B84B' : '#5A3A20',
                    fontStyle: abierto ? 'normal' : 'italic',
                  }}>{horario}</span>
                </div>
              ))}
              <p style={{
                fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                fontStyle: 'italic',
                fontSize: '13px',
                color: '#A07850',
                marginTop: '0.75rem',
                marginBottom: 0,
              }}>
                sokkolounge@gmail.com
              </p>
            </motion.div>

          </div>
        </div>
      </section>
    </SokkoSpotlight>
    </SokkoBackgroundPaths>
  );
}
