'use client';
import React, { useState, useEffect, useRef, HTMLAttributes } from 'react';

const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
}

export interface GalleryItem {
  common: string;
  binomial: string;
  photo: { url: string; text: string; pos?: string; by: string; };
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  radius?: number;
  autoRotateSpeed?: number;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  ({ items, className, radius = 400, autoRotateSpeed = 0.055, ...props }, ref) => {
    const [rotation, setRotation] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolling(true);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
        setRotation(scrollProgress * 360);
        scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 150);
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      };
    }, []);

    useEffect(() => {
      const autoRotate = () => {
        if (!isScrolling) setRotation(prev => prev + autoRotateSpeed);
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };
      animationFrameRef.current = requestAnimationFrame(autoRotate);
      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      };
    }, [isScrolling, autoRotateSpeed]);

    const anglePerItem = 360 / items.length;

    return (
      <div
        ref={ref}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn(className)}
        style={{
          width: '100%', height: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          perspective: '2000px',
          perspectiveOrigin: '50% 50%'
        }}
        {...props}
      >
        {/* Contenedor fijo centrado */}
        <div style={{
          width: '1px', height: '1px',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: `rotateY(${rotation}deg)`,
        }}>
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
            const opacity = Math.max(0.3, 1 - (normalizedAngle / 180));

            return (
              <div
                key={item.photo.url}
                role="group"
                aria-label={item.common}
                style={{
                  position: 'absolute',
                  width: '300px', height: '400px',
                  marginLeft: '-150px', marginTop: '-200px',
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  opacity,
                  transition: 'opacity 0.3s linear'
                }}
              >
                <div style={{
                  width: '100%', height: '100%',
                  borderRadius: '12px', overflow: 'hidden',
                  border: '1px solid rgba(201,168,76,.2)',
                  background: '#0A0804',
                  boxShadow: '0 25px 80px rgba(0,0,0,.9)'
                }}>
                  <img
                    src={item.photo.url}
                    alt={item.photo.text}
                    style={{
                      position: 'absolute', inset: 0,
                      width: '100%', height: '100%',
                      objectFit: 'cover',
                      objectPosition: item.photo.pos || 'center'
                    }}
                  />
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    padding: '1.5rem 1.2rem',
                    background: 'linear-gradient(to top, rgba(10,8,4,1) 0%, rgba(10,8,4,.7) 50%, transparent 100%)'
                  }}>
                    <h2 style={{
                      fontFamily: 'var(--font-cinzel)', color: '#C9A84C',
                      fontSize: '.85rem', letterSpacing: '.1em', margin: 0
                    }}>
                      {item.common}
                    </h2>
                    <p style={{
                      fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
                      color: '#8A6E2F', fontSize: '.75rem', marginTop: '.2rem'
                    }}>
                      {item.binomial}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';
export { CircularGallery };