'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Separador ornamental ───────────────────────────────────────── */
function OrnamentalDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '1rem 0' }}>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(200,146,42,0.5))' }} />
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M6 1L7 4.5L10.5 6L7 7.5L6 11L5 7.5L1.5 6L5 4.5Z" fill="none" stroke="#C8922A" strokeWidth="1"/>
      </svg>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(200,146,42,0.5))' }} />
    </div>
  );
}

/* ── Tipos ─────────────────────────────────────────────────────── */
interface Atributo { titulo: string; texto: string; }
interface Transmitir { clave: string; texto: string; }
interface ZonaData {
  num: string;
  titulo: string;
  parrafo: string | string[];
  atributos: Atributo[];
  transmitir: Transmitir[];
  tagline: string;
  imagen: string;
}

/* ── Datos exactos del PDF ─────────────────────────────────────── */
const ZONAS: ZonaData[] = [
  {
    num: '01',
    titulo: 'LA ENTRADA,\nEL PRIMER RESGUARDO',
    parrafo: 'La entrada de SOKKO no es solo un acceso, es el primer abrazo. Un umbral que marca el paso del exterior al interior, del ruido al refugio, del viento a la calma.',
    atributos: [
      { titulo: 'IDENTIDAD DESDE EL PRIMER PASO', texto: 'El logotipo iluminado sobre piedra volcánica conecta con nuestras raíces y con la esencia de Canarias. La luz cálida dorada transmite acogida, elegancia y pertenencia.' },
      { titulo: 'NATURALEZA Y AUTENTICIDAD', texto: 'La presencia de plantas naturales y piedra volcánica refuerza nuestra conexión con la tierra, creando un ambiente orgánico, real y profundamente canario.' },
      { titulo: 'LUZ CÁLIDA, AMBIENTE ENVOLVENTE', texto: 'La iluminación indirecta guía, acentúa y envuelve. Cada detalle lumínico está pensado para generar una sensación de intimidad, seguridad y bienestar.' },
      { titulo: 'SÍMBOLOS QUE NOS DEFINEN', texto: 'Resguardo, calma y conexión no son solo palabras, son los pilares de nuestra filosofía y se presentan desde el primer instante para recordar quiénes somos y qué ofrecemos.' },
      { titulo: 'UNA EXPERIENCIA QUE COMIENZA AQUÍ', texto: 'El felpudo personalizado, los materiales, los aromas y la atmósfera invitan al cliente a dejar atrás el exterior y prepararse para vivir algo único.' },
    ],
    transmitir: [
      { clave: 'REFUGIO', texto: 'Un lugar donde el viento se queda fuera y la tranquilidad te recibe.' },
      { clave: 'EXCLUSIVIDAD', texto: 'Un ambiente cuidado al detalle que comunica calidad y distinción.' },
      { clave: 'CONEXIÓN', texto: 'Con nuestra tierra, con nuestras raíces y entre las personas.' },
      { clave: 'CALMA Y BIENESTAR', texto: 'Un espacio seguro, elegante y pensado para disfrutar sin prisas.' },
      { clave: 'CURIOSIDAD Y DESEO', texto: 'Queremos que al cruzar la puerta, nazca la emoción por descubrir todo lo que hay dentro.' },
    ],
    tagline: 'LA ENTRADA DE SOKKO ES UNA PROMESA:\nAQUÍ ENCUENTRAS TU LUGAR. AQUÍ TE RESGUARDAS.\nAQUÍ COMIENZA TU EXPERIENCIA.',
    imagen: '/zonas/zona-entrada.jpg',
  },
  {
    num: '02',
    titulo: 'ZONA BILLAR',
    parrafo: 'Un espacio para compartir, competir y disfrutar. La zona de billar de SOKKO está diseñada para ofrecer un ambiente acogedor, dinámico y sofisticado, donde el juego se convierte en excusa para la conexión.',
    atributos: [
      { titulo: 'AMBIENTE CÁLIDO Y ENVOLVENTE', texto: 'La iluminación tenue y estratégica crea un entorno cómodo y relajado, ideal para disfrutar durante la tarde o la noche.' },
      { titulo: 'INSPIRACIÓN CANARIA', texto: 'Materiales naturales, texturas orgánicas y vegetación que nos conectan con la esencia de nuestras islas, transmitiendo calma y autenticidad.' },
      { titulo: 'DIVERSIÓN SIN EDAD', texto: 'Pensado para todos los públicos: familias, amigos y grupos que buscan un plan diferente en un entorno seguro y acogedor.' },
      { titulo: 'JUEGO, COMPETENCIA Y BUENA ENERGÍA', texto: 'Mesas de calidad profesional en un espacio que invita a la competición sana, las risas y los momentos inolvidables.' },
      { titulo: 'DETALLES QUE SUMAN EXPERIENCIA', texto: 'Desde el mobiliario hasta cada elemento decorativo está cuidadosamente seleccionado para ofrecer una experiencia completa y memorable.' },
    ],
    transmitir: [
      { clave: 'CONEXIÓN', texto: 'Un punto de encuentro para crear recuerdos y fortalecer vínculos.' },
      { clave: 'DIVERSIÓN', texto: 'El juego como protagonista de momentos únicos.' },
      { clave: 'RELAX', texto: 'Un ambiente que invita a desconectar y disfrutar sin prisas.' },
      { clave: 'IDENTIDAD', texto: 'La esencia de Canarias presente en cada rincón.' },
      { clave: 'EXPERIENCIA', texto: 'Más que jugar al billar, vivir SOKKO.' },
    ],
    tagline: 'AQUÍ CADA PARTIDA ES MÁS QUE UN JUEGO.\nES UN MOMENTO, UNA HISTORIA, UNA CONEXIÓN.',
    imagen: '/zonas/zona-billar.jpg',
  },
  {
    num: '03',
    titulo: 'JAIMA DE JUEGOS',
    parrafo: 'La Jaima de Juegos es un espacio diseñado para despertar sonrisas y crear momentos inolvidables. Un rincón divertido y dinámico donde todas las edades encuentran su lugar para jugar, compartir y disfrutar.',
    atributos: [
      { titulo: 'DIVERSIÓN PARA TODOS', texto: 'Un espacio pensado para familias, amigos y grupos que buscan entretenimiento y conexión en un ambiente seguro y acogedor.' },
      { titulo: 'JUEGOS QUE CONECTAN', texto: 'Máquinas recreativas, dardos, juegos de mesa y actividades que fomentan la interacción, la competencia sana y las buenas risas.' },
      { titulo: 'AMBIENTE ÚNICO', texto: 'Inspirado en la tradición de nuestras jaimas y en la esencia canaria, combinado con un diseño moderno, cálido y lleno de detalles.' },
      { titulo: 'DESCONEXIÓN Y ALEGRÍA', texto: 'Un lugar para desconectar del día a día, liberar tensiones y dejarse llevar por el juego, la música y la buena energía que define a SOKKO.' },
      { titulo: 'MOMENTOS QUE SE RECUERDAN', texto: 'Aquí cada partida, cada risa y cada reto compartido se convierte en un recuerdo que forma parte de la experiencia SOKKO.' },
    ],
    transmitir: [
      { clave: 'ALEGRÍA', texto: 'Un espacio que invita al juego, a la risa y al buen rollo.' },
      { clave: 'CONEXIÓN', texto: 'Momentos compartidos que fortalecen vínculos y crean recuerdos.' },
      { clave: 'DIVERSIÓN', texto: 'Entretenimiento para todas las edades en un ambiente dinámico y seguro.' },
      { clave: 'ACOGIDA', texto: 'Un lugar cálido, cómodo y pensado para que todos se sientan como en casa.' },
      { clave: 'ESENCIA CANARIA', texto: 'Tradición, identidad y modernidad unidas en cada detalle.' },
    ],
    tagline: 'EN LA JAIMA DE JUEGOS,\nCADA PARTIDA ES UNA HISTORIA,\nCADA RISA, UNA CONEXIÓN.',
    imagen: '/zonas/zona-jaima.jpg',
  },
  {
    num: '04',
    titulo: 'ZONA CHILL FAMILIAR',
    parrafo: 'Un espacio para relajarse, conversar y disfrutar sin prisas. La zona chill familiar de SOKKO está pensada para que todos encuentren su ritmo: desde una tarde tranquila en familia hasta una charla entre amigos al caer la noche.',
    atributos: [
      { titulo: 'COMODIDAD Y BIENESTAR', texto: 'Sofás amplios, cojines confortables y rincones acogedores que invitan a relajarse y quedarse.' },
      { titulo: 'AMBIENTE CÁLIDO Y NATURAL', texto: 'Materiales naturales, plantas y una iluminación cálida que crea un entorno armónico, donde el tiempo se disfruta de otra manera.' },
      { titulo: 'PARA TODOS LOS PÚBLICOS', texto: 'Ideal para familias, grupos de amigos o momentos más íntimos y tranquilos. Un espacio inclusivo, cómodo y seguro.' },
      { titulo: 'DISFRUTA SIN PRISAS', texto: 'Cafés, tés, cócteles, refrescos y una selección de bebidas para acompañar cada momento del día.' },
      { titulo: 'MÚSICA Y CALMA EN EQUILIBRIO', texto: 'Una ambientación musical cuidadosamente seleccionada para crear el equilibrio perfecto entre energía y tranquilidad.' },
    ],
    transmitir: [
      { clave: 'RELAX', texto: 'Un refugio donde desconectar del exterior y conectar con lo importante.' },
      { clave: 'CONEXIÓN', texto: 'Conversaciones, risas y momentos que se convierten en recuerdos.' },
      { clave: 'CALMA', texto: 'Un ambiente que transmite paz, equilibrio y buena energía.' },
      { clave: 'ACOGIDA', texto: 'Sensación de hogar, cercanía y bienestar desde el primer instante.' },
      { clave: 'AUTENTICIDAD', texto: 'La esencia de Canarias presente en cada detalle y en cada experiencia.' },
    ],
    tagline: 'EN SOKKO, EL CHILL NO ES SOLO DESCANSAR.\nES DISFRUTAR DEL MOMENTO,\nRODEADO DE BUENA GENTE Y BUENAS VIBRAS.',
    imagen: '/zonas/zona-chill.jpg',
  },
  {
    num: '05',
    titulo: 'ZONA COMEDOR Y SHOWS',
    parrafo: 'El corazón de SOKKO. Un espacio donde la gastronomía, la música y el espectáculo se fusionan para crear experiencias únicas e inolvidables. Cada noche, un nuevo show, una nueva emoción.',
    atributos: [
      { titulo: 'ESCENARIO PROTAGONISTA', texto: 'Un escenario profesional equipado con sonido e iluminación de alta calidad para ofrecer conciertos, monólogos, DJ sets y espectáculos temáticos.' },
      { titulo: 'GASTRONOMÍA CON IDENTIDAD', texto: 'Una carta que celebra los sabores de Canarias con un toque moderno y creativo, maridada con cócteles, vinos y bebidas premium para cada ocasión.' },
      { titulo: 'AMBIENTE ENVOLVENTE', texto: 'Iluminación cálida, vegetación natural y detalles cuidados que crean un entorno íntimo y elegante, pensado para disfrutar y dejarse llevar.' },
      { titulo: 'EXPERIENCIAS QUE UNEN', texto: 'Música en directo, shows, cenas temáticas y eventos especiales que convierten cada visita en un recuerdo para compartir.' },
    ],
    transmitir: [
      { clave: 'EMOCIÓN', texto: 'La magia de vivir algo especial que combina todos los sentidos.' },
      { clave: 'CONEXIÓN', texto: 'Un lugar donde compartir momentos y crear recuerdos.' },
      { clave: 'CELEBRACIÓN', texto: 'Cada noche es una oportunidad para brindar, disfrutar y vibrar.' },
      { clave: 'IDENTIDAD', texto: 'El orgullo de nuestras raíces, llevado a escena con estilo y autenticidad.' },
      { clave: 'EXCLUSIVIDAD', texto: 'Un ambiente cuidado al detalle para que te sientas parte de algo único.' },
    ],
    tagline: 'BUENA MESA, BUENA MÚSICA,\nGRANDES HISTORIAS Y MEJORES PERSONAS.\nASÍ SON LAS NOCHES EN SOKKO.',
    imagen: '/zonas/zona-comedor.jpg',
  },
  {
    num: '06',
    titulo: 'LA JOYA DE LA CORONA',
    parrafo: ['Nuestra terraza es el alma de SOKKO. Un espacio único, versátil y privilegiado, con techo retráctil que se abre para conectar contigo mismo, con el cielo y con la magia de Canarias.', 'Bajo el sol dorado o bajo un manto de estrellas, cada momento aquí se convierte en algo inolvidable.'],
    atributos: [
      { titulo: 'TECHO RETRÁCTIL', texto: 'Elige tu cielo: sol radiante, brisa fresca o noches estrelladas.' },
      { titulo: 'VISTAS ESPECTACULARES', texto: 'Un horizonte que cambia cada día, siempre impresionante.' },
      { titulo: 'AMBIENTE EXCLUSIVO', texto: 'Cómodos lounges, música cuidadosamente seleccionada y un ambiente que eleva cada experiencia.' },
      { titulo: '8 AGRUPACIONES, 8 ISLAS', texto: 'Cada espacio lleva el nombre de una de las ocho islas Canarias, un guiño a nuestra tierra y a nuestra identidad.' },
    ],
    transmitir: [
      { clave: 'LIBERTAD', texto: 'Un espacio donde el tiempo se detiene y tú eliges cómo vivirlo.' },
      { clave: 'CONEXIÓN', texto: 'Contigo, con los tuyos, con el entorno y con nuestras raíces.' },
      { clave: 'EXCLUSIVIDAD', texto: 'Un lugar pensado para crear recuerdos que duran para siempre.' },
      { clave: 'BELLEZA NATURAL', texto: 'La esencia de Canarias en un entorno privilegiado.' },
      { clave: 'VERSATILIDAD', texto: 'De día, de tarde o de noche, siempre el escenario perfecto.' },
    ],
    tagline: 'ABRE EL TECHO, LEVANTA LA MIRADA\nY DÉJATE LLEVAR.\nAQUÍ ARRIBA, LA MAGIA ES REAL.',
    imagen: '/zonas/zona-terraza.jpg',
  },
];

