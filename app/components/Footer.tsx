'use client';

const NAV_LINKS = [
  { label: 'INICIO',    href: '/' },
  { label: 'ZONAS',     href: '#espacios' },
  { label: 'ISLAS',     href: '#terraza' },
  { label: 'EVENTOS',   href: '#eventos' },
  { label: 'CARTA',     href: '#menu' },
  { label: 'HORARIOS',  href: '#horarios' },
  { label: 'CONTACTO',  href: '#contacto' },
];

const REDES = [
  {
    nombre: 'Instagram',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4.5"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    nombre: 'Facebook',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
  },
  {
    nombre: 'TikTok',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.7a8.18 8.18 0 004.78 1.52v-3.4a4.85 4.85 0 01-1.01-.13z"/>
      </svg>
    ),
  },
  {
    nombre: 'YouTube',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
];

/* Separador ornamental pequeño */
function FooterDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '1.8rem 0' }}>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(200,146,42,0.3))' }} />
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M6 1L7 4.5L10.5 6L7 7.5L6 11L5 7.5L1.5 6L5 4.5Z" fill="none" stroke="#C8922A" strokeWidth="1" strokeOpacity="0.6" />
      </svg>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(200,146,42,0.3))' }} />
    </div>
  );
}

/* Medallón logo simplificado */
function FooterLogo() {
  return (
    <svg width="72" height="72" viewBox="0 0 200 200" fill="none">
      <circle cx="100" cy="100" r="92" stroke="#C8922A" strokeWidth="1.2" strokeOpacity="0.4"/>
      <circle cx="100" cy="100" r="84" stroke="#C8922A" strokeWidth="0.6" strokeOpacity="0.25"/>
      <path d="M44,148 Q44,44 100,40 Q156,44 156,148" stroke="#C8922A" strokeWidth="1.2" strokeOpacity="0.7" fill="none"/>
      <line x1="82" y1="136" x2="82" y2="84" stroke="#C8922A" strokeWidth="1.5" strokeOpacity="0.8"/>
      <path d="M82,84 Q65,68 55,74" stroke="#C8922A" strokeWidth="1.2" fill="none" strokeOpacity="0.7"/>
      <path d="M82,84 Q77,62 71,66" stroke="#C8922A" strokeWidth="1.2" fill="none" strokeOpacity="0.7"/>
      <path d="M82,84 Q87,60 94,64" stroke="#C8922A" strokeWidth="1.2" fill="none" strokeOpacity="0.7"/>
      <path d="M98,138 L118,96 L138,138 Z" stroke="#C8922A" strokeWidth="1.2" fill="none" strokeOpacity="0.7"/>
      <circle cx="116" cy="76" r="6.5" stroke="#C8922A" strokeWidth="1.2" strokeOpacity="0.8"/>
      <rect x="72" y="118" width="18" height="20" rx="1" stroke="#C8922A" strokeWidth="0.8" strokeOpacity="0.6" fill="none"/>
      <path d="M76,118 Q81,110 86,118" stroke="#C8922A" strokeWidth="0.8" fill="none" strokeOpacity="0.6"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer style={{
      background: '#1A0E05',
      borderTop: '2px solid rgba(200,146,42,0.35)',
      padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem) 3rem',
    }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>

        {/* Grid principal */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem',
        }}>

          {/* Columna izquierda: info */}
          <div>
            <p style={{
              fontFamily: 'var(--font-cinzel)',
              fontSize: '.6rem', letterSpacing: '.5em',
              color: '#8A6940', textTransform: 'uppercase',
              margin: '0 0 .6rem',
            }}>
              Localización
            </p>
            <p style={{
              fontFamily: 'var(--font-raleway)', fontWeight: 300,
              fontSize: '.85rem', color: '#C4A882',
              lineHeight: 1.8, margin: '0 0 1.5rem',
            }}>
              Av. Alcalde Juan Ramón Soto Morales, 7<br />
              35610 Castillo Caleta de Fuste<br />
              Fuerteventura, Islas Canarias
            </p>
            <p style={{
              fontFamily: 'var(--font-cinzel)',
              fontSize: '.6rem', letterSpacing: '.5em',
              color: '#8A6940', textTransform: 'uppercase',
              margin: '0 0 .6rem',
            }}>
              Contacto
            </p>
            <a href="tel:+34643830451" style={{
              fontFamily: 'var(--font-raleway)', fontWeight: 300,
              fontSize: '.9rem', color: '#C4A882',
              textDecoration: 'none', display: 'block', marginBottom: '.4rem',
            }}>
              +34 643 830 451
            </a>
          </div>

          {/* Columna central: logo + tagline */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', textAlign: 'center', gap: '.8rem',
          }}>
            <FooterLogo />
            <p style={{
              fontFamily: 'var(--font-cinzel)',
              fontSize: '1.1rem', letterSpacing: '.35em',
              color: '#C8922A', margin: 0,
            }}>
              SOKKO LOUNGE
            </p>
            <p style={{
              fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
              fontSize: '.85rem', color: '#8A6940', margin: 0,
            }}>
              ·By Gorka·
            </p>
            <p style={{
              fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
              fontSize: '.9rem', color: '#8A6940', margin: 0,
              letterSpacing: '.04em',
            }}>
              El Resguardo del Viento · Fuerteventura
            </p>

            {/* Redes sociales */}
            <div style={{ display: 'flex', gap: '1.2rem', marginTop: '.8rem' }}>
              {REDES.map(({ nombre, href, icon }) => (
                <a
                  key={nombre}
                  href={href}
                  aria-label={nombre}
                  style={{
                    color: 'rgba(200,146,42,0.45)',
                    textDecoration: 'none',
                    transition: 'color .25s ease',
                    cursor: 'pointer',
                    display: 'flex',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#C8922A')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(200,146,42,0.45)')}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Columna derecha: navegación */}
          <div>
            <p style={{
              fontFamily: 'var(--font-cinzel)',
              fontSize: '.6rem', letterSpacing: '.5em',
              color: '#8A6940', textTransform: 'uppercase',
              margin: '0 0 1.2rem',
            }}>
              Navegación
            </p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '.65rem' }}>
              {NAV_LINKS.map(({ label, href }) => (
                <a key={label} href={href} style={{
                  fontFamily: 'var(--font-raleway)', fontWeight: 300,
                  fontSize: '.72rem', letterSpacing: '.25em', textTransform: 'uppercase',
                  color: '#8A6940', textDecoration: 'none',
                  transition: 'color .2s ease',
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#C8922A')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#8A6940')}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <FooterDivider />

        {/* Copyright */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
        }}>
          <p style={{
            fontFamily: 'var(--font-raleway)', fontWeight: 300,
            fontSize: '.58rem', letterSpacing: '.2em',
            color: 'rgba(138,105,64,0.5)', textTransform: 'uppercase', margin: 0,
          }}>
            © 2025 SOKKO LOUNGE. Todos los derechos reservados.
          </p>
          <p style={{
            fontFamily: 'var(--font-raleway)', fontWeight: 300,
            fontSize: '.58rem', letterSpacing: '.15em',
            color: 'rgba(138,105,64,0.35)', margin: 0,
          }}>
            Diseño y desarrollo: sokkolounge.es
          </p>
        </div>
      </div>
    </footer>
  );
}
