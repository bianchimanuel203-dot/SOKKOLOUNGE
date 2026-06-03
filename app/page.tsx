import HeroThreeJS        from './components/HeroThreeJS';
import OrigenSokko        from './components/OrigenSokko';
import ZonasFullscreen    from './components/ZonasFullscreen';
import IslasCardStack     from './components/IslasCardStack';
import EventosSection        from './components/EventosSection';
import MenuSection           from './components/MenuSection';
import CocteleSection        from './components/CocteleSection';
import ParallaxDivider       from './components/ParallaxDivider';
import HorariosSection       from './components/HorariosSection';
import ProgramacionSection   from './components/ProgramacionSection';
import ContactoSection    from './components/ContactoSection';
import Footer             from './components/Footer';
import WhatsAppButton     from './components/WhatsAppButton';
import Navbar             from './components/Navbar';
import HorizontalMarquee  from './components/HorizontalMarquee';

export default async function Home() {
  return (
    <main style={{ background: '#1A0E05', minHeight: '100vh' }}>

      {/* 1 — Navbar resizable Aceternity */}
      <Navbar />

      {/* 2 — Hero: imagen portada real + crossfade + GSAP chars */}
      <section id="inicio">
        <HeroThreeJS />
      </section>

      {/* 3 */}
      <HorizontalMarquee text="SOKKO LOUNGE · EL RESGUARDO DEL VIENTO · FUERTEVENTURA · " speed={32} />

      {/* 4 — Origen: textos PDF sin título visible */}
      <OrigenSokko />

      {/* 5 */}
      <HorizontalMarquee text="REFUGIO · CALMA · CONEXIÓN · EXPERIENCIA · " speed={28} />

      {/* 6 — Zonas 100vh parallax 3 capas, títulos 72px */}
      <section id="espacios">
        <ZonasFullscreen />
      </section>

      {/* 7 */}
      <HorizontalMarquee text="LAS OCHO ISLAS · TERRAZA · BAJO LAS ESTRELLAS · " speed={35} />

      {/* 8 — Islas: grid 4×2 con tilt 3D framer-motion */}
      <IslasCardStack />

      {/* 9 */}
      <HorizontalMarquee text="COCINA CANARIA · CÓCTELES PREMIUM · SABORES AUTÉNTICOS · " speed={36} />

      {/* 12 — Carta editorial con tabs */}
      <MenuSection />

      {/* ParallaxDivider entre carta y cócteles */}
      <ParallaxDivider />

      {/* Cócteles */}
      <CocteleSection />

      {/* 14 */}
      <HorizontalMarquee text="CUÁNDO VISITARNOS · HORARIOS · FUERTEVENTURA · EL RESGUARDO DEL VIENTO · " speed={40} />

      {/* 14 — Horarios: franjas + tabla días + servicios */}
      <HorariosSection />

      {/* 15 */}
      <HorizontalMarquee text="MÚSICA · SHOWS · BAILE · JUEGOS · CADA SEMANA · " speed={38} />

      {/* 16 — Programación semanal recurrente */}
      <ProgramacionSection />

      {/* 17 */}
      <HorizontalMarquee text="PRÓXIMOS EVENTOS · MÚSICA EN DIRECTO · SHOWS TEMÁTICOS · " speed={42} />

      {/* 18 — Eventos con fecha + modal programa */}
      <EventosSection />

      {/* 19 */}
      <HorizontalMarquee text="RESERVA TU MESA · CONTACTO · SOKKO LOUNGE · CALETA DE FUSTE · " speed={34} />

      {/* 16 — Contacto */}
      <ContactoSection />

      {/* 17 — Footer DevStudio */}
      <Footer />

      {/* 18 — WhatsApp flotante */}
      <WhatsAppButton />

    </main>
  );
}
