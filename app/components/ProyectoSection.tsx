'use client';
import { useEffect, useRef } from 'react';

/* ── Separador ornamental ───────────────────────────────────────── */
function OrnamentalDivider({ small = false }: { small?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: small ? '1.5rem auto' : '2.5rem auto', width: small ? 'min(220px,70vw)' : 'min(380px,80vw)' }}>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(200,146,42,0.55))' }} />
      <svg width={small ? 14 : 18} height={small ? 14 : 18} viewBox="0 0 18 18" fill="none">
        <path d="M9 1L10.6 7.4L17 9L10.6 10.6L9 17L7.4 10.6L1 9L7.4 7.4Z"
          fill="none" stroke="#C8922A" strokeWidth="1.2" />
      </svg>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(200,146,42,0.55))' }} />
    </div>
  );
}

/* ── Iconos SVG de cada bloque ──────────────────────────────────── */
const ICONS = {
  referente: (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
      <path d="M21 6 L21 2" stroke="#C8922A" strokeWidth="1.2"/>
      <circle cx="21" cy="21" r="18" stroke="#C8922A" strokeWidth="0.8" strokeOpacity="0.3"/>
      <path d="M8,34 Q8,16 21,14 Q34,16 34,34" stroke="#C8922A" strokeWidth="1.5" fill="none"/>
      <line x1="15" y1="34" x2="15" y2="22" stroke="#C8922A" strokeWidth="1.5"/>
      <path d="M15,22 Q9,16 5,18" stroke="#C8922A" strokeWidth="1.2" fill="none"/>
      <path d="M15,22 Q11,14 13,15" stroke="#C8922A" strokeWidth="1.2" fill="none"/>
      <path d="M15,22 Q19,13 22,15" stroke="#C8922A" strokeWidth="1.2" fill="none"/>
      <path d="M26,34 L32,20 L38,34" stroke="#C8922A" strokeWidth="1.2" fill="none"/>
      <circle cx="30" cy="14" r="4" stroke="#C8922A" strokeWidth="1.2"/>
      <circle cx="30" cy="14" r="1.5" fill="#C8922A" fillOpacity="0.7"/>
    </svg>
  ),
  sol: (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
      <circle cx="21" cy="21" r="8" stroke="#C8922A" strokeWidth="1.5"/>
      <circle cx="21" cy="21" r="3" fill="#C8922A" fillOpacity="0.6"/>
      {[0,45,90,135,180,225,270,315].map((deg,i) => {
        const r = Math.PI * deg / 180;
        const x1 = 21 + Math.cos(r) * 10;
        const y1 = 21 + Math.sin(r) * 10;
        const x2 = 21 + Math.cos(r) * 14;
        const y2 = 21 + Math.sin(r) * 14;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C8922A" strokeWidth="1.2" />;
      })}
      <path d="M6,36 L14,36" stroke="#C8922A" strokeWidth="1.2"/>
      <path d="M6,36 L10,28 L14,36" stroke="#C8922A" strokeWidth="1.2" fill="none"/>
      <path d="M18,36 L26,36" stroke="#C8922A" strokeWidth="1.2"/>
      <path d="M18,36 L22,28 L26,36" stroke="#C8922A" strokeWidth="1.2" fill="none"/>
      <path d="M30,36 L38,36" stroke="#C8922A" strokeWidth="1.2"/>
    </svg>
  ),
  musica: (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
      <path d="M16,30 L16,12 L34,8 L34,26" stroke="#C8922A" strokeWidth="1.5" fill="none"/>
      <path d="M16,12 L34,8" stroke="#C8922A" strokeWidth="1"/>
      <circle cx="13" cy="31" r="4" stroke="#C8922A" strokeWidth="1.5"/>
      <circle cx="31" cy="27" r="4" stroke="#C8922A" strokeWidth="1.5"/>
      <path d="M5,20 Q7,18 9,20 Q11,22 13,20" stroke="#C8922A" strokeWidth="1" fill="none" strokeOpacity="0.5"/>
      <path d="M5,16 Q7,14 9,16 Q11,18 13,16" stroke="#C8922A" strokeWidth="0.8" fill="none" strokeOpacity="0.3"/>
    </svg>
  ),
  horizonte: (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
      <path d="M4,34 L14,18 L21,26 L28,12 L38,34 Z" stroke="#C8922A" strokeWidth="1.5" fill="none"/>
      <path d="M14,34 L18,26 L21,30 L24,22 L28,34" stroke="#C8922A" strokeWidth="0.8" fill="rgba(200,146,42,0.05)" strokeOpacity="0.4"/>
      <line x1="2" y1="36" x2="40" y2="36" stroke="#C8922A" strokeWidth="1.2"/>
      <circle cx="33" cy="10" r="5" stroke="#C8922A" strokeWidth="1.2"/>
      <path d="M29,36 Q31,32 33,36" stroke="#C8922A" strokeWidth="0.8" fill="none" strokeOpacity="0.4"/>
      <path d="M35,36 Q37,32 39,36" stroke="#C8922A" strokeWidth="0.8" fill="none" strokeOpacity="0.4"/>
    </svg>
  ),
};

