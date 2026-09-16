'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const PROGRAMACION = [
  { dia: 'LUN', diaCompleto: 'Lunes',     abierto: false, tema: 'CERRADO',          subtema: '',             desc: '',                                                                                                                    color: '#3A2A1A', icono: '—',   horario: '' },
  { dia: 'MAR', diaCompleto: 'Martes',    abierto: false, tema: 'CERRADO',          subtema: '',             desc: '',                                                                                                                    color: '#3A2A1A', icono: '—',   horario: '' },
  { dia: 'MIÉ', diaCompleto: 'Miércoles', abierto: true,  tema: 'LATINEO',          subtema: 'Baile Social', desc: 'Salsa, Bachata, Merengue y mucho más para bailar y disfrutar. La noche perfecta para conectar con la música latina.', color: '#E8A020', icono: '🕺',  horario: '22:00 — 02:00' },
  { dia: 'JUE', diaCompleto: 'Jueves',    abierto: true,  tema: 'JAM SESSION',      subtema: 'Rock y Deriv.', desc: 'Rock, Indie, Pop Rock, Alternativo y más. Música en vivo y buena vibra. Para los que viven la música de verdad.',    color: '#C060C0', icono: '🎸',  horario: '22:00 — 02:00' },
  { dia: 'VIE', diaCompleto: 'Viernes',   abierto: true,  tema: 'URBANO',           subtema: 'Conciertos & DJ', desc: 'Trap, Hip Hop, R&B y más. Conciertos en vivo y los mejores DJs para que la noche del viernes no tenga techo.',   color: '#E05040', icono: '🎤',  horario: '22:00 — 02:00' },
  { dia: 'SÁB', diaCompleto: 'Sábado',    abierto: true,  tema: 'ELECTRÓNICA',      subtema: 'Show + DJ',    desc: 'Shows espectaculares y DJ sets que te harán vibrar toda la noche. La noche más grande de la semana en SOKKO.',          color: '#4080E0', icono: '🎧',  horario: '20:00 — 02:00' },
  { dia: 'DOM', diaCompleto: 'Domingo',   abierto: true,  tema: 'FAMILIAR',         subtema: 'Y Juegos',     desc: 'Actividades, juegos, torneos PS5 y Billar, Mago Sena y un ambiente ideal para disfrutar en familia.',                 color: '#40B060', icono: '👨‍👩‍👧', horario: '12:00 — 02:00' },
];

