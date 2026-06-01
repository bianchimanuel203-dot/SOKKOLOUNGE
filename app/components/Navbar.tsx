'use client';
import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { label: 'ESPACIOS',  href: '#espacios' },
  { label: 'TERRAZA',   href: '#terraza' },
  { label: 'EVENTOS',   href: '#eventos' },
  { label: 'CARTA',     href: '#menu' },
  { label: 'HORARIOS',  href: '#horarios' },
  { label: 'CONTACTO',  href: '#contacto' },
];

export default function Navbar() {
  const [open, setOpen]   = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const check = () => setMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        padding: mobile ? '1.1rem 1.5rem' : '1.2rem 3rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(26,14,5,0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(200,146,42,0.15)',
      }}>
        {/* Logo texto */}
        <a href="/" style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: mobile ? '.7rem' : '.78rem',
          letterSpacing: '.35em', color: '#C8922A',
          textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0,
        }}>
          SOKKO LOUNGE
        </a>

        {/* Desktop */}
        {!mobile && (
          <>
            <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
              {NAV_LINKS.map(({ label, href }) => (
                <a key={label} href={href} style={{
                  fontFamily: 'var(--font-raleway)', fontWeight: 300,
                  fontSize: '.65rem', letterSpacing: '.3em', textTransform: 'uppercase',
                  color: '#C4A882', textDecoration: 'none',
                }}>
                  {label}
                </a>
              ))}
            </div>
            <a href="#terraza" style={{
              fontFamily: 'var(--font-raleway)', fontWeight: 400,
              fontSize: '.65rem', letterSpacing: '.3em', textTransform: 'uppercase',
              color: '#C8922A', textDecoration: 'none',
              border: '1px solid rgba(200,146,42,0.6)',
              padding: '.6rem 1.5rem', flexShrink: 0,
            }}>
              RESERVAR
            </a>
          </>
        )}

        {/* Mobile hamburguesa */}
        {mobile && (
          <button
            onClick={() => setOpen(v => !v)}
            aria-label="Abrir menú"
            style={{
              background: 'transparent', border: 'none',
              padding: '4px', cursor: 'pointer',
              display: 'flex', flexDirection: 'column',
              gap: '5px', alignItems: 'flex-end',
            }}
          >
            <span style={{
              display: 'block', height: '1.5px', background: '#C8922A', width: '22px',
              transition: 'transform .3s ease, opacity .3s ease',
              transform: open ? 'translateY(6.5px) rotate(45deg)' : 'none',
            }} />
            <span style={{
              display: 'block', height: '1.5px', background: '#C8922A', width: '16px',
              opacity: open ? 0 : 1, transition: 'opacity .2s ease',
            }} />
            <span style={{
              display: 'block', height: '1.5px', background: '#C8922A', width: '22px',
              transition: 'transform .3s ease',
              transform: open ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
            }} />
          </button>
        )}
      </nav>

      {/* Overlay */}
      {mobile && (
        <div onClick={close} style={{
          position: 'fixed', inset: 0, zIndex: 190,
          background: 'rgba(10,6,1,0.6)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity .3s ease',
        }} />
      )}

      {/* Drawer */}
      {mobile && (
        <div style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 195,
          width: '80vw', maxWidth: '320px',
          background: 'rgba(26,14,5,0.97)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderLeft: '1px solid rgba(200,146,42,0.15)',
          display: 'flex', flexDirection: 'column',
          padding: '5rem 2.5rem 3rem',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform .35s cubic-bezier(.4,0,.2,1)',
        }}>
          <nav style={{ display: 'flex', flexDirection: 'column' }}>
            {NAV_LINKS.map(({ label, href }, i) => (
              <a key={label} href={href} onClick={close} style={{
                fontFamily: 'var(--font-raleway)', fontWeight: 300,
                fontSize: '.75rem', letterSpacing: '.3em', textTransform: 'uppercase',
                color: '#C4A882', textDecoration: 'none',
                padding: '1.1rem 0',
                borderBottom: i < NAV_LINKS.length - 1 ? '1px solid rgba(200,146,42,0.08)' : 'none',
                display: 'block',
                opacity: open ? 1 : 0,
                transform: open ? 'translateX(0)' : 'translateX(20px)',
                transition: `opacity .35s ease ${i * 0.05 + 0.1}s, transform .35s ease ${i * 0.05 + 0.1}s`,
              }}>
                {label}
              </a>
            ))}
          </nav>
          <a href="#terraza" onClick={close} style={{
            marginTop: '2.5rem',
            fontFamily: 'var(--font-raleway)', fontWeight: 500,
            fontSize: '.7rem', letterSpacing: '.3em', textTransform: 'uppercase',
            color: '#C8922A', textDecoration: 'none',
            border: '1px solid rgba(200,146,42,0.6)',
            padding: '.9rem', textAlign: 'center', display: 'block',
            opacity: open ? 1 : 0,
            transform: open ? 'translateX(0)' : 'translateX(20px)',
            transition: `opacity .35s ease ${NAV_LINKS.length * 0.05 + 0.1}s, transform .35s ease ${NAV_LINKS.length * 0.05 + 0.1}s`,
          }}>
            RESERVAR
          </a>
          <p style={{
            marginTop: 'auto', paddingTop: '2rem',
            fontFamily: 'var(--font-cinzel)', fontSize: '.65rem',
            letterSpacing: '.3em', color: 'rgba(200,146,42,0.25)',
            textAlign: 'center',
          }}>
            SOKKO LOUNGE
          </p>
        </div>
      )}
    </>
  );
}