/* ── Zona individual ────────────────────────────────────────────── */
function ZonaSection({ zona, index }: { zona: ZonaData; index: number }) {
  const sectionRef  = useRef<HTMLElement>(null);
  const imgRef      = useRef<HTMLDivElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);
  const titleWrapRef = useRef<HTMLDivElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);

  const isEven = index % 2 === 0; // par → texto derecha; impar → texto izquierda

  useEffect(() => {
    const section = sectionRef.current;
    const img     = imgRef.current;
    const overlay = overlayRef.current;
    const content = contentRef.current;
    const title   = titleRef.current;
    if (!section || !img) return;

    // ── Capa 1: imagen parallax lenta (yPercent -25)
    gsap.to(img, {
      yPercent: -25,
      ease: 'none',
      scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
    });

    // ── Capa 2: overlay parallax medio
    if (overlay) {
      gsap.to(overlay, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }

    // ── Capa 3: contenido — fade one-shot
    if (content) {
      gsap.fromTo(content,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 72%', once: true } }
      );
    }

    // ── Título: clip reveal desde abajo
    if (title) {
      gsap.fromTo(title,
        { yPercent: 110, clipPath: 'inset(0 0 100% 0)' },
        { yPercent: 0, clipPath: 'inset(0 0 0% 0)', duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: section, start: 'top 68%', once: true } }
      );
    }

    return () => { ScrollTrigger.refresh(); };
  }, []);

  const parrafos = Array.isArray(zona.parrafo) ? zona.parrafo : [zona.parrafo];

  return (
    <section
      ref={sectionRef}
      className="zona-section"
      style={{ position: 'relative', height: '100vh', minHeight: '680px', overflow: 'hidden', background: '#1A0E05' }}
    >
      {/* Capa 1 — imagen parallax lenta */}
      <div
        ref={imgRef}
        style={{
          position: 'absolute', inset: '-20% 0',
          willChange: 'transform',
        }}
      >
        <img
          src={zona.imagen}
          alt={zona.titulo}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>

      {/* Capa 2 — overlay gradiente parallax medio */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          inset: '-10% 0',
          willChange: 'transform',
          background: isEven
            ? 'linear-gradient(to right, transparent 38%, rgba(26,14,5,0.72) 62%, #1A0E05 82%)'
            : 'linear-gradient(to left, transparent 38%, rgba(26,14,5,0.72) 62%, #1A0E05 82%)',
        }}
      />

      {/* Overlay base */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,14,5,0.22)' }} />

      {/* Capa 3 — Panel de texto */}
      <div
        ref={contentRef}
        style={{
          position: 'absolute',
          top: 0,
          [isEven ? 'right' : 'left']: 0,
          width: 'clamp(340px, 44%, 600px)',
          height: '100%',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: 'clamp(3rem,5vw,5rem) clamp(2rem,4vw,4rem)',
          background: '#1A0E05',
          willChange: 'transform, opacity',
          overflowY: 'auto',
        }}
      >
        {/* Número decorativo */}
        <span style={{
          position: 'absolute', top: '1.5rem',
          [isEven ? 'right' : 'left']: '1.5rem',
          fontFamily: 'var(--font-cinzel)',
          fontSize: '140px', color: '#C8922A', opacity: 0.05,
          lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
        }}>
          {zona.num}
        </span>

        {/* Título con clip reveal */}
        <div ref={titleWrapRef} style={{ overflow: 'hidden', marginBottom: '1rem' }}>
          <h2
            ref={titleRef}
            style={{
              fontFamily: 'var(--font-cinzel)',
              fontSize: 'clamp(38px, 5vw, 72px)',
              fontWeight: 400,
              color: '#C8922A', lineHeight: 1.0,
              letterSpacing: '.03em',
              whiteSpace: 'pre-line', margin: 0,
              textShadow: '0 2px 30px rgba(0,0,0,0.9)',
            }}
          >
            {zona.titulo}
          </h2>
        </div>

        <OrnamentalDivider />

        {/* Párrafo(s) */}
        {parrafos.map((p, i) => (
          <p key={i} style={{
            fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
            fontSize: 'clamp(15px, 1.3vw, 19px)',
            color: '#C4A882', lineHeight: 1.75,
            margin: '0 0 .8rem',
          }}>{p}</p>
        ))}

        {/* Grid atributos 2 columnas */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '.8rem 1.2rem', margin: '1rem 0 1.2rem',
        }}>
          {zona.atributos.map((a) => (
            <div key={a.titulo} style={{ borderLeft: '2px solid rgba(200,146,42,0.2)', paddingLeft: '.8rem' }}>
              <p style={{
                fontFamily: 'var(--font-cinzel)', fontSize: '10px',
                color: '#C8922A', letterSpacing: '.15em', margin: '0 0 3px',
                textTransform: 'uppercase',
              }}>{a.titulo}</p>
              <p style={{
                fontFamily: 'var(--font-raleway)', fontWeight: 300,
                fontSize: '12px', color: '#8A6940', lineHeight: 1.5, margin: 0,
              }}>{a.texto}</p>
            </div>
          ))}
        </div>

        {/* ¿Qué se quiere transmitir? */}
        <div style={{ borderTop: '1px solid rgba(200,146,42,0.15)', paddingTop: '1rem', marginBottom: '1.2rem' }}>
          <p style={{
            fontFamily: 'var(--font-cinzel)', fontSize: '9px',
            color: '#8A6940', letterSpacing: '.3em', margin: '0 0 .6rem',
            textTransform: 'uppercase',
          }}>¿QUÉ SE QUIERE TRANSMITIR?</p>
          {zona.transmitir.map((t) => (
            <p key={t.clave} style={{
              fontFamily: 'var(--font-raleway)', fontWeight: 300,
              fontSize: '12px', color: '#C4A882',
              lineHeight: 1.45, margin: '0 0 3px',
            }}>
              <span style={{ color: '#C8922A', marginRight: '4px' }}>◆</span>
              <strong style={{ fontWeight: 500, color: '#D4A843', fontFamily: 'var(--font-cinzel)', fontSize: '10px', letterSpacing: '.08em' }}>{t.clave}:</strong>
              {' '}{t.texto}
            </p>
          ))}
        </div>

        {/* Tagline */}
        <p style={{
          fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
          fontSize: 'clamp(13px, 1.1vw, 17px)',
          color: '#D4A843', lineHeight: 1.5,
          whiteSpace: 'pre-line', margin: 0,
        }}>
          {zona.tagline}
        </p>
      </div>
    </section>
  );
}

/* ── Separador dorado entre zonas ──────────────────────────────── */
function ZonaSeparator() {
  return (
    <div style={{
      height: '1px',
      background: 'linear-gradient(to right, transparent 5%, rgba(200,146,42,0.45) 30%, rgba(212,168,67,0.7) 50%, rgba(200,146,42,0.45) 70%, transparent 95%)',
    }} />
  );
}

/* ── Componente principal ────────────────────────────────────────── */
export default function ZonasFullscreen() {
  return (
    <div id="espacios" style={{ background: '#1A0E05' }}>
      {ZONAS.map((zona, i) => (
        <div key={zona.num}>
          {i > 0 && <ZonaSeparator />}
          <ZonaSection zona={zona} index={i} />
        </div>
      ))}
    </div>
  );
}
