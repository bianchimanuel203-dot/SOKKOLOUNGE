'use client';
import { useState, useEffect } from 'react';
import IslaGridCard from './IslaGridCard';

const ISLAS = [
  { slug: 'lanzarote',     nombre: 'Lanzarote',     subtitulo: 'Volcánica y única.',       imagen: '/islas/lanzarote.jpg' },
  { slug: 'fuerteventura', nombre: 'Fuerteventura',  subtitulo: 'Salvaje y libre.',         imagen: '/islas/Fuerteventura.jpg' },
  { slug: 'gran-canaria',  nombre: 'Gran Canaria',   subtitulo: 'Vibrante y cosmopolita.',  imagen: '/islas/Gran canaria.jpg' },
  { slug: 'tenerife',      nombre: 'Tenerife',       subtitulo: 'Intensa y majestuosa.',    imagen: '/islas/Tenerife.jpg' },
  { slug: 'la-palma',      nombre: 'La Palma',       subtitulo: 'Verde y soñadora.',        imagen: '/islas/la palma.jpg' },
  { slug: 'la-gomera',     nombre: 'La Gomera',      subtitulo: 'Auténtica y esencial.',    imagen: '/islas/La gomera.jpg' },
  { slug: 'el-hierro',     nombre: 'El Hierro',      subtitulo: 'Salvaje y espiritual.',    imagen: '/islas/el hierro.jpg' },
  { slug: 'la-graciosa',   nombre: 'La Graciosa',    subtitulo: 'Serena y exclusiva.',      imagen: '/islas/La graciosa.jpg' },
];

function getColumns(w: number) {
  if (w > 1024) return 'repeat(4, 1fr)';
  if (w > 640)  return 'repeat(2, 1fr)';
  return '1fr';
}

export default function IslasGrid() {
  const [cols, setCols]     = useState('repeat(4, 1fr)');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setCols(getColumns(w));
      setIsMobile(w <= 640);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div style={{
      maxWidth: '1280px', margin: '0 auto',
      display: 'grid', gridTemplateColumns: cols, gap: '2px',
    }}>
      {ISLAS.map((isla) => (
        <div key={isla.slug} style={isMobile ? { height: '480px' } : undefined}>
          <IslaGridCard {...isla} />
        </div>
      ))}
    </div>
  );
}
