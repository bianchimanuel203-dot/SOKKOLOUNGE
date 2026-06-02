'use client';
import { useEffect, useRef, useState } from 'react';

/* ── Separador ornamental ───────────────────────────────────────── */
function OrnamentalDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '1.2rem 0' }}>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(200,146,42,0.5))' }} />
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 1L8.1 5.5L12.5 7L8.1 8.5L7 13L5.9 8.5L1.5 7L5.9 5.5Z"
          fill="none" stroke="#C8922A" strokeWidth="1" />
      </svg>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(200,146,42,0.5))' }} />
    </div>
  );
}

/* ── Tipos ─────────────────────────────────────────────────────── */
interface BloqueDesc {
  titulo: string;
  texto: string;
}

interface Zona {
  num: string;
  etiqueta: string;
  titulo: string;
  desc: string;
  bloques: BloqueDesc[];
  transmitir: [string, string][];
  frase: string;
  imagen: string;
  textoIzq: boolean; // true: texto izquierda, foto derecha
}

/* ── Datos exactos del PDF ─────────────────────────────────────── */
const ZONAS: Zona[] = [
  {
    num: '01', etiqueta: 'Entrada del Local',
    titulo: 'LA ENTRADA,\nEL PRIMER RESGUARDO',
    desc: 'La entrada de SOKKO no es solo un acceso, es el primer abrazo. Un umbral que marca el paso del exterior al interior, del ruido al refugio, del viento a la calma.',
    bloques: [
      { titulo: 'IDENTIDAD DESDE EL PRIMER PASO', texto: 'El logotipo iluminado sobre piedra volcánica conecta con nuestras raíces y con la esencia de Canarias. La luz cálida dorada transmite acogida, elegancia y pertenencia.' },
      { titulo: 'NATURALEZA Y AUTENTICIDAD', texto: 'La presencia de plantas naturales y piedra volcánica refuerza nuestra conexión con la tierra, creando un ambiente orgánico, real y profundamente canario.' },
      { titulo: 'LUZ CÁLIDA, AMBIENTE ENVOLVENTE', texto: 'La iluminación indirecta guía, acentúa y envuelve. Cada detalle lumínico está pensado para generar una sensación de intimidad, seguridad y bienestar.' },
      { titulo: 'SÍMBOLOS QUE NOS DEFINEN', texto: 'Resguardo, calma y conexión no son solo palabras, son los pilares de nuestra filosofía y se presentan desde el primer instante para recordar quiénes somos y qué ofrecemos.' },
      { titulo: 'UNA EXPERIENCIA QUE COMIENZA AQUÍ', texto: 'El felpudo personalizado, los materiales, los aromas y la atmósfera invitan al cliente a dejar atrás el exterior y prepararse para vivir algo único.' },
    ],
    transmitir: [
      ['REFUGIO', 'Un lugar donde el viento se queda fuera y la tranquilidad te recibe.'],
      ['EXCLUSIVIDAD', 'Un ambiente cuidado al detalle que comunica calidad y distinción.'],
      ['CONEXIÓN', 'Con nuestra tierra, con nuestras raíces y entre las personas.'],
      ['CALMA Y BIENESTAR', 'Un espacio seguro, elegante y pensado para disfrutar sin prisas.'],
      ['CURIOSIDAD Y DESEO', 'Queremos que al cruzar la puerta, nazca la emoción por descubrir todo lo que hay dentro.'],
    ],
    frase: 'LA ENTRADA DE SOKKO ES UNA PROMESA:\nAQUÍ ENCUENTRAS TU LUGAR. AQUÍ TE RESGUARDAS.\nAQUÍ COMIENZA TU EXPERIENCIA.',
    imagen: '/zonas/zona-entrada.jpg',
    textoIzq: false,
  },
  {
    num: '02', etiqueta: 'Billar',
    titulo: 'ZONA\nBILLAR',
    desc: 'Un espacio para compartir, competir y disfrutar. La zona de billar de SOKKO está diseñada para ofrecer un ambiente acogedor, dinámico y sofisticado, donde el juego se convierte en excusa para la conexión.',
    bloques: [
      { titulo: 'AMBIENTE CÁLIDO Y ENVOLVENTE', texto: 'La iluminación tenue y estratégica crea un entorno cómodo y relajado, ideal para disfrutar durante la tarde o la noche.' },
      { titulo: 'INSPIRACIÓN CANARIA', texto: 'Materiales naturales, texturas orgánicas y vegetación que nos conectan con la esencia de nuestras islas, transmitiendo calma y autenticidad.' },
      { titulo: 'DIVERSIÓN SIN EDAD', texto: 'Pensado para todos los públicos: familias, amigos y grupos que buscan un plan diferente en un entorno seguro y acogedor.' },
      { titulo: 'JUEGO, COMPETENCIA Y BUENA ENERGÍA', texto: 'Mesas de calidad profesional en un espacio que invita a la competición sana, las risas y los momentos inolvidables.' },
      { titulo: 'DETALLES QUE SUMAN EXPERIENCIA', texto: 'Desde el mobiliario hasta cada elemento decorativo está cuidadosamente seleccionado para ofrecer una experiencia completa y memorable.' },
    ],
    transmitir: [
      ['CONEXIÓN', 'Un punto de encuentro para crear recuerdos y fortalecer vínculos.'],
      ['DIVERSIÓN', 'El juego como protagonista de momentos únicos.'],
      ['RELAX', 'Un ambiente que invita a desconectar y disfrutar sin prisas.'],
      ['IDENTIDAD', 'La esencia de Canarias presente en cada rincón.'],
      ['EXPERIENCIA', 'Más que jugar al billar, vivir SOKKO.'],
    ],
    frase: 'AQUÍ CADA PARTIDA ES MÁS QUE UN JUEGO.\nES UN MOMENTO, UNA HISTORIA, UNA CONEXIÓN.',
    imagen: '/zonas/zona-billar.jpg',
    textoIzq: true,
  },
  {
    num: '03', etiqueta: 'Jaima de Juegos',
    titulo: 'JAIMA\nDE JUEGOS',
    desc: 'La Jaima de Juegos es un espacio diseñado para despertar sonrisas y crear momentos inolvidables. Un rincón divertido y dinámico donde todas las edades encuentran su lugar para jugar, compartir y disfrutar.',
    bloques: [
      { titulo: 'DIVERSIÓN PARA TODOS', texto: 'Un espacio pensado para familias, amigos y grupos que buscan entretenimiento y conexión en un ambiente seguro y acogedor.' },
      { titulo: 'JUEGOS QUE CONECTAN', texto: 'Máquinas recreativas, dardos, juegos de mesa y actividades que fomentan la interacción, la competencia sana y las buenas risas.' },
      { titulo: 'AMBIENTE ÚNICO', texto: 'Inspirado en la tradición de nuestras jaimas y en la esencia canaria, combinado con un diseño moderno, cálido y lleno de detalles.' },
      { titulo: 'DESCONEXIÓN Y ALEGRÍA', texto: 'Un lugar para desconectar del día a día, liberar tensiones y dejarse llevar por el juego, la música y la buena energía que define a SOKKO.' },
      { titulo: 'MOMENTOS QUE SE RECUERDAN', texto: 'Aquí cada partida, cada risa y cada reto compartido se convierte en un recuerdo que forma parte de la experiencia SOKKO.' },
    ],
    transmitir: [
      ['ALEGRÍA', 'Un espacio que invita al juego, a la risa y al buen rollo.'],
      ['CONEXIÓN', 'Momentos compartidos que fortalecen vínculos y crean recuerdos.'],
      ['DIVERSIÓN', 'Entretenimiento para todas las edades en un ambiente dinámico y seguro.'],
      ['ACOGIDA', 'Un lugar cálido, cómodo y pensado para que todos se sientan como en casa.'],
      ['ESENCIA CANARIA', 'Tradición, identidad y modernidad unidas en cada detalle.'],
    ],
    frase: 'EN LA JAIMA DE JUEGOS,\nCADA PARTIDA ES UNA HISTORIA,\nCADA RISA, UNA CONEXIÓN.',
    imagen: '/zonas/zona-jaima.jpg',
    textoIzq: false,
  },
  {
    num: '04', etiqueta: 'Chill Familiar',
    titulo: 'ZONA\nCHILL FAMILIAR',
    desc: 'Un espacio para relajarse, conversar y disfrutar sin prisas. La zona chill familiar de SOKKO está pensada para que todos encuentren su ritmo: desde una tarde tranquila en familia hasta una charla entre amigos al caer la noche.',
    bloques: [
      { titulo: 'COMODIDAD Y BIENESTAR', texto: 'Sofás amplios, cojines confortables y rincones acogedores que invitan a relajarse y quedarse.' },
      { titulo: 'AMBIENTE CÁLIDO Y NATURAL', texto: 'Materiales naturales, plantas y una iluminación cálida que crea un entorno armónico, donde el tiempo se disfruta de otra manera.' },
      { titulo: 'PARA TODOS LOS PÚBLICOS', texto: 'Ideal para familias, grupos de amigos o momentos más íntimos y tranquilos. Un espacio inclusivo, cómodo y seguro.' },
      { titulo: 'DISFRUTA SIN PRISAS', texto: 'Cafés, tés, cócteles, refrescos y una selección de bebidas para acompañar cada momento del día.' },
      { titulo: 'MÚSICA Y CALMA EN EQUILIBRIO', texto: 'Una ambientación musical cuidadosamente seleccionada para crear el equilibrio perfecto entre energía y tranquilidad.' },
    ],
    transmitir: [
      ['RELAX', 'Un refugio donde desconectar del exterior y conectar con lo importante.'],
      ['CONEXIÓN', 'Conversaciones, risas y momentos que se convierten en recuerdos.'],
      ['CALMA', 'Un ambiente que transmite paz, equilibrio y buena energía.'],
      ['ACOGIDA', 'Sensación de hogar, cercanía y bienestar desde el primer instante.'],
      ['AUTENTICIDAD', 'La esencia de Canarias presente en cada detalle y en cada experiencia.'],
    ],
    frase: 'EN SOKKO, EL CHILL NO ES SOLO DESCANSAR.\nES DISFRUTAR DEL MOMENTO,\nRODEADO DE BUENA GENTE Y BUENAS VIBRAS.',
    imagen: '/zonas/zona-chill.jpg',
    textoIzq: true,
  },
  {
    num: '05', etiqueta: 'Comedor y Shows',
    titulo: 'ZONA\nCOMEDOR\nY SHOWS',
    desc: 'El corazón de SOKKO. Un espacio donde la gastronomía, la música y el espectáculo se fusionan para crear experiencias únicas e inolvidables. Cada noche, un nuevo show, una nueva emoción.',
    bloques: [
      { titulo: 'ESCENARIO PROTAGONISTA', texto: 'Un escenario profesional equipado con sonido e iluminación de alta calidad para ofrecer conciertos, monólogos, DJ sets y espectáculos temáticos.' },
      { titulo: 'GASTRONOMÍA CON IDENTIDAD', texto: 'Una carta que celebra los sabores de Canarias con un toque moderno y creativo, maridada con cócteles, vinos y bebidas premium para cada ocasión.' },
      { titulo: 'AMBIENTE ENVOLVENTE', texto: 'Iluminación cálida, vegetación natural y detalles cuidados que crean un entorno íntimo y elegante, pensado para disfrutar y dejarse llevar.' },
      { titulo: 'EXPERIENCIAS QUE UNEN', texto: 'Música en directo, shows, cenas temáticas y eventos especiales que convierten cada visita en un recuerdo para compartir.' },
    ],
    transmitir: [
      ['EMOCIÓN', 'La magia de vivir algo especial que combina todos los sentidos.'],
      ['CONEXIÓN', 'Un lugar donde compartir momentos y crear recuerdos.'],
      ['CELEBRACIÓN', 'Cada noche es una oportunidad para brindar, disfrutar y vibrar.'],
      ['IDENTIDAD', 'El orgullo de nuestras raíces, llevado a escena con estilo y autenticidad.'],
      ['EXCLUSIVIDAD', 'Un ambiente cuidado al detalle para que te sientas parte de algo único.'],
    ],
    frase: 'BUENA MESA, BUENA MÚSICA,\nGRANDES HISTORIAS Y MEJORES PERSONAS.\nASÍ SON LAS NOCHES EN SOKKO.',
    imagen: '/zonas/zona-comedor.jpg',
    textoIzq: false,
  },
  {
    num: '06', etiqueta: 'La Terraza',
    titulo: 'LA JOYA\nDE LA CORONA',
    desc: 'Nuestra terraza es el alma de SOKKO. Un espacio único, versátil y privilegiado, con techo retráctil que se abre para conectar contigo mismo, con el cielo y con la magia de Canarias.\n\nBajo el sol dorado o bajo un manto de estrellas, cada momento aquí se convierte en algo inolvidable.',
    bloques: [
      { titulo: 'TECHO RETRÁCTIL', texto: 'Elige tu cielo: sol radiante, brisa fresca o noches estrelladas.' },
      { titulo: 'VISTAS ESPECTACULARES', texto: 'Un horizonte que cambia cada día, siempre impresionante.' },
      { titulo: 'AMBIENTE EXCLUSIVO', texto: 'Cómodos lounges, música cuidadosamente seleccionada y un ambiente que eleva cada experiencia.' },
      { titulo: '8 AGRUPACIONES, 8 ISLAS', texto: 'Cada espacio lleva el nombre de una de las ocho islas Canarias, un guiño a nuestra tierra y a nuestra identidad.' },
    ],
    transmitir: [
      ['LIBERTAD', 'Un espacio donde el tiempo se detiene y tú eliges cómo vivirlo.'],
      ['CONEXIÓN', 'Contigo, con los tuyos, con el entorno y con nuestras raíces.'],
      ['EXCLUSIVIDAD', 'Un lugar pensado para crear recuerdos que duran para siempre.'],
      ['BELLEZA NATURAL', 'La esencia de Canarias en un entorno privilegiado.'],
      ['VERSATILIDAD', 'De día, de tarde o de noche, siempre el escenario perfecto.'],
    ],
    frase: 'ABRE EL TECHO, LEVANTA LA MIRADA\nY DÉJATE LLEVAR.\nAQUÍ ARRIBA, LA MAGIA ES REAL.',
    imagen: '/zonas/zona-terraza.jpg',
    textoIzq: true,
  },
];

