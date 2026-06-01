'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// ─── Keyframes inyectados una sola vez en <head> ──────────────────────────────
// Usamos @property para animar --gradient-angle como custom property CSS.
// Sin esto el conic-gradient no puede animarse.
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

// ─── Props — misma API que el componente original ─────────────────────────────
interface Props {
  slug: string;
  nombre: string;
  subtitulo: string;
  imagen: string;
}

export default function IslaGridCard({ slug, nombre, subtitulo, imagen }: Props) {
  const [hovered, setHovered] = useState(false);

  // Inyectar keyframes al montar
  useEffect(() => { injectStyles(); }, []);

  // ── Estilo del borde animado ──────────────────────────────────────────────
  // Técnica: background-clip con doble capa:
  //   capa 1 (padding-box) → fondo oscuro del card
  //   capa 2 (border-box)  → conic-gradient dorado giratorio
  // El border transparent hace que se vea la capa 2 como borde.
  const borderStyle: React.CSSProperties = {
    border: '2px solid transparent',
    borderRadius: '14px',
    backgroundImage: `
      linear-gradient(#1A1208, #1A1208),
      conic-gradient(
        from var(--ig-angle, 0deg),
        #2A1E08 0%,
        #C9A84C 25%,
        #F5D98A 50%,
        #C9A84C 75%,
        #2A1E08 100%
      )
    `,
    backgroundClip: 'padding-box, border-box',
    backgroundOrigin: 'padding-box, border-box',
    boxShadow: hovered
      ? '0 0 20px rgba(201,168,76,0.4), 0 8px 40px rgba(0,0,0,0.7)'
      : '0 4px 24px rgba(0,0,0,0.5)',
    transition: 'box-shadow 0.4s ease',
  };

  return (
    <div
      className={hovered ? 'isla-border-hover' : 'isla-border-idle'}
      style={{
        ...borderStyle,
        position: 'relative',
        overflow: 'hidden',
        aspectRatio: '3/4',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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
            objectFit: 'cover',
            borderRadius: '12px',
            transition: 'transform .7s ease',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
          }}
        />

        {/* Overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: '12px',
          background: hovered
            ? 'linear-gradient(to top, rgba(26,18,8,.98) 0%, rgba(26,18,8,.5) 55%, rgba(26,18,8,.2) 100%)'
            : 'linear-gradient(to top, rgba(26,18,8,.92) 0%, rgba(26,18,8,.4) 50%, rgba(26,18,8,.1) 100%)',
          transition: 'background .4s ease',
        }} />

        {/* Contenido inferior */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '1.75rem 1.5rem',
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
          transition: 'transform .4s ease',
        }}>
          <p style={{
            fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
            fontSize: '.82rem', color: '#B8956A',
            margin: '0 0 .45rem',
            letterSpacing: '.04em', lineHeight: '1.4',
          }}>
            {subtitulo}
          </p>
          <p style={{
            fontFamily: 'var(--font-cinzel)', fontSize: '1rem',
            color: '#C9A84C', letterSpacing: '.18em', margin: 0,
          }}>
            {nombre}
          </p>

          {/* Botón hover */}
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
              color: '#C9A84C',
              border: '1px solid rgba(201,168,74,.5)',
              background: 'rgba(201,168,76,.08)',
              padding: '.5rem 1.2rem',
            }}>
              RESERVAR
            </span>
          </div>

          {/* Línea dorada */}
          <div style={{
            width: hovered ? '40px' : '20px', height: '1px',
            background: '#C9A84C', marginTop: '1rem',
            transition: 'width .4s ease', opacity: .7,
          }} />
        </div>
      </Link>
    </div>
  );
}