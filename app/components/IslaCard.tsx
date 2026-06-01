"use client";
import Link from 'next/link';

interface IslaCardProps {
  nombre: string;
  desc: string;
  imagen: string;
}

export default function IslaCard({ nombre, desc, imagen }: IslaCardProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: '280px',
        height: '420px',
        overflow: 'hidden',
        borderRadius: '4px',
        border: '1px solid rgba(201,168,76,.15)',
        cursor: 'none',
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        const img = e.currentTarget.querySelector('.isla-img') as HTMLElement;
        if (img) img.style.transform = 'scale(1.08)';
        e.currentTarget.style.borderColor = 'rgba(201,168,76,.4)';
      }}
      onMouseLeave={e => {
        const img = e.currentTarget.querySelector('.isla-img') as HTMLElement;
        if (img) img.style.transform = 'scale(1)';
        e.currentTarget.style.borderColor = 'rgba(201,168,76,.15)';
      }}
    >
      {/* Imagen de fondo */}
      <img
        className="isla-img"
        src={imagen}
        alt={nombre}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          transition: 'transform .6s cubic-bezier(.19,1,.22,1)'
        }}
      />

      {/* Overlay oscuro */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(10,8,4,.95) 0%, rgba(10,8,4,.4) 50%, rgba(10,8,4,.2) 100%)'
      }} />

      {/* Contenido */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end', padding: '2rem 1.5rem'
      }}>
        <div style={{ width: '30px', height: '1px', background: 'rgba(201,168,76,.5)', marginBottom: '1rem' }} />

        <p style={{
          fontFamily: 'var(--font-cinzel)', fontSize: '1rem',
          letterSpacing: '.15em', color: '#C9A84C', marginBottom: '.4rem'
        }}>
          {nombre}
        </p>

        <p style={{
          fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
          fontSize: '.85rem', color: '#B8A980', marginBottom: '1.5rem', lineHeight: '1.5'
        }}>
          {desc}
        </p>

        <Link
          href={`/terraza/${nombre.toLowerCase().replace(/ /g, '-')}`}
          style={{
            fontSize: '.55rem', letterSpacing: '.35em',
            textTransform: 'uppercase', color: '#8A6E2F',
            background: 'transparent',
            border: '1px solid rgba(201,168,76,.3)',
            padding: '.6rem 1.2rem',
            textDecoration: 'none', display: 'inline-block',
            transition: 'all .3s', fontFamily: 'var(--font-raleway)',
            alignSelf: 'flex-start'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = '#C9A84C';
            e.currentTarget.style.borderColor = 'rgba(201,168,76,.6)';
            e.currentTarget.style.background = 'rgba(201,168,76,.08)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = '#8A6E2F';
            e.currentTarget.style.borderColor = 'rgba(201,168,76,.3)';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          Reservar esta isla
        </Link>
      </div>
    </div>
  );
}