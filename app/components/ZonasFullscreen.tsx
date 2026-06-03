'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ── Datos de zonas — textos EXACTOS del PDF ─────────────────────── */
const ZONAS = [
  {
    id: 1,
    imagen: '/zonas/zona-entrada.jpg',
    titulo: 'LA ENTRADA,\nEL PRIMER RESGUARDO',
    parrafo: 'La entrada de SOKKO no es solo un acceso, es el primer abrazo. Un umbral que marca el paso del exterior al interior, del ruido al refugio, del viento a la calma.',
    atributos: [
      { t: 'IDENTIDAD DESDE EL PRIMER PASO', d: 'El logotipo iluminado sobre piedra volcánica conecta con nuestras raíces y con la esencia de Canarias.' },
      { t: 'NATURALEZA Y AUTENTICIDAD',       d: 'La presencia de plantas naturales y piedra volcánica refuerza nuestra conexión con la tierra.' },
      { t: 'LUZ CÁLIDA, AMBIENTE ENVOLVENTE', d: 'La iluminación indirecta guía, acentúa y envuelve. Cada detalle lumínico está pensado para generar intimidad.' },
      { t: 'UNA EXPERIENCIA QUE COMIENZA AQUÍ', d: 'El felpudo personalizado, los materiales y los aromas invitan a dejar atrás el exterior.' },
    ],
    transmitir: [
      { k: 'REFUGIO',          v: 'Un lugar donde el viento se queda fuera y la tranquilidad te recibe.' },
      { k: 'EXCLUSIVIDAD',     v: 'Un ambiente cuidado al detalle que comunica calidad y distinción.' },
      { k: 'CONEXIÓN',         v: 'Con nuestra tierra, con nuestras raíces y entre las personas.' },
      { k: 'CALMA Y BIENESTAR',v: 'Un espacio seguro, elegante y pensado para disfrutar sin prisas.' },
      { k: 'CURIOSIDAD Y DESEO', v: 'Queremos que al cruzar la puerta, nazca la emoción por descubrir todo lo que hay dentro.' },
    ],
    tagline: 'LA ENTRADA DE SOKKO ES UNA PROMESA:\nAQUÍ ENCUENTRAS TU LUGAR. AQUÍ TE RESGUARDAS.\nAQUÍ COMIENZA TU EXPERIENCIA.',
  },
  {
    id: 2,
    imagen: '/zonas/zona-billar.jpg',
    titulo: 'ZONA\nBILLAR',
    parrafo: 'Un espacio para compartir, competir y disfrutar. La zona de billar de SOKKO está diseñada para ofrecer un ambiente acogedor, dinámico y sofisticado, donde el juego se convierte en excusa para la conexión.',
    atributos: [
      { t: 'AMBIENTE CÁLIDO Y ENVOLVENTE',     d: 'La iluminación tenue y estratégica crea un entorno cómodo y relajado, ideal para disfrutar durante la tarde o la noche.' },
      { t: 'INSPIRACIÓN CANARIA',              d: 'Materiales naturales, texturas orgánicas y vegetación que nos conectan con la esencia de nuestras islas.' },
      { t: 'DIVERSIÓN SIN EDAD',               d: 'Pensado para todos los públicos: familias, amigos y grupos que buscan un plan diferente.' },
      { t: 'JUEGO, COMPETENCIA Y BUENA ENERGÍA', d: 'Mesas de calidad profesional en un espacio que invita a la competición sana, las risas y los momentos inolvidables.' },
    ],
    transmitir: [
      { k: 'CONEXIÓN',    v: 'Un punto de encuentro para crear recuerdos y fortalecer vínculos.' },
      { k: 'DIVERSIÓN',   v: 'El juego como protagonista de momentos únicos.' },
      { k: 'RELAX',       v: 'Un ambiente que invita a desconectar y disfrutar sin prisas.' },
      { k: 'IDENTIDAD',   v: 'La esencia de Canarias presente en cada rincón.' },
      { k: 'EXPERIENCIA', v: 'Más que jugar al billar, vivir SOKKO.' },
    ],
    tagline: 'AQUÍ CADA PARTIDA ES MÁS QUE UN JUEGO.\nES UN MOMENTO, UNA HISTORIA, UNA CONEXIÓN.',
  },
  {
    id: 3,
    imagen: '/zonas/zona-jaima.jpg',
    titulo: 'JAIMA\nDE JUEGOS',
    parrafo: 'La Jaima de Juegos es un espacio diseñado para despertar sonrisas y crear momentos inolvidables. Un rincón divertido y dinámico donde todas las edades encuentran su lugar para jugar, compartir y disfrutar.',
    atributos: [
      { t: 'DIVERSIÓN PARA TODOS',    d: 'Un espacio pensado para familias, amigos y grupos que buscan entretenimiento y conexión.' },
      { t: 'JUEGOS QUE CONECTAN',     d: 'Máquinas recreativas, dardos, juegos de mesa y actividades que fomentan la interacción.' },
      { t: 'AMBIENTE ÚNICO',          d: 'Inspirado en la tradición de nuestras jaimas y en la esencia canaria, con un diseño moderno y cálido.' },
      { t: 'MOMENTOS QUE SE RECUERDAN', d: 'Aquí cada partida, cada risa y cada reto compartido se convierte en un recuerdo.' },
    ],
    transmitir: [
      { k: 'ALEGRÍA',         v: 'Un espacio que invita al juego, a la risa y al buen rollo.' },
      { k: 'CONEXIÓN',        v: 'Momentos compartidos que fortalecen vínculos y crean recuerdos.' },
      { k: 'DIVERSIÓN',       v: 'Entretenimiento para todas las edades en un ambiente dinámico y seguro.' },
      { k: 'ACOGIDA',         v: 'Un lugar cálido, cómodo y pensado para que todos se sientan como en casa.' },
      { k: 'ESENCIA CANARIA', v: 'Tradición, identidad y modernidad unidas en cada detalle.' },
    ],
    tagline: 'EN LA JAIMA DE JUEGOS,\nCADA PARTIDA ES UNA HISTORIA,\nCADA RISA, UNA CONEXIÓN.',
  },
  {
    id: 4,
    imagen: '/zonas/zona-chill.jpg',
    titulo: 'ZONA\nCHILL FAMILIAR',
    parrafo: 'Un espacio para relajarse, conversar y disfrutar sin prisas. La zona chill familiar de SOKKO está pensada para que todos encuentren su ritmo: desde una tarde tranquila en familia hasta una charla entre amigos al caer la noche.',
    atributos: [
      { t: 'COMODIDAD Y BIENESTAR',       d: 'Sofás amplios, cojines confortables y rincones acogedores que invitan a relajarse y quedarse.' },
      { t: 'AMBIENTE CÁLIDO Y NATURAL',   d: 'Materiales naturales, plantas y una iluminación cálida que crea un entorno armónico.' },
      { t: 'PARA TODOS LOS PÚBLICOS',     d: 'Ideal para familias, grupos de amigos o momentos más íntimos y tranquilos.' },
      { t: 'MÚSICA Y CALMA EN EQUILIBRIO', d: 'Una ambientación musical cuidadosamente seleccionada para crear el equilibrio perfecto.' },
    ],
    transmitir: [
      { k: 'RELAX',         v: 'Un refugio donde desconectar del exterior y conectar con lo importante.' },
      { k: 'CONEXIÓN',      v: 'Conversaciones, risas y momentos que se convierten en recuerdos.' },
      { k: 'CALMA',         v: 'Un ambiente que transmite paz, equilibrio y buena energía.' },
      { k: 'ACOGIDA',       v: 'Sensación de hogar, cercanía y bienestar desde el primer instante.' },
      { k: 'AUTENTICIDAD',  v: 'La esencia de Canarias presente en cada detalle y en cada experiencia.' },
    ],
    tagline: 'EN SOKKO, EL CHILL NO ES SOLO DESCANSAR.\nES DISFRUTAR DEL MOMENTO,\nRODEADO DE BUENA GENTE Y BUENAS VIBRAS.',
  },
  {
    id: 5,
    imagen: '/zonas/zona-comedor.jpg',
    titulo: 'ZONA COMEDOR\nY SHOWS',
    parrafo: 'El corazón de SOKKO. Un espacio donde la gastronomía, la música y el espectáculo se fusionan para crear experiencias únicas e inolvidables. Cada noche, un nuevo show, una nueva emoción.',
    atributos: [
      { t: 'ESCENARIO PROTAGONISTA',     d: 'Un escenario profesional equipado con sonido e iluminación de alta calidad para conciertos, monólogos y DJ sets.' },
      { t: 'GASTRONOMÍA CON IDENTIDAD',  d: 'Una carta que celebra los sabores de Canarias con un toque moderno y creativo.' },
      { t: 'AMBIENTE ENVOLVENTE',        d: 'Iluminación cálida, vegetación natural y detalles cuidados que crean un entorno íntimo y elegante.' },
      { t: 'EXPERIENCIAS QUE UNEN',      d: 'Música en directo, shows, cenas temáticas y eventos especiales que convierten cada visita en un recuerdo.' },
    ],
    transmitir: [
      { k: 'EMOCIÓN',       v: 'La magia de vivir algo especial que combina todos los sentidos.' },
      { k: 'CONEXIÓN',      v: 'Un lugar donde compartir momentos y crear recuerdos.' },
      { k: 'CELEBRACIÓN',   v: 'Cada noche es una oportunidad para brindar, disfrutar y vibrar.' },
      { k: 'IDENTIDAD',     v: 'El orgullo de nuestras raíces, llevado a escena con estilo y autenticidad.' },
      { k: 'EXCLUSIVIDAD',  v: 'Un ambiente cuidado al detalle para que te sientas parte de algo único.' },
    ],
    tagline: 'BUENA MESA, BUENA MÚSICA,\nGRANDES HISTORIAS Y MEJORES PERSONAS.\nASÍ SON LAS NOCHES EN SOKKO.',
  },
  {
    id: 6,
    imagen: '/zonas/zona-terraza.jpg',
    titulo: 'LA JOYA\nDE LA CORONA',
    parrafo: 'Nuestra terraza es el alma de SOKKO. Un espacio único, versátil y privilegiado, con techo retráctil que se abre para conectar contigo mismo, con el cielo y con la magia de Canarias.',
    atributos: [
      { t: 'TECHO RETRÁCTIL',        d: 'Elige tu cielo: sol radiante, brisa fresca o noches estrelladas.' },
      { t: 'VISTAS ESPECTACULARES',  d: 'Un horizonte que cambia cada día, siempre impresionante.' },
      { t: 'AMBIENTE EXCLUSIVO',     d: 'Cómodos lounges, música cuidadosamente seleccionada y un ambiente que eleva cada experiencia.' },
      { t: '8 AGRUPACIONES, 8 ISLAS', d: 'Cada espacio lleva el nombre de una de las ocho islas Canarias, un guiño a nuestra tierra y a nuestra identidad.' },
    ],
    transmitir: [
      { k: 'LIBERTAD',        v: 'Un espacio donde el tiempo se detiene y tú eliges cómo vivirlo.' },
      { k: 'CONEXIÓN',        v: 'Contigo, con los tuyos, con el entorno y con nuestras raíces.' },
      { k: 'EXCLUSIVIDAD',    v: 'Un lugar pensado para crear recuerdos que duran para siempre.' },
      { k: 'BELLEZA NATURAL', v: 'La esencia de Canarias en un entorno privilegiado.' },
      { k: 'VERSATILIDAD',    v: 'De día, de tarde o de noche, siempre el escenario perfecto.' },
    ],
    tagline: 'ABRE EL TECHO, LEVANTA LA MIRADA\nY DÉJATE LLEVAR.\nAQUÍ ARRIBA, LA MAGIA ES REAL.',
  },
];

