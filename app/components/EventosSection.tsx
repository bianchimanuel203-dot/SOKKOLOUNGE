'use client';

import { useState } from 'react';
import HolographicCard from '../../components/ui/holographic-card';

const FILTROS = [
  { id: 'todos',    label: 'TODOS',             color: '#C8922A' },
  { id: 'talleres', label: 'TALLERES Y CURSOS', color: '#E8A020' },
  { id: 'shows',    label: 'SHOWS PARA CENAS',  color: '#C8922A' },
  { id: 'artistas', label: 'ARTISTAS Y DJS',    color: '#4080E0' },
];

const EVENTOS = [
  {
    id: 'e1', slug: 'apertura-general', categoria: 'shows', badgeLabel: 'APERTURA GENERAL',
    titulo: 'DRAG SHOW\nDAYANA + GABRIELA',
    subtitulo: 'Con DJ Jony y DJ Lemus',
    fecha: 'SÁBADO', dia: '13', mes: 'JUNIO', horario: '20:00 — 02:00',
    precio: 'ENTRADA LIBRE',
    programa: [
      { hora: '20:00 — 21:30', acto: 'DJ JONY' },
      { hora: '21:30 — 23:30', acto: 'DRAG SHOW — Dayana + Gabriela' },
      { hora: '23:30 — 02:00', acto: 'DJ LEMUS' },
    ],
    imagen: '/eventos/apertura-general.jpg', color: '#C8922A', destacado: true,
  },
  {
    id: 'e2', slug: 'apertura-vip', categoria: 'artistas', badgeLabel: 'APERTURA VIP',
    titulo: 'DJ DOA\nNOCHE EXCLUSIVA VIP',
    subtitulo: 'Presentación Dayana + SOKKO · Brindis',
    fecha: 'VIERNES', dia: '12', mes: 'JUNIO', horario: '20:00 — 00:00',
    precio: 'EVENTO PRIVADO',
    programa: [
      { hora: '20:00 — 21:00', acto: 'Recepción y catering' },
      { hora: '21:00 — 21:30', acto: 'Presentación Dayana + SOKKO' },
      { hora: '21:30 — 22:00', acto: 'Brindis' },
      { hora: '22:00 — 00:00', acto: 'DJ DOA' },
    ],
    imagen: '/eventos/apertura-vip.jpg', color: '#4080E0', destacado: false,
  },
  {
    id: 'e3', slug: 'domingo-familiar', categoria: 'shows', badgeLabel: 'DOMINGO FAMILIAR',
    titulo: 'MAGO SENA\nFAMILIA Y JUEGOS',
    subtitulo: 'Torneos PS5, Billar y Actividades Familiares',
    fecha: 'DOMINGO', dia: '14', mes: 'JUNIO', horario: '12:00 — 02:00',
    precio: 'ENTRADA LIBRE',
    programa: [
      { hora: '12:00 — 15:00', acto: 'Bebida + Tapa GRATIS' },
      { hora: '15:00 — 18:00', acto: 'Cafetería + Juegos' },
      { hora: '18:00 — 20:00', acto: 'Torneos PS5 y Billar' },
      { hora: '20:00 — 22:00', acto: 'MAGO SENA' },
      { hora: '22:00 — 02:00', acto: 'Música Ambiente' },
    ],
    imagen: '/eventos/domingo-familiar.jpg', color: '#40B060', destacado: false,
  },
  {
    id: 'e4', slug: 'taller-baile-latino', categoria: 'talleres', badgeLabel: 'PRÓXIMAMENTE',
    titulo: 'TALLER DE\nBAILE LATINO',
    subtitulo: 'Salsa, Bachata y Merengue para todos los niveles',
    fecha: 'MIÉRCOLES', dia: '—', mes: 'PRÓX.', horario: '17:00 — 19:00',
    precio: 'CONSULTAR PRECIO',
    programa: [],
    imagen: '/zonas/zona-jaima.jpg', color: '#E8A020', destacado: false,
  },
];

type Evento = typeof EVENTOS[0];

