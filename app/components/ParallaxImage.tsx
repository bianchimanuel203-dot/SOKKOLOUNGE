'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  src: string;
  alt: string;
  style?: React.CSSProperties;
  speed?: number;
}

export default function ParallaxImage({ src, alt, style, speed = 0.3 }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!wrapperRef.current || !imgRef.current) return;

    gsap.fromTo(imgRef.current,
      { yPercent: -10 * speed * 10 },
      {
        yPercent: 10 * speed * 10,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  }, [speed]);

  return (
    <div ref={wrapperRef} style={{ overflow: 'hidden', ...style }}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '120%',
          objectFit: 'cover',
          willChange: 'transform',
        }}
      />
    </div>
  );
}