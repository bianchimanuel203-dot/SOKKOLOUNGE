'use client';
import { useState } from 'react';

export default function Reservas() {
  const [form, setForm] = useState({
    nombre: '', correo: '', telefono: ''
  });
  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setError('');

    try {
      const res = await fetch('/api/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error('Error al enviar');
      setEnviado(true);
    } catch {
      setError('Algo salió mal. Inténtalo de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  const inputStyle = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(201,168,76,.3)',
    padding: '.8rem 0',
    color: '#B8A980',
    fontSize: '.85rem',
    fontFamily: 'var(--font-raleway)',
    outline: 'none',
    letterSpacing: '.05em'
  };

  const labelStyle = {
    fontSize: '.6rem',
    letterSpacing: '.35em',
    textTransform: 'uppercase' as const,
    color: '#8A6E2F',
    display: 'block',
    marginBottom: '.5rem'
  };

  if (enviado) return (
    <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
      <p style={{ fontFamily: 'var(--font-cinzel)', color: '#C9A84C', fontSize: '1.2rem', letterSpacing: '.15em' }}>
        Reserva Recibida
      </p>
      <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', color: '#B8A980', marginTop: '1rem', fontSize: '1rem' }}>
        Nos pondremos en contacto contigo pronto.
      </p>
    </div>
  );

  return (
    <section style={{ padding: '6rem 2rem', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <p style={{ fontSize: '.65rem', letterSpacing: '.5em', color: '#8A6E2F', textTransform: 'uppercase' }}>
          03 — Reservas
        </p>
        <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: '#C9A84C', letterSpacing: '.15em', marginTop: '1rem' }}>
          Reserva tu Mesa
        </h2>
        <div style={{ width: '60px', height: '1px', background: '#8A6E2F', margin: '1.5rem auto' }} />
        <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', color: '#B8A980', fontSize: '1rem' }}>
          Aquí encuentras tu lugar. Aquí te resguardas.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        <div>
          <label style={labelStyle}>Nombre completo</label>
          <input
            style={inputStyle}
            type="text"
            placeholder="Tu nombre"
            value={form.nombre}
            onChange={e => setForm({ ...form, nombre: e.target.value })}
            required
          />
        </div>

        <div>
          <label style={labelStyle}>Correo electrónico</label>
          <input
            style={inputStyle}
            type="email"
            placeholder="tu@correo.com"
            value={form.correo}
            onChange={e => setForm({ ...form, correo: e.target.value })}
            required
          />
        </div>

        <div>
          <label style={labelStyle}>Teléfono</label>
          <input
            style={inputStyle}
            type="tel"
            placeholder="+34 600 000 000"
            value={form.telefono}
            onChange={e => setForm({ ...form, telefono: e.target.value })}
            required
          />
        </div>

        {error && (
          <p style={{ color: '#E24B4A', fontSize: '.75rem', letterSpacing: '.1em' }}>{error}</p>
        )}

        <button
          type="submit"
          disabled={cargando}
          style={{
            background: 'transparent',
            border: '1px solid rgba(201,168,76,.4)',
            color: '#C9A84C',
            padding: '1rem 2.5rem',
            fontSize: '.65rem',
            letterSpacing: '.35em',
            textTransform: 'uppercase',
            cursor: 'none',
            fontFamily: 'var(--font-raleway)',
            transition: 'all .3s',
            alignSelf: 'center',
            marginTop: '1rem'
          }}
        >
          {cargando ? 'Enviando...' : 'Confirmar Reserva'}
        </button>
      </form>
    </section>
  );
}