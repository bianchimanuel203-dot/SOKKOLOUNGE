'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SokkoBackgroundPaths } from '../../components/ui/background-paths';

const FRANJAS = [
  { num: 'I',   hora: '12:00 — 15:00', nombre: 'BAR Y TAPAS',   desc: 'Bebida + tapa, ambiente tranquilo de mediodía',                icono: '🥂' },
  { num: 'II',  hora: '15:00 — 20:00', nombre: 'CAFETERÍA',      desc: 'Café, infusiones, juegos, PS5 Pro & Xbox, talleres',           icono: '☕' },
  { num: 'III', hora: '20:00 — 23:00', nombre: 'CENAS Y SHOWS',  desc: 'Carta completa, espectáculos y música en vivo',                icono: '🎭' },
  { num: 'IV',  hora: '23:00 — 02:00', nombre: 'PUB',            desc: 'DJs, artistas en directo, electrónica y más',                  icono: '🎧' },
];

const DIAS_HORARIO = [
  { dia: 'Lunes',     horario: 'Cerrado',        abierto: false },
  { dia: 'Martes',    horario: 'Cerrado',         abierto: false },
  { dia: 'Miércoles', horario: '15:00 — 02:00',  abierto: true  },
  { dia: 'Jueves',    horario: '15:00 — 02:00',  abierto: true  },
  { dia: 'Viernes',   horario: '15:00 — 02:00',  abierto: true  },
  { dia: 'Sábado',    horario: '12:00 — 02:00',  abierto: true  },
  { dia: 'Domingo',   horario: '12:00 — 02:00',  abierto: true  },
];

const SERVICIOS = [
  { icono: '🍸', nombre: 'Cócteles de Autor',  desc: 'Sabores únicos para cada ocasión' },
  { icono: '🍽️', nombre: 'Tapas & Picoteo',    desc: 'Sabrosas opciones para compartir' },
  { icono: '☕', nombre: 'Cafetería',           desc: 'Café especialidad e infusiones' },
  { icono: '🎮', nombre: 'PS5 Pro & Xbox',      desc: 'Últimas consolas disponibles' },
  { icono: '🎱', nombre: 'Billar',              desc: 'Mesas de calidad profesional' },
  { icono: '♟️', nombre: 'Juegos de Mesa',      desc: 'Diversión para tod@s' },
  { icono: '🌐', nombre: 'WiFi Gratis',         desc: 'Conéctate y comparte' },
  { icono: '✨', nombre: 'Ambiente Único',       desc: 'Esencia canaria en cada detalle' },
];

