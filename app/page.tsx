import { LampContainer } from './components/ui/lamp';
import ZonasGallery from './components/ZonasGallery';
import EventosSection from './components/EventosSection';
import HorariosSection from './components/HorariosSection';
import MenuSection from './components/MenuSection';
import Link from 'next/link';

const ISLAS = [
  { slug: 'lanzarote',    nombre: 'Lanzarote',    subtitulo: 'Volcanic soul, fire and calm',      imagen: '/islas/lanzarote.jpg' },
  { slug: 'fuerteventura',nombre: 'Fuerteventura', subtitulo: 'Atlantic breeze, desert silence',   imagen: '/islas/Fuerteventura.jpg' },
  { slug: 'gran-canaria', nombre: 'Gran Canaria',  subtitulo: 'Vibrant, cosmopolitan, alive',      imagen: '/islas/Gran canaria.jpg' },
  { slug: 'tenerife',     nombre: 'Tenerife',      subtitulo: 'Majestic heights, intimate skies',  imagen: '/islas/Tenerife.jpg' },
  { slug: 'la-palma',     nombre: 'La Palma',      subtitulo: 'Green dreams, golden light',        imagen: '/islas/la palma.jpg' },
  { slug: 'la-gomera',    nombre: 'La Gomera',     subtitulo: 'Ancient mist, pure essence',        imagen: '/islas/La gomera.jpg' },
  { slug: 'el-hierro',    nombre: 'El Hierro',     subtitulo: 'Wild, remote, ancestral',           imagen: '/islas/el hierro.jpg' },
  { slug: 'la-graciosa',  nombre: 'La Graciosa',   subtitulo: 'Serenity at its finest',            imagen: '/islas/La graciosa.jpg' },
];

const NAV_ZONES = [
  { label: 'ENTRANCE',      href: '#espacios' },
  { label: 'BILLIARDS',     href: '#espacios' },
  { label: 'GAMES TENT',    href: '#espacios' },
  { label: 'FAMILY CHILL',  href: '#espacios' },
  { label: 'DINING & SHOWS',href: '#eventos' },
  { label: 'TERRACE',       href: '#terraza' },
];

