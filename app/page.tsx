import ZonasGallery from './components/ZonasGallery';
import EventosSection from './components/EventosSection';
import HorariosSection from './components/HorariosSection';
import MenuSection from './components/MenuSection';
import IslasGrid from './components/IslasGrid';
import ContactoSection from './components/ContactoSection';
import WhatsAppButton from './components/WhatsAppButton';
import Navbar from './components/Navbar';

const NAV_LINKS = [
  { label: 'ESPACIOS',  href: '#espacios' },
  { label: 'TERRAZA',   href: '#terraza' },
  { label: 'EVENTOS',   href: '#eventos' },
  { label: 'CARTA',     href: '#menu' },
  { label: 'HORARIOS',  href: '#horarios' },
  { label: 'CONTACTO',  href: '#contacto' },
];

export default async function Home() {
  return (
    <main style={{ background: '#1A0E05', minHeight: '100vh' }}>

      {/* NAV */}
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at 50% 38%, #3A1E08 0%, #251208 25%, #1A0E05 55%, #110A03 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '80px',
        paddingBottom: '3rem',
      }}>

        {/* Resplandor central superior */}
        <div style={{
          position: 'absolute', top: '-5%', left: '50%',
          transform: 'translateX(-50%)',
          width: '700px', height: '600px',
          background: 'radial-gradient(ellipse at 50% 30%, rgba(200,146,42,0.18) 0%, rgba(200,146,42,0.06) 40%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Partículas flotantes doradas */}
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${(i * 23 + 7) % 100}%`,
            width: i % 3 === 0 ? '3px' : '2px',
            height: i % 3 === 0 ? '3px' : '2px',
            background: '#C8922A',
            borderRadius: '50%',
            opacity: 0,
            animation: `float ${12 + (i % 9)}s ${i * 0.9}s linear infinite`,
            pointerEvents: 'none',
          }} />
        ))}

        {/* ── ISOTIPO — medallón circular ── */}
        <div style={{
          position: 'relative',
          width: '280px',
          height: '280px',
          marginBottom: '2rem',
          animation: 'fadeUp 1.6s .2s both',
        }}>
          {/* Anillo exterior decorativo */}
          <div style={{
            position: 'absolute', inset: '-12px',
            borderRadius: '50%',
            border: '1px solid rgba(200,146,42,0.2)',
            animation: 'archGlow 4s ease-in-out infinite',
          }} />
          {/* Anillo medio */}
          <div style={{
            position: 'absolute', inset: '-5px',
            borderRadius: '50%',
            border: '1.5px solid rgba(200,146,42,0.45)',
          }} />
          {/* Círculo imagen — fondo del SVG como background-image para control fino */}
          <div style={{
            width: '100%', height: '100%',
            borderRadius: '50%',
            overflow: 'hidden',
            backgroundImage: 'url(/logo-sokko.svg)',
            backgroundSize: '162%',
            backgroundPosition: '50% 12%',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#2A160A',
            boxShadow: '0 0 40px rgba(200,146,42,0.25), 0 0 80px rgba(200,146,42,0.1), inset 0 0 20px rgba(200,146,42,0.05)',
          }} />
          {/* Puntos decorativos en los 4 polos */}
          {[0, 90, 180, 270].map((deg) => (
            <div key={deg} style={{
              position: 'absolute',
              top: '50%', left: '50%',
              width: '5px', height: '5px',
              borderRadius: '50%',
              background: '#C8922A',
              opacity: 0.5,
              transform: `rotate(${deg}deg) translateY(-152px) translate(-50%, -50%)`,
            }} />
          ))}
        </div>

        {/* ── SOKKO ── */}
        <h1 style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: 'clamp(4.5rem, 12vw, 9rem)',
          color: '#C8922A',
          letterSpacing: '.15em',
          lineHeight: 1,
          textShadow: '0 0 50px rgba(200,146,42,0.5), 0 0 100px rgba(200,146,42,0.2)',
          animation: 'fadeUp 1.4s .45s both',
          textAlign: 'center',
          margin: 0,
        }}>
          SOKKO
        </h1>

        {/* ── · LOUNGE · ── */}
        <p style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: '.8rem',
          letterSpacing: '.6em',
          color: '#C4A882',
          marginTop: '.6rem',
          animation: 'fadeUp 1.4s .55s both',
          textAlign: 'center',
        }}>
          · LOUNGE ·
        </p>

        {/* ── Separador decorativo ─── ✦ ─── ── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.2rem',
          marginTop: '1.8rem',
          width: 'min(380px, 85vw)',
          animation: 'fadeUp 1.4s .65s both',
        }}>
          <div style={{
            flex: 1, height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(200,146,42,0.55))',
          }} />
          {/* Ornamento estrella */}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 0L8.06 5.5L14 7L8.06 8.5L7 14L5.94 8.5L0 7L5.94 5.5L7 0Z"
              fill="#C8922A" opacity="0.85"/>
          </svg>
          <div style={{
            flex: 1, height: '1px',
            background: 'linear-gradient(to left, transparent, rgba(200,146,42,0.55))',
          }} />
        </div>

        {/* ── EL RESGUARDO DEL VIENTO ── */}
        <p style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: '.7rem',
          letterSpacing: '.55em',
          color: '#C4A882',
          marginTop: '1.4rem',
          animation: 'fadeUp 1.4s .75s both',
          textAlign: 'center',
        }}>
          EL RESGUARDO DEL VIENTO
        </p>

        {/* ── CTA ── */}
        <a href="#espacios" style={{
          marginTop: '2.8rem',
          fontFamily: 'var(--font-raleway)',
          fontWeight: 400,
          fontSize: '.65rem',
          letterSpacing: '.3em',
          textTransform: 'uppercase',
          color: '#C8922A',
          border: '1px solid rgba(200,146,42,0.6)',
          background: 'rgba(200,146,42,0.07)',
          padding: '1rem 3rem',
          textDecoration: 'none',
          animation: 'fadeUp 1.4s .9s both',
          display: 'inline-block',
        }}>
          EXPLORAR LA EXPERIENCIA
        </a>

        {/* ── Scroll indicator ── */}
        <a href="#espacios" style={{
          marginTop: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '.6rem',
          textDecoration: 'none',
          animation: 'fadeUp 1.4s 1.1s both',
        }}>
          <span style={{
            fontSize: '.5rem',
            letterSpacing: '.45em',
            textTransform: 'uppercase',
            color: '#8A6940',
          }}>
            DESCUBRIR
          </span>
          <div style={{
            width: '1px',
            height: '50px',
            background: 'linear-gradient(to bottom, rgba(200,146,42,0.5), transparent)',
            animation: 'scrollDrop 2s ease-in-out infinite',
          }} />
        </a>

      </section>
      {/* ── FIN HERO ────────────────────────────────────────────────────────── */}

      {/* ZONAS */}
      <section id="espacios">
        <ZonasGallery />
      </section>

      {/* FILOSOFÍA */}
      <section style={{ padding: '8rem 2rem', textAlign: 'center', background: '#1A0E05' }}>
        <p style={{
          fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
          fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', color: '#C4A882',
          lineHeight: '1.7', maxWidth: '700px', margin: '0 auto',
        }}>
          SOKKO no es solo un lugar.<br />Es refugio, calma, conexión y experiencia.
        </p>
        <div style={{ width: '60px', height: '2px', background: '#C8922A', margin: '2.5rem auto 0' }} />
      </section>

      {/* ISLAS */}
      <section id="terraza" style={{
        background: '#1A0E05', padding: '6rem 2rem',
        borderTop: '1px solid rgba(200,146,42,0.2)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontSize: '.6rem', letterSpacing: '.55em', color: '#8A6940', textTransform: 'uppercase', margin: 0 }}>
            03 — Terraza
          </p>
          <h2 style={{
            fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            color: '#C8922A', letterSpacing: '.15em', marginTop: '1rem', marginBottom: 0,
          }}>
            Las Ocho Islas
          </h2>
          <div style={{ width: '60px', height: '1px', background: 'rgba(200,146,42,0.4)', margin: '1.5rem auto' }} />
          <p style={{
            fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
            fontSize: '1.05rem', color: '#C4A882',
            maxWidth: '520px', margin: '0 auto', lineHeight: '1.8',
          }}>
            Cada agrupación lleva el nombre de una isla canaria. Elige la tuya y reserva tu espacio bajo las estrellas.
          </p>
        </div>
        <IslasGrid />
      </section>

      {/* EVENTOS */}
      <EventosSection />

      {/* CARTA */}
      <MenuSection />

      {/* HORARIOS */}
      <HorariosSection />

      {/* CONTACTO */}
      <ContactoSection />

      {/* FOOTER */}
      <footer style={{
        background: '#1A0E05',
        borderTop: '2px solid rgba(200,146,42,0.3)',
        padding: '5rem 3rem 3rem',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-start', flexWrap: 'wrap',
            gap: '2rem', marginBottom: '3rem',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '.5rem' }}>
              <p style={{
                fontFamily: 'var(--font-cinzel)', color: '#C8922A',
                letterSpacing: '.35em', fontSize: '1.3rem', margin: 0,
              }}>
                SOKKO LOUNGE
              </p>
              <p style={{
                fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
                fontSize: '.95rem', color: '#8A6940', margin: 0,
              }}>
                El Resguardo del Viento · Fuerteventura
              </p>
            </div>
            <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              {NAV_LINKS.map(({ label, href }) => (
                <a key={label} href={href} style={{
                  fontFamily: 'var(--font-raleway)', fontSize: '.6rem',
                  letterSpacing: '.25em', textTransform: 'uppercase',
                  color: '#8A6940', textDecoration: 'none',
                }}>
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div style={{
            borderTop: '1px solid rgba(200,146,42,0.12)',
            paddingTop: '1.5rem', textAlign: 'center',
          }}>
            <p style={{
              fontSize: '.55rem', letterSpacing: '.25em',
              color: '#8A6940', textTransform: 'uppercase', margin: 0,
            }}>
              © 2026 SOKKO Lounge Fuerteventura
            </p>
          </div>
        </div>
      </footer>

      <WhatsAppButton />

    </main>
  );
}
