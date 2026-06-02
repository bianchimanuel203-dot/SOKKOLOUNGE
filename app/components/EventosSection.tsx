'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Placeholder hasta que WP tenga datos reales ─────────────────── */
const EVENTOS_PLACEHOLDER = [
  {
    id: 1,
    categoria: 'EVENTO',
    titulo: 'VIVE UNA NOCHE MÁGICA DE JAZZ EN VIVO',
    subtitulo: 'Con el cuarteto de Carlos Mendoza',
    fecha: 'Próximamente',
    hora: '21:00h',
    precio: 'Entrada libre',
    imagen: '/zonas/zona-comedor.jpg',
  },
  {
    id: 2,
    categoria: 'EXPERIENCIA',
    titulo: 'CENA VOLCÁNICA · MENÚ DEGUSTACIÓN',
    subtitulo: 'Sabores de Canarias en siete tiempos',
    fecha: 'Próximamente',
    hora: '20:30h',
    precio: 'Reserva requerida',
    imagen: '/zonas/zona-terraza.jpg',
  },
  {
    id: 3,
    categoria: 'MÚSICA',
    titulo: 'DJ SESSION BAJO LAS ESTRELLAS',
    subtitulo: 'Noches de electrónica en La Terraza',
    fecha: 'Próximamente',
    hora: '22:00h',
    precio: 'Entrada libre',
    imagen: '/zonas/zona-jaima.jpg',
  },
];

/* ── Separador ornamental ───────────────────────────────────────── */
function OrnamentalDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', margin: '1.5rem 0' }}>
      <div style={{ width: '60px', height: '1px', background: 'linear-gradient(to right, transparent, #C8922A)' }} />
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 1L9.5 6.5L16 8L9.5 9.5L8 15L6.5 9.5L0 8L6.5 6.5Z" stroke="#C8922A" strokeWidth="1" fill="none" />
      </svg>
      <div style={{ width: '60px', height: '1px', background: 'linear-gradient(to left, transparent, #C8922A)' }} />
    </div>
  );
}

/* ── Banner individual ──────────────────────────────────────────── */
function EventoBanner({ evento, index }: { evento: typeof EVENTOS_PLACEHOLDER[0]; index: number }) {
  const isEven = index % 2 === 0;
  const [hover, setHover] = useState(false);

  return (
    <div
      className="evento-card"
      style={{
        display: 'grid',
        gridTemplateColumns: isEven ? '1fr clamp(260px,35%,420px)' : 'clamp(260px,35%,420px) 1fr',
        minHeight: '260px',
        background: 'rgba(255,255,255,0.015)',
        border: `1px solid ${hover ? 'rgba(200,146,42,0.45)' : 'rgba(200,146,42,0.12)'}`,
        overflow: 'hidden',
        transition: 'border-color .3s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* ── Columna texto ── */}
      <div style={{
        order: isEven ? 1 : 2,
        padding: 'clamp(2rem,4vw,3rem)',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', gap: '.7rem',
        background: '#1A0E05',
      }}>
        <span style={{
          fontFamily: 'var(--font-cinzel)', fontSize: '10px',
          color: '#8A6940', letterSpacing: '.45em', textTransform: 'uppercase' as const,
        }}>
          {evento.categoria}
        </span>

        <h3 style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: 'clamp(18px, 2vw, 30px)',
          color: '#F5EDD8',
          lineHeight: 1.15, letterSpacing: '.02em', margin: 0,
        }}>
          {evento.titulo}
        </h3>

        <p style={{
          fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
          fontSize: 'clamp(14px, 1.3vw, 18px)',
          color: '#C4A882', margin: 0, lineHeight: 1.4,
        }}>
          {evento.subtitulo}
        </p>

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' as const }}>
          <span style={{ fontFamily: 'var(--font-raleway)', fontSize: '12px', color: '#8A6940', letterSpacing: '.12em' }}>
            {evento.fecha}
          </span>
          <span style={{ fontFamily: 'var(--font-raleway)', fontSize: '12px', color: '#8A6940', letterSpacing: '.12em' }}>
            {evento.hora}
          </span>
          <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: '11px', color: '#C8922A', letterSpacing: '.1em' }}>
            {evento.precio}
          </span>
        </div>

        <div style={{ marginTop: '.5rem' }}>
          <a
            href="#contacto"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-raleway)', fontWeight: 400,
              fontSize: '10px', letterSpacing: '.3em',
              textTransform: 'uppercase' as const,
              color: '#C8922A',
              border: '1px solid rgba(200,146,42,0.5)',
              padding: '10px 22px',
              textDecoration: 'none',
              transition: 'background .2s ease, color .2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = '#C8922A';
              (e.currentTarget as HTMLElement).style.color = '#1A0E05';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.color = '#C8922A';
            }}
          >
            RESERVAR PLAZA
          </a>
        </div>
      </div>

      {/* ── Columna imagen ── */}
      <div style={{
        order: isEven ? 2 : 1,
        position: 'relative', overflow: 'hidden', minHeight: '240px',
      }}>
        <img
          src={evento.imagen}
          alt={evento.titulo}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            transform: hover ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform .65s cubic-bezier(.19,1,.22,1)',
            display: 'block',
          }}
        />
        {/* Overlay de fusión con el panel de texto */}
        <div style={{
          position: 'absolute', inset: 0,
          background: isEven
            ? 'linear-gradient(to right, #1A0E05 0%, transparent 30%)'
            : 'linear-gradient(to left, #1A0E05 0%, transparent 30%)',
          pointerEvents: 'none',
        }} />
      </div>
    </div>
  );
}

/* ── Componente principal ────────────────────────────────────────── */
export default function EventosSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo('.evento-card',
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.9, stagger: 0.18,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%', once: true,
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="eventos"
      style={{
        background: '#1A0E05',
        padding: 'clamp(5rem,8vw,8rem) clamp(1.5rem,4vw,4rem)',
        borderTop: '1px solid rgba(200,146,42,0.15)',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem,5vw,5rem)' }}>
        <p style={{
          fontFamily: 'var(--font-cinzel)', fontSize: '11px',
          color: '#8A6940', letterSpacing: '.5em',
          textTransform: 'uppercase', margin: '0 0 1rem',
        }}>
          PRÓXIMOS EVENTOS
        </p>
        <h2 style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          color: '#C8922A', letterSpacing: '.1em', margin: '0 0 .5rem',
        }}>
          VIVE LA EXPERIENCIA SOKKO
        </h2>
        <OrnamentalDivider />
      </div>

      {/* Banners */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: '2px',
        maxWidth: '1100px', margin: '0 auto',
      }}>
        {EVENTOS_PLACEHOLDER.map((evento, i) => (
          <EventoBanner key={evento.id} evento={evento} index={i} />
        ))}
      </div>
    </section>
  );
}
