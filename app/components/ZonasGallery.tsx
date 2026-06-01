'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ZONAS = [
  {
    num: '01', nombre: 'Entrada del Local',
    imagen: '/zonas/zona-entrada.png',
    desc: 'La primera impresión. Un umbral entre el mundo exterior y el refugio SOKKO.',
  },
  {
    num: '02', nombre: 'Billar',
    imagen: '/zonas/zona-billar.png',
    desc: 'Elegancia y precisión. El billar como ritual social en torno a la mesa verde.',
  },
  {
    num: '03', nombre: 'Jaima de Juegos',
    imagen: '/zonas/zona-jaima.png',
    desc: 'Bajo la jaima, el juego se convierte en ceremonia. Estrategia, risas y conexión.',
  },
  {
    num: '04', nombre: 'Chill Familiar',
    imagen: '/zonas/zona-chill.png',
    desc: 'Un espacio de calma absoluta. Sofás profundos, luz tenue y conversaciones que perduran.',
  },
  {
    num: '05', nombre: 'Comedor y Shows',
    imagen: '/zonas/zona-comedor.png',
    desc: 'La gastronomía como espectáculo. Sabores canarios con alma y shows en directo.',
  },
  {
    num: '06', nombre: 'Terraza',
    imagen: '/zonas/zona-terraza.png',
    desc: 'Cielo abierto, viento suave y las estrellas de Fuerteventura como testigos.',
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
        const bg    = section.querySelector<HTMLElement>('.zona-bg');
        const num   = section.querySelector<HTMLElement>('.zona-num');
        const line  = section.querySelector<HTMLElement>('.zona-line');
        const title = section.querySelector<HTMLElement>('.zona-title');
        const desc  = section.querySelector<HTMLElement>('.zona-desc');

        // ── Parallax: imagen se mueve más lenta que el scroll ──
        if (bg) {
          gsap.fromTo(bg,
            { yPercent: -14 },
            {
              yPercent: 14,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            }
          );
        }

        // ── Texto: reveal al entrar en viewport ──
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 72%',
            toggleActions: 'play none none none',
          },
        });

        if (num)   tl.from(num,   { opacity: 0, x: -40, duration: 0.8, ease: 'power3.out' }, 0);
        if (line)  tl.from(line,  { scaleX: 0, duration: 1.1, ease: 'expo.out', transformOrigin: 'left center' }, 0.1);
        if (title) tl.from(title, { opacity: 0, y: 55, duration: 1.1, ease: 'power4.out' }, 0.15);
        if (desc)  tl.from(desc,  { opacity: 0, y: 30, duration: 0.9, ease: 'power3.out' }, 0.45);
      });
    }, containerRef);

    return () => ctx.revert();
  }, [mobile]);

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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {ZONAS.map((zona) => (
            <div key={zona.num} style={{ position: 'relative', height: '220px', overflow: 'hidden', borderRadius: '4px' }}>
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url(${zona.imagen})`,
                backgroundSize: 'cover', backgroundPosition: 'center',
              }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,14,5,0.92) 0%, rgba(26,14,5,0.4) 55%, rgba(26,14,5,0.15) 100%)' }} />
              <p style={{ position: 'absolute', top: '.75rem', left: '.75rem', fontFamily: 'var(--font-cinzel)', fontSize: '.5rem', letterSpacing: '.3em', color: 'rgba(200,146,42,0.7)', textTransform: 'uppercase', margin: 0 }}>
                {zona.num} · Zona
              </p>
              <p style={{ position: 'absolute', bottom: '.85rem', left: '.75rem', right: '.75rem', fontFamily: 'var(--font-cinzel)', fontSize: '.75rem', letterSpacing: '.12em', color: '#C8922A', margin: 0, lineHeight: '1.3' }}>
                {zona.nombre}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ── DESKTOP: fullscreen parallax ───────────────────────────── */
  return (
    <div ref={containerRef} style={{ background: '#1A0E05' }}>

      {/* Header fijo de sección */}
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
      {ZONAS.map((zona) => (
        <div
          key={zona.num}
          className="zona-section"
          style={{
            position: 'relative',
            height: '100vh',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* Imagen con parallax */}
          <div
            className="zona-bg"
            style={{
              position: 'absolute',
              top: '-20%', left: 0, right: 0, bottom: '-20%',
              backgroundImage: `url(${zona.imagen})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              willChange: 'transform',
            }}
          />

          {/* Overlay gradient direccional */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(105deg, rgba(26,14,5,0.88) 0%, rgba(26,14,5,0.65) 45%, rgba(26,14,5,0.25) 80%, rgba(26,14,5,0.1) 100%)',
          }} />

          {/* Línea vertical decorativa */}
          <div style={{
            position: 'absolute', left: '3rem', top: 0, bottom: 0,
            width: '1px',
            background: 'linear-gradient(to bottom, transparent, rgba(200,146,42,0.25) 20%, rgba(200,146,42,0.25) 80%, transparent)',
          }} />

          {/* Contenido */}
          <div style={{
            position: 'relative', zIndex: 2,
            padding: '0 5rem 0 6rem',
            maxWidth: '700px',
          }}>
            {/* Número */}
            <p
              className="zona-num"
              style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: '.58rem', letterSpacing: '.65em',
                color: 'rgba(200,146,42,0.5)',
                textTransform: 'uppercase', margin: '0 0 1.2rem',
              }}
            >
              {zona.num} — Zona
            </p>

            {/* Línea acento */}
            <div
              className="zona-line"
              style={{
                width: '50px', height: '1px',
                background: 'rgba(200,146,42,0.65)',
                marginBottom: '1.5rem',
              }}
            />

            {/* Título */}
            <h2
              className="zona-title"
              style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
                color: '#C8922A',
                letterSpacing: '.06em',
                lineHeight: 1.0,
                margin: '0 0 2rem',
                textShadow: '0 0 80px rgba(200,146,42,0.25)',
              }}
            >
              {zona.nombre}
            </h2>

            {/* Descripción */}
            <p
              className="zona-desc"
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontStyle: 'italic',
                fontSize: 'clamp(1rem, 1.8vw, 1.3rem)',
                color: '#C4A882',
                lineHeight: '1.75',
                maxWidth: '420px',
                margin: 0,
              }}
            >
              {zona.desc}
            </p>
          </div>

          {/* Número grande decorativo (fondo) */}
          <div style={{
            position: 'absolute', right: '4rem', top: '50%',
            transform: 'translateY(-50%)',
            fontFamily: 'var(--font-cinzel)',
            fontSize: 'clamp(8rem, 18vw, 18rem)',
            color: 'rgba(200,146,42,0.04)',
            letterSpacing: '.05em',
            lineHeight: 1,
            pointerEvents: 'none',
            userSelect: 'none',
          }}>
            {zona.num}
          </div>

          {/* Fade inferior */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: '120px',
            background: 'linear-gradient(to top, #1A0E05, transparent)',
          }} />
        </div>
      ))}
    </div>
  );
}