/* ── Separador ornamental ────────────────────────────────────────── */
function OrnamentalDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '1.2rem 0 1.5rem' }}>
      <div style={{ width: '40px', height: '1px', background: '#C8922A' }} />
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M6 0L7 5L12 6L7 7L6 12L5 7L0 6L5 5Z" stroke="#C8922A" strokeWidth="1" fill="none" />
      </svg>
      <div style={{ width: '40px', height: '1px', background: '#C8922A' }} />
    </div>
  );
}

/* ── Componente principal ────────────────────────────────────────── */
export default function ZonasFullscreen() {
  const [activeZona, setActiveZona] = useState(0);
  const [imgOpacity, setImgOpacity] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    ZONAS.forEach((zona, i) => {
      ScrollTrigger.create({
        trigger: `#zona-text-${zona.id}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          setImgOpacity(0);
          setTimeout(() => { setActiveZona(i); setImgOpacity(1); }, 250);
        },
        onEnterBack: () => {
          setImgOpacity(0);
          setTimeout(() => { setActiveZona(i); setImgOpacity(1); }, 250);
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, [isMobile]);

  /* ── MOBILE: stack vertical ──────────────────────────────────── */
  if (isMobile) {
    return (
      <section id="espacios" style={{ background: '#1A0E05' }}>
        <div style={{ textAlign: 'center', padding: '5rem 1.5rem 3rem' }}>
          <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: '10px', color: '#8A6940', letterSpacing: '.5em', margin: '0 0 .8rem' }}>NUESTROS ESPACIOS</p>
          <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(28px,8vw,40px)', color: '#C8922A', letterSpacing: '.08em', margin: 0 }}>LAS ZONAS</h2>
        </div>
        {ZONAS.map((zona) => (
          <div key={zona.id} style={{ marginBottom: '3rem', borderBottom: '1px solid rgba(200,146,42,0.1)' }}>
            <div style={{ position: 'relative', height: '55vw', overflow: 'hidden' }}>
              <img src={zona.imagen} alt={zona.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,14,5,0.7) 0%, transparent 60%)' }} />
            </div>
            <div style={{ padding: '2rem 1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(24px,6vw,32px)', color: '#C8922A', lineHeight: 1.1, whiteSpace: 'pre-line', margin: '0 0 1rem' }}>{zona.titulo}</h3>
              <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: '16px', color: '#C4A882', lineHeight: 1.7, margin: '0 0 1.2rem' }}>{zona.parrafo}</p>
              <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: '14px', color: '#D4A843', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{zona.tagline}</p>
            </div>
          </div>
        ))}
      </section>
    );
  }

  /* ── DESKTOP: sticky scroll ──────────────────────────────────── */
  return (
    <section id="espacios" style={{ background: '#1A0E05' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', padding: '7rem 2rem 4rem' }}>
        <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: '11px', color: '#8A6940', letterSpacing: '.5em', margin: '0 0 1rem' }}>
          NUESTROS ESPACIOS
        </p>
        <h2 style={{ fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(32px, 5vw, 64px)', color: '#C8922A', letterSpacing: '.08em', margin: 0 }}>
          LAS ZONAS
        </h2>
      </div>

      {/* Grid sticky */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 2rem',
        alignItems: 'start',
      }}>

        {/* ── Columna izquierda: imagen sticky ── */}
        <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div style={{
            position: 'relative',
            width: '100%',
            height: '80vh',
            borderRadius: '4px',
            overflow: 'hidden',
            border: '1px solid rgba(200,146,42,0.2)',
            boxShadow: '0 0 60px rgba(0,0,0,0.6)',
          }}>
            <img
              key={ZONAS[activeZona].id}
              src={ZONAS[activeZona].imagen}
              alt={ZONAS[activeZona].titulo}
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'center',
                opacity: imgOpacity,
                transition: 'opacity 0.4s ease',
              }}
            />
            {/* Overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,14,5,0.5) 0%, transparent 60%)', pointerEvents: 'none' }} />
            {/* Contador */}
            <div style={{
              position: 'absolute', top: '1.5rem', left: '1.5rem',
              fontFamily: 'var(--font-cinzel)', fontSize: '11px',
              color: '#C8922A', letterSpacing: '.3em', opacity: 0.8,
            }}>
              {String(activeZona + 1).padStart(2, '0')} / 06
            </div>
          </div>
        </div>

        {/* ── Columna derecha: textos que scrollean ── */}
        <div>
          {ZONAS.map((zona, i) => (
            <div
              key={zona.id}
              id={`zona-text-${zona.id}`}
              className="zona-section"
              style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '5rem 3rem 5rem 4rem',
                borderBottom: i < ZONAS.length - 1 ? '1px solid rgba(200,146,42,0.08)' : 'none',
              }}
            >
              {/* Número decorativo */}
              <span style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: '100px', color: '#C8922A', opacity: 0.05,
                lineHeight: 1, display: 'block', marginBottom: '-2rem',
                userSelect: 'none' as const,
              }}>
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Título */}
              <h3 style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: 'clamp(28px, 3.2vw, 48px)',
                color: '#C8922A', lineHeight: 1.05,
                letterSpacing: '.03em',
                whiteSpace: 'pre-line', margin: '0 0 .5rem',
                textShadow: '0 2px 30px rgba(0,0,0,0.8)',
                overflowWrap: 'break-word',
                wordBreak: 'break-word',
                maxWidth: '100%',
              }}>
                {zona.titulo}
              </h3>

              <OrnamentalDivider />

              {/* Párrafo */}
              <p style={{
                fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
                fontSize: 'clamp(17px, 1.6vw, 22px)',
                color: '#C4A882', lineHeight: 1.75, margin: '0 0 2.5rem',
              }}>
                {zona.parrafo}
              </p>

              {/* Grid atributos */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem 2rem', marginBottom: '2rem' }}>
                {zona.atributos.map(a => (
                  <div key={a.t}>
                    <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: '11px', color: '#C8922A', letterSpacing: '.12em', margin: '0 0 6px', textTransform: 'uppercase' as const }}>{a.t}</p>
                    <p style={{ fontFamily: 'var(--font-raleway)', fontWeight: 300, fontSize: '14px', color: '#9A7A50', lineHeight: 1.6, margin: 0 }}>{a.d}</p>
                  </div>
                ))}
              </div>

              {/* ¿Qué se quiere transmitir? */}
              <div style={{ borderTop: '1px solid rgba(200,146,42,0.15)', paddingTop: '1.5rem', marginBottom: '2rem' }}>
                <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: '10px', color: '#8A6940', letterSpacing: '.3em', margin: '0 0 1rem', textTransform: 'uppercase' as const }}>
                  ¿QUÉ SE QUIERE TRANSMITIR?
                </p>
                {zona.transmitir.map(t => (
                  <p key={t.k} style={{ fontFamily: 'var(--font-raleway)', fontWeight: 300, fontSize: '13.5px', color: '#C4A882', lineHeight: 1.6, margin: '0 0 6px' }}>
                    <span style={{ color: '#C8922A', marginRight: '6px' }}>◆</span>
                    <strong style={{ fontWeight: 500, color: '#D4A843', fontFamily: 'var(--font-cinzel)', fontSize: '10px', letterSpacing: '.08em' }}>{t.k}:</strong>
                    {' '}{t.v}
                  </p>
                ))}
              </div>

              {/* Tagline */}
              <p style={{
                fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
                fontSize: 'clamp(14px, 1.1vw, 17px)',
                color: '#D4A843', lineHeight: 1.65,
                whiteSpace: 'pre-line' as const,
                borderLeft: '2px solid rgba(200,146,42,0.3)',
                paddingLeft: '1.25rem', margin: 0,
              }}>
                {zona.tagline}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
