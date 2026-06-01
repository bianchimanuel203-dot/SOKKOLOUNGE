'use client';
import { useState, useEffect } from 'react';
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

  useEffect(() => { injectStyles(); }, []);

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
      ? '0 0 24px rgba(200,146,42,0.5), 0 8px 40px rgba(0,0,0,0.8)'
      : '0 4px 24px rgba(0,0,0,0.5)',
    transition: 'box-shadow 0.4s ease',
  };

  return (
    <div
      className={hovered ? 'isla-border-hover' : 'isla-border-idle'}
      style={{ ...borderStyle, position: 'relative', overflow: 'hidden', aspectRatio: '3/4', cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/terraza/${slug}`} style={{ textDecoration: 'none', display: 'block', width: '100%', height: '100%', position: 'relative' }}>
        <img
          src={imagen}
          alt={nombre}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', borderRadius: '12px',
            transition: 'transform .7s ease',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '12px',
          background: hovered
            ? 'linear-gradient(to top, rgba(26,14,5,.98) 0%, rgba(26,14,5,.5) 55%, rgba(26,14,5,.2) 100%)'
            : 'linear-gradient(to top, rgba(26,14,5,.92) 0%, rgba(26,14,5,.4) 50%, rgba(26,14,5,.1) 100%)',
          transition: 'background .4s ease',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '1.75rem 1.5rem',
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
          transition: 'transform .4s ease',
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
          <div style={{
            marginTop: '1rem',
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateY(0)' : 'translateY(8px)',
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
          <div style={{
            width: hovered ? '40px' : '20px', height: '1px',
            background: '#C8922A', marginTop: '1rem',
            transition: 'width .4s ease', opacity: .7,
          }} />
        </div>
      </Link>
    </div>
  );
}
