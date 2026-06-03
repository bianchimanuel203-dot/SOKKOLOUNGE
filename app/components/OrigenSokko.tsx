'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BLOQUES = [
  {
    titulo: 'UN REFERENTE Y PUNTO DE ENCUENTRO',
    texto: 'Más que un local, SOKKO pretende convertirse en un referente social y cultural para todos los públicos. Un punto de encuentro seguro, acogedor e inclusivo donde familias, grupos de amigos y personas que simplemente buscan desconectar puedan encontrar su sitio.\nInspirado en la belleza natural y la esencia de las Islas Canarias, el proyecto incorpora guiños constantes a nuestra tierra a través de su estética, su ambiente, su gastronomía y sus experiencias.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M18 4Q26,4 28,18Q26,32 18,32Q10,32 8,18Q10,4 18,4Z" stroke="#C8922A" strokeWidth="1" fill="none" strokeOpacity=".4"/>
        <line x1="12" y1="32" x2="12" y2="16" stroke="#C8922A" strokeWidth="1.5" strokeOpacity=".8"/>
        <path d="M12,16 Q5,10 2,13" stroke="#C8922A" strokeWidth="1.2" fill="none" strokeOpacity=".8"/>
        <path d="M12,16 Q7,8 9,9" stroke="#C8922A" strokeWidth="1.2" fill="none" strokeOpacity=".8"/>
        <path d="M12,16 Q16,7 19,9" stroke="#C8922A" strokeWidth="1.2" fill="none" strokeOpacity=".8"/>
        <path d="M20,32 L26,20 L32,32Z" stroke="#C8922A" strokeWidth="1.2" fill="none" strokeOpacity=".8"/>
        <circle cx="26" cy="12" r="4" stroke="#C8922A" strokeWidth="1.2" strokeOpacity=".9"/>
        <circle cx="26" cy="12" r="1.5" fill="#C8922A" fillOpacity=".7"/>
      </svg>
    ),
  },
  {
    titulo: 'EXPERIENCIAS PARA CADA MOMENTO',
    texto: 'El concepto combina diferentes espacios y ambientes diseñados para adaptarse a distintos momentos del día. Desde una terraza cálida y soleada hasta zonas chill-out, áreas de juego, espacios de espectáculos y rincones pensados para el descanso y la conexión social.\nTodo ello acompañado de una oferta gastronómica y de bebidas dinámica y versátil, que evoluciona según el horario y las experiencias temáticas del local.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="7" stroke="#C8922A" strokeWidth="1.4" strokeOpacity=".9"/>
        <circle cx="18" cy="18" r="2.5" fill="#C8922A" fillOpacity=".6"/>
        {[0,45,90,135,180,225,270,315].map((d,i) => {
          const r = Math.PI * d / 180;
          return <line key={i} x1={18+Math.cos(r)*9} y1={18+Math.sin(r)*9} x2={18+Math.cos(r)*13} y2={18+Math.sin(r)*13} stroke="#C8922A" strokeWidth="1.1" strokeOpacity=".7"/>;
        })}
      </svg>
    ),
  },
  {
    titulo: 'CULTURA, CREATIVIDAD Y ENTRETENIMIENTO',
    texto: 'SOKKO apuesta también por la creatividad y la cultura como parte fundamental de su identidad. Durante el día, el espacio dará lugar a talleres, actividades creativas y encuentros sociales como clases de DJ, crochet, costura o eventos colaborativos.\nAl caer la noche, el ambiente se transforma para dar paso a espectáculos temáticos, música en directo, sesiones de DJ y experiencias inmersivas que convierten cada visita en algo diferente.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M13,28 L13,10 L29,6 L29,24" stroke="#C8922A" strokeWidth="1.4" fill="none" strokeOpacity=".9"/>
        <circle cx="10" cy="29" r="3.5" stroke="#C8922A" strokeWidth="1.2" strokeOpacity=".9"/>
        <circle cx="26" cy="25" r="3.5" stroke="#C8922A" strokeWidth="1.2" strokeOpacity=".9"/>
        <line x1="13" y1="10" x2="29" y2="6" stroke="#C8922A" strokeWidth=".8" strokeOpacity=".4"/>
      </svg>
    ),
  },
  {
    titulo: 'VISIÓN DE FUTURO',
    texto: 'El objetivo a largo plazo es construir una marca sólida y reconocible que modernice la imagen de Canarias desde una perspectiva contemporánea y premium, permitiendo replicar el concepto en futuras ubicaciones estratégicas de las islas, como rooftops, beach clubs y espacios singulares con identidad propia.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M3,31 L11,17 L18,24 L24,10 L33,31Z" stroke="#C8922A" strokeWidth="1.4" fill="none" strokeOpacity=".9"/>
        <line x1="2" y1="32" x2="34" y2="32" stroke="#C8922A" strokeWidth="1" strokeOpacity=".5"/>
        <circle cx="28" cy="7" r="4.5" stroke="#C8922A" strokeWidth="1.2" strokeOpacity=".9"/>
      </svg>
    ),
  },
];

