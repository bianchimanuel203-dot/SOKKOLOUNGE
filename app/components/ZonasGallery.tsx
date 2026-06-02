'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Zona = {
  num: string;
  etiqueta: string;
  titulo: string;
  desc: string;
  bullets: [string, string][];
  frase: string;
  imagen: string;
};

const ZONAS: Zona[] = [
  {
    num: '01',
    etiqueta: 'Entrada del Local',
    titulo: 'La Entrada, el Primer Resguardo',
    desc: 'La entrada de SOKKO no es solo un acceso, es el primer abrazo. Un umbral que marca el paso del exterior al interior, del ruido al refugio, del viento a la calma.',
    bullets: [
      ['Refugio', 'Un lugar donde el viento se queda fuera y la tranquilidad te recibe.'],
      ['Exclusividad', 'Un ambiente cuidado al detalle que transmite calidad y distinción.'],
      ['Conexión', 'Con nuestra tierra, con nuestras raíces y entre las personas.'],
      ['Calma y bienestar', 'Un espacio seguro, elegante y pensado para definirse sin prisas.'],
      ['Curiosidad y deseo', 'Que al cruzar la puerta nazca la intención de descubrir todo lo que hay dentro.'],
    ],
    frase: 'La entrada de SOKKO es una promesa: aquí encuentras tu lugar. Aquí te resguardas. Aquí comienza tu experiencia.',
    imagen: '/zonas/zona-entrada.jpg',
  },
  {
    num: '02',
    etiqueta: 'Billar',
    titulo: 'Zona Billar',
    desc: 'Un espacio para compartir, competir y disfrutar. La zona de billar de SOKKO está diseñada para ofrecer un ambiente acogedor, dinámico y sofisticado, donde el juego se convierte en excusa para la conexión.',
    bullets: [
      ['Conexión', 'Un punto de encuentro para crear recuerdos y fortalecer vínculos.'],
      ['Diversión', 'El juego como protagonista de momentos únicos.'],
      ['Relax', 'Un ambiente que invita a desconectar y disfrutar sin prisas.'],
      ['Identidad', 'La esencia de Canarias presente en cada rincón.'],
      ['Experiencia', 'Más que jugar al billar, vivir SOKKO.'],
    ],
    frase: 'Aquí cada partida es más que un juego. Es un momento, una historia, una conexión.',
    imagen: '/zonas/zona-billar.jpg',
  },
  {
    num: '03',
    etiqueta: 'Jaima de Juegos',
    titulo: 'Jaima de Juegos',
    desc: 'La Jaima de Juegos es un espacio diseñado para despertar sonrisas y crear momentos inolvidables. Un rincón divertido y dinámico donde todas las edades encuentran su lugar para jugar, compartir y disfrutar.',
    bullets: [
      ['Alegría', 'Un espacio que invita al juego, a la risa y al buen rollo.'],
      ['Conexión', 'Momentos compartidos que fortalecen vínculos y crean recuerdos.'],
      ['Diversión', 'Entretenimiento para todas las edades en un ambiente dinámico y seguro.'],
      ['Acogida', 'Un lugar cálido, cómodo y pensado para que todos se sientan como en casa.'],
      ['Esencia canaria', 'Tradición, identidad y modernidad unidas en cada detalle.'],
    ],
    frase: 'En la Jaima de Juegos, cada partida es una historia, cada risa, una conexión.',
    imagen: '/zonas/zona-jaima.jpg',
  },
  {
    num: '04',
    etiqueta: 'Chill Familiar',
    titulo: 'Zona Chill Familiar',
    desc: 'Un espacio para relajarse, conversar y disfrutar sin prisas. La zona chill familiar de SOKKO está pensada para que todos encuentren su ritmo: desde una tarde tranquila en familia hasta una charla entre amigos al caer la noche.',
    bullets: [
      ['Relax', 'Un refugio donde desconectar del estrés y conectar con lo importante.'],
      ['Conexión', 'Conversaciones, risas y momentos que se convierten en recuerdos.'],
      ['Calma', 'Un ambiente que transmite paz, equilibrio y buena energía.'],
      ['Acogida', 'Sensación de hogar, cercanía y bienestar desde el primer instante.'],
      ['Autenticidad', 'La esencia de Canarias presente en cada detalle y en cada experiencia.'],
    ],
    frase: 'En SOKKO, el chill no es solo descansar. Es disfrutar del momento, rodeado de buena gente y buenas vibras.',
    imagen: '/zonas/zona-chill.jpg',
  },
  {
    num: '05',
    etiqueta: 'Comedor y Shows',
    titulo: 'Zona Comedor y Shows',
    desc: 'El corazón de SOKKO. Un espacio donde la gastronomía, la música y el espectáculo se fusionan para crear experiencias únicas e inolvidables. Cada noche, un nuevo show, una nueva emoción.',
    bullets: [
      ['Emoción', 'La magia de vivir algo especial que combina todos los sentidos.'],
      ['Conexión', 'Un lugar donde compartir momentos y crear recuerdos.'],
      ['Celebración', 'Cada noche es una oportunidad para brindar, disfrutar y vibrar.'],
      ['Identidad', 'El orgullo de nuestras raíces, llevado a escena con estilo y autenticidad.'],
      ['Exclusividad', 'Un ambiente cuidado al detalle para que te sientas parte de algo único.'],
    ],
    frase: 'Buena mesa, buena música, grandes historias y mejores personas. Así son las noches en SOKKO.',
    imagen: '/zonas/zona-comedor.jpg',
  },
  {
    num: '06',
    etiqueta: 'Terraza',
    titulo: 'La Joya de la Corona',
    desc: 'Nuestra terraza es el alma de SOKKO. Un espacio único, versátil y privilegiado, con techo retráctil que se abre para conectar contigo mismo, con el cielo y con la magia de Canarias.',
    bullets: [
      ['Libertad', 'Un espacio donde el tiempo se detiene y tú eliges cómo vivirlo.'],
      ['Conexión', 'Con la gente, con el entorno y con nuestras raíces.'],
      ['Exclusividad', 'Un lugar pensado para crear recuerdos que duran para siempre.'],
      ['Belleza natural', 'La esencia de Canarias en sus entornos privilegiados.'],
      ['Versatilidad', 'De día, de tarde o de noche, siempre el escenario perfecto.'],
    ],
    frase: 'Abre el techo, levanta la mirada y déjate llevar. Aquí arriba, la magia es real.',
    imagen: '/zonas/zona-terraza.jpg',
  },
];

