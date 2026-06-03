'use client';

import { useState } from 'react';
import HolographicCard from '../../components/ui/holographic-card';

/* ── 3 categorías de eventos ─────────────────────────────────────── */
const CATEGORIAS = [
  {
    id: 'talleres',
    icono: '🎨',
    titulo: 'TALLERES Y CURSOS',
    subtitulo: 'Horario cafetería · 15:00 — 20:00h',
    desc: 'Actividades creativas, clases de baile, cursos de DJ, crochet, costura y mucho más. Para todos los públicos en un ambiente relajado.',
    color: '#E8A020',
    imagen: '/zonas/zona-chill.jpg',
    eventos: [
      { id: 't1', titulo: 'TALLER DE BAILE LATINO', fecha: 'Miércoles — Próximamente', hora: '17:00 — 19:00h', precio: 'Consultar precio', desc: 'Aprende Salsa, Bachata y Merengue con profesores especializados. Para todos los niveles.', imagen: '/zonas/zona-chill.jpg' },
      { id: 't2', titulo: 'CLASE DE DJ', fecha: 'Jueves — Próximamente', hora: '16:00 — 18:00h', precio: 'Consultar precio', desc: 'Aprende los fundamentos del DJing en un entorno profesional. Platos, mezcla y producción básica.', imagen: '/zonas/zona-jaima.jpg' },
    ],
  },
  {
    id: 'shows',
    icono: '🎭',
    titulo: 'SHOWS PARA CENAS',
    subtitulo: 'Horario cenas · 20:00 — 23:00h',
    desc: 'Espectáculos únicos mientras disfrutas de nuestra carta. Drag shows, magia, monólogos y actuaciones temáticas.',
    color: '#C8922A',
    imagen: '/zonas/zona-comedor.jpg',
    eventos: [
      { id: 's1', titulo: 'DRAG SHOW — DAYANA + GABRIELA', fecha: 'Sábado 13 Junio · APERTURA GENERAL', hora: '21:30 — 23:30h', precio: 'Entrada libre', desc: 'Una noche mágica con el espectáculo de drag más vibrante de las islas. Dayana y Gabriela pondrán en pie a todo SOKKO.', imagen: '/zonas/zona-comedor.jpg' },
      { id: 's2', titulo: 'MAGO SENA', fecha: 'Domingo 14 Junio', hora: '20:00 — 22:00h', precio: 'Entrada libre', desc: 'Magia de cerca e ilusionismo en un ambiente íntimo. Una experiencia que te dejará sin palabras.', imagen: '/zonas/zona-chill.jpg' },
    ],
  },
  {
    id: 'artistas',
    icono: '🎧',
    titulo: 'ARTISTAS Y DJS',
    subtitulo: 'Horario pub · 23:00 — 02:00h',
    desc: 'Los mejores DJs y artistas en vivo. Electrónica, urbano, jam sessions y mucho más cada semana.',
    color: '#4080E0',
    imagen: '/zonas/zona-terraza.jpg',
    eventos: [
      { id: 'a1', titulo: 'DJ JONY', fecha: 'Sábado 13 Junio', hora: '20:00 — 21:30h', precio: 'Entrada libre', desc: 'Apertura de la noche con el mejor house y tech-house. DJ residente de SOKKO Lounge.', imagen: '/zonas/zona-terraza.jpg' },
      { id: 'a2', titulo: 'DJ LEMUS', fecha: 'Sábado 13 Junio', hora: '23:30 — 02:00h', precio: 'Entrada libre', desc: 'El cierre perfecto. Electrónica de última hora para los que no quieren que la noche termine.', imagen: '/zonas/zona-billar.jpg' },
      { id: 'a3', titulo: 'DJ DOA', fecha: 'Viernes 12 Junio · Apertura VIP', hora: '22:00 — 00:00h', precio: 'Evento privado', desc: 'Noche exclusiva para los invitados VIP de la apertura. Sets de electrónica premium.', imagen: '/zonas/zona-entrada.jpg' },
    ],
  },
];

