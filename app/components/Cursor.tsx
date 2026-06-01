'use client';
import { useEffect } from 'react';

export default function Cursor() {
  useEffect(() => {
    const cursor = document.getElementById('sokko-cursor');
    const ring = document.getElementById('sokko-ring');
    
    const move = (e: MouseEvent) => {
      if (cursor) { cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px'; }
      if (ring) { ring.style.left = e.clientX + 'px'; ring.style.top = e.clientY + 'px'; }
    };

    document.addEventListener('mousemove', move);
    return () => document.removeEventListener('mousemove', move);
  }, []);

  return (
    <>
      <div id="sokko-cursor" style={{
        position: 'fixed', width: '8px', height: '8px',
        background: '#C9A84C', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 9999,
        transform: 'translate(-50%, -50%)',
        transition: 'width .2s, height .2s',
        mixBlendMode: 'screen'
      }} />
      <div id="sokko-ring" style={{
        position: 'fixed', width: '32px', height: '32px',
        border: '1px solid rgba(201,168,76,.5)', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 9998,
        transform: 'translate(-50%, -50%)',
        transition: 'all .4s cubic-bezier(.19,1,.22,1)'
      }} />
    </>
  );
}