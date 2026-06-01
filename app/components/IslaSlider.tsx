"use client";
import IslaCard from "./IslaCard";

const islas = [
  { nombre: 'Lanzarote', desc: 'Volcánica y única', imagen: '/islas/lanzarote.jpg' },
  { nombre: 'Fuerteventura', desc: 'Salvaje y libre', imagen: '/islas/Fuerteventura.jpg' },
  { nombre: 'Gran Canaria', desc: 'Vibrante y cosmopolita', imagen: '/islas/Gran canaria.jpg' },
  { nombre: 'Tenerife', desc: 'Intensa y majestuosa', imagen: '/islas/Tenerife.jpg' },
  { nombre: 'La Palma', desc: 'Verde y soñadora', imagen: '/islas/la palma.jpg' },
  { nombre: 'La Gomera', desc: 'Auténtica y esencial', imagen: '/islas/La gomera.jpg' },
  { nombre: 'El Hierro', desc: 'Salvaje y espiritual', imagen: '/islas/el hierro.jpg' },
  { nombre: 'La Graciosa', desc: 'Serena y exclusiva', imagen: '/islas/La graciosa.jpg' },
];

const duplicadas = [...islas, ...islas];

export default function IslaSlider() {
  return (
    <div style={{
      width: '100%', overflow: 'hidden', position: 'relative',
      maskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
    }}>
      <style>{`
        @keyframes isla-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .isla-track {
          display: flex;
          gap: 16px;
          width: max-content;
          animation: isla-scroll 40s linear infinite;
          padding: 1rem 0;
        }
        .isla-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="isla-track">
        {duplicadas.map((isla, i) => (
          <IslaCard
            key={i}
            nombre={isla.nombre}
            desc={isla.desc}
            imagen={isla.imagen}
          />
        ))}
      </div>
    </div>
  );
}