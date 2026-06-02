'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const ISLAS = [
  { nombre: 'LANZAROTE',     tagline: 'Volcánica y única.',       imagen: '/islas/lanzarote.jpg',     href: '/terraza/lanzarote' },
  { nombre: 'FUERTEVENTURA', tagline: 'Salvaje y libre.',          imagen: '/islas/Fuerteventura.jpg', href: '/terraza/fuerteventura' },
  { nombre: 'GRAN CANARIA',  tagline: 'Vibrante y cosmopolita.',   imagen: '/islas/Gran canaria.jpg',  href: '/terraza/gran-canaria' },
  { nombre: 'TENERIFE',      tagline: 'Intensa y majestuosa.',     imagen: '/islas/Tenerife.jpg',      href: '/terraza/tenerife' },
  { nombre: 'LA PALMA',      tagline: 'Verde y soñadora.',         imagen: '/islas/la palma.jpg',      href: '/terraza/la-palma' },
  { nombre: 'LA GOMERA',     tagline: 'Auténtica y esencial.',     imagen: '/islas/La gomera.jpg',     href: '/terraza/la-gomera' },
  { nombre: 'EL HIERRO',     tagline: 'Salvaje y espiritual.',     imagen: '/islas/el hierro.jpg',     href: '/terraza/el-hierro' },
  { nombre: 'LA GRACIOSA',   tagline: 'Serena y exclusiva.',       imagen: '/islas/La graciosa.jpg',   href: '/terraza/la-graciosa' },
];

/* ── Card con tilt 3D en hover ──────────────────────────────────── */
function IslaCard({ isla, index }: { isla: typeof ISLAS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rotX = useSpring(useMotionValue(0), { stiffness: 200, damping: 25 });
  const rotY = useSpring(useMotionValue(0), { stiffness: 200, damping: 25 });
  const scale = useSpring(1, { stiffness: 250, damping: 22 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width  - 0.5;
    const cy = (e.clientY - rect.top)  / rect.height - 0.5;
    rotX.set(cy * -14);
    rotY.set(cx *  14);
  };

  const handleLeave = () => {
    setHovered(false);
    rotX.set(0);
    rotY.set(0);
    scale.set(1);
  };

  /* Reveal al entrar en viewport */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0,
        duration: 0.85, ease: 'power3.out',
        delay: (index % 4) * 0.1,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      }
    );
  }, [index]);

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        scale,
        transformStyle: 'preserve-3d',
        perspective: 900,
      }}
      onMouseEnter={() => { setHovered(true); scale.set(1.04); }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <Link href={isla.href} style={{ textDecoration: 'none', display: 'block' }}>
        <div style={{
          position: 'relative',
          aspectRatio: '3/4',
          overflow: 'hidden',
          borderRadius: '4px',
          border: `1px solid ${hovered ? 'rgba(200,146,42,0.5)' : 'rgba(200,146,42,0.15)'}`,
          boxShadow: hovered
            ? '0 24px 60px rgba(0,0,0,0.7), 0 0 30px rgba(200,146,42,0.15)'
            : '0 8px 30px rgba(0,0,0,0.4)',
          transition: 'border-color .35s ease, box-shadow .35s ease',
          cursor: 'pointer',
        }}>
          {/* Imagen */}
          <img
            src={isla.imagen}
            alt={isla.nombre}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center',
              transform: hovered ? 'scale(1.08)' : 'scale(1)',
              transition: 'transform .65s cubic-bezier(.19,1,.22,1)',
            }}
          />

          {/* Overlay gradiente */}
          <div style={{
            position: 'absolute', inset: 0,
            background: hovered
              ? 'linear-gradient(to top, rgba(26,14,5,0.97) 0%, rgba(26,14,5,0.5) 55%, rgba(26,14,5,0.1) 100%)'
              : 'linear-gradient(to top, rgba(26,14,5,0.9) 0%, rgba(26,14,5,0.3) 55%, rgba(26,14,5,0.05) 100%)',
            transition: 'background .4s ease',
          }} />

          {/* Contenido inferior */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '1.5rem',
            transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
            transition: 'transform .4s cubic-bezier(.19,1,.22,1)',
          }}>
            <p style={{
              fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
              fontSize: '.85rem', color: '#C4A882',
              margin: '0 0 .35rem', lineHeight: 1.3,
            }}>
              {isla.tagline}
            </p>
            <p style={{
              fontFamily: 'var(--font-cinzel)',
              fontSize: '.95rem', color: '#D4A843',
              letterSpacing: '.18em', margin: 0,
            }}>
              {isla.nombre}
            </p>

            {/* CTA al hover */}
            <div style={{
              overflow: 'hidden',
              height: hovered ? '2.5rem' : '0',
              transition: 'height .35s ease',
              marginTop: '.75rem',
            }}>
              <span style={{
                display: 'inline-block',
                fontFamily: 'var(--font-raleway)',
                fontSize: '.55rem', letterSpacing: '.28em',
                textTransform: 'uppercase',
                color: '#C8922A',
                border: '1px solid rgba(200,146,42,0.5)',
                background: 'rgba(200,146,42,0.08)',
                padding: '.45rem 1.1rem',
              }}>
                RESERVAR
              </span>
            </div>

            {/* Línea dorada */}
            <div style={{
              width: hovered ? '40px' : '18px',
              height: '1px', background: '#C8922A',
              marginTop: '.8rem', opacity: .7,
              transition: 'width .4s ease',
            }} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ── Separador ornamental ───────────────────────────────────────── */
function OrnamentalDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: 'min(280px,70vw)', margin: '0 auto 1.5rem' }}>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(200,146,42,0.4))' }} />
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 1L8.1 5.5L12.5 7L8.1 8.5L7 13L5.9 8.5L1.5 7L5.9 5.5Z" fill="none" stroke="#C8922A" strokeWidth="1"/>
      </svg>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(200,146,42,0.4))' }} />
    </div>
  );
}

/* ── Componente principal ────────────────────────────────────────── */
export default function IslasSection() {
  return (
    <section
      id="islas"
      style={{
        background: '#1A0E05',
        padding: 'clamp(5rem,8vw,7rem) clamp(1.5rem,4vw,4rem)',
        borderTop: '1px solid rgba(200,146,42,0.15)',
      }}
    >
      {/* Cabecera */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem,5vw,5rem)' }}>
        <p style={{
          fontFamily: 'var(--font-raleway)', fontWeight: 300,
          fontSize: '.6rem', letterSpacing: '.55em',
          color: '#8A6940', textTransform: 'uppercase',
          margin: '0 0 1.2rem',
        }}>
          La Terraza
        </p>
        <h2 style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          color: '#C8922A', letterSpacing: '.15em', margin: '0 0 1.2rem',
        }}>
          LAS OCHO ISLAS
        </h2>
        <OrnamentalDivider />
        <p style={{
          fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
          fontSize: 'clamp(.9rem, 1.8vw, 1.1rem)',
          color: '#C4A882', maxWidth: '520px', margin: '0 auto', lineHeight: 1.8,
        }}>
          Cada agrupación lleva el nombre de una isla canaria.
          Elige la tuya y reserva tu espacio bajo las estrellas.
        </p>
      </div>

      {/* Grid 4×2 con perspectiva */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: 'clamp(8px, 1.5vw, 18px)',
        maxWidth: '1280px',
        margin: '0 auto',
        perspective: '1200px',
      }}>
        {ISLAS.map((isla, i) => (
          <IslaCard key={isla.nombre} isla={isla} index={i} />
        ))}
      </div>
    </section>
  );
}
