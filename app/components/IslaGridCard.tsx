'use client';
import { useState } from 'react';
import Link from 'next/link';

interface Props {
  slug: string;
  nombre: string;
  subtitulo: string;
  imagen: string;
}

export default function IslaGridCard({ slug, nombre, subtitulo, imagen }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/terraza/${slug}`}
      style={{ textDecoration: 'none', display: 'block', position: 'relative', overflow: 'hidden', aspectRatio: '3/4' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Photo */}
      <img
        src={imagen}
        alt={nombre}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          transition: 'transform .7s ease',
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
        }}
      />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: hovered
          ? 'linear-gradient(to top, rgba(26,18,8,.98) 0%, rgba(26,18,8,.5) 55%, rgba(26,18,8,.2) 100%)'
          : 'linear-gradient(to top, rgba(26,18,8,.92) 0%, rgba(26,18,8,.4) 50%, rgba(26,18,8,.1) 100%)',
        transition: 'background .4s ease',
      }} />

      {/* Bottom content */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '1.75rem 1.5rem',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'transform .4s ease',
      }}>
        <p style={{
          fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
          fontSize: '.82rem', color: '#B8956A',
          marginBottom: '.45rem', letterSpacing: '.04em', lineHeight: '1.4',
          margin: '0 0 .45rem',
        }}>
          {subtitulo}
        </p>
        <p style={{
          fontFamily: 'var(--font-cinzel)', fontSize: '1rem',
          color: '#C9A84C', letterSpacing: '.18em', margin: 0,
        }}>
          {nombre}
        </p>

        {/* Hover: button */}
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
            border: '1px solid rgba(201,168,76,.5)',
            background: 'rgba(201,168,76,.08)',
            padding: '.5rem 1.2rem',
          }}>
            RESERVAR
          </span>
        </div>

        <div style={{
          width: hovered ? '40px' : '20px', height: '1px',
          background: '#C9A84C', marginTop: '1rem',
          transition: 'width .4s ease', opacity: .7,
        }} />
      </div>
    </Link>
  );
}