/* ── Separador horizontal dorado entre zonas ────────────────────── */
function ZonaSeparator() {
  return (
    <div style={{
      height: '1px',
      background: 'linear-gradient(to right, transparent 5%, rgba(200,146,42,0.45) 30%, rgba(212,168,67,0.7) 50%, rgba(200,146,42,0.45) 70%, transparent 95%)',
    }} />
  );
}

/* ── Icono ◆ ────────────────────────────────────────────────────── */
function DiamondIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ flexShrink: 0, marginTop: '2px' }}>
      <path d="M5 1L9 5L5 9L1 5Z" fill="#C8922A" fillOpacity="0.85" />
    </svg>
  );
}

/* ── Zona individual fullscreen ─────────────────────────────────── */
function ZonaSection({ zona, isMobile }: { zona: Zona; isMobile: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef     = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);

  /* Parallax nativo */
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !imgRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = -rect.top / window.innerHeight;
      imgRef.current.style.transform = `translateY(${progress * 80}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Reveal texto */
  useEffect(() => {
    if (!textRef.current) return;
    const el = textRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const imgSide   = zona.textoIzq ? 'right' : 'left';
  const textSide  = zona.textoIzq ? 'left'  : 'right';

  if (isMobile) {
    return (
      <section ref={sectionRef} style={{ background: '#1A0E05' }}>
        {/* Foto mobile: 55vh */}
        <div style={{ position: 'relative', height: '55vmax', maxHeight: '420px', overflow: 'hidden' }}>
          <div
            ref={imgRef}
            style={{
              position: 'absolute', inset: '-15%',
              backgroundImage: `url(${zona.imagen})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(26,14,5,0.3) 0%, rgba(26,14,5,0.85) 100%)',
          }} />
          <div style={{
            position: 'absolute', top: '1.5rem', left: '1.5rem',
            fontFamily: 'var(--font-cinzel)', fontSize: '.55rem',
            letterSpacing: '.5em', color: 'rgba(200,146,42,0.8)',
          }}>
            {zona.num} — {zona.etiqueta}
          </div>
        </div>

        {/* Texto mobile */}
        <div style={{ padding: '2.5rem 1.5rem 3rem', background: '#1A0E05' }}>
          <h2 style={{
            fontFamily: 'var(--font-cinzel)',
            fontSize: 'clamp(1.6rem, 6vw, 2.4rem)',
            color: '#C8922A', letterSpacing: '.06em',
            lineHeight: 1.15, margin: '0 0 1rem',
            whiteSpace: 'pre-line',
          }}>
            {zona.titulo}
          </h2>
          <OrnamentalDivider />
          {zona.desc.split('\n\n').map((p, i) => (
            <p key={i} style={{
              fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
              fontSize: '1.05rem', color: '#C4A882',
              lineHeight: 1.75, margin: '0 0 1rem',
            }}>{p}</p>
          ))}
          <ul style={{ listStyle: 'none', margin: '1.5rem 0', padding: 0, display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
            {zona.transmitir.map(([k, v]) => (
              <li key={k} style={{ display: 'flex', alignItems: 'baseline', gap: '.6rem' }}>
                <DiamondIcon />
                <span style={{ fontFamily: 'var(--font-raleway)', fontSize: '.82rem', lineHeight: 1.5 }}>
                  <span style={{ fontFamily: 'var(--font-cinzel)', color: '#C8922A', letterSpacing: '.08em', fontSize: '.7rem', textTransform: 'uppercase' }}>{k}</span>
                  <span style={{ color: '#8A6940' }}> · {v}</span>
                </span>
              </li>
            ))}
          </ul>
          <p style={{
            fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
            fontSize: '1rem', color: '#D4A843',
            lineHeight: 1.6, whiteSpace: 'pre-line', margin: 0,
          }}>
            {zona.frase}
          </p>
        </div>
      </section>
    );
  }

  /* ── DESKTOP: split 60/40 ───────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      className="zona-section"
      style={{
        display: 'grid',
        gridTemplateColumns: zona.textoIzq ? '40% 60%' : '60% 40%',
        minHeight: '100vh',
        background: '#1A0E05',
        position: 'relative',
      }}
    >
      {/* Foto */}
      <div style={{
        order: zona.textoIzq ? 2 : 1,
        position: 'relative', overflow: 'hidden',
      }}>
        <div
          ref={imgRef}
          style={{
            position: 'absolute', inset: '-20%',
            backgroundImage: `url(${zona.imagen})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            willChange: 'transform',
          }}
        />
        {/* Overlay de transición hacia el panel de texto */}
        <div style={{
          position: 'absolute', inset: 0,
          background: zona.textoIzq
            ? 'linear-gradient(to left, rgba(26,14,5,0.7) 0%, rgba(26,14,5,0.15) 60%, transparent 100%)'
            : 'linear-gradient(to right, rgba(26,14,5,0.7) 0%, rgba(26,14,5,0.15) 60%, transparent 100%)',
        }} />
        {/* Overlay base */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(26,14,5,0.25)',
        }} />

        {/* Número decorativo grande */}
        <div style={{
          position: 'absolute', bottom: '4rem',
          left: zona.textoIzq ? 'auto' : '3rem',
          right: zona.textoIzq ? '3rem' : 'auto',
          fontFamily: 'var(--font-cinzel)',
          fontSize: 'clamp(8rem, 18vw, 16rem)',
          color: 'rgba(200,146,42,0.06)',
          lineHeight: 1, pointerEvents: 'none',
          userSelect: 'none',
        }}>
          {zona.num}
        </div>
      </div>

      {/* Panel de texto */}
      <div
        ref={textRef}
        style={{
          order: zona.textoIzq ? 1 : 2,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(3rem, 6vw, 6rem) clamp(2.5rem, 5vw, 5rem)',
          background: '#1A0E05',
          opacity: 0,
          transform: 'translateY(30px)',
          transition: 'opacity 1s ease, transform 1s ease',
          overflowY: 'auto',
          maxHeight: '100vh',
        }}
      >
        {/* Etiqueta */}
        <p style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: '.58rem', letterSpacing: '.65em',
          color: 'rgba(200,146,42,0.6)', textTransform: 'uppercase',
          margin: '0 0 1rem',
        }}>
          {zona.num} — {zona.etiqueta}
        </p>

        {/* Título */}
        <h2 style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: 'clamp(2.2rem, 4.5vw, 4.2rem)',
          color: '#C8922A',
          letterSpacing: '.06em',
          lineHeight: 1.05,
          margin: '0 0 1.2rem',
          whiteSpace: 'pre-line',
          textShadow: '0 0 60px rgba(200,146,42,0.2)',
        }}>
          {zona.titulo}
        </h2>

        <OrnamentalDivider />

        {/* Párrafo principal */}
        {zona.desc.split('\n\n').map((p, i) => (
          <p key={i} style={{
            fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
            fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
            color: '#C4A882', lineHeight: 1.8,
            margin: '0 0 1rem', maxWidth: '480px',
          }}>{p}</p>
        ))}

        {/* Bloques descriptivos (desktop: 2 col) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '.8rem',
          marginTop: '1.5rem',
          marginBottom: '1.8rem',
        }}>
          {zona.bloques.map((b, i) => (
            <div key={i} style={{
              borderLeft: '2px solid rgba(200,146,42,0.25)',
              paddingLeft: '1rem',
            }}>
              <p style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: '.6rem', letterSpacing: '.08em',
                color: '#C8922A', textTransform: 'uppercase',
                margin: '0 0 .3rem',
              }}>
                {b.titulo}
              </p>
              <p style={{
                fontFamily: 'var(--font-raleway)', fontWeight: 300,
                fontSize: '.78rem', color: '#8A6940',
                lineHeight: 1.6, margin: 0,
              }}>
                {b.texto}
              </p>
            </div>
          ))}
        </div>

        {/* ¿Qué se quiere transmitir? */}
        <div style={{
          borderTop: '1px solid rgba(200,146,42,0.1)',
          paddingTop: '1.2rem', marginBottom: '1.8rem',
        }}>
          <p style={{
            fontFamily: 'var(--font-cinzel)',
            fontSize: '.55rem', letterSpacing: '.5em',
            color: 'rgba(200,146,42,0.5)', textTransform: 'uppercase',
            margin: '0 0 .8rem',
          }}>
            ¿Qué se quiere transmitir?
          </p>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '.45rem' }}>
            {zona.transmitir.map(([k, v]) => (
              <li key={k} style={{ display: 'flex', alignItems: 'baseline', gap: '.6rem' }}>
                <DiamondIcon />
                <span style={{ fontFamily: 'var(--font-raleway)', fontSize: '.8rem', lineHeight: 1.5 }}>
                  <span style={{
                    fontFamily: 'var(--font-cinzel)',
                    color: '#C8922A', letterSpacing: '.08em',
                    fontSize: '.68rem', textTransform: 'uppercase',
                  }}>
                    {k}
                  </span>
                  <span style={{ color: '#8A6940' }}>{': '}{v}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Frase final */}
        <div style={{
          borderTop: '1px solid rgba(200,146,42,0.2)',
          paddingTop: '1.4rem',
        }}>
          <p style={{
            fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
            fontSize: 'clamp(1rem, 1.7vw, 1.35rem)',
            color: '#D4A843',
            lineHeight: 1.55, whiteSpace: 'pre-line',
            margin: 0,
            textShadow: '0 0 30px rgba(212,168,67,0.15)',
          }}>
            {zona.frase}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── Componente principal ────────────────────────────────────────── */
export default function ZonasGallery() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div style={{ background: '#1A0E05' }}>
      {/* Cabecera de sección */}
      <div style={{
        textAlign: 'center',
        padding: 'clamp(4rem, 8vw, 7rem) 2rem clamp(3rem, 5vw, 5rem)',
        borderBottom: '1px solid rgba(200,146,42,0.1)',
      }}>
        <p style={{
          fontFamily: 'var(--font-raleway)', fontWeight: 300,
          fontSize: '.6rem', letterSpacing: '.6em',
          color: '#8A6940', textTransform: 'uppercase', margin: '0 0 1rem',
        }}>
          02 — Espacios
        </p>
        <h2 style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          color: '#C8922A', letterSpacing: '.15em', margin: '0 0 1.2rem',
        }}>
          NUESTRAS ZONAS
        </h2>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          width: 'min(280px, 70vw)', margin: '0 auto 1.5rem',
        }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(200,146,42,0.4))' }} />
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1L8.1 5.5L12.5 7L8.1 8.5L7 13L5.9 8.5L1.5 7L5.9 5.5Z"
              fill="none" stroke="#C8922A" strokeWidth="1" />
          </svg>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(200,146,42,0.4))' }} />
        </div>
        <p style={{
          fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
          fontSize: 'clamp(.9rem, 1.8vw, 1.15rem)', color: '#C4A882', margin: 0,
        }}>
          Seis espacios únicos, cada uno con su propio carácter
        </p>
      </div>

      {/* Zonas */}
      {ZONAS.map((zona, i) => (
        <div key={zona.num}>
          {i > 0 && <ZonaSeparator />}
          <ZonaSection zona={zona} isMobile={isMobile} />
        </div>
      ))}
    </div>
  );
}
