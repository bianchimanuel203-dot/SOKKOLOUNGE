'use client';
import { useEffect, useRef } from 'react';

/* ── Partículas doradas ─────────────────────────────────────────── */
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number; alpha: number;
  alphaDir: number; phase: number;
}

function initParticles(count: number, W: number, H: number): Particle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.22,
    vy: -(Math.random() * 0.35 + 0.12),
    size: Math.random() * 1.8 + 0.6,
    alpha: Math.random() * 0.5 + 0.1,
    alphaDir: Math.random() > 0.5 ? 1 : -1,
    phase: Math.random() * Math.PI * 2,
  }));
}

/* ── Separador ornamental ───────────────────────────────────────── */
function OrnamentalDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', width: 'min(340px, 80vw)', margin: '0 auto' }}>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(200,146,42,0.6))' }} />
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 1L11.8 8.2L19 10L11.8 11.8L10 19L8.2 11.8L1 10L8.2 8.2Z"
          fill="none" stroke="#C8922A" strokeWidth="1.2" />
      </svg>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(200,146,42,0.6))' }} />
    </div>
  );
}

/* ── Logo medallón SVG ──────────────────────────────────────────── */
function LogoMedallon({ size = 220 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Círculos exterior */}
      <circle cx="100" cy="100" r="96" stroke="#C8922A" strokeWidth="1.5" strokeOpacity="0.4" />
      <circle cx="100" cy="100" r="89" stroke="#C8922A" strokeWidth="0.8" strokeOpacity="0.6" />
      <circle cx="100" cy="100" r="83" stroke="#C8922A" strokeWidth="0.4" strokeOpacity="0.3" />
      {/* Puntos cardinales */}
      {[0, 90, 180, 270].map(deg => {
        const rad = (deg * Math.PI) / 180;
        const cx = 100 + Math.sin(rad) * 93;
        const cy = 100 - Math.cos(rad) * 93;
        return <circle key={deg} cx={cx} cy={cy} r="2" fill="#C8922A" fillOpacity="0.7" />;
      })}
      {/* Arco/umbral */}
      <path d="M42,148 Q42,46 100,40 Q158,46 158,148" stroke="#C8922A" strokeWidth="1.5" strokeOpacity="0.8" fill="none" />
      {/* Palmera */}
      <line x1="82" y1="138" x2="82" y2="84" stroke="#C8922A" strokeWidth="2" strokeOpacity="0.9" />
      <path d="M82,84 Q64,67 54,74" stroke="#C8922A" strokeWidth="1.5" fill="none" strokeOpacity="0.85" />
      <path d="M82,84 Q76,62 70,66" stroke="#C8922A" strokeWidth="1.5" fill="none" strokeOpacity="0.85" />
      <path d="M82,84 Q87,60 94,63" stroke="#C8922A" strokeWidth="1.5" fill="none" strokeOpacity="0.85" />
      <path d="M82,84 Q96,72 100,76" stroke="#C8922A" strokeWidth="1.2" fill="none" strokeOpacity="0.7" />
      {/* Volcán */}
      <path d="M100,140 L120,96 L140,140 Z" stroke="#C8922A" strokeWidth="1.5" fill="none" strokeOpacity="0.8" />
      <path d="M107,140 L120,115 L133,140" stroke="#C8922A" strokeWidth="0.8" fill="rgba(200,146,42,0.06)" strokeOpacity="0.5" />
      {/* Sol */}
      <circle cx="118" cy="76" r="7" stroke="#C8922A" strokeWidth="1.5" strokeOpacity="0.9" />
      <circle cx="118" cy="76" r="3" fill="#C8922A" fillOpacity="0.6" />
      {/* Edificio árabe */}
      <rect x="72" y="118" width="18" height="22" rx="1" stroke="#C8922A" strokeWidth="1" strokeOpacity="0.8" fill="none" />
      <path d="M76,118 Q81,110 86,118" stroke="#C8922A" strokeWidth="1" fill="none" strokeOpacity="0.8" />
      <line x1="81" y1="118" x2="81" y2="140" stroke="#C8922A" strokeWidth="0.6" strokeOpacity="0.4" />
      {/* Agua/horizonte */}
      <path d="M42,148 Q71,142 100,148 Q129,154 158,148" stroke="#C8922A" strokeWidth="0.8" fill="none" strokeOpacity="0.5" />
    </svg>
  );
}