export default function ProgramacionSection() {
  const [diaActivo, setDiaActivo] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo('.prog-dia-card',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.prog-grid', start: 'top 75%', once: true } }
    );
  }, []);

  const diaSeleccionado = diaActivo !== null ? PROGRAMACION[diaActivo] : null;

  return (
    <section ref={sectionRef} id="programacion" className="programacion-section" style={{ background: '#1A0E05', padding: '8rem 4rem', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @media (max-width: 768px) {
          .programacion-section { padding: 4rem 1rem !important; }
          .prog-grid { grid-template-columns: 1fr !important; }
          .prog-dia-card { min-height: 120px !important; padding: 1.25rem 1rem !important; }
          .prog-panel { grid-template-columns: 1fr !important; text-align: center; padding: 1.5rem 1rem !important; }
        }
      `}</style>

      {/* Fondo sutil */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/zonas/zona-terraza.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.06, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: '11px', color: '#8A6940', letterSpacing: '.5em', margin: '0 0 1.25rem' }}>CADA SEMANA EN SOKKO</p>
          <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(28px,4.5vw,56px)', color: '#C8922A', letterSpacing: '.08em', margin: '0 0 1rem' }}>NUESTRA PROGRAMACIÓN</h2>
          <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 'clamp(15px,1.4vw,20px)', color: '#C4A882', margin: 0 }}>DISFRUTA CADA NOCHE · VIVE CADA MOMENTO</p>
        </div>

        {/* Grid 7 días */}
        <div className="prog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '2px', marginBottom: 0 }}>
          {PROGRAMACION.map((p, i) => (
            <div key={p.dia} className="prog-dia-card"
              onClick={() => p.abierto && setDiaActivo(diaActivo === i ? null : i)}
              style={{
                background: diaActivo === i ? `${p.color}18` : 'rgba(10,5,2,0.7)',
                border: diaActivo === i ? `1px solid ${p.color}60` : '1px solid rgba(200,146,42,0.08)',
                padding: '2rem 1rem', textAlign: 'center',
                cursor: p.abierto ? 'pointer' : 'default',
                transition: 'all .25s', backdropFilter: 'blur(8px)',
                minHeight: '200px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '.5rem',
              }}
              onMouseEnter={e => { if (p.abierto && diaActivo !== i) { (e.currentTarget as HTMLElement).style.background = `${p.color}10`; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; } }}
              onMouseLeave={e => { if (diaActivo !== i) { (e.currentTarget as HTMLElement).style.background = 'rgba(10,5,2,0.7)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; } }}
            >
              <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: '10px', color: p.abierto ? '#8A6940' : '#2A1A0A', letterSpacing: '.2em', margin: 0 }}>{p.dia}</p>
              {p.abierto ? (
                <>
                  <p style={{ fontSize: '28px', margin: '.25rem 0' }}>{p.icono}</p>
                  <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(9px,.9vw,12px)', color: p.color, fontWeight: 600, letterSpacing: '.05em', lineHeight: 1.2, margin: 0 }}>{p.tema}</p>
                  <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: '12px', color: 'rgba(196,168,130,0.7)', lineHeight: 1.3, margin: 0 }}>{p.subtema}</p>
                  <p style={{ fontFamily: 'var(--font-raleway)', fontWeight: 300, fontSize: '10px', color: 'rgba(200,146,42,0.5)', letterSpacing: '.1em', margin: '.25rem 0 0' }}>{p.horario}</p>
                </>
              ) : (
                <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: '14px', color: '#2A1A0A', margin: 0 }}>—</p>
              )}
            </div>
          ))}
        </div>

        {/* Panel expandido */}
        {diaSeleccionado && diaSeleccionado.abierto && (
          <div className="prog-panel" style={{
            border: `1px solid ${diaSeleccionado.color}40`, borderTop: 'none',
            background: `linear-gradient(to right, ${diaSeleccionado.color}08, rgba(10,5,2,0.9))`,
            backdropFilter: 'blur(12px)', padding: '2rem 2.5rem',
            display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: '2rem',
            animation: 'slideDown .3s ease',
          }}>
            <style>{`@keyframes slideDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }`}</style>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '.75rem' }}>
                <span style={{ fontSize: '24px' }}>{diaSeleccionado.icono}</span>
                <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '16px', color: diaSeleccionado.color, letterSpacing: '.15em' }}>{diaSeleccionado.diaCompleto} — {diaSeleccionado.tema}</span>
                <span style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: '14px', color: '#8A6940' }}>{diaSeleccionado.horario}</span>
              </div>
              <p style={{ fontFamily: 'var(--font-raleway)', fontWeight: 300, fontSize: '14px', color: '#C4A882', lineHeight: 1.6, maxWidth: '600px', margin: 0 }}>{diaSeleccionado.desc}</p>
            </div>
            <a href="#contacto"
              style={{ fontFamily: 'var(--font-cinzel)', fontSize: '10px', letterSpacing: '.2em', color: diaSeleccionado.color, border: `1px solid ${diaSeleccionado.color}60`, padding: '12px 24px', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'all .2s', flexShrink: 0 }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = diaSeleccionado.color; (e.currentTarget as HTMLElement).style.color = '#1A0E05'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = diaSeleccionado.color; }}
            >RESERVAR MESA</a>
          </div>
        )}

        <p style={{ textAlign: 'center', marginTop: '3rem', fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: '16px', color: '#8A6940' }}>
          Haz clic en cualquier día para ver más detalles
        </p>
      </div>
    </section>
  );
}
