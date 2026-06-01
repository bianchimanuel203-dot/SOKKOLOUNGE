'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  children: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p';
  style?: React.CSSProperties;
  delay?: number;
}

export default function RevealText({ children, tag = 'h2', style, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const words = ref.current.querySelectorAll('.word');

    gsap.fromTo(words,
      {
        y: '110%',
        opacity: 0,
        rotateX: -40,
      },
      {
        y: '0%',
        opacity: 1,
        rotateX: 0,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.06,
        delay,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, [delay]);

  const Tag = tag;
  const wrappedWords = children.split(' ').map((word, i) => (
    <span key={i} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.25em' }}>
      <span className="word" style={{ display: 'inline-block' }}>{word}</span>
    </span>
  ));

  return (
    <div ref={ref}>
      <Tag style={{ ...style, margin: 0 }}>{wrappedWords}</Tag>
    </div>
  );
}