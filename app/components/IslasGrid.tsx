'use client';
import { useState, useEffect } from 'react';
import IslaGridCard from './IslaGridCard';

const ISLAS = [
  { slug: 'lanzarote',     nombre: 'Lanzarote',     subtitulo: 'Alma volcánica, fuego y calma',          imagen: '/islas/lanzarote.jpg' },
  { slug: 'fuerteventura', nombre: 'Fuerteventura',  subtitulo: 'Brisa atlántica, silencio del desierto', imagen: '/islas/Fuerteventura.jpg' },
  { slug: 'gran-canaria',  nombre: 'Gran Canaria',   subtitulo: 'Vibrante, cosmopolita, viva',             imagen: '/islas/Gran canaria.jpg' },
  { slug: 'tenerife',      nombre: 'Tenerife',       subtitulo: 'Alturas majestuosas, cielos íntimos',    imagen: '/islas/Tenerife.jpg' },
  { slug: 'la-palma',      nombre: 'La Palma',       subtitulo: 'Sueños verdes, luz dorada',               imagen: '/islas/la palma.jpg' },
  { slug: 'la-gomera',     nombre: 'La Gomera',      subtitulo: 'Niebla ancestral, esencia pura',          imagen: '/islas/La gomera.jpg' },
  { slug: 'el-hierro',     nombre: 'El Hierro',      subtitulo: 'Salvaje, remota, ancestral',              imagen: '/islas/el hierro.jpg' },
  { slug: 'la-graciosa',   nombre: 'La Graciosa',    subtitulo: 'Serenidad en su máxima expresión',       imagen: '/islas/La graciosa.jpg' },
];

function getColumns(w: number) {
  if (w > 1024) return 'repeat(4, 1fr)';
  if (w > 640)  return 'repeat(2, 1fr)';
  return '1fr';
}

export default function IslasGrid() {
  const [cols, setCols] = useState('repeat(4, 1fr)');
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
      display: 'grid',
      gridTemplateColumns: cols,
      gap: '2px',
    }}>
      {ISLAS.map((isla) => (
        <div
          key={isla.slug}
          style={isMobile ? { height: '480px' } : undefined}
        >
          <IslaGridCard {...isla} />
        </div>
      ))}
    </div>
  );
}
