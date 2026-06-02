'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CardStack, CardStackItem } from './ui/card-stack';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const ISLAS: CardStackItem[] = [
  { id: 1, title: 'LANZAROTE',     description: 'Volcánica y única.',       imageSrc: '/islas/lanzarote.jpg',      href: '/terraza/lanzarote',     tag: 'La Terraza' },
  { id: 2, title: 'FUERTEVENTURA', description: 'Salvaje y libre.',          imageSrc: '/islas/Fuerteventura.jpg',  href: '/terraza/fuerteventura' },
  { id: 3, title: 'GRAN CANARIA',  description: 'Vibrante y cosmopolita.',   imageSrc: '/islas/Gran canaria.jpg',   href: '/terraza/gran-canaria' },
  { id: 4, title: 'TENERIFE',      description: 'Intensa y majestuosa.',     imageSrc: '/islas/Tenerife.jpg',       href: '/terraza/tenerife' },
  { id: 5, title: 'LA PALMA',      description: 'Verde y soñadora.',         imageSrc: '/islas/la palma.jpg',       href: '/terraza/la-palma' },
  { id: 6, title: 'LA GOMERA',     description: 'Auténtica y esencial.',     imageSrc: '/islas/La gomera.jpg',      href: '/terraza/la-gomera' },
  { id: 7, title: 'EL HIERRO',     description: 'Salvaje y espiritual.',     imageSrc: '/islas/el hierro.jpg',      href: '/terraza/el-hierro' },
  { id: 8, title: 'LA GRACIOSA',   description: 'Serena y exclusiva.',       imageSrc: '/islas/La graciosa.jpg',    href: '/terraza/la-graciosa' },
];

/* Card personalizada con tipografía SOKKO */
function SokkoIslaCard(item: CardStackItem, state: { active: boolean }) {
  return (
    <div style={{
      position: 'relative',
      width: '100%', height: '100%',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid rgba(200,146,42,0.3)',
      background: '#1A0E05',
      boxShadow: state.active
        ? '0 0 32px rgba(200,146,42,0.3), 0 16px 60px rgba(0,0,0,0.7)'
        : '0 8px 30px rgba(0,0,0,0.5)',
      cursor: 'pointer',
    }}>
      {/* Imagen */}
      {item.imageSrc && (
        <img
          src={item.imageSrc}
          alt={item.title}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            transition: 'transform .6s cubic-bezier(.19,1,.22,1)',
            transform: state.active ? 'scale(1.05)' : 'scale(1)',
          }}
        />
      )}

      {/* Overlay gradiente */}
      <div style={{
        position: 'absolute', inset: 0,
        background: state.active
          ? 'linear-gradient(to top, rgba(26,14,5,0.96) 0%, rgba(26,14,5,0.5) 55%, rgba(26,14,5,0.12) 100%)'
          : 'linear-gradient(to top, rgba(26,14,5,0.92) 0%, rgba(26,14,5,0.35) 55%, rgba(26,14,5,0.08) 100%)',
        transition: 'background .4s ease',
      }} />

      {/* Tag */}
      {item.tag && (
        <div style={{
          position: 'absolute', top: '1rem', left: '1rem',
          fontFamily: 'var(--font-cinzel)',
          fontSize: '.55rem', letterSpacing: '.4em',
          color: 'rgba(200,146,42,0.8)', textTransform: 'uppercase',
        }}>{item.tag}</div>
      )}

      {/* Contenido inferior */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '1.75rem 1.5rem',
        transform: state.active ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'transform .4s cubic-bezier(.19,1,.22,1)',
      }}>
        <p style={{
          fontFamily: 'var(--font-cormorant)',
          fontStyle: 'italic',
          fontSize: '.9rem', color: '#C4A882',
          margin: '0 0 .4rem', lineHeight: 1.3,
        }}>
          {item.description}
        </p>
        <p style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: '1.05rem',
          color: '#D4A843',
          letterSpacing: '.18em', margin: 0,
        }}>
          {item.title}
        </p>

        {/* CTA al hover */}
        {state.active && item.href && (
          <Link href={item.href} style={{
            display: 'inline-block',
            marginTop: '1rem',
            fontFamily: 'var(--font-raleway)',
            fontSize: '.55rem', letterSpacing: '.28em',
            textTransform: 'uppercase',
            color: '#C8922A',
            border: '1px solid rgba(200,146,42,0.5)',
            background: 'rgba(200,146,42,0.08)',
            padding: '.5rem 1.2rem',
            textDecoration: 'none',
          }}>
            RESERVAR
          </Link>
        )}

        {/* Línea dorada */}
        <div style={{
          width: state.active ? '40px' : '18px',
          height: '1px',
          background: '#C8922A',
          marginTop: '1rem',
          transition: 'width .4s ease',
          opacity: .7,
        }} />
      </div>
    </div>
  );
}

export default function IslasCardStack() {
  useEffect(() => {
    gsap.fromTo('.islas-section',
      { scale: 0.95, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.islas-section', start: 'top 80%', once: true } }
    );
  }, []);

  return (
    <section
      id="terraza"
      className="islas-section"
      style={{
        background: '#1A0E05',
        padding: 'clamp(5rem,8vw,7rem) 2rem',
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
          color: '#C8922A', letterSpacing: '.15em', margin: '0 0 1rem',
        }}>
          LAS OCHO ISLAS
        </h2>

        {/* Separador */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: 'min(280px,70vw)', margin: '0 auto 1.5rem' }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(200,146,42,0.4))' }} />
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1L8.1 5.5L12.5 7L8.1 8.5L7 13L5.9 8.5L1.5 7L5.9 5.5Z" fill="none" stroke="#C8922A" strokeWidth="1"/>
          </svg>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(200,146,42,0.4))' }} />
        </div>

        <p style={{
          fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
          fontSize: 'clamp(.9rem, 1.8vw, 1.1rem)',
          color: '#C4A882', maxWidth: '520px', margin: '0 auto', lineHeight: 1.8,
        }}>
          Cada agrupación lleva el nombre de una isla canaria.
          Elige la tuya y reserva tu espacio bajo las estrellas.
        </p>
      </div>

      {/* CardStack 3D fan */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CardStack
          items={ISLAS}
          cardWidth={480}
          cardHeight={340}
          overlap={0.52}
          spreadDeg={52}
          depthPx={120}
          activeLiftPx={28}
          activeScale={1.04}
          inactiveScale={0.92}
          autoAdvance={true}
          intervalMs={3500}
          pauseOnHover={true}
          showDots={true}
          loop={true}
          springStiffness={260}
          springDamping={26}
          renderCard={SokkoIslaCard}
        />
      </div>
    </section>
  );
}