type Evento = typeof CATEGORIAS[0]['eventos'][0];

/* ── Separador ornamental ────────────────────────────────────────── */
function OrnamentalDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', margin: '1.5rem 0' }}>
      <div style={{ width: '60px', height: '1px', background: 'linear-gradient(to right, transparent, #C8922A)' }} />
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5Z" stroke="#C8922A" strokeWidth="1" /></svg>
      <div style={{ width: '60px', height: '1px', background: 'linear-gradient(to left, transparent, #C8922A)' }} />
    </div>
  );
}

export default function EventosSection() {
  const [categoriaActiva, setCategoriaActiva] = useState<string | null>(null);
  const [eventoModal, setEventoModal] = useState<Evento | null>(null);

  const catActiva = CATEGORIAS.find(c => c.id === categoriaActiva);

  return (
    <section id="eventos" style={{ background: '#1A0E05', padding: 'clamp(5rem,8vw,8rem) clamp(1.5rem,4vw,4rem)', borderTop: '1px solid rgba(200,146,42,0.15)' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem,5vw,4rem)' }}>
        <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: '11px', color: '#8A6940', letterSpacing: '.5em', textTransform: 'uppercase', margin: '0 0 1rem' }}>PRÓXIMOS EVENTOS</p>
        <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(1.8rem,4vw,3rem)', color: '#C8922A', letterSpacing: '.1em', margin: '0 0 .5rem' }}>VIVE LA EXPERIENCIA SOKKO</h2>
        <OrnamentalDivider />
      </div>

      {/* 3 cards de categoría */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto 3rem' }}>
        {CATEGORIAS.map(cat => (
          <HolographicCard key={cat.id} intensity={5}>
            <div
              onClick={() => setCategoriaActiva(categoriaActiva === cat.id ? null : cat.id)}
              style={{
                position: 'relative', height: '380px', borderRadius: '2px',
                overflow: 'hidden',
                border: categoriaActiva === cat.id ? `1px solid ${cat.color}` : '1px solid rgba(200,146,42,0.2)',
                cursor: 'pointer', transition: 'border-color .3s',
              }}
            >
              <img src={cat.imagen} alt={cat.titulo}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .5s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: categoriaActiva === cat.id
                  ? `linear-gradient(to top, ${cat.color}40 0%, rgba(10,5,2,0.85) 100%)`
                  : 'linear-gradient(to top, rgba(10,5,2,0.92) 0%, rgba(10,5,2,0.4) 60%, transparent 100%)',
                transition: 'background .4s',
              }} />
              {categoriaActiva === cat.id && (
                <div style={{ position: 'absolute', inset: 0, boxShadow: `inset 0 0 30px ${cat.color}20`, pointerEvents: 'none' }} />
              )}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '2rem' }}>
                <p style={{ fontSize: '36px', margin: '0 0 .75rem' }}>{cat.icono}</p>
                <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(14px,1.5vw,20px)', color: '#F5EDD8', letterSpacing: '.05em', lineHeight: 1.2, margin: '0 0 .4rem' }}>{cat.titulo}</p>
                <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: '14px', color: cat.color, margin: '0 0 .75rem' }}>{cat.subtitulo}</p>
                <p style={{ fontFamily: 'var(--font-raleway)', fontSize: '12px', color: '#8A6940', lineHeight: 1.5, margin: '0 0 1rem' }}>{cat.desc}</p>
                <div style={{ fontFamily: 'var(--font-cinzel)', fontSize: '10px', color: cat.color, letterSpacing: '.2em' }}>
                  {categoriaActiva === cat.id ? '▲ CERRAR' : '▼ VER EVENTOS'}
                </div>
              </div>
            </div>
          </HolographicCard>
        ))}
      </div>

      {/* Panel de eventos de la categoría seleccionada */}
      {catActiva && (
        <div style={{
          maxWidth: '1100px', margin: '0 auto 3rem',
          border: `1px solid ${catActiva.color}40`,
          background: 'rgba(10,5,2,0.7)', backdropFilter: 'blur(12px)',
          padding: '2rem', animation: 'fadeInDown .3s ease',
        }}>
          <style>{`@keyframes fadeInDown { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }`}</style>
          <h3 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '14px', color: catActiva.color, letterSpacing: '.3em', margin: '0 0 1.5rem' }}>
            {catActiva.titulo} · {catActiva.subtitulo}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))', gap: '1rem' }}>
            {catActiva.eventos.map(evento => (
              <div key={evento.id}
                onClick={() => setEventoModal(evento)}
                style={{ border: '1px solid rgba(200,146,42,0.15)', padding: '1.5rem', cursor: 'pointer', transition: 'all .2s', background: 'rgba(26,14,5,0.6)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${catActiva.color}60`; (e.currentTarget as HTMLElement).style.background = 'rgba(26,14,5,0.9)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,146,42,0.15)'; (e.currentTarget as HTMLElement).style.background = 'rgba(26,14,5,0.6)'; }}
              >
                <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(13px,1.3vw,17px)', color: '#F5EDD8', lineHeight: 1.2, margin: '0 0 .5rem' }}>{evento.titulo}</p>
                <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: '14px', color: catActiva.color, margin: '0 0 .4rem' }}>{evento.fecha}</p>
                <p style={{ fontFamily: 'var(--font-raleway)', fontSize: '12px', color: '#8A6940', margin: '0 0 .75rem' }}>{evento.hora} · {evento.precio}</p>
                <p style={{ fontFamily: 'var(--font-raleway)', fontSize: '12px', color: '#C4A882', lineHeight: 1.5, margin: '0 0 .75rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{evento.desc}</p>
                <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: '9px', color: catActiva.color, letterSpacing: '.2em', margin: 0 }}>VER MÁS →</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal de evento individual */}
      {eventoModal && (
        <div
          onClick={() => setEventoModal(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ background: '#0D0802', border: '1px solid rgba(200,146,42,0.3)', maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative', animation: 'fadeInDown .25s ease' }}
          >
            <div style={{ height: '280px', position: 'relative', overflow: 'hidden' }}>
              <img src={eventoModal.imagen} alt={eventoModal.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0D0802 0%, transparent 60%)' }} />
              <button onClick={() => setEventoModal(null)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(200,146,42,0.4)', color: '#C8922A', width: '36px', height: '36px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
            </div>
            <div style={{ padding: '2rem' }}>
              <h3 style={{ fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(18px,2.5vw,28px)', color: '#F5EDD8', lineHeight: 1.1, margin: '0 0 1rem' }}>{eventoModal.titulo}</h3>
              <div style={{ display: 'flex', gap: '1.5rem', margin: '0 0 1rem', flexWrap: 'wrap' as const }}>
                <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '11px', color: '#C8922A', letterSpacing: '.15em' }}>📅 {eventoModal.fecha}</span>
                <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '11px', color: '#C8922A', letterSpacing: '.15em' }}>🕘 {eventoModal.hora}</span>
                <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '11px', color: '#D4A843', border: '1px solid rgba(200,146,42,0.3)', padding: '3px 12px' }}>{eventoModal.precio}</span>
              </div>
              <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 'clamp(15px,1.4vw,18px)', color: '#C4A882', lineHeight: 1.7, margin: '0 0 2rem' }}>{eventoModal.desc}</p>
              <a href="#contacto" onClick={() => setEventoModal(null)}
                style={{ display: 'block', textAlign: 'center', fontFamily: 'var(--font-cinzel)', fontSize: '12px', letterSpacing: '.25em', color: '#1A0E05', background: '#C8922A', padding: '14px', textDecoration: 'none', transition: 'background .2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#D4A843'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#C8922A'}
              >RESERVAR PLAZA</a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
