'use client';

const NAV_COLS = [
  {
    titulo: 'PÁGINAS',
    links: [
      { label: 'INICIO',    href: '/' },
      { label: 'ZONAS',     href: '#espacios' },
      { label: 'ISLAS',     href: '#islas' },
      { label: 'EVENTOS',   href: '#eventos' },
      { label: 'CARTA',     href: '#menu' },
      { label: 'HORARIOS',  href: '#horarios' },
    ],
  },
  {
    titulo: 'REDES',
    links: [
      { label: 'Instagram', href: 'https://www.instagram.com/sokkolounge.ftv/', target: '_blank', rel: 'noopener noreferrer' },
      { label: 'Facebook',  href: 'https://www.facebook.com/profile.php?id=61590424587799&locale=es_ES', target: '_blank', rel: 'noopener noreferrer' },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{
      background: '#1A0E05',
      borderTop: '1px solid rgba(200,146,42,0.15)',
      padding: 'clamp(4rem,7vw,6rem) clamp(1.5rem,5vw,4rem) 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Grid 4 columnas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '3rem',
        maxWidth: '1200px',
        margin: '0 auto clamp(4rem,6vw,5rem)',
      }}>

        {/* Columna 1 — Logo + descripción */}
        <div>
          <span style={{
            fontFamily: 'var(--font-cinzel, Cinzel, serif)',
            fontSize: '22px',
            color: '#E8B84B',
            letterSpacing: '0.25em',
            display: 'block',
            marginBottom: '0.5rem',
          }}>
            SOKKO LOUNGE
          </span>
          <p style={{
            fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
            fontSize: '14px', color: '#C4A882',
            margin: '0 0 1.2rem', lineHeight: 1.5,
          }}>
            El Resguardo del Viento · Fuerteventura
          </p>
          <p style={{
            fontFamily: 'var(--font-raleway)', fontWeight: 300,
            fontSize: '12px', color: '#8A6940', lineHeight: 1.8,
          }}>
            © 2025 SOKKO LOUNGE.<br />
            Todos los derechos reservados.
          </p>
        </div>

        {/* Columnas 2-3 — Páginas / Redes */}
        {NAV_COLS.map((col) => (
          <div key={col.titulo}>
            <h4 style={{
              fontFamily: 'var(--font-cinzel)', fontSize: '11px',
              color: '#C8922A', letterSpacing: '.3em',
              margin: '0 0 1.5rem', textTransform: 'uppercase',
            }}>
              {col.titulo}
            </h4>
            {col.links.map(({ label, href, target, rel }: { label: string; href: string; target?: string; rel?: string }) => (
              <a
                key={label}
                href={href}
                target={target}
                rel={rel}
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-raleway)', fontWeight: 300,
                  fontSize: '13px', color: '#8A6940',
                  textDecoration: 'none', marginBottom: '.75rem',
                  letterSpacing: '.1em',
                  transition: 'color .2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#C8922A')}
                onMouseLeave={e => (e.currentTarget.style.color = '#8A6940')}
              >
                {label}
              </a>
            ))}
          </div>
        ))}

        {/* Columna 4 — Contacto */}
        <div>
          <h4 style={{
            fontFamily: 'var(--font-cinzel)', fontSize: '11px',
            color: '#C8922A', letterSpacing: '.3em',
            margin: '0 0 1.5rem', textTransform: 'uppercase',
          }}>
            CONTACTO
          </h4>
          <p style={{
            fontFamily: 'var(--font-raleway)', fontWeight: 300,
            fontSize: '12px', color: '#8A6940', lineHeight: 1.9, margin: '0 0 1rem',
          }}>
            Av. Alcalde Juan Ramón<br />
            Soto Morales, 7<br />
            35610 Castillo Caleta<br />
            de Fuste, Fuerteventura
          </p>
          <a
            href="tel:+34643830451"
            style={{
              fontFamily: 'var(--font-cinzel)', fontSize: '13px',
              color: '#C4A882', textDecoration: 'none', letterSpacing: '.06em',
              transition: 'color .2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#C8922A')}
            onMouseLeave={e => (e.currentTarget.style.color = '#C4A882')}
          >
            +34 643 830 451
          </a>
        </div>
      </div>

      {/* Línea separadora */}
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        borderTop: '1px solid rgba(200,146,42,0.08)',
      }} />

      {/* TEXTO GRANDE en la base — estilo DevStudio */}
      <div style={{
        overflow: 'hidden',
        userSelect: 'none',
        pointerEvents: 'none',
        marginTop: '-0.2em',
      }}>
        <p style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: 'clamp(60px, 13vw, 190px)',
          color: 'rgba(212,152,46,0.22)',
          letterSpacing: '.02em',
          lineHeight: 0.82,
          margin: 0,
          textAlign: 'center',
          whiteSpace: 'nowrap',
        }}>
          SOKKO LOUNGE
        </p>
      </div>
    </footer>
  );
}
