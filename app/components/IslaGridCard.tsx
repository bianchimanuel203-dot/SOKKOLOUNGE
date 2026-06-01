'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const KEYFRAME_CSS = `
  @property --ig-angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }
  @keyframes isla-border-spin {
    from { --ig-angle: 0deg; }
    to   { --ig-angle: 360deg; }
  }
  .isla-border-idle {
    animation: isla-border-spin 5s linear infinite;
  }
  .isla-border-hover {
    animation: isla-border-spin 1.4s linear infinite;
  }
`;

let injected = false;
function injectStyles() {
  if (injected || typeof document === 'undefined') return;
  const el = document.createElement('style');
  el.textContent = KEYFRAME_CSS;
  document.head.appendChild(el);
  injected = true;
}

interface Props {
  slug: string;
  nombre: string;
  subtitulo: string;
  imagen: string;
}

export default function IslaGridCard({ slug, nombre, subtitulo, imagen }: Props) {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt]       = useState({ x: 0, y: 0 });
  const cardRef               = useRef<HTMLDivElement>(null);

  useEffect(() => { injectStyles(); }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = (e.clientX - rect.left) / rect.width  - 0.5;  // -0.5 → +0.5
    const cy = (e.clientY - rect.top)  / rect.height - 0.5;
    setTilt({ x: cy * -12, y: cx * 12 });          // max 12° tilt
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const borderStyle: React.CSSProperties = {
    border: '2px solid transparent',
    borderRadius: '14px',
    backgroundImage: `
      linear-gradient(#1A0E05, #1A0E05),
      conic-gradient(
        from var(--ig-angle, 0deg),
        #2A1A06 0%,
        #C8922A 25%,
        #E8C068 50%,
        #C8922A 75%,
        #2A1A06 100%
      )
    `,
    backgroundClip: 'padding-box, border-box',
    backgroundOrigin: 'padding-box, border-box',
    boxShadow: hovered
      ? '0 0 28px rgba(200,146,42,0.5), 0 12px 50px rgba(0,0,0,0.85)'
      : '0 4px 24px rgba(0,0,0,0.5)',
    transition: 'box-shadow 0.4s ease',
  };

  return (
    <div
      ref={cardRef}
      className={hovered ? 'isla-border-hover' : 'isla-border-idle'}
      data-cursor="reservar"
      style={{
        ...borderStyle,
        position: 'relative',
        overflow: 'hidden',
        aspectRatio: '3/4',
        cursor: 'pointer',
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${hovered ? 1.02 : 1})`,
        transition: hovered
          ? 'transform 0.15s ease, box-shadow 0.4s ease'
          : 'transform 0.5s cubic-bezier(.19,1,.22,1), box-shadow 0.4s ease',
        willChange: 'transform',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={`/terraza/${slug}`}
        style={{ textDecoration: 'none', display: 'block', width: '100%', height: '100%', position: 'relative' }}
      >
        {/* Foto */}
        <img
          src={imagen}
          alt={nombre}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', borderRadius: '12px',
            transition: 'transform .65s cubic-bezier(.19,1,.22,1)',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
          }}
        />

        {/* Overlay */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '12px',
          background: hovered
            ? 'linear-gradient(to top, rgba(26,14,5,.97) 0%, rgba(26,14,5,.55) 55%, rgba(26,14,5,.15) 100%)'
            : 'linear-gradient(to top, rgba(26,14,5,.92) 0%, rgba(26,14,5,.4) 50%, rgba(26,14,5,.1) 100%)',
          transition: 'background .4s ease',
        }} />

        {/* Contenido inferior */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '1.75rem 1.5rem',
          transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
          transition: 'transform .4s cubic-bezier(.19,1,.22,1)',
        }}>
          <p style={{
            fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
            fontSize: '.82rem', color: '#C4A882',
            margin: '0 0 .45rem', letterSpacing: '.04em', lineHeight: '1.4',
          }}>
            {subtitulo}
          </p>
          <p style={{
            fontFamily: 'var(--font-cinzel)', fontSize: '1rem',
            color: '#D4A843', letterSpacing: '.18em', margin: 0,
          }}>
            {nombre}
          </p>

          {/* Botón RESERVAR — aparece al hover */}
          <div style={{
            marginTop: '1rem',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity .35s ease, transform .35s ease',
          }}>
            <span style={{
              display: 'inline-block',
              fontFamily: 'var(--font-raleway)', fontSize: '.55rem',
              letterSpacing: '.28em', textTransform: 'uppercase',
              color: '#C8922A',
              border: '1px solid rgba(200,146,42,0.5)',
              background: 'rgba(200,146,42,0.08)',
              padding: '.5rem 1.2rem',
            }}>
              RESERVAR
            </span>
          </div>

          {/* Línea dorada */}
          <div style={{
            width: hovered ? '40px' : '20px', height: '1px',
            background: '#C8922A', marginTop: '1rem',
            transition: 'width .4s ease', opacity: .7,
          }} />
        </div>

        {/* Brillo de reflex en tilt */}
        {hovered && (
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '12px',
            background: `radial-gradient(circle at ${50 + tilt.y * 3}% ${50 + tilt.x * -3}%, rgba(200,146,42,0.06) 0%, transparent 60%)`,
            pointerEvents: 'none',
            transition: 'opacity .3s ease',
          }} />
        )}
      </Link>
    </div>
  );
}
