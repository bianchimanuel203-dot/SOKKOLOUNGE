'use client';
import { useState, useEffect } from 'react';
import { CircularGallery, GalleryItem } from './ui/circular-gallery';

const zonas: GalleryItem[] = [
  {
    common: 'Entrada del Local',
    binomial: '01 · Zona',
    photo: { url: '/zonas/zona-entrada.png', text: 'Entrada SOKKO', by: 'SOKKO' }
  },
  {
    common: 'Billar',
    binomial: '02 · Zona',
    photo: { url: '/zonas/zona-billar.png', text: 'Zona Billar SOKKO', by: 'SOKKO' }
  },
  {
    common: 'Jaima de Juegos',
    binomial: '03 · Zona',
    photo: { url: '/zonas/zona-jaima.png', text: 'Jaima de Juegos SOKKO', by: 'SOKKO' }
  },
  {
    common: 'Chill Familiar',
    binomial: '04 · Zona',
    photo: { url: '/zonas/zona-chill.png', text: 'Chill Familiar SOKKO', by: 'SOKKO' }
  },
  {
    common: 'Comedor y Shows',
    binomial: '05 · Zona',
    photo: { url: '/zonas/zona-comedor.png', text: 'Comedor y Shows SOKKO', by: 'SOKKO' }
  },
  {
    common: 'Terraza',
    binomial: '06 · Zona',
    photo: { url: '/zonas/zona-terraza.png', text: 'Terraza SOKKO', by: 'SOKKO' }
  },
];

export default function ZonasGallery() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const check = () => setMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // ── MÓVIL — grid 2 columnas estático ─────────────────────────────────────
  if (mobile) {
    return (
      <div style={{ background: '#1A0E05', padding: '4rem 1.25rem 3rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <p style={{
            fontSize: '.6rem', letterSpacing: '.6em',
            color: '#8A6940', textTransform: 'uppercase', margin: 0,
          }}>
            02 — Espacios
          </p>
          <h2 style={{
            fontFamily: 'var(--font-cinzel)',
            fontSize: 'clamp(1.6rem, 6vw, 2.2rem)',
            color: '#D4A843', letterSpacing: '.15em',
            marginTop: '.8rem', marginBottom: 0,
          }}>
            Nuestras Zonas
          </h2>
          <div style={{
            width: '50px', height: '1px',
            background: 'rgba(200,146,42,0.4)',
            margin: '.8rem auto',
          }} />
          <p style={{
            fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
            fontSize: '.9rem', color: '#C4A882', margin: 0,
          }}>
            Descubre los seis espacios de SOKKO
          </p>
        </div>

        {/* Grid 2 columnas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
        }}>
          {zonas.map((zona) => (
            <div
              key={zona.binomial}
              style={{
                position: 'relative',
                height: '220px',
                overflow: 'hidden',
                borderRadius: '4px',
              }}
            >
              {/* Foto de fondo */}
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url(${zona.photo.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }} />

              {/* Overlay gradiente oscuro */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(26,18,8,0.92) 0%, rgba(26,18,8,0.4) 55%, rgba(26,18,8,0.15) 100%)',
              }} />

              {/* Número arriba izquierda */}
              <p style={{
                position: 'absolute', top: '0.75rem', left: '0.75rem',
                fontFamily: 'var(--font-cinzel)',
                fontSize: '.5rem', letterSpacing: '.3em',
                color: 'rgba(200,146,42,0.7)',
                textTransform: 'uppercase', margin: 0,
              }}>
                {zona.binomial}
              </p>

              {/* Nombre abajo */}
              <p style={{
                position: 'absolute', bottom: '0.85rem', left: '0.75rem', right: '0.75rem',
                fontFamily: 'var(--font-cinzel)',
                fontSize: '.75rem', letterSpacing: '.12em',
                color: '#D4A843', margin: 0, lineHeight: '1.3',
              }}>
                {zona.common}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── DESKTOP — galería circular con sticky ────────────────────────────────
  return (
    <div style={{ background: '#1A0E05', width: '100%', height: '300vh' }}>
      <div style={{
        width: '100%', height: '100vh',
        position: 'sticky', top: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', background: '#1A0E05',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(200,146,42,0.3), transparent)',
        }} />

        <div style={{
          textAlign: 'center', position: 'absolute',
          top: '2.5rem', zIndex: 10, padding: '0 2rem',
        }}>
          <p style={{
            fontSize: '.6rem', letterSpacing: '.6em',
            color: '#8A6940', textTransform: 'uppercase', margin: 0,
          }}>
            02 — Espacios
          </p>
          <h2 style={{
            fontFamily: 'var(--font-cinzel)',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            color: '#D4A843', letterSpacing: '.15em',
            marginTop: '.8rem', marginBottom: 0,
          }}>
            Nuestras Zonas
          </h2>
          <div style={{
            width: '50px', height: '1px',
            background: 'rgba(200,146,42,0.4)',
            margin: '.8rem auto',
          }} />
          <p style={{
            fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
            fontSize: '.9rem', color: '#C4A882', margin: 0,
          }}>
            Haz scroll para explorar los seis espacios
          </p>
        </div>

        <div style={{ width: '100%', height: '100%' }}>
          <CircularGallery items={zonas} radius={400} autoRotateSpeed={0.02} />
        </div>

        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(200,146,42,0.3), transparent)',
        }} />
      </div>
    </div>
  );
}
