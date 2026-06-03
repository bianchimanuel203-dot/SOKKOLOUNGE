'use client';

import React, { CSSProperties, ReactNode, HTMLAttributes } from 'react';

type AnimationMode = 'auto-rotate' | 'rotate-on-hover' | 'stop-rotate-on-hover';

interface BorderRotateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  children: ReactNode;
  className?: string;
  animationMode?: AnimationMode;
  animationSpeed?: number;
  gradientColors?: { primary: string; secondary: string; accent: string };
  backgroundColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  style?: CSSProperties;
}

const defaultGradientColors = {
  primary: '#584827',
  secondary: '#C8922A',
  accent: '#E8B84B',
};

export const BorderRotate: React.FC<BorderRotateProps> = ({
  children,
  className = '',
  animationMode = 'auto-rotate',
  animationSpeed = 5,
  gradientColors = defaultGradientColors,
  backgroundColor = '#241508',
  borderWidth = 1,
  borderRadius = 4,
  style = {},
  ...props
}) => {
  const animClass =
    animationMode === 'auto-rotate' ? 'gradient-border-auto' :
    animationMode === 'rotate-on-hover' ? 'gradient-border-hover' :
    'gradient-border-stop-hover';

  const combinedStyle: CSSProperties = {
    '--animation-duration': `${animationSpeed}s`,
    border: `${borderWidth}px solid transparent`,
    borderRadius: `${borderRadius}px`,
    backgroundImage: `
      linear-gradient(${backgroundColor}, ${backgroundColor}),
      conic-gradient(
        from var(--gradient-angle, 0deg),
        ${gradientColors.primary} 0%,
        ${gradientColors.secondary} 37%,
        ${gradientColors.accent} 50%,
        ${gradientColors.secondary} 63%,
        ${gradientColors.primary} 100%
      )
    `,
    backgroundClip: 'padding-box, border-box',
    backgroundOrigin: 'padding-box, border-box',
    ...style,
  } as CSSProperties;

  return (
    <div className={`gradient-border-component ${animClass} ${className}`} style={combinedStyle} {...props}>
      {children}
    </div>
  );
};