export default function HorariosSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo('.franja-horario',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.franjas-horario-grid', start: 'top 75%', once: true } }
    );
    gsap.fromTo('.dia-horario-row',
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: 'power2.out',
        scrollTrigger: { trigger: '.dias-horario-table', start: 'top 78%', once: true } }
    );
    gsap.fromTo('.servicio-horario',
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out',
        scrollTrigger: { trigger: '.servicios-horario-grid', start: 'top 80%', once: true } }
    );
  }, []);

  return (
    <SokkoBackgroundPaths>
      <section ref={sectionRef} id="horarios" style={{
        position: 'relative',
        backgroundImage: 'url(/hero/hero-madera.jpg)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        padding: '8rem 4rem',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,5,2,0.9)', zIndex: 0 }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: '11px', color: '#8A6940', letterSpacing: '.5em', margin: '0 0 1.25rem' }}>CUÁNDO VISITARNOS</p>
            <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(28px,4.5vw,56px)', color: '#C8922A', letterSpacing: '.08em', margin: '0 0 1rem' }}>NUESTROS HORARIOS</h2>
            <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 'clamp(15px,1.4vw,19px)', color: '#C4A882', margin: 0 }}>
              El ritmo de SOKKO. Cada momento del día tiene su propio carácter.
            </p>
          </div>

          {/* 4 franjas */}
          <div className="franjas-horario-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'rgba(200,146,42,0.12)', marginBottom: '4rem' }}>
            {FRANJAS.map((f, i) => (
              <div key={f.num} className="franja-horario"
                style={{ background: i === 2 ? 'rgba(200,146,42,0.08)' : 'rgba(10,5,2,0.9)', padding: '2.5rem 1.5rem', textAlign: 'center', backdropFilter: 'blur(8px)', transition: 'background .3s, transform .2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(200,146,42,0.12)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = i === 2 ? 'rgba(200,146,42,0.08)' : 'rgba(10,5,2,0.9)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
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

          {/* Tabla días + texto lateral */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '4rem' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '13px', color: '#C8922A', letterSpacing: '.3em', margin: '0 0 1.5rem' }}>DÍAS Y HORARIOS</h3>
              <div className="dias-horario-table" style={{ border: '1px solid rgba(200,146,42,0.12)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', padding: '.75rem 1.5rem', borderBottom: '1px solid rgba(200,146,42,0.15)', background: 'rgba(200,146,42,0.05)' }}>
                  <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '9px', color: '#8A6940', letterSpacing: '.3em' }}>DÍA</span>
                  <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '9px', color: '#8A6940', letterSpacing: '.3em' }}>HORARIO</span>
                </div>
                {DIAS_HORARIO.map(({ dia, horario, abierto }) => (
                  <div key={dia} className="dia-horario-row"
                    style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', padding: '.9rem 1.5rem', borderBottom: '1px solid rgba(200,146,42,0.07)', transition: 'background .2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(200,146,42,0.04)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                  >
                    <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '12px', color: abierto ? '#C4A882' : '#3A2A1A', letterSpacing: '.08em' }}>{dia}</span>
                    <span style={{ fontFamily: 'var(--font-raleway)', fontWeight: 300, fontSize: '12px', color: abierto ? '#D4A843' : '#3A2A1A', fontStyle: abierto ? 'normal' : 'italic' }}>{horario}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: '11px', color: '#8A6940', letterSpacing: '.4em', margin: '0 0 1rem' }}>EL RESGUARDO DEL VIENTO</p>
              <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: 'clamp(18px,2vw,26px)', color: '#C4A882', lineHeight: 1.65, margin: '0 0 1.5rem' }}>
                SOKKO es mucho más que un horario. Es un espacio que evoluciona a lo largo del día, adaptándose a cada momento y a cada público.
              </p>
              <a href="#contacto"
                style={{ display: 'inline-block', width: 'fit-content', fontFamily: 'var(--font-cinzel)', fontSize: '11px', letterSpacing: '.2em', color: '#C8922A', border: '1px solid rgba(200,146,42,0.4)', padding: '12px 28px', textDecoration: 'none', transition: 'all .2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#C8922A'; (e.currentTarget as HTMLElement).style.color = '#1A0E05'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#C8922A'; }}
              >RESERVAR MESA</a>
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '13px', color: '#C8922A', letterSpacing: '.3em', textAlign: 'center', margin: '0 0 2rem' }}>SERVICIOS PARA DISFRUTAR</h3>
            <div className="servicios-horario-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: 'rgba(200,146,42,0.08)' }}>
              {SERVICIOS.map(s => (
                <div key={s.nombre} className="servicio-horario"
                  style={{ background: 'rgba(10,5,2,0.85)', padding: '1.5rem 1.25rem', textAlign: 'center', transition: 'background .2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(200,146,42,0.06)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(10,5,2,0.85)'}
                >
                  <p style={{ fontSize: '22px', margin: '0 0 .5rem' }}>{s.icono}</p>
                  <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: '10px', color: '#C8922A', letterSpacing: '.12em', margin: '0 0 4px' }}>{s.nombre}</p>
                  <p style={{ fontFamily: 'var(--font-raleway)', fontWeight: 300, fontSize: '11px', color: '#8A6940', lineHeight: 1.5, margin: 0 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </SokkoBackgroundPaths>
  );
}
