'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
  direction?: 'up' | 'left' | 'right' | 'scale';
  delay?: number;
}

export default function RevealSection({ children, style, direction = 'up', delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const fromVars: gsap.TweenVars = {
      opacity: 0,
      duration: 1.4,
      ease: 'power3.out',
      delay,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    };

    if (direction === 'up')    { fromVars.y = 80; }
    if (direction === 'left')  { fromVars.x = -80; }
    if (direction === 'right') { fromVars.x = 80; }
    if (direction === 'scale') { fromVars.scale = 0.92; fromVars.y = 40; }

    gsap.from(ref.current, fromVars);
  }, [direction, delay]);

  return (
    <div ref={ref} style={style}>
      {children}
    </div>
  );
}