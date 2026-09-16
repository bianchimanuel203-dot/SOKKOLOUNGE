'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    onScroll();
    onResize();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isMobile ? '0 1.5rem' : '0 3rem',
        background: scrolled ? 'rgba(26,14,5,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(200,146,42,0.15)' : 'none',
        transition: 'background .3s ease, border-color .3s ease, backdrop-filter .3s ease',
      }}>

        {/* Logo izquierda */}
        <Link href="/" style={{
          fontFamily: 'var(--font-cinzel, Cinzel, serif)',
          fontSize: '15px',
          color: '#C8922A',
          letterSpacing: '.3em',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}>
          SOKKO LOUNGE
        </Link>

        {/* Desktop — links centro */}
        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
            {[
              { label: 'INICIO',   href: '#inicio' },
              { label: 'ZONAS',    href: '#espacios' },
              { label: 'ISLAS',    href: '#islas' },
              { label: 'EVENTOS',  href: '#eventos' },
              { label: 'CARTA',    href: '#menu' },
              { label: 'HORARIOS', href: '#horarios' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                style={{
                  fontFamily: 'var(--font-raleway, Raleway, sans-serif)',
                  fontWeight: 300,
                  fontSize: '11px',
                  letterSpacing: '.2em',
                  color: '#C4A882',
                  textDecoration: 'none',
                  transition: 'color .2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#C8922A')}
                onMouseLeave={e => (e.currentTarget.style.color = '#C4A882')}
              >
                {label}
              </a>
            ))}
          </div>
        )}

        {/* Desktop — botón RESERVAR derecha */}
        {!isMobile && (
          <a
            href="#contacto"
            style={{
              fontFamily: 'var(--font-raleway, Raleway, sans-serif)',
              fontWeight: 400,
              fontSize: '11px',
              letterSpacing: '.2em',
              color: '#C8922A',
              border: '1px solid #C8922A',
              padding: '10px 24px',
              textDecoration: 'none',
              transition: 'all .2s ease',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#C8922A';
              e.currentTarget.style.color = '#1A0E05';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#C8922A';
            }}
          >
            RESERVAR
          </a>
        )}

        {/* Mobile — hamburguesa */}
        {isMobile && (
          <button
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Menú"
            style={{
              background: 'transparent', border: 'none',
              width: '48px', height: '48px',
              cursor: 'pointer',
              display: 'flex', flexDirection: 'column',
              gap: '5px', alignItems: 'flex-end', justifyContent: 'center',
            }}
          >
            {[22, 16, 22].map((w, i) => (
              <span key={i} style={{
                display: 'block', height: '1.5px',
                background: '#C8922A', width: `${w}px`,
                transition: 'transform .3s ease, opacity .3s ease',
                transform: i === 0 && mobileOpen ? 'translateY(6.5px) rotate(45deg)'
                           : i === 2 && mobileOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
                opacity: i === 1 && mobileOpen ? 0 : 1,
              }} />
            ))}
          </button>
        )}
      </nav>

      {/* Mobile drawer */}
      {isMobile && (
        <>
          <div
            onClick={() => setMobileOpen(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 990,
              background: 'rgba(10,6,1,0.6)',
              opacity: mobileOpen ? 1 : 0,
              pointerEvents: mobileOpen ? 'auto' : 'none',
              transition: 'opacity .3s ease',
            }}
          />
          <div style={{
            position: 'fixed', top: 0, right: 0, bottom: 0,
            zIndex: 995, width: '100vw', maxWidth: '100vw',
            background: 'rgba(26,14,5,0.98)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderLeft: '1px solid rgba(200,146,42,0.15)',
            display: 'flex', flexDirection: 'column',
            padding: '5rem 2rem 3rem',
            transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform .35s cubic-bezier(.4,0,.2,1)',
          }}>
            {[
              { label: 'INICIO',   href: '#inicio' },
              { label: 'ZONAS',    href: '#espacios' },
              { label: 'ISLAS',    href: '#islas' },
              { label: 'EVENTOS',  href: '#eventos' },
              { label: 'CARTA',    href: '#menu' },
              { label: 'HORARIOS', href: '#horarios' },
              { label: 'CONTACTO', href: '#contacto' },
            ].map(({ label, href }, i) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: 'var(--font-raleway)', fontWeight: 300,
                  fontSize: '.85rem', letterSpacing: '.25em',
                  textTransform: 'uppercase',
                  color: '#C4A882', textDecoration: 'none',
                  padding: '1rem 0',
                  minHeight: '48px',
                  borderBottom: '1px solid rgba(200,146,42,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? 'translateX(0)' : 'translateX(20px)',
                  transition: `opacity .3s ease ${i * 0.05 + 0.1}s, transform .3s ease ${i * 0.05 + 0.1}s`,
                }}
              >
                {label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setMobileOpen(false)}
              style={{
                marginTop: '2rem',
                fontFamily: 'var(--font-cinzel)', fontSize: '.7rem',
                letterSpacing: '.2em', color: '#C8922A',
                border: '1px solid rgba(200,146,42,0.6)',
                padding: '.9rem', textAlign: 'center',
                minHeight: '48px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                textDecoration: 'none',
              }}
            >
              RESERVAR
            </a>
          </div>
        </>
      )}
    </>
  );
}
