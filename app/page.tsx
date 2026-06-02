import HeroSection     from './components/HeroSection';
import ProyectoSection from './components/ProyectoSection';
import ZonasGallery    from './components/ZonasGallery';
import IslasGrid       from './components/IslasGrid';
import EventosSection  from './components/EventosSection';
import MenuSection     from './components/MenuSection';
import HorariosSection from './components/HorariosSection';
import ContactoSection from './components/ContactoSection';
import Footer          from './components/Footer';
import WhatsAppButton  from './components/WhatsAppButton';
import Navbar          from './components/Navbar';
import HorizontalMarquee from './components/HorizontalMarquee';
import RevealSection   from './components/RevealSection';
import RevealText      from './components/RevealText';

export default async function Home() {
  return (
    <main style={{ background: '#1A0E05', minHeight: '100vh' }}>

      {/* 1 ── Navbar */}
      <Navbar />

      {/* 2 ── Hero */}
      <HeroSection />

      {/* 3 ── Marquee */}
      <HorizontalMarquee text="SOKKO LOUNGE · EL RESGUARDO DEL VIENTO · FUERTEVENTURA · " speed={32} />

      {/* 4 ── Proyecto */}
      <section id="proyecto">
        <ProyectoSection />
      </section>

      {/* 5 ── Marquee */}
      <HorizontalMarquee text="REFUGIO · CALMA · CONEXIÓN · EXPERIENCIA · " speed={28} />

      {/* 6 ── Zonas */}
      <section id="espacios">
        <ZonasGallery />
      </section>

      {/* 7 ── Marquee */}
      <HorizontalMarquee text="LAS OCHO ISLAS · TERRAZA · BAJO LAS ESTRELLAS · FUERTEVENTURA · " speed={35} />

      {/* 8 ── Islas / Terraza */}
      <section id="terraza" style={{
        background: '#1A0E05',
        padding: 'clamp(5rem, 8vw, 7rem) 2rem',
        borderTop: '1px solid rgba(200,146,42,0.15)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <RevealSection direction="up">
            <p style={{
              fontSize: '.6rem', letterSpacing: '.55em',
              color: '#8A6940', textTransform: 'uppercase', margin: '0 0 1rem',
              fontFamily: 'var(--font-raleway)', fontWeight: 300,
            }}>
              03 — Terraza
            </p>
          </RevealSection>
          <RevealText
            tag="h2"
            style={{
              fontFamily: 'var(--font-cinzel)',
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              color: '#C8922A', letterSpacing: '.15em',
              marginTop: '1rem',
            }}
          >
            Las Ocho Islas
          </RevealText>
          <RevealSection direction="up" delay={0.2}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              width: 'min(280px,70vw)', margin: '1.2rem auto 1.5rem',
            }}>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(200,146,42,0.4))' }} />
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1L8.1 5.5L12.5 7L8.1 8.5L7 13L5.9 8.5L1.5 7L5.9 5.5Z" fill="none" stroke="#C8922A" strokeWidth="1"/>
              </svg>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(200,146,42,0.4))' }} />
            </div>
            <p style={{
              fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
              fontSize: 'clamp(.9rem, 1.8vw, 1.1rem)', color: '#C4A882',
              maxWidth: '520px', margin: '0 auto', lineHeight: 1.8,
            }}>
              Cada agrupación lleva el nombre de una isla canaria.
              Elige la tuya y reserva tu espacio bajo las estrellas.
            </p>
          </RevealSection>
        </div>
        <RevealSection direction="scale" delay={0.1}>
          <IslasGrid />
        </RevealSection>
      </section>

      {/* 9 ── Marquee */}
      <HorizontalMarquee text="PRÓXIMOS EVENTOS · MÚSICA EN DIRECTO · SHOWS TEMÁTICOS · CENAS ÚNICAS · " speed={42} />

      {/* 10 ── Eventos */}
      <EventosSection />

      {/* 11 ── Marquee */}
      <HorizontalMarquee text="COCINA CANARIA · CÓCTELES PREMIUM · SABORES AUTÉNTICOS · " speed={36} />

      {/* 12 ── Carta */}
      <MenuSection />

      {/* 13 ── Marquee */}
      <HorizontalMarquee text="CUÁNDO VISITARNOS · HORARIOS · FUERTEVENTURA · EL RESGUARDO DEL VIENTO · " speed={40} />

      {/* 14 ── Horarios */}
      <HorariosSection />

      {/* 15 ── Marquee */}
      <HorizontalMarquee text="RESERVA TU MESA · CONTACTO · SOKKO LOUNGE · CALETA DE FUSTE · " speed={34} />

      {/* 16 ── Contacto */}
      <ContactoSection />

      {/* 17 ── Footer */}
      <Footer />

      {/* 18 ── WhatsApp */}
      <WhatsAppButton />

    </main>
  );
}