interface Bloque {
  icono: React.ReactNode;
  titulo: string;
  parrafo: string;
}

const BLOQUES: Bloque[] = [
  {
    icono: ICONS.referente,
    titulo: 'UN REFERENTE Y PUNTO DE ENCUENTRO',
    parrafo: 'Más que un local, SOKKO pretende convertirse en un referente social y cultural para todos los públicos. Un punto de encuentro seguro, acogedor e inclusivo donde familias, grupos de amigos y personas que simplemente buscan desconectar puedan encontrar su sitio.\nInspirado en la belleza natural y la esencia de las Islas Canarias, el proyecto incorpora guiños constantes a nuestra tierra a través de su estética, su ambiente, su gastronomía y sus experiencias.',
  },
  {
    icono: ICONS.sol,
    titulo: 'EXPERIENCIAS PARA CADA MOMENTO',
    parrafo: 'El concepto combina diferentes espacios y ambientes diseñados para adaptarse a distintos momentos del día. Desde una terraza cálida y soleada hasta zonas chill-out, áreas de juego, espacios de espectáculos y rincones pensados para el descanso y la conexión social.\nTodo ello acompañado de una oferta gastronómica y de bebidas dinámica y versátil, que evoluciona según el horario y las experiencias temáticas del local.',
  },
  {
    icono: ICONS.musica,
    titulo: 'CULTURA, CREATIVIDAD Y ENTRETENIMIENTO',
    parrafo: 'SOKKO apuesta también por la creatividad y la cultura como parte fundamental de su identidad. Durante el día, el espacio dará lugar a talleres, actividades creativas y encuentros sociales como clases de DJ, crochet, costura o eventos colaborativos.\nAl caer la noche, el ambiente se transforma para dar paso a espectáculos temáticos, música en directo, sesiones de DJ y experiencias inmersivas que convierten cada visita en algo diferente.',
  },
  {
    icono: ICONS.horizonte,
    titulo: 'VISIÓN DE FUTURO',
    parrafo: 'El objetivo a largo plazo es construir una marca sólida y reconocible que modernice la imagen de Canarias desde una perspectiva contemporánea y premium, permitiendo replicar el concepto en futuras ubicaciones estratégicas de las islas, como rooftops, beach clubs y espacios singulares con identidad propia.',
  },
];

/* ── Bloque individual con reveal ──────────────────────────────── */
function BloqueProyecto({ icono, titulo, parrafo, index }: Bloque & { index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: 'translateY(40px)',
        transition: `opacity 0.9s ease ${index * 0.12}s, transform 0.9s ease ${index * 0.12}s`,
        display: 'flex',
        flexDirection: 'column',
        gap: '1.4rem',
        padding: '2.5rem 2rem',
        border: '1px solid rgba(200,146,42,0.1)',
        background: 'rgba(200,146,42,0.02)',
      }}
    >
      <div style={{ color: '#C8922A' }}>{icono}</div>
      <h3 style={{
        fontFamily: 'var(--font-cinzel)',
        fontSize: 'clamp(.68rem, 1.2vw, .85rem)',
        color: '#C8922A',
        letterSpacing: '.12em',
        lineHeight: 1.5,
        margin: 0,
      }}>
        {titulo}
      </h3>
      <div style={{
        width: '30px', height: '1px',
        background: 'rgba(200,146,42,0.4)',
      }} />
      {parrafo.split('\n').map((p, i) => (
        <p key={i} style={{
          fontFamily: 'var(--font-raleway)',
          fontWeight: 300,
          fontSize: 'clamp(.82rem, 1.3vw, .95rem)',
          color: '#C4A882',
          lineHeight: 1.85,
          margin: 0,
        }}>
          {p}
        </p>
      ))}
    </div>
  );
}