export default async function Home() {
  return (
    <main style={{ background: '#1A1208', minHeight: '100vh' }}>

      {/* NAVBAR */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '1.25rem 2.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(26,18,8,0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(201,168,76,.1)',
      }}>
        {/* Logo */}
        <a href="#" style={{
          fontFamily: 'var(--font-cinzel)', fontSize: '.8rem',
          letterSpacing: '.35em', color: '#C9A84C', textDecoration: 'none',
          whiteSpace: 'nowrap',
        }}>
          SOKKO LOUNGE
        </a>

        {/* Zones */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {NAV_ZONES.map(({ label, href }) => (
            <a key={label} href={href} style={{
              fontFamily: 'var(--font-raleway)', fontWeight: 300,
              fontSize: '.58rem', letterSpacing: '.22em', textTransform: 'uppercase',
              color: '#B8A980', textDecoration: 'none',
              transition: 'color .2s',
            }}>
              {label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a href="#terraza" style={{
          fontFamily: 'var(--font-raleway)', fontWeight: 500,
          fontSize: '.58rem', letterSpacing: '.25em', textTransform: 'uppercase',
          color: '#1A1208', background: '#C9A84C',
          padding: '.65rem 1.4rem', textDecoration: 'none',
          whiteSpace: 'nowrap',
        }}>
          BOOK TABLE
        </a>
      </nav>

      {/* HERO */}
      <LampContainer>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute', left: `${(i * 17 + 5) % 100}%`,
            width: '2px', height: '2px', background: '#C9A84C', borderRadius: '50%',
            opacity: 0, animation: `float ${10 + (i % 8)}s ${i * 0.7}s linear infinite`,
            pointerEvents: 'none',
          }} />
        ))}
        <h1 style={{
          fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(2.2rem, 6vw, 5rem)',
          color: '#C9A84C', letterSpacing: '.1em', lineHeight: 1.1,
          textShadow: '0 0 60px rgba(201,168,76,.3)',
          animation: 'fadeUp 1.4s .4s both', textAlign: 'center',
        }}>
          RAW ELEGANCE.<br />VOLCANIC SOUL.
        </h1>
        <p style={{
          fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
          fontSize: '1.05rem', color: '#B8A980',
          maxWidth: '540px', textAlign: 'center', lineHeight: '1.75',
          marginTop: '1.75rem', animation: 'fadeUp 1.4s .65s both',
        }}>
          A sensory sanctuary where the ruggedness of nature meets the refinement
          of a high-end lounge. Crafted in volcanic stone, illuminated by golden hour.
        </p>
        <a href="#espacios" style={{
          marginTop: '2.5rem',
          fontFamily: 'var(--font-raleway)', fontWeight: 500,
          fontSize: '.6rem', letterSpacing: '.3em', textTransform: 'uppercase',
          color: '#1A1208', background: '#C9A84C',
          padding: '.9rem 2.4rem', textDecoration: 'none',
          animation: 'fadeUp 1.4s .85s both',
        }}>
          EXPLORE THE EXPERIENCE
        </a>
        <a href="#espacios" style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.6rem', textDecoration: 'none', animation: 'fadeUp 1.4s 1.1s both' }}>
          <span style={{ fontSize: '.5rem', letterSpacing: '.4em', textTransform: 'uppercase', color: '#8A6E2F' }}>Discover</span>
          <div style={{ width: '1px', height: '50px', background: 'linear-gradient(to bottom, #8A6E2F, transparent)', animation: 'scrollDrop 2s ease-in-out infinite' }} />
        </a>
      </LampContainer>

      {/* ZONAS */}
      <section id="espacios">
        <ZonasGallery />
      </section>

      {/* FILOSOFIA */}
      <section style={{ padding: '8rem 2rem', textAlign: 'center', background: 'linear-gradient(to bottom, #0C0A06 0%, #F5F0E8 100%)' }}>
        <p style={{
          fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
          fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', color: '#1A1208',
          lineHeight: '1.7', maxWidth: '700px', margin: '0 auto',
        }}>
          SOKKO is not just a place.<br />It is refuge, calm, connection and experience.
        </p>
        <div style={{ width: '60px', height: '2px', background: '#C9A84C', margin: '2.5rem auto 0' }} />
      </section>

      {/* TERRAZA — ISLANDS GRID */}
      <section id="terraza" style={{ background: '#1A1208', padding: '6rem 2rem', borderTop: '3px solid rgba(201,168,76,.2)' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontSize: '.6rem', letterSpacing: '.5em', color: '#8A6E2F', textTransform: 'uppercase' }}>
            03 — Terrace
          </p>
          <h2 style={{
            fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            color: '#C9A84C', letterSpacing: '.15em', marginTop: '1rem',
          }}>
            Island Groups
          </h2>
          <div style={{ width: '60px', height: '1px', background: '#8A6E2F', margin: '1.5rem auto' }} />
          <p style={{
            fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
            fontSize: '1.05rem', color: '#B8A980',
            maxWidth: '520px', margin: '0 auto', lineHeight: '1.8',
          }}>
            Each group bears the name of a Canary Island. Choose yours and reserve your space under the stars.
          </p>
        </div>

        {/* 4×2 Grid */}
        <div style={{
          maxWidth: '1280px', margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '2px',
        }}>
          {ISLAS.map((isla) => (
            <Link key={isla.slug} href={`/terraza/${isla.slug}`} style={{ textDecoration: 'none', display: 'block', position: 'relative', overflow: 'hidden', aspectRatio: '3/4' }}>
              {/* Photo */}
              <img
                src={isla.imagen}
                alt={isla.nombre}
                style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  transition: 'transform .6s ease',
                }}
              />
              {/* Gradient overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(26,18,8,.95) 0%, rgba(26,18,8,.45) 50%, rgba(26,18,8,.15) 100%)',
                transition: 'opacity .4s ease',
              }} />
              {/* Text — bottom */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '1.5rem',
              }}>
                <p style={{
                  fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
                  fontSize: '.8rem', color: '#8A6E2F', marginBottom: '.4rem',
                  letterSpacing: '.05em', lineHeight: '1.4',
                }}>
                  {isla.subtitulo}
                </p>
                <p style={{
                  fontFamily: 'var(--font-cinzel)', fontSize: '.95rem',
                  color: '#C9A84C', letterSpacing: '.15em', margin: 0,
                }}>
                  {isla.nombre}
                </p>
                <div style={{ width: '24px', height: '1px', background: '#C9A84C', marginTop: '.75rem', opacity: .6 }} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* EVENTOS */}
      <EventosSection />

      {/* CARTA */}
      <MenuSection />

      {/* HORARIOS */}
      <HorariosSection />

      {/* FOOTER */}
      <footer style={{
        textAlign: 'center', padding: '4rem 2rem',
        background: '#1A1208',
        borderTop: '3px solid rgba(201,168,76,.3)',
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