export default function ZonasGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const check = () => setMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (mobile || !containerRef.current) return;

    const sections = containerRef.current.querySelectorAll<HTMLElement>('.zona-section');
    const ctx = gsap.context(() => {
      sections.forEach((section) => {
        const num     = section.querySelector<HTMLElement>('.zona-num');
        const title   = section.querySelector<HTMLElement>('.zona-title');
        const desc    = section.querySelector<HTMLElement>('.zona-desc');
        const bullets = section.querySelectorAll<HTMLElement>('.zona-bullet');
        const div     = section.querySelector<HTMLElement>('.zona-divider');
        const frase   = section.querySelector<HTMLElement>('.zona-frase');

        // ── Reveal de entrada — scrub:false, una sola pasada ──
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            toggleActions: 'play none none none',
          },
        });

        if (num)   tl.from(num,   { opacity: 0, x: -40, duration: 0.8, ease: 'power3.out' }, 0);
        if (title) tl.from(title, { opacity: 0, y: 60, duration: 1.1, ease: 'power4.out' }, 0.1);
        if (desc)  tl.from(desc,  { opacity: 0, y: 30, duration: 0.9, ease: 'power3.out' }, 0.35);
        if (bullets.length)
          tl.from(bullets, { opacity: 0, y: 22, duration: 0.6, ease: 'power2.out', stagger: 0.09 }, 0.5);
        if (div)   tl.from(div,   { scaleX: 0, duration: 1.0, ease: 'expo.out', transformOrigin: 'left center' }, 0.6);
        if (frase) tl.from(frase, { opacity: 0, y: 24, duration: 0.9, ease: 'power3.out' }, 0.8);
      });
    }, containerRef);

    return () => ctx.revert();
  }, [mobile]);

  /* ── Línea dorada horizontal de transición entre zonas ── */
  const TransitionLine = () => (
    <div style={{
      height: '1px',
      background: 'linear-gradient(to right, transparent 8%, rgba(200,146,42,0.55) 50%, transparent 92%)',
    }} />
  );

  /* ── MOBILE: grid simple 2 columnas ─────────────────────────── */
  if (mobile) {
    return (
      <div style={{ background: '#1A0E05', padding: '4rem 1.25rem 3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <p style={{ fontSize: '.6rem', letterSpacing: '.6em', color: '#8A6940', textTransform: 'uppercase', margin: 0 }}>
            02 — Espacios
          </p>
          <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(1.6rem, 6vw, 2.2rem)', color: '#C8922A', letterSpacing: '.15em', marginTop: '.8rem', marginBottom: 0 }}>
            Nuestras Zonas
          </h2>
          <div style={{ width: '50px', height: '1px', background: 'rgba(200,146,42,0.4)', margin: '.8rem auto' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {ZONAS.map((zona) => (
            <div key={zona.num} style={{ position: 'relative', height: '340px', overflow: 'hidden', borderRadius: '4px' }}>
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url(${zona.imagen})`,
                backgroundSize: 'cover', backgroundPosition: 'center',
              }} />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,14,5,0.55)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,14,5,0.92) 0%, rgba(26,14,5,0.15) 60%, rgba(26,14,5,0.35) 100%)' }} />
              <p style={{ position: 'absolute', top: '1rem', left: '1rem', fontFamily: 'var(--font-cinzel)', fontSize: '.55rem', letterSpacing: '.4em', color: 'rgba(200,146,42,0.8)', textTransform: 'uppercase', margin: 0 }}>
                {zona.num} — Zona
              </p>
              <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem' }}>
                <h3 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.1rem', letterSpacing: '.08em', color: '#C8922A', margin: '0 0 .5rem', lineHeight: 1.2 }}>
                  {zona.titulo}
                </h3>
                <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: '.9rem', color: '#C4A882', margin: 0, lineHeight: 1.5 }}>
                  {zona.frase}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ── DESKTOP: zonas fullscreen inmersivas ───────────────────── */
  return (
    <div ref={containerRef} style={{ background: '#1A0E05' }}>

      {/* Header de sección */}
      <div style={{ textAlign: 'center', padding: '6rem 2rem 4rem', borderBottom: '1px solid rgba(200,146,42,0.1)' }}>
        <p style={{ fontSize: '.6rem', letterSpacing: '.6em', color: '#8A6940', textTransform: 'uppercase', margin: 0 }}>
          02 — Espacios
        </p>
        <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#C8922A', letterSpacing: '.15em', marginTop: '.8rem', marginBottom: 0 }}>
          Nuestras Zonas
        </h2>
        <div style={{ width: '50px', height: '1px', background: 'rgba(200,146,42,0.4)', margin: '1rem auto' }} />
        <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: '.95rem', color: '#C4A882', margin: 0 }}>
          Seis espacios únicos, cada uno con su propio carácter
        </p>
      </div>

      {/* Zonas fullscreen */}
      {ZONAS.map((zona, i) => (
        <div key={zona.num}>
          {i > 0 && <TransitionLine />}
          <div
            className="zona-section"
            style={{
              position: 'relative',
              height: '100vh',
              minHeight: '680px',
              overflow: 'hidden',
            }}
          >
            {/* Foto real de fondo */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url(${zona.imagen})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }} />

            {/* Overlay oscuro base */}
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,14,5,0.55)' }} />

            {/* Refuerzo de legibilidad: oscurece esquinas con texto */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, rgba(26,14,5,0.55) 0%, rgba(26,14,5,0.1) 28%, rgba(26,14,5,0.25) 55%, rgba(26,14,5,0.9) 100%)',
            }} />

            {/* Número — arriba izquierda */}
            <div
              className="zona-num"
              style={{
                position: 'absolute', top: '8vh', left: '6vw', zIndex: 3,
                display: 'flex', alignItems: 'center', gap: '1.2rem',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: '.62rem', letterSpacing: '.65em',
                color: 'rgba(200,146,42,0.85)', textTransform: 'uppercase',
              }}>
                {zona.num} — {zona.etiqueta}
              </span>
              <span style={{ width: '60px', height: '1px', background: 'rgba(200,146,42,0.5)' }} />
            </div>

            {/* Número gigante decorativo de fondo */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              fontFamily: 'var(--font-cinzel)',
              fontSize: 'clamp(14rem, 34vw, 34rem)',
              color: 'rgba(200,146,42,0.05)',
              lineHeight: 1, pointerEvents: 'none', userSelect: 'none', zIndex: 1,
            }}>
              {zona.num}
            </div>

            {/* Título — centrado */}
            <h2
              className="zona-title"
              style={{
                position: 'absolute', top: '34%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '90%', textAlign: 'center', zIndex: 3,
                fontFamily: 'var(--font-cinzel)',
                fontSize: 'clamp(2.4rem, 5.5vw, 5rem)',
                color: '#C8922A',
                letterSpacing: '.06em',
                lineHeight: 1.05,
                margin: 0,
                textShadow: '0 0 80px rgba(200,146,42,0.3), 0 4px 30px rgba(0,0,0,0.6)',
              }}
            >
              {zona.titulo}
            </h2>

            {/* Bloque inferior: descripción (izq) + bullets (der) + frase (full) */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3,
              padding: '0 6vw 5vh',
            }}>
              <div style={{
                display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
                gap: '3rem', flexWrap: 'wrap',
              }}>
                {/* Descripción — abajo izquierda */}
                <p
                  className="zona-desc"
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontStyle: 'italic',
                    fontSize: 'clamp(1.05rem, 1.7vw, 1.45rem)',
                    color: '#D4C2A0',
                    lineHeight: 1.75,
                    maxWidth: '460px',
                    margin: 0,
                    textShadow: '0 2px 18px rgba(0,0,0,0.7)',
                  }}
                >
                  {zona.desc}
                </p>

                {/* Bullets dorados — ¿qué se quiere transmitir? */}
                <ul style={{
                  listStyle: 'none', margin: 0, padding: 0,
                  maxWidth: '440px', display: 'flex', flexDirection: 'column', gap: '.7rem',
                }}>
                  {zona.bullets.map(([k, v]) => (
                    <li
                      key={k}
                      className="zona-bullet"
                      style={{ display: 'flex', alignItems: 'baseline', gap: '.7rem' }}
                    >
                      <span style={{
                        flexShrink: 0, marginTop: '.2rem',
                        width: '5px', height: '5px', borderRadius: '50%',
                        background: '#C8922A',
                        boxShadow: '0 0 8px rgba(200,146,42,0.6)',
                        transform: 'translateY(-1px)',
                      }} />
                      <span style={{ fontSize: '.82rem', lineHeight: 1.5 }}>
                        <span style={{
                          fontFamily: 'var(--font-cinzel)',
                          color: '#C8922A', letterSpacing: '.08em',
                          textTransform: 'uppercase', fontSize: '.7rem',
                        }}>
                          {k}
                        </span>
                        <span style={{ color: '#B8A57E' }}>{'  ·  '}{v}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Línea dorada */}
              <div
                className="zona-divider"
                style={{
                  height: '1px', margin: '2.2rem 0 1.6rem',
                  background: 'linear-gradient(to right, rgba(200,146,42,0.6), rgba(200,146,42,0.15) 70%, transparent)',
                }}
              />

              {/* Frase final — full width, Cormorant italic */}
              <p
                className="zona-frase"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(1.2rem, 2.1vw, 1.85rem)',
                  color: '#C8922A',
                  lineHeight: 1.5,
                  letterSpacing: '.02em',
                  margin: 0,
                  maxWidth: '1100px',
                  textShadow: '0 2px 24px rgba(0,0,0,0.7)',
                }}
              >
                {zona.frase}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