/* ── Tagline final con reveal ───────────────────────────────────── */
function TaglineFinal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: 'translateY(40px)',
        transition: 'opacity 1.2s ease, transform 1.2s ease',
        textAlign: 'center',
        padding: '5rem 2rem',
      }}
    >
      <OrnamentalDivider />
      <p style={{
        fontFamily: 'var(--font-cormorant)',
        fontStyle: 'italic',
        fontSize: 'clamp(1.4rem, 3.5vw, 2.6rem)',
        color: '#D4A843',
        lineHeight: 1.55,
        maxWidth: '820px',
        margin: '0 auto',
        textShadow: '0 0 40px rgba(212,168,67,0.2)',
      }}>
        SOKKO NO ES SOLO UN LUGAR.<br />
        ES REFUGIO, CALMA, CONEXIÓN Y EXPERIENCIA.
      </p>
      <OrnamentalDivider />
    </div>
  );
}

/* ── Componente principal ────────────────────────────────────────── */
export default function ProyectoSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!titleRef.current) return;
    const el = titleRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="proyecto"
      style={{ background: '#1A0E05', padding: '7rem 0 0' }}
    >
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 4rem)' }}>

        {/* Cabecera */}
        <div
          ref={titleRef}
          style={{
            textAlign: 'center',
            opacity: 0,
            transform: 'translateY(30px)',
            transition: 'opacity 1s ease, transform 1s ease',
            marginBottom: '1rem',
          }}
        >
          <p style={{
            fontFamily: 'var(--font-raleway)',
            fontWeight: 300,
            fontSize: 'clamp(.55rem, 1vw, .68rem)',
            letterSpacing: '.6em',
            color: '#8A6940',
            textTransform: 'uppercase',
            margin: '0 0 1.2rem',
          }}>
            01 — Proyecto
          </p>

          <h2 style={{
            fontFamily: 'var(--font-cinzel)',
            fontSize: 'clamp(1.6rem, 4vw, 3rem)',
            color: '#C8922A',
            letterSpacing: '.12em',
            margin: '0 0 .8rem',
          }}>
            EXPLICACIÓN DEL PROYECTO
          </h2>

          <OrnamentalDivider />

          <p style={{
            fontFamily: 'var(--font-cormorant)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.1rem, 2.2vw, 1.55rem)',
            color: '#C4A882',
            margin: '0 0 1.5rem',
            letterSpacing: '.04em',
          }}>
            SOKKO, EL RESGUARDO DEL VIENTO
          </p>

          <p style={{
            fontFamily: 'var(--font-raleway)',
            fontWeight: 300,
            fontSize: 'clamp(.85rem, 1.5vw, 1rem)',
            color: '#B8A57E',
            lineHeight: 1.9,
            maxWidth: '820px',
            margin: '0 auto',
          }}>
            SOKKO nace de una expresión profundamente canaria: «ponerse al sokko», refugiarse del viento,
            encontrar un lugar de calma, protección y encuentro. Bajo esa esencia surge un proyecto que
            busca reinterpretar la identidad de Canarias desde una visión moderna, elegante y cercana,
            creando un espacio único donde tradición, ocio, cultura y comunidad conviven en armonía.
          </p>
        </div>

        {/* Grid de 4 bloques */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1px',
          marginTop: '4rem',
          background: 'rgba(200,146,42,0.08)',
        }}>
          {BLOQUES.map((bloque, i) => (
            <BloqueProyecto key={i} {...bloque} index={i} />
          ))}
        </div>
      </div>

      {/* Tagline final */}
      <TaglineFinal />
    </section>
  );
}
