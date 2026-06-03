'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SokkoBackgroundPaths } from '../../components/ui/background-paths';

/* ── 4 franjas horarias reales ───────────────────────────────────── */
const FRANJAS = [
  { num: 'I',   hora: '12:00 — 15:00', nombre: 'BAR Y TAPAS',     desc: 'Bebida + tapa gratis, ambiente tranquilo de mediodía',                 icono: '🥂', color: 'rgba(200,146,42,0.04)' },
  { num: 'II',  hora: '15:00 — 20:00', nombre: 'CAFETERÍA',        desc: 'Café de especialidad, juegos, consolas PS5 & Xbox, talleres',           icono: '☕', color: 'rgba(200,146,42,0.07)' },
  { num: 'III', hora: '20:00 — 23:00', nombre: 'CENAS Y SHOWS',    desc: 'Carta completa, espectáculos temáticos, música en vivo',               icono: '🎭', color: 'rgba(200,146,42,0.10)' },
  { num: 'IV',  hora: '23:00 — 02:00', nombre: 'PUB',              desc: 'Artistas, DJs, electrónica, urbano, jam sessions',                      icono: '🎧', color: 'rgba(200,146,42,0.04)' },
];

/* ── Programación semanal real ───────────────────────────────────── */
const PROGRAMACION = [
  { dia: 'Lunes',     abierto: false, tema: 'CERRADO',          subtema: '',                                    color: null },
  { dia: 'Martes',    abierto: false, tema: 'CERRADO',          subtema: '',                                    color: null },
  { dia: 'Miércoles', abierto: true,  tema: 'LATINEO',          subtema: 'Baile Social · Salsa, Bachata, Merengue', color: '#E8A020' },
  { dia: 'Jueves',    abierto: true,  tema: 'JAM SESSION',      subtema: 'Rock y derivados · Música en vivo',    color: '#C060C0' },
  { dia: 'Viernes',   abierto: true,  tema: 'URBANO',           subtema: 'Trap, Hip Hop, R&B · Conciertos & DJ', color: '#E05040' },
  { dia: 'Sábado',    abierto: true,  tema: 'ELECTRÓNICA',      subtema: 'Shows espectaculares · Show + DJ',     color: '#4080E0' },
  { dia: 'Domingo',   abierto: true,  tema: 'FAMILIAR Y JUEGOS',subtema: 'PS5, Billar, Torneos · Ambiente Chill', color: '#40B060' },
];

/* ── Servicios ───────────────────────────────────────────────────── */
const SERVICIOS = [
  { icono: '🍸', nombre: 'Cócteles de Autor',  desc: 'Sabores únicos para cada ocasión' },
  { icono: '🍽️', nombre: 'Tapas & Picoteo',   desc: 'Sabrosas opciones para compartir' },
  { icono: '☕', nombre: 'Cafetería',           desc: 'Café especialidad, infusiones y más' },
  { icono: '🎮', nombre: 'PS5 Pro & Xbox',      desc: 'Últimas consolas disponibles' },
  { icono: '🎱', nombre: 'Billar',              desc: 'Mesas de calidad profesional' },
  { icono: '♟️', nombre: 'Juegos de Mesa',     desc: 'Diversión asegurada para tod@s' },
  { icono: '🌐', nombre: 'WiFi Gratis',         desc: 'Conéctate y comparte el momento' },
  { icono: '✨', nombre: 'Ambiente Único',      desc: 'Esencia canaria en cada detalle' },
];

