import HeroThreeJS        from './components/HeroThreeJS';
import OrigenSokko        from './components/OrigenSokko';
import ZonasFullscreen    from './components/ZonasFullscreen';
import IslasCardStack     from './components/IslasCardStack';
import EventosSection     from './components/EventosSection';
import MenuSection        from './components/MenuSection';
import HorariosSection    from './components/HorariosSection';
import ContactoSection    from './components/ContactoSection';
import Footer             from './components/Footer';
import WhatsAppButton     from './components/WhatsAppButton';
import Navbar             from './components/Navbar';
import HorizontalMarquee  from './components/HorizontalMarquee';

export default async function Home() {
  return (
    <main style={{ background: '#1A0E05', minHeight: '100vh' }}>

      {/* 1 — Navbar */}
      <Navbar />

      {/* 2 — Hero Three.js + doble imagen + GSAP */}
      <HeroThreeJS />

      {/* 3 — Marquee */}
      <HorizontalMarquee text="SOKKO LOUNGE · EL RESGUARDO DEL VIENTO · FUERTEVENTURA · " speed={32} />

      {/* 4 — Origen (sin título de sección visible) */}
      <OrigenSokko />

      {/* 5 — Marquee */}
      <HorizontalMarquee text="REFUGIO · CALMA · CONEXIÓN · EXPERIENCIA · " speed={28} />

      {/* 6 — Zonas fullscreen 100vh parallax 3 capas */}
      <ZonasFullscreen />

      {/* 7 — Marquee */}
      <HorizontalMarquee text="LAS OCHO ISLAS · TERRAZA · BAJO LAS ESTRELLAS · " speed={35} />

      {/* 8 — Islas CardStack 3D */}
      <IslasCardStack />

      {/* 9 — Marquee */}
      <HorizontalMarquee text="PRÓXIMOS EVENTOS · MÚSICA EN DIRECTO · SHOWS TEMÁTICOS · CENAS ÚNICAS · " speed={42} />

      {/* 10 — Eventos (server component WordPress) */}
      <EventosSection />

      {/* 11 — Marquee */}
      <HorizontalMarquee text="COCINA CANARIA · CÓCTELES PREMIUM · SABORES AUTÉNTICOS · " speed={36} />

      {/* 12 — Carta (server component WordPress) */}
      <MenuSection />

      {/* 13 — Marquee */}
      <HorizontalMarquee text="CUÁNDO VISITARNOS · HORARIOS · FUERTEVENTURA · EL RESGUARDO DEL VIENTO · " speed={40} />

      {/* 14 — Horarios (server component WordPress) */}
      <HorariosSection />

      {/* 15 — Marquee */}
      <HorizontalMarquee text="RESERVA TU MESA · CONTACTO · SOKKO LOUNGE · CALETA DE FUSTE · " speed={34} />

      {/* 16 — Contacto */}
      <ContactoSection />

      {/* 17 — Footer */}
      <Footer />

      {/* 18 — WhatsApp flotante */}
      <WhatsAppButton />

    </main>
  );
}
