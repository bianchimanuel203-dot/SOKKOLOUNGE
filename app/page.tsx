import { LampContainer } from './components/ui/lamp';
import IslaSlider from './components/IslaSlider';
import ZonasGallery from './components/ZonasGallery';
import EventosSection from './components/EventosSection';
import HorariosSection from './components/HorariosSection';
import MenuSection from './components/MenuSection';

export default async function Home() {
  return (
    <main style={{ background: '#0C0A06', minHeight: '100vh' }}>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '1.5rem 3rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'linear-gradient(to bottom, rgba(10,8,4,.95) 0%, transparent 100%)'
      }}>
        <a href="#" style={{ fontFamily: 'var(--font-cinzel)', fontSize: '.85rem', letterSpacing: '.3em', color: '#C9A84C', textDecoration: 'none' }}>
          SOKKO
        </a>
        <div style={{ display: 'flex', gap: '2.5rem' }}>
          {[['Espacios', '#espacios'], ['Terraza', '#terraza'], ['Eventos', '#eventos'], ['Carta', '#menu'], ['Horarios', '#horarios']].map(([label, href]) => (
            <a key={label} href={href} style={{
              fontFamily: 'var(--font-raleway)', fontWeight: 200,
              fontSize: '.7rem', letterSpacing: '.25em', textTransform: 'uppercase',
              color: '#B8A980', textDecoration: 'none'
            }}>
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* HERO — oscuro */}
      <LampContainer>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute', left: `${(i * 17 + 5) % 100}%`,
            width: '2px', height: '2px', background: '#C9A84C', borderRadius: '50%',
            opacity: 0, animation: `float ${10 + (i % 8)}s ${i * 0.7}s linear infinite`,
            pointerEvents: 'none'
          }} />
        ))}
        <h1 style={{
          fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(3.5rem, 10vw, 7rem)',
          color: '#C9A84C', letterSpacing: '.12em', lineHeight: 1,
          textShadow: '0 0 60px rgba(201,168,76,.3)',
          animation: 'fadeUp 1.4s .4s both', textAlign: 'center'
        }}>
          SOKKO
        </h1>
        <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: '.75rem', letterSpacing: '.4em', color: '#8A6E2F', marginTop: '.5rem', animation: 'fadeUp 1.4s .5s both' }}>
          · LOUNGE ·
        </p>
        <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: '1.2rem', color: '#B8A980', marginTop: '2rem', animation: 'fadeUp 1.4s .7s both' }}>
          El Resguardo del Viento
        </p>
        <div style={{ display: 'flex', gap: '3rem', marginTop: '2.5rem', fontSize: '.6rem', letterSpacing: '.35em', color: '#8A6E2F', textTransform: 'uppercase', animation: 'fadeUp 1.4s .9s both' }}>
          <span>Resguardo</span><span>Calma</span><span>Conexión</span>
        </div>
        <a href="#espacios" style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.6rem', textDecoration: 'none', animation: 'fadeUp 1.4s 1.1s both' }}>
          <span style={{ fontSize: '.55rem', letterSpacing: '.4em', textTransform: 'uppercase', color: '#8A6E2F' }}>Descubrir</span>
          <div style={{ width: '1px', height: '50px', background: 'linear-gradient(to bottom, #8A6E2F, transparent)', animation: 'scrollDrop 2s ease-in-out infinite' }} />
        </a>
      </LampContainer>

      {/* ZONAS — oscuro */}
      <section id="espacios">
        <ZonasGallery />
      </section>

      {/* FILOSOFIA — transición oscuro a claro */}
      <section style={{ padding: '8rem 2rem', textAlign: 'center', background: 'linear-gradient(to bottom, #0C0A06 0%, #F2E8D0 100%)' }}>
        <p style={{
          fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
          fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', color: '#1A1208',
          lineHeight: '1.7', maxWidth: '700px', margin: '0 auto'
        }}>
          SOKKO no es solo un lugar.<br />Es refugio, calma, conexión y experiencia.
        </p>
        <div style={{ width: '60px', height: '2px', background: '#C9A84C', margin: '2.5rem auto 0' }} />
      </section>

      {/* TERRAZA — oscuro */}
      <section id="terraza" style={{ background: '#12100A', padding: '6rem 0', borderTop: '3px solid rgba(201,168,76,.2)' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem', padding: '0 2rem' }}>
          <p style={{ fontSize: '.65rem', letterSpacing: '.5em', color: '#8A6E2F', textTransform: 'uppercase' }}>
            03 — Terraza
          </p>
          <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#C9A84C', letterSpacing: '.15em', marginTop: '1rem' }}>
            Las Ocho Islas
          </h2>
          <div style={{ width: '60px', height: '1px', background: '#8A6E2F', margin: '1.5rem auto' }} />
          <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: '1.05rem', color: '#B8A980', maxWidth: '520px', margin: '0 auto', lineHeight: '1.8' }}>
            Cada agrupación lleva el nombre de una isla Canaria. Elige la tuya y reserva tu espacio bajo las estrellas.
          </p>
        </div>
        <IslaSlider />
      </section>

      {/* EVENTOS — claro */}
      <EventosSection />

      {/* CARTA — claro */}
      <MenuSection />

      {/* HORARIOS — claro alternado */}
      <HorariosSection />

      {/* FOOTER — oscuro */}
      <footer style={{
        textAlign: 'center', padding: '4rem 2rem',
        background: '#1A1208',
        borderTop: '3px solid rgba(201,168,76,.3)'
      }}>
        <p style={{ fontFamily: 'var(--font-cinzel)', color: '#C9A84C', letterSpacing: '.3em', fontSize: '1.2rem' }}>
          SOKKO LOUNGE
        </p>
        <div style={{ width: '40px', height: '1px', background: 'rgba(201,168,76,.4)', margin: '1rem auto' }} />
        <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: '.9rem', color: '#B8A980' }}>
          El Resguardo del Viento · Lanzarote
        </p>
        <p style={{ fontSize: '.55rem', letterSpacing: '.3em', color: '#8A6E2F', marginTop: '1.5rem', textTransform: 'uppercase' }}>
          · By Gorka ·
        </p>
      </footer>

    </main>
  );
}