export default function HeroSection() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const bgRef      = useRef<HTMLDivElement>(null);
  const rafRef     = useRef<number>(0);

  /* ── Canvas partículas ──────────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let particles = initParticles(55, canvas.width, canvas.height);
    let frame = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      particles.forEach((p) => {
        p.x += p.vx + Math.sin(p.phase + frame * 0.01) * 0.18;
        p.y += p.vy;
        p.alpha += p.alphaDir * 0.004;
        if (p.alpha >= 0.65 || p.alpha <= 0.05) p.alphaDir *= -1;

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,146,42,${p.alpha.toFixed(3)})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* ── Parallax suave del fondo al scroll ─────────────────────── */
  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#1A0E05',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: '80px',
        paddingBottom: '4rem',
      }}
    >
      {/* Fondo con imagen + parallax */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: '-20%',
          backgroundImage: 'url(/zonas/zona-terraza.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.18,
          willChange: 'transform',
        }}
      />

      {/* Radial glow central */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(200,146,42,0.14) 0%, rgba(26,14,5,0.0) 70%)',
        pointerEvents: 'none',
      }} />

      {/* Canvas partículas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute', inset: 0,
          pointerEvents: 'none', zIndex: 1,
        }}
      />

      {/* Contenido central */}
      <div style={{
        position: 'relative', zIndex: 2,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', textAlign: 'center',
        gap: 0,
        animation: 'heroFadeIn 1.8s ease both',
      }}>

        {/* Medallón con borde conic animado */}
        <div style={{
          position: 'relative',
          width: 'clamp(180px, 25vw, 260px)',
          height: 'clamp(180px, 25vw, 260px)',
          marginBottom: '2.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'heroFadeIn 1.8s 0.1s both',
        }}>
          {/* Anillo conic rotando */}
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'conic-gradient(from 0deg, transparent 0%, #C8922A 25%, transparent 50%, #C8922A 75%, transparent 100%)',
            opacity: 0.3,
            animation: 'spinGold 8s linear infinite',
          }} />
          <div style={{
            position: 'absolute', inset: '4px', borderRadius: '50%',
            background: '#1A0E05',
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <LogoMedallon size={200} />
          </div>
        </div>

        {/* SOKKO */}
        <h1 style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: 'clamp(4.5rem, 13vw, 10rem)',
          color: '#C8922A',
          letterSpacing: '.16em',
          lineHeight: 1,
          margin: 0,
          textShadow: '0 0 60px rgba(200,146,42,0.5), 0 0 120px rgba(200,146,42,0.2)',
          animation: 'heroFadeIn 1.4s 0.3s both',
        }}>
          SOKKO
        </h1>

        {/* ·LOUNGE· */}
        <p style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: 'clamp(.7rem, 2vw, 1.1rem)',
          letterSpacing: '1.2em',
          color: '#8A6940',
          marginTop: '.5rem',
          marginBottom: '2rem',
          animation: 'heroFadeIn 1.4s 0.45s both',
        }}>
          ·LOUNGE·
        </p>

        {/* Separador ornamental */}
        <div style={{ animation: 'heroFadeIn 1.4s 0.55s both', width: '100%' }}>
          <OrnamentalDivider />
        </div>

        {/* EL RESGUARDO DEL VIENTO */}
        <p style={{
          fontFamily: 'var(--font-cormorant)',
          fontStyle: 'italic',
          fontSize: 'clamp(1rem, 2.5vw, 1.6rem)',
          color: '#C4A882',
          marginTop: '1.8rem',
          marginBottom: '1.2rem',
          letterSpacing: '.08em',
          animation: 'heroFadeIn 1.4s 0.65s both',
        }}>
          EL RESGUARDO DEL VIENTO
        </p>

        {/* RESGUARDO · CALMA · CONEXIÓN */}
        <p style={{
          fontFamily: 'var(--font-raleway)',
          fontWeight: 300,
          fontSize: 'clamp(.6rem, 1.4vw, .85rem)',
          letterSpacing: '.4em',
          color: '#8A6940',
          textTransform: 'uppercase',
          marginBottom: '3rem',
          animation: 'heroFadeIn 1.4s 0.8s both',
        }}>
          RESGUARDO · CALMA · CONEXIÓN
        </p>

        {/* Botón EXPLORAR */}
        <a
          href="#proyecto"
          style={{
            fontFamily: 'var(--font-raleway)',
            fontWeight: 400,
            fontSize: 'clamp(.6rem, 1.2vw, .75rem)',
            letterSpacing: '.3em',
            textTransform: 'uppercase',
            color: '#C8922A',
            border: '1px solid rgba(200,146,42,0.6)',
            background: 'rgba(200,146,42,0.06)',
            padding: '.95rem 3.5rem',
            textDecoration: 'none',
            display: 'inline-block',
            cursor: 'pointer',
            transition: 'background .3s ease, color .3s ease',
            animation: 'heroFadeIn 1.4s 1s both',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(200,146,42,0.18)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(200,146,42,0.06)';
          }}
        >
          EXPLORAR LA EXPERIENCIA
        </a>

        {/* By Gorka */}
        <p style={{
          fontFamily: 'var(--font-cormorant)',
          fontStyle: 'italic',
          fontSize: 'clamp(.8rem, 1.5vw, 1rem)',
          color: 'rgba(138,105,64,0.55)',
          marginTop: '2.5rem',
          letterSpacing: '.06em',
          animation: 'heroFadeIn 1.4s 1.1s both',
        }}>
          By Gorka
        </p>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '2.5rem', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '.6rem', zIndex: 2,
        animation: 'heroFadeIn 1.4s 1.4s both',
      }}>
        <span style={{
          fontFamily: 'var(--font-raleway)',
          fontSize: '.5rem', letterSpacing: '.45em',
          textTransform: 'uppercase', color: '#8A6940',
        }}>
          DESCUBRIR
        </span>
        <div style={{
          width: '1px', height: '50px',
          background: 'linear-gradient(to bottom, rgba(200,146,42,0.6), transparent)',
          animation: 'scrollDrop 2s ease-in-out infinite',
        }} />
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spinGold {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes scrollDrop {
          0%   { transform: scaleY(0); transform-origin: top; }
          50%  { transform: scaleY(1); transform-origin: top; }
          50.01% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
      `}</style>
    </section>
  );
}
