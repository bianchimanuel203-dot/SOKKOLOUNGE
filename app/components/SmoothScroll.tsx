'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Conectar Lenis con GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    // Acceso global para otros componentes
    (window as any).__lenis = lenis;

    // Refresh después de mount
    ScrollTrigger.refresh();

    // Las imágenes sin dimensiones reservadas desplazan el layout al cargar,
    // dejando desactualizadas las posiciones de los triggers (contenido que
    // se queda en opacity:0 al no disparar la animación de entrada).
    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState === 'complete') refresh();
    else window.addEventListener('load', refresh);
    window.addEventListener('resize', refresh);
    const images = Array.from(document.images).filter(img => !img.complete);
    images.forEach(img => img.addEventListener('load', refresh, { once: true }));
    const safetyTimers = [300, 1000, 2500].map(ms => setTimeout(refresh, ms));

    return () => {
      lenis.destroy();
      gsap.ticker.remove(ticker);
      (window as any).__lenis = null;
      window.removeEventListener('load', refresh);
      window.removeEventListener('resize', refresh);
      images.forEach(img => img.removeEventListener('load', refresh));
      safetyTimers.forEach(clearTimeout);
    };
  }, []);

  return <>{children}</>;
}
