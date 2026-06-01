'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Cursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot   = dotRef.current;
    const ring  = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    // Posición suavizada del anillo con GSAP quickTo
    const xDot  = gsap.quickTo(dot,  'x', { duration: 0.12, ease: 'power3.out' });
    const yDot  = gsap.quickTo(dot,  'y', { duration: 0.12, ease: 'power3.out' });
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' });
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' });
    const xLabel = gsap.quickTo(label, 'x', { duration: 0.45, ease: 'power3.out' });
    const yLabel = gsap.quickTo(label, 'y', { duration: 0.45, ease: 'power3.out' });

    const move = (e: MouseEvent) => {
      xDot(e.clientX);  yDot(e.clientY);
      xRing(e.clientX); yRing(e.clientY);
      xLabel(e.clientX); yLabel(e.clientY);
    };

    // Hover: links & buttons → expande anillo
    const onEnterInteractive = (e: MouseEvent) => {
      const target = e.target as Element;
      const isReservar = !!target.closest('[data-cursor="reservar"]');

      // Punto central
      gsap.to(dot, { scale: 0.4, opacity: 0.4, duration: 0.25 });

      // Anillo
      gsap.to(ring, {
        scale: isReservar ? 3.0 : 2.2,
        borderColor: '#C8922A',
        borderWidth: isReservar ? '1.5px' : '1px',
        duration: 0.35,
        ease: 'power3.out',
      });

      // Label "RESERVAR"
      if (isReservar) {
        gsap.to(label, { opacity: 1, scale: 1, duration: 0.3, ease: 'power3.out' });
      }
    };

    const onLeaveInteractive = () => {
      gsap.to(dot, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(ring, {
        scale: 1,
        borderColor: 'rgba(200,146,42,0.45)',
        borderWidth: '1px',
        duration: 0.45,
        ease: 'power3.out',
      });
      gsap.to(label, { opacity: 0, scale: 0.7, duration: 0.2 });
    };

    document.addEventListener('mousemove', move);

    // Delegar eventos sobre elementos interactivos
    document.addEventListener('mouseover', (e) => {
      const t = e.target as Element;
      if (t.closest('a, button, [data-cursor]')) onEnterInteractive(e);
    });
    document.addEventListener('mouseout', (e) => {
      const t = e.target as Element;
      if (t.closest('a, button, [data-cursor]')) onLeaveInteractive();
    });

    return () => {
      document.removeEventListener('mousemove', move);
    };
  }, []);

  return (
    <>
      {/* Punto central — rápido */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: '7px', height: '7px',
          background: '#C8922A', borderRadius: '50%',
          pointerEvents: 'none', zIndex: 10000,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />

      {/* Anillo exterior — lag suave */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: '36px', height: '36px',
          border: '1px solid rgba(200,146,42,0.45)',
          borderRadius: '50%',
          pointerEvents: 'none', zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />

      {/* Label "RESERVAR" — visible en hover de islas */}
      <div
        ref={labelRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          pointerEvents: 'none', zIndex: 10001,
          transform: 'translate(-50%, -50%) scale(0.7)',
          opacity: 0,
          fontFamily: 'var(--font-raleway)',
          fontSize: '.45rem',
          letterSpacing: '.25em',
          textTransform: 'uppercase',
          color: '#C8922A',
          whiteSpace: 'nowrap',
          willChange: 'transform, opacity',
        }}
      >
        RESERVAR
      </div>
    </>
  );
}