export default function EventosSection() {
  const [filtroActivo, setFiltroActivo] = useState('todos');
  const [eventoModal, setEventoModal] = useState<Evento | null>(null);

  const eventosFiltrados = filtroActivo === 'todos' ? EVENTOS : EVENTOS.filter(e => e.categoria === filtroActivo);
  const eventoDestacado = filtroActivo === 'todos' ? EVENTOS.find(e => e.destacado) : null;
  const eventosSecundarios = filtroActivo === 'todos' ? EVENTOS.filter(e => !e.destacado) : eventosFiltrados;

  return (
    <section id="eventos" style={{ background: '#100804', padding: '8rem 4rem', borderTop: '1px solid rgba(200,146,42,0.15)' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: '11px', color: '#8A6940', letterSpacing: '.5em', textTransform: 'uppercase', margin: '0 0 1rem' }}>PRÓXIMOS EVENTOS</p>
        <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(28px,4vw,52px)', color: '#C8922A', letterSpacing: '.1em', margin: '0 0 2rem' }}>VIVE LA EXPERIENCIA SOKKO</h2>

        {/* Filtros */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '.5rem', flexWrap: 'wrap' as const }}>
          {FILTROS.map(f => (
            <button key={f.id} onClick={() => setFiltroActivo(f.id)} style={{
              fontFamily: 'var(--font-cinzel)', fontSize: '10px', letterSpacing: '.2em',
              color: filtroActivo === f.id ? '#1A0E05' : f.color,
              background: filtroActivo === f.id ? f.color : 'transparent',
              border: `1px solid ${f.color}`, padding: '8px 20px',
              cursor: 'pointer', transition: 'all .2s',
            }}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Evento destacado — solo cuando filtro=todos */}
        {eventoDestacado && (
          <div style={{ marginBottom: '2rem' }}>
            <HolographicCard intensity={5}>
              <div
                onClick={() => window.open(`/eventos/${eventoDestacado.slug}`, '_blank')}
                style={{
                  position: 'relative',
                  cursor: 'pointer',
                  border: '1px solid rgba(212,152,46,0.3)',
                  background: '#100804',
                  overflow: 'hidden',
                  borderRadius: '2px',
                }}
              >
                {/* Flyer completo visible — object-fit: contain */}
                <img
                  src={eventoDestacado.imagen}
                  alt={eventoDestacado.titulo}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '85vh',
                    objectFit: 'contain',
                    objectPosition: 'top',
                    display: 'block',
                  }}
                />

                {/* Overlay sutil solo en la parte inferior */}
                <div style={{
                  position: 'absolute',
                  bottom: 0, left: 0, right: 0,
                  height: '120px',
                  background: 'linear-gradient(to top, rgba(16,8,4,0.95) 0%, transparent 100%)',
                  pointerEvents: 'none',
                }} />

                {/* Indicador click */}
                <div style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  right: '1.5rem',
                  fontFamily: 'var(--font-cinzel)',
                  fontSize: '11px',
                  color: '#D4982E',
                  letterSpacing: '0.2em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(16,8,4,0.85)',
                  padding: '8px 16px',
                  border: '1px solid rgba(212,152,46,0.35)',
                }}>
                  VER EVENTO COMPLETO ↗
                </div>
              </div>
            </HolographicCard>
          </div>
        )}

        {/* Eventos secundarios */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))', gap: '1rem' }}>
          {eventosSecundarios.map(evento => (
            <div key={evento.id} onClick={() => setEventoModal(evento)}
              style={{ position: 'relative', overflow: 'hidden', border: `1px solid ${evento.color}25`, cursor: 'pointer', transition: 'all .25s', background: 'rgba(10,5,2,0.6)', minHeight: '240px' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${evento.color}60`; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${evento.color}25`; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              <img src={evento.imagen} alt={evento.titulo} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: .3 }} />
              <div style={{ position: 'relative', zIndex: 1, padding: '1.75rem' }}>
                <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '9px', color: evento.color, letterSpacing: '.3em' }}>{evento.badgeLabel}</span>
                <h4 style={{ fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(14px,1.5vw,18px)', color: '#F5EDD8', whiteSpace: 'pre-line', margin: '.75rem 0 .5rem', lineHeight: 1.15 }}>{evento.titulo}</h4>
                <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: '14px', color: evento.color, margin: '0 0 .5rem' }}>{evento.fecha} {evento.dia} {evento.mes}</p>
                <p style={{ fontFamily: 'var(--font-raleway)', fontWeight: 300, fontSize: '12px', color: '#8A6940', margin: 0 }}>{evento.horario} · {evento.precio}</p>
                <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: '9px', color: evento.color, letterSpacing: '.2em', margin: '1rem 0 0' }}>VER PROGRAMA →</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {eventoModal && (
        <div onClick={() => setEventoModal(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(10px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#0D0802', border: `1px solid ${eventoModal.color}40`, maxWidth: '580px', width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative', animation: 'fadeIn .25s ease' }}>
            <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }`}</style>
            <div style={{ height: '260px', position: 'relative', overflow: 'hidden' }}>
              <img src={eventoModal.imagen} alt={eventoModal.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0D0802 0%, transparent 60%)' }} />
              <button onClick={() => setEventoModal(null)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.6)', border: `1px solid ${eventoModal.color}60`, color: eventoModal.color, width: '36px', height: '36px', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
              <div style={{ position: 'absolute', bottom: '1rem', left: '1.5rem' }}>
                <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '9px', color: eventoModal.color, letterSpacing: '.3em' }}>{eventoModal.badgeLabel}</span>
              </div>
            </div>
            <div style={{ padding: '2rem' }}>
              <h3 style={{ fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(18px,2.5vw,28px)', color: '#F5EDD8', whiteSpace: 'pre-line', lineHeight: 1.1, margin: '0 0 .75rem' }}>{eventoModal.titulo}</h3>
              <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: '16px', color: eventoModal.color, margin: '0 0 1.5rem' }}>{eventoModal.fecha} {eventoModal.dia} {eventoModal.mes} · {eventoModal.horario}</p>
              {eventoModal.programa.length > 0 && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: '10px', color: '#8A6940', letterSpacing: '.3em', margin: '0 0 1rem' }}>PROGRAMA</p>
                  {eventoModal.programa.map((p, i) => (
                    <div key={i} style={{ display: 'flex', gap: '1.5rem', alignItems: 'baseline', padding: '.6rem 0', borderBottom: '1px solid rgba(200,146,42,0.08)' }}>
                      <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '11px', color: eventoModal.color, whiteSpace: 'nowrap', minWidth: '120px' }}>{p.hora}</span>
                      <span style={{ fontFamily: 'var(--font-raleway)', fontWeight: 300, fontSize: '13px', color: '#C4A882' }}>{p.acto}</span>
                    </div>
                  ))}
                </div>
              )}
              <div style={{ margin: '0 0 1.5rem' }}>
                <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '11px', color: eventoModal.color, border: `1px solid ${eventoModal.color}40`, padding: '6px 16px' }}>{eventoModal.precio}</span>
              </div>
              <a href="#contacto" onClick={() => setEventoModal(null)}
                style={{ display: 'block', textAlign: 'center', fontFamily: 'var(--font-cinzel)', fontSize: '12px', letterSpacing: '.25em', color: '#1A0E05', background: eventoModal.color, padding: '14px', textDecoration: 'none', transition: 'opacity .2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.85'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
              >RESERVAR PLAZA</a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
