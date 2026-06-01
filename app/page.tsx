import { LampContainer } from './components/ui/lamp';
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

      {/* HERO */}
      <LampContainer>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute', left: `${(i * 17 + 5) % 100}%`,
            width: '2px', height: '2px', background: '#C8922A', borderRadius: '50%',
            opacity: 0, animation: `float ${10 + (i % 8)}s ${i * 0.7}s linear infinite`,
            pointerEvents: 'none',
          }} />
        ))}

        <h1 style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: 'clamp(5rem, 14vw, 10rem)',
          color: '#C8922A', letterSpacing: '.12em', lineHeight: 1,
          textShadow: '0 0 80px rgba(200,146,42,.3)',
          animation: 'fadeUp 1.4s .4s both', textAlign: 'center',
        }}>
          SOKKO
        </h1>

        <p style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: '.75rem', letterSpacing: '.45em',
          color: '#8A6940', marginTop: '.6rem',
          animation: 'fadeUp 1.4s .5s both', textAlign: 'center',
        }}>
          · LOUNGE ·
        </p>

        <p style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: 'clamp(.9rem, 2vw, 1.3rem)',
          color: '#C4A882', letterSpacing: '.1em',
          marginTop: '1.5rem', animation: 'fadeUp 1.4s .6s both',
          textAlign: 'center',
        }}>
          RAW ELEGANCE. VOLCANIC SOUL.
        </p>

        <p style={{
          fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
          fontSize: '1.05rem', color: '#8A6940',
          maxWidth: '480px', textAlign: 'center', lineHeight: '1.8',
          marginTop: '1.2rem', animation: 'fadeUp 1.4s .75s both',
        }}>
          El refugio volcánico donde la naturaleza salvaje se encuentra con el lujo íntimo.
        </p>

        <p style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: '.7rem', letterSpacing: '.5em',
          color: '#C4A882',
          marginTop: '.8rem', animation: 'fadeUp 1.4s .85s both',
          textAlign: 'center',
        }}>
          EL RESGUARDO DEL VIENTO
        </p>

        <a href="#espacios" style={{
          marginTop: '2.5rem',
          fontFamily: 'var(--font-raleway)', fontWeight: 400,
          fontSize: '.65rem', letterSpacing: '.3em', textTransform: 'uppercase',
          color: '#C8922A',
          border: '1px solid rgba(200,146,42,0.6)',
          background: 'rgba(200,146,42,0.08)',
          padding: '1rem 3rem', textDecoration: 'none',
          animation: 'fadeUp 1.4s .9s both',
          display: 'inline-block',
        }}>
          EXPLORAR LA EXPERIENCIA
        </a>

        <a href="#espacios" style={{
          marginTop: '2.5rem', display: 'flex',
          flexDirection: 'column', alignItems: 'center', gap: '.6rem',
          textDecoration: 'none', animation: 'fadeUp 1.4s 1.1s both',
        }}>
          <span style={{ fontSize: '.55rem', letterSpacing: '.4em', textTransform: 'uppercase', color: '#8A6940' }}>
            DESCUBRIR
          </span>
          <div style={{
            width: '1px', height: '50px',
            background: 'linear-gradient(to bottom, #8A6940, transparent)',
            animation: 'scrollDrop 2s ease-in-out infinite',
          }} />
        </a>
      </LampContainer>

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
