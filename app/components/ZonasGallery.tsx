'use client';
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
  return (
    <div style={{ background: '#1A1208', width: '100%', height: '300vh' }}>
      <div style={{
        width: '100%', height: '100vh',
        position: 'sticky', top: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', background: '#1A1208',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.3), transparent)',
        }} />

        <div style={{
          textAlign: 'center', position: 'absolute',
          top: '2.5rem', zIndex: 10, padding: '0 2rem',
        }}>
          <p style={{
            fontSize: '.6rem', letterSpacing: '.6em',
            color: '#8A7560', textTransform: 'uppercase', margin: 0,
          }}>
            02 — Espacios
          </p>
          <h2 style={{
            fontFamily: 'var(--font-cinzel)',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            color: '#C9A84C', letterSpacing: '.15em',
            marginTop: '.8rem', marginBottom: 0,
          }}>
            Nuestras Zonas
          </h2>
          <div style={{
            width: '50px', height: '1px',
            background: 'rgba(201,168,76,0.4)',
            margin: '.8rem auto',
          }} />
          <p style={{
            fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
            fontSize: '.9rem', color: '#B8956A', margin: 0,
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
          background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.3), transparent)',
        }} />
      </div>
    </div>
  );
}