export default function OrigenSokko() {
  useEffect(() => {
    // Párrafo intro — fade + slide
    gsap.fromTo('.origen-intro',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.origen-intro', start: 'top 78%', once: true } }
    );

    // 4 bloques — stagger
    gsap.fromTo('.origen-bloque',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, stagger: 0.16, ease: 'power3.out',
        scrollTrigger: { trigger: '.origen-bloques-grid', start: 'top 72%', once: true } }
    );

    // Tagline final
    gsap.fromTo('.origen-tagline',
      { scale: 0.88, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.origen-tagline', start: 'top 80%', once: true } }
    );
  }, []);

  return (
    <section
      id="origen"
      style={{ background: '#1E1208', padding: 'clamp(5rem,8vw,8rem) 0 0' }}
    >
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 clamp(1.5rem,5vw,4rem)' }}>

        {/* Párrafo de origen — sin título visible */}
        <p
          className="origen-intro"
          style={{
            fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(17px,1.6vw,22px)',
            color: '#F4EDD8',
            lineHeight: 1.75,
            maxWidth: '820px',
            margin: '0 auto clamp(4rem,7vw,6rem)',
            textAlign: 'center',
          }}
        >
          SOKKO nace de una expresión profundamente canaria: «ponerse al sokko», refugiarse del viento,
          encontrar un lugar de calma, protección y encuentro. Bajo esa esencia surge un proyecto que
          busca reinterpretar la identidad de Canarias desde una visión moderna, elegante y cercana,
          creando un espacio único donde tradición, ocio, cultura y comunidad conviven en armonía.
        </p>

        {/* Grid 4 bloques — cards más claras que la sección */}
        <div
          className="origen-bloques-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
            gap: '1px',
            background: 'rgba(212,152,46,0.12)',
          }}
        >
          {BLOQUES.map((b) => (
            <div
              key={b.titulo}
              className="origen-bloque"
              style={{
                background: '#382010',
                padding: 'clamp(2rem,3vw,3rem) clamp(1.5rem,2.5vw,2.5rem)',
                display: 'flex', flexDirection: 'column', gap: '1.2rem',
                transition: 'background 0.3s ease',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#4A2A14'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#382010'}
            >
              <div style={{ color: '#D4982E' }}>{b.icon}</div>
              <h3 style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: 'clamp(10px,1.1vw,13px)',
                color: '#D4982E', letterSpacing: '.15em', lineHeight: 1.55,
                margin: 0,
              }}>{b.titulo}</h3>
              <div style={{ width: '28px', height: '1px', background: 'rgba(212,152,46,0.5)' }} />
              {b.texto.split('\n').map((p, i) => (
                <p key={i} style={{
                  fontFamily: 'var(--font-raleway)', fontWeight: 300,
                  fontSize: '14px',
                  color: '#D4B896', lineHeight: 1.75, margin: 0,
                }}>{p}</p>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Tagline final */}
      <div style={{ textAlign: 'center', padding: 'clamp(5rem,9vw,7rem) 2rem' }}>
        <p
          className="origen-tagline"
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.5rem,3.8vw,2.8rem)',
            color: '#F4EDD8',
            lineHeight: 1.55, maxWidth: '820px',
            margin: '0 auto',
            textShadow: '0 0 50px rgba(212,168,67,0.18)',
          }}
        >
          SOKKO NO ES SOLO UN LUGAR.<br />
          ES REFUGIO, CALMA, CONEXIÓN Y EXPERIENCIA.
        </p>
      </div>
    </section>
  );
}