export default function HorariosSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [diaActivo, setDiaActivo] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo('.franja-card',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.franjas-grid', start: 'top 75%', once: true } }
    );
    gsap.fromTo('.dia-row',
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.45, stagger: 0.07, ease: 'power2.out',
        scrollTrigger: { trigger: '.dias-grid', start: 'top 78%', once: true } }
    );
    gsap.fromTo('.servicio-item',
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out',
        scrollTrigger: { trigger: '.servicios-grid', start: 'top 80%', once: true } }
    );
  }, []);

  return (
    <SokkoBackgroundPaths>
      <section
        ref={sectionRef}
        id="horarios"
        style={{
          position: 'relative',
          backgroundImage: 'url(/hero/hero-madera.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '8rem 4rem',
        }}
      >
        {/* Overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,5,2,0.9)', zIndex: 0 }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: '11px', color: '#8A6940', letterSpacing: '.5em', margin: '0 0 1.25rem' }}>
              CUÁNDO VISITARNOS
            </p>
            <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(28px,4.5vw,56px)', color: '#C8922A', letterSpacing: '.08em', margin: '0 0 1rem' }}>
              NUESTROS HORARIOS
            </h2>
            <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 'clamp(16px,1.5vw,20px)', color: '#C4A882', margin: 0 }}>
              DISFRUTA CADA NOCHE · VIVE CADA MOMENTO
            </p>
          </div>

          {/* 4 franjas */}
          <div className="franjas-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'rgba(200,146,42,0.12)', marginBottom: '5rem' }}>
            {FRANJAS.map((f) => (
              <div key={f.num} className="franja-card"
                style={{ background: f.color, padding: '2.5rem 1.5rem', textAlign: 'center', backdropFilter: 'blur(8px)', transition: 'background .3s, transform .2s', cursor: 'default' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(200,146,42,0.14)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = f.color; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
              >
                <p style={{ fontSize: '28px', margin: '0 0 .75rem' }}>{f.icono}</p>
                <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: '10px', color: '#8A6940', letterSpacing: '.35em', margin: '0 0 .75rem' }}>{f.num}</p>
                <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(13px,1.4vw,18px)', color: '#C8922A', lineHeight: 1.2, margin: '0 0 .5rem' }}>{f.hora}</p>
                <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: '10px', color: '#D4A843', letterSpacing: '.25em', margin: '0 0 1rem' }}>{f.nombre}</p>
                <div style={{ width: '24px', height: '1px', background: '#C8922A', margin: '0 auto 1rem', opacity: .5 }} />
                <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: '14px', color: '#C4A882', lineHeight: 1.5, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Programación semanal */}
          <div style={{ marginBottom: '5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(16px,2vw,24px)', color: '#C8922A', letterSpacing: '.2em', textAlign: 'center', margin: '0 0 2.5rem' }}>
              PROGRAMACIÓN SEMANAL
            </h3>
            <div className="dias-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '1px', background: 'rgba(200,146,42,0.1)' }}>
              {PROGRAMACION.map((p, i) => (
                <div key={p.dia} className="dia-row"
                  onClick={() => p.abierto && setDiaActivo(diaActivo === i ? null : i)}
                  style={{ background: diaActivo === i ? 'rgba(200,146,42,0.12)' : 'rgba(10,5,2,0.85)', padding: '1.5rem 1rem', textAlign: 'center', cursor: p.abierto ? 'pointer' : 'default', transition: 'background .2s', backdropFilter: 'blur(8px)' }}
                  onMouseEnter={e => { if (p.abierto) (e.currentTarget as HTMLElement).style.background = 'rgba(200,146,42,0.08)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = diaActivo === i ? 'rgba(200,146,42,0.12)' : 'rgba(10,5,2,0.85)'; }}
                >
                  <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: '9px', letterSpacing: '.2em', color: p.abierto ? '#8A6940' : '#3A2A1A', margin: '0 0 .75rem' }}>
                    {p.dia.toUpperCase()}
                  </p>
                  {p.abierto ? (
                    <>
                      <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(9px,1vw,12px)', color: p.color || '#C8922A', fontWeight: 600, letterSpacing: '.05em', lineHeight: 1.2, margin: '0 0 .5rem' }}>{p.tema}</p>
                      <p style={{ fontFamily: 'var(--font-raleway)', fontSize: '10px', color: '#8A6940', lineHeight: 1.4, margin: 0 }}>{p.subtema.split('·')[0]}</p>
                    </>
                  ) : (
                    <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: '12px', color: '#3A2A1A', margin: 0 }}>—</p>
                  )}
                </div>
              ))}
            </div>

            {/* Detalle día activo */}
            {diaActivo !== null && PROGRAMACION[diaActivo].abierto && (
              <div style={{ marginTop: '1px', background: 'rgba(200,146,42,0.06)', border: '1px solid rgba(200,146,42,0.2)', borderTop: 'none', padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <div style={{ width: '4px', height: '40px', background: PROGRAMACION[diaActivo].color || '#C8922A', flexShrink: 0 }} />
                <div>
                  <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: '14px', color: PROGRAMACION[diaActivo].color || '#C8922A', letterSpacing: '.15em', margin: '0 0 4px' }}>{PROGRAMACION[diaActivo].tema}</p>
                  <p style={{ fontFamily: 'var(--font-raleway)', fontSize: '13px', color: '#C4A882', margin: 0 }}>{PROGRAMACION[diaActivo].subtema}</p>
                </div>
                <a href="#contacto" style={{ marginLeft: 'auto', fontFamily: 'var(--font-cinzel)', fontSize: '10px', letterSpacing: '.2em', color: '#C8922A', border: '1px solid rgba(200,146,42,0.4)', padding: '8px 20px', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'all .2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#C8922A'; (e.currentTarget as HTMLElement).style.color = '#1A0E05'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#C8922A'; }}>
                  RESERVAR MESA
                </a>
              </div>
            )}
          </div>

          {/* Servicios */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(14px,1.8vw,20px)', color: '#C8922A', letterSpacing: '.2em', textAlign: 'center', margin: '0 0 2.5rem' }}>
              SERVICIOS PARA DISFRUTAR
            </h3>
            <div className="servicios-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'rgba(200,146,42,0.08)' }}>
              {SERVICIOS.map(s => (
                <div key={s.nombre} className="servicio-item"
                  style={{ background: 'rgba(10,5,2,0.85)', padding: '1.75rem 1.25rem', textAlign: 'center', transition: 'background .2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(200,146,42,0.06)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(10,5,2,0.85)'}
                >
                  <p style={{ fontSize: '24px', margin: '0 0 .6rem' }}>{s.icono}</p>
                  <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: '10px', color: '#C8922A', letterSpacing: '.12em', margin: '0 0 4px' }}>{s.nombre}</p>
                  <p style={{ fontFamily: 'var(--font-raleway)', fontSize: '12px', color: '#8A6940', lineHeight: 1.5, margin: 0 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </SokkoBackgroundPaths>
  );
}
