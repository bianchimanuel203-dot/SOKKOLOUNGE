'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Separador ornamental ───────────────────────────────────────── */
function OrnamentalDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', width: 'min(340px,80vw)', margin: '0 auto' }}>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(200,146,42,0.65))' }} />
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 1L11.9 8.1L19 10L11.9 11.9L10 19L8.1 11.9L1 10L8.1 8.1Z" stroke="#C8922A" strokeWidth="1.2" fill="none" />
      </svg>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(200,146,42,0.65))' }} />
    </div>
  );
}

export default function HeroThreeJS() {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const sectionRef  = useRef<HTMLElement>(null);
  const textRef     = useRef<HTMLDivElement>(null);
  const sokkoRef    = useRef<HTMLHeadingElement>(null);
  const loungRef    = useRef<HTMLParagraphElement>(null);
  const divRef      = useRef<HTMLDivElement>(null);
  const taglineRef  = useRef<HTMLParagraphElement>(null);
  const fuerteRef   = useRef<HTMLParagraphElement>(null);
  const btnRef      = useRef<HTMLAnchorElement>(null);
  const img1Ref     = useRef<HTMLDivElement>(null);
  const img2Ref     = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLCanvasElement>(null);
  const rafRef      = useRef<number>(0);

  /* ── Canvas partículas doradas ──────────────────────────────── */
  useEffect(() => {
    const canvas = particlesRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    type P = { x: number; y: number; vx: number; vy: number; size: number; alpha: number; aDir: number; phase: number };
    const particles: P[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: -(Math.random() * 0.4 + 0.1),
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
      aDir: Math.random() > 0.5 ? 1 : -1,
      phase: Math.random() * Math.PI * 2,
    }));

    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      particles.forEach(p => {
        p.x += p.vx + Math.sin(p.phase + frame * 0.009) * 0.2;
        p.y += p.vy;
        p.alpha += p.aDir * 0.004;
        if (p.alpha > 0.65 || p.alpha < 0.05) p.aDir *= -1;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,146,42,${p.alpha.toFixed(3)})`;
        ctx.fill();
      });
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* ── GSAP — entrada de texto con chars split ─────────────────── */
  useEffect(() => {
    if (!sokkoRef.current) return;

    // Preparar chars de SOKKO para stagger
    const sokkoEl = sokkoRef.current;
    const text = sokkoEl.textContent || 'SOKKO';
    sokkoEl.innerHTML = text.split('').map(c =>
      `<span class="sokko-char" style="display:inline-block; overflow:hidden"><span style="display:inline-block">${c === ' ' ? '&nbsp;' : c}</span></span>`
    ).join('');

    const chars = sokkoEl.querySelectorAll('.sokko-char > span');

    const tl = gsap.timeline({ delay: 0.3 });

    // Chars de SOKKO caen desde arriba
    tl.fromTo(chars,
      { y: -120, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, ease: 'power4.out', stagger: 0.08 }
    );

    // ·LOUNGE·
    if (loungRef.current) {
      tl.fromTo(loungRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      );
    }

    // Separador — scale-x
    if (divRef.current) {
      tl.fromTo(divRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.0, ease: 'expo.out', transformOrigin: 'center' },
        '-=0.5'
      );
    }

    // EL RESGUARDO
    if (taglineRef.current) {
      tl.fromTo(taglineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
        '-=0.6'
      );
    }

    // FUERTEVENTURA
    if (fuerteRef.current) {
      tl.fromTo(fuerteRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.7, ease: 'power2.out' },
        '-=0.5'
      );
    }

    // Botón
    if (btnRef.current) {
      tl.fromTo(btnRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.4'
      );
    }

    return () => { tl.kill(); };
  }, []);

  /* ── GSAP ScrollTrigger — crossfade + parallax ───────────────── */
  useEffect(() => {
    if (!sectionRef.current || !img1Ref.current || !img2Ref.current) return;

    // Crossfade bg: portada → madera al 30-70% del scroll
    const stCross = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
      onUpdate: (self) => {
        const p = self.progress;

        // Crossfade entre img1 e img2
        if (p > 0.3 && img2Ref.current) {
          const fade = Math.min(1, (p - 0.3) / 0.4);
          img2Ref.current.style.opacity = String(fade);
        } else if (img2Ref.current) {
          img2Ref.current.style.opacity = '0';
        }

        // Texto sube y desaparece
        if (textRef.current) {
          const textFade = Math.max(0, 1 - p * 2.2);
          textRef.current.style.opacity = String(textFade);
          textRef.current.style.transform = `translateY(${p * -120}px)`;
        }
      },
    });

    // Parallax suave del fondo al scroll
    gsap.to(img1Ref.current, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    if (img2Ref.current) {
      gsap.to(img2Ref.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    return () => { stCross.kill(); ScrollTrigger.refresh(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero-section"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '600px',
        background: '#1A0E05',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* BG 1 — portada: palmeras + terraza dorada — posición alta para mostrar el cielo/palmeras */}
      <div
        ref={img1Ref}
        style={{
          position: 'absolute', inset: '-20% 0',
          backgroundImage: 'url(/hero/hero-portada.jpg)',
          backgroundSize: 'cover', backgroundPosition: '50% 5%',
          willChange: 'transform',
        }}
      />

      {/* BG 2 — madera volcánica (crossfade) */}
      <div
        ref={img2Ref}
        style={{
          position: 'absolute', inset: '-20% 0',
          backgroundImage: 'url(/hero/hero-madera.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          willChange: 'transform',
          opacity: 0,
        }}
      />

      {/* Overlay oscuro sobre ambos fondos — opaco para ocultar texto baked-in de la imagen portada */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(26,14,5,0.82) 0%, rgba(26,14,5,0.68) 35%, rgba(26,14,5,0.88) 100%)',
      }} />

      {/* Radial glow central */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 70% 55% at 50% 42%, rgba(200,146,42,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Partículas doradas canvas */}
      <canvas
        ref={particlesRef}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }}
      />

      {/* Contenido central */}
      <div
        ref={textRef}
        style={{
          position: 'relative', zIndex: 3,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', textAlign: 'center',
          padding: '0 1.5rem',
          willChange: 'transform, opacity',
        }}
      >
        {/* SOKKO */}
        <h1
          ref={sokkoRef}
          className="hero-sokko-title"
          style={{
            fontFamily: 'var(--font-cinzel)',
            fontSize: 'clamp(80px, 12vw, 160px)',
            color: '#C8922A',
            letterSpacing: '.12em',
            lineHeight: 1,
            margin: '0 0 .4rem',
            textShadow: '0 0 80px rgba(200,146,42,0.5), 0 0 160px rgba(200,146,42,0.2)',
          }}
        >
          SOKKO
        </h1>

        {/* ·LOUNGE· */}
        <p
          ref={loungRef}
          className="hero-lounge-title"
          style={{
            fontFamily: 'var(--font-cinzel)',
            fontSize: 'clamp(20px, 3vw, 40px)',
            letterSpacing: '1.5em',
            color: '#8A6940',
            margin: '0 0 1.8rem',
            paddingLeft: '1.5em', // compensar letter-spacing
          }}
        >
          ·LOUNGE·
        </p>

        {/* Separador ornamental */}
        <div ref={divRef} style={{ width: '100%', marginBottom: '1.8rem' }}>
          <OrnamentalDivider />
        </div>

        {/* EL RESGUARDO DEL VIENTO */}
        <p
          ref={taglineRef}
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontStyle: 'italic',
            fontSize: 'clamp(16px, 2vw, 28px)',
            color: '#C4A882',
            letterSpacing: '.06em',
            margin: '0 0 .8rem',
          }}
        >
          EL RESGUARDO DEL VIENTO
        </p>

        {/* FUERTEVENTURA */}
        <p
          ref={fuerteRef}
          style={{
            fontFamily: 'var(--font-raleway)',
            fontWeight: 300,
            fontSize: '13px',
            letterSpacing: '.5em',
            color: '#8A6940',
            textTransform: 'uppercase',
            margin: '0 0 3rem',
            paddingLeft: '.5em',
          }}
        >
          FUERTEVENTURA
        </p>

        {/* Botón */}
        <a
          ref={btnRef}
          href="#origen"
          className="hero-cta-btn"
          style={{
            fontFamily: 'var(--font-raleway)',
            fontWeight: 400,
            fontSize: 'clamp(11px, 1.2vw, 13px)',
            letterSpacing: '.3em',
            textTransform: 'uppercase',
            color: '#C8922A',
            border: '1px solid rgba(200,146,42,0.65)',
            background: 'rgba(200,146,42,0.05)',
            padding: '.9rem 3.5rem',
            textDecoration: 'none',
            cursor: 'pointer',
            display: 'inline-block',
            transition: 'background .3s ease, color .3s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = '#C8922A';
            (e.currentTarget as HTMLElement).style.color = '#1A0E05';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = 'rgba(200,146,42,0.05)';
            (e.currentTarget as HTMLElement).style.color = '#C8922A';
          }}
        >
          EXPLORAR LA EXPERIENCIA
        </a>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '2.5rem', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '.5rem', zIndex: 3,
      }}>
        <span style={{
          fontFamily: 'var(--font-raleway)',
          fontSize: '.5rem', letterSpacing: '.4em',
          textTransform: 'uppercase', color: '#8A6940',
        }}>DESCUBRIR</span>
        <div style={{
          width: '1px', height: '50px',
          background: 'linear-gradient(to bottom, rgba(200,146,42,0.6), transparent)',
          animation: 'scrollDrop 2s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @keyframes scrollDrop {
          0%   { transform: scaleY(0); transform-origin: top; }
          50%  { transform: scaleY(1); transform-origin: top; }
          50.01% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
        @media (max-width: 768px) {
          .hero-sokko-title { font-size: 56px !important; }
          .hero-lounge-title { font-size: 18px !important; letter-spacing: .6em !important; }
          .hero-cta-btn { padding: .9rem 1.75rem !important; }
        }
        @media (max-width: 480px) {
          .hero-sokko-title { font-size: 32px !important; letter-spacing: .08em !important; }
          .hero-lounge-title { font-size: 14px !important; letter-spacing: .4em !important; }
          .hero-cta-btn { font-size: 10px !important; letter-spacing: .2em !important; padding: .85rem 1.25rem !important; }
        }
      `}</style>
    </section>
  );
}
