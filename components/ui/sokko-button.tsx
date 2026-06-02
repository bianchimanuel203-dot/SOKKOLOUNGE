'use client';

import { cn } from '@/lib/utils';
import { motion, useAnimate } from 'motion/react';
import React from 'react';

interface SokkoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'gold' | 'outline' | 'ghost';
  href?: string;
  as?: 'button' | 'a';
}

export const SokkoButton = ({
  className,
  children,
  variant = 'gold',
  href,
  as: Tag = href ? 'a' : 'button',
  ...props
}: SokkoButtonProps & { as?: React.ElementType }) => {
  const [scope, animate] = useAnimate();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await animate('.sokko-shimmer', { x: ['-100%', '100%'] }, { duration: 0.55, ease: 'easeInOut' });
    (props as any).onClick?.(e);
  };

  const variantStyle: React.CSSProperties =
    variant === 'gold'
      ? { background: '#C8922A', color: '#1A0E05', border: 'none' }
      : variant === 'outline'
      ? { background: 'transparent', color: '#C8922A', border: '1px solid rgba(200,146,42,0.65)' }
      : { background: 'transparent', color: '#C4A882', border: '1px solid rgba(200,146,42,0.3)' };

  return (
    <motion.button
      ref={scope}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
      style={{
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'var(--font-raleway)',
        fontWeight: 400,
        fontSize: '11px',
        letterSpacing: '.25em',
        textTransform: 'uppercase' as const,
        padding: '12px 32px',
        cursor: 'pointer',
        display: 'inline-block',
        transition: 'all .2s ease',
        ...variantStyle,
      }}
      className={cn('inline-block', className)}
      {...(props as any)}
    >
      {/* Shimmer */}
      <span
        className="sokko-shimmer"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
          transform: 'translateX(-100%)',
          pointerEvents: 'none',
        }}
      />
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </motion.button>
  );
};

export default SokkoButton;
