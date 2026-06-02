"use client";
import { CardStack, CardStackItem } from "./ui/card-stack";

const zonas: CardStackItem[] = [
  {
    id: 1,
    title: "Entrada del Local",
    description: "La entrada es una promesa. Un umbral que marca el paso del exterior al interior, del ruido al refugio.",
    imageSrc: "/zonas/zona-entrada.jpg",
    tag: "01",
  },
  {
    id: 2,
    title: "Billar",
    description: "Un espacio para compartir, competir y disfrutar. Mesas de calidad profesional bajo iluminación estratégica.",
    imageSrc: "/zonas/zona-billar.jpg",
    tag: "02",
  },
  {
    id: 3,
    title: "Jaima de Juegos",
    description: "Diseñado para despertar sonrisas y crear momentos inolvidables. Todas las edades encuentran su lugar.",
    imageSrc: "/zonas/zona-jaima.jpg",
    tag: "03",
  },
  {
    id: 4,
    title: "Chill Familiar",
    description: "Sofás amplios, cojines confortables y rincones acogedores que invitan a quedarse.",
    imageSrc: "/zonas/zona-chill.jpg",
    tag: "04",
  },
  {
    id: 5,
    title: "Comedor y Shows",
    description: "Gastronomía, música y espectáculo fusionados. El corazón de SOKKO.",
    imageSrc: "/zonas/zona-comedor.jpg",
    tag: "05",
  },
  {
    id: 6,
    title: "Terraza",
    description: "La joya de la corona. Techo retráctil que se abre al cielo. Bajo el sol o bajo las estrellas.",
    imageSrc: "/zonas/zona-terraza.jpg",
    tag: "06",
  },
];

export default function ZonasCardStack() {
  return (
    <div style={{ background: '#0A0804', padding: '6rem 2rem', overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <p style={{ fontSize: '.65rem', letterSpacing: '.5em', color: '#8A6E2F', textTransform: 'uppercase' }}>
          02 — Espacios
        </p>
        <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#C9A84C', letterSpacing: '.15em', marginTop: '1rem' }}>
          Nuestras Zonas
        </h2>
        <div style={{ width: '60px', height: '1px', background: '#8A6E2F', margin: '1.5rem auto' }} />
        <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: '1.05rem', color: '#B8A980', maxWidth: '520px', margin: '0 auto', lineHeight: '1.8' }}>
          Arrastra o haz clic para explorar nuestros seis espacios únicos.
        </p>
      </div>

      <CardStack
        items={zonas}
        cardWidth={480}
        cardHeight={340}
        overlap={0.55}
        spreadDeg={35}
        autoAdvance
        intervalMs={3000}
        pauseOnHover
        showDots
        renderCard={(item, { active }) => (
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <img
              src={item.imageSrc}
              alt={item.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              draggable={false}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(10,8,4,.95) 0%, rgba(10,8,4,.3) 60%, transparent 100%)'
            }} />
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              padding: '2rem'
            }}>
              <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: '.6rem', letterSpacing: '.4em', color: '#8A6E2F', marginBottom: '.5rem' }}>
                {item.tag} · Zona
              </p>
              <h3 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.4rem', color: '#C9A84C', letterSpacing: '.1em', marginBottom: '.5rem' }}>
                {item.title}
              </h3>
              {active && (
                <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: '.9rem', color: '#B8A980', lineHeight: '1.6', marginBottom: '1rem' }}>
                  {item.description}
                </p>
              )}
              {active && (
                <div style={{ width: '40px', height: '1px', background: 'rgba(201,168,76,.5)' }} />
              )}
            </div>
          </div>
        )}
      />
    </div>
  );
}