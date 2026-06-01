import { getMenu } from '../lib/wordpress';

const categoriaLabel: Record<string, string> = {
  entrante:  'Entrantes',
  principal: 'Principales',
  postre:    'Postres',
  bebida:    'Bebidas',
  cocktail:  'Cócteles',
};

const ordenCategorias = ['entrante', 'principal', 'postre'];

const SEPARATOR: React.CSSProperties = {
  border: 'none',
  borderTop: '1px solid rgba(200,146,42,0.08)',
  margin: '0',
};

const nombreStyle: React.CSSProperties = {
  fontFamily: 'var(--font-cinzel)',
  fontSize: '.8rem', color: '#C4A882',
  letterSpacing: '.06em', margin: 0,
  lineHeight: 1.3,
};

const descStyle: React.CSSProperties = {
  fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
  fontSize: '.85rem', color: '#6A4A28',
  margin: '.3rem 0 0', lineHeight: '1.5',
};

const precioStyle: React.CSSProperties = {
  fontFamily: 'var(--font-cinzel)',
  fontSize: '.85rem', color: '#C8922A',
  flexShrink: 0, margin: 0,
  letterSpacing: '.04em',
};

interface PlatoItemProps {
  p: {
    id: number;
    title: { rendered: string };
    acf: {
      precio: number;
      descripcion: string;
      categoria: string;
      tipo: string;
      destacado: boolean;
      disponible: boolean;
      imagen: { url: string } | false;
    };
  };
  isLast: boolean;
}

function PlatoItem({ p, isLast }: PlatoItemProps) {
  return (
    <div>
      <div style={{
        display: 'flex', gap: '1rem',
        padding: '1.2rem 0',
        alignItems: 'flex-start',
      }}>
        {/* Foto pequeña */}
        {p.acf.imagen && (
          <div style={{
            width: '64px', height: '64px',
            flexShrink: 0, overflow: 'hidden',
            border: '1px solid rgba(200,146,42,0.15)',
          }}>
            <img
              src={p.acf.imagen.url}
              alt={p.title.rendered}
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.85) sepia(0.2)',
              }}
            />
          </div>
        )}

        {/* Texto */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {p.acf.destacado && (
            <span style={{
              fontSize: '.4rem', letterSpacing: '.2em',
              color: '#C4693E', textTransform: 'uppercase',
              display: 'block', marginBottom: '.3rem',
            }}>
              ✦ Signature
            </span>
          )}
          <p style={nombreStyle}>{p.title.rendered}</p>
          {p.acf.descripcion && (
            <p style={descStyle}>{p.acf.descripcion}</p>
          )}
        </div>

        {/* Precio */}
        <p style={precioStyle}>{p.acf.precio}€</p>
      </div>
      {!isLast && <hr style={SEPARATOR} />}
    </div>
  );
}

export default async function MenuSection() {
  const platos = await getMenu();
  const disponibles = platos.filter(p => p.acf.disponible);

  const porCategoriaComida = ordenCategorias.reduce((acc, cat) => {
    const items = disponibles.filter(p => p.acf.categoria === cat && p.acf.tipo === 'comida');
    if (items.length > 0) acc[cat] = items;
    return acc;
  }, {} as Record<string, typeof platos>);

  const bebidas   = disponibles.filter(p => p.acf.tipo === 'bebida');
  const cocktails = bebidas.filter(p => p.acf.categoria === 'cocktail');
  const otras     = bebidas.filter(p => p.acf.categoria !== 'cocktail');

  return (
    <section id="menu" style={{ background: '#1A0E05' }}>

      {/* Header */}
      <div style={{
        padding: '7rem 3rem 5rem', textAlign: 'center',
        borderTop: '1px solid rgba(200,146,42,0.15)',
        borderBottom: '1px solid rgba(200,146,42,0.1)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: '1rem',
          marginBottom: '2rem',
        }}>
          <div style={{ width: '40px', height: '1px', background: 'rgba(200,146,42,0.3)' }} />
          <div style={{ width: '5px', height: '5px', background: '#C8922A', transform: 'rotate(45deg)' }} />
          <div style={{ width: '40px', height: '1px', background: 'rgba(200,146,42,0.3)' }} />
        </div>
        <p style={{
          fontSize: '.6rem', letterSpacing: '.6em', color: '#8A6940',
          textTransform: 'uppercase', margin: '0 0 1rem',
        }}>
          06 — Gastronomía
        </p>
        <h2 style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          color: '#C8922A', letterSpacing: '.2em',
          margin: '0 0 1.5rem',
        }}>
          NUESTRA CARTA
        </h2>
        <p style={{
          fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
          fontSize: '1.15rem', color: '#C4A882',
          maxWidth: '480px', margin: '0 auto', lineHeight: '1.9',
        }}>
          Cocina canaria con alma. Ingredientes locales, sabores auténticos.
        </p>
      </div>

      {/* Grid 3 columnas */}
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
      }}>

        {/* ── COL 1: CÓCTELES ── */}
        <div style={{
          padding: '4rem 3rem',
          borderRight: '1px solid rgba(200,146,42,0.1)',
        }}>
          <div style={{
            marginBottom: '2.5rem', paddingBottom: '1.5rem',
            borderBottom: '1px solid rgba(200,146,42,0.15)',
          }}>
            <p style={{
              fontFamily: 'var(--font-cinzel)', fontSize: '.65rem',
              color: '#8A6940', letterSpacing: '.3em',
              textTransform: 'uppercase', margin: '0 0 .5rem',
            }}>
              I
            </p>
            <h3 style={{
              fontFamily: 'var(--font-cinzel)', fontSize: '1.1rem',
              color: '#C8922A', letterSpacing: '.15em',
              textTransform: 'uppercase', margin: 0,
            }}>
              Cócteles
            </h3>
          </div>

          {cocktails.length === 0 ? (
            <p style={{
              fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
              color: '#6A4A28', fontSize: '.95rem',
            }}>
              Próximamente.
            </p>
          ) : cocktails.map((p, i) => (
            <PlatoItem key={p.id} p={p} isLast={i === cocktails.length - 1} />
          ))}

          <div style={{
            marginTop: '2.5rem', paddingTop: '1.5rem',
            borderTop: '1px solid rgba(200,146,42,0.1)',
          }}>
            <p style={{
              fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
              fontSize: '.82rem', color: '#6A4A28', lineHeight: '1.7',
            }}>
              Todos nuestros cócteles están elaborados con destilados premium e infusiones de la casa.
            </p>
          </div>
        </div>

        {/* ── COL 2: COCINA ── */}
        <div style={{
          padding: '4rem 3rem',
          borderRight: '1px solid rgba(200,146,42,0.1)',
          background: 'rgba(200,146,42,0.02)',
        }}>
          <div style={{
            marginBottom: '2.5rem', paddingBottom: '1.5rem',
            borderBottom: '1px solid rgba(200,146,42,0.15)',
          }}>
            <p style={{
              fontFamily: 'var(--font-cinzel)', fontSize: '.65rem',
              color: '#8A6940', letterSpacing: '.3em',
              textTransform: 'uppercase', margin: '0 0 .5rem',
            }}>
              II
            </p>
            <h3 style={{
              fontFamily: 'var(--font-cinzel)', fontSize: '1.1rem',
              color: '#C8922A', letterSpacing: '.15em',
              textTransform: 'uppercase', margin: 0,
            }}>
              Cocina
            </h3>
          </div>

          {Object.entries(porCategoriaComida).length === 0 ? (
            <p style={{
              fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
              color: '#6A4A28', fontSize: '.95rem',
            }}>
              Próximamente.
            </p>
          ) : Object.entries(porCategoriaComida).map(([cat, items], catIdx, arr) => (
            <div key={cat} style={{ marginBottom: catIdx < arr.length - 1 ? '2.5rem' : 0 }}>
              <p style={{
                fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
                fontSize: '.9rem', color: '#8A6940',
                letterSpacing: '.08em', margin: '0 0 1rem',
                borderLeft: '2px solid rgba(200,146,42,0.3)',
                paddingLeft: '.75rem',
              }}>
                {categoriaLabel[cat]}
              </p>
              {items.map((p, i) => (
                <PlatoItem key={p.id} p={p} isLast={i === items.length - 1} />
              ))}
            </div>
          ))}
        </div>

        {/* ── COL 3: BEBIDAS ── */}
        <div style={{
          padding: '4rem 3rem',
          display: 'flex', flexDirection: 'column',
        }}>
          <div style={{
            marginBottom: '2.5rem', paddingBottom: '1.5rem',
            borderBottom: '1px solid rgba(200,146,42,0.15)',
          }}>
            <p style={{
              fontFamily: 'var(--font-cinzel)', fontSize: '.65rem',
              color: '#8A6940', letterSpacing: '.3em',
              textTransform: 'uppercase', margin: '0 0 .5rem',
            }}>
              III
            </p>
            <h3 style={{
              fontFamily: 'var(--font-cinzel)', fontSize: '1.1rem',
              color: '#C8922A', letterSpacing: '.15em',
              textTransform: 'uppercase', margin: 0,
            }}>
              Bebidas
            </h3>
          </div>

          {otras.length === 0 ? (
            <p style={{
              fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
              color: '#6A4A28', fontSize: '.95rem',
            }}>
              Próximamente.
            </p>
          ) : otras.map((p, i) => (
            <PlatoItem key={p.id} p={p} isLast={i === otras.length - 1} />
          ))}

          <div style={{ flex: 1 }} />

          <div style={{
            marginTop: '3rem', paddingTop: '2rem',
            borderTop: '1px solid rgba(200,146,42,0.1)',
            textAlign: 'center',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '.75rem',
              marginBottom: '1.5rem',
            }}>
              <div style={{ width: '24px', height: '1px', background: 'rgba(200,146,42,0.3)' }} />
              <div style={{ width: '4px', height: '4px', background: '#C8922A', transform: 'rotate(45deg)' }} />
              <div style={{ width: '24px', height: '1px', background: 'rgba(200,146,42,0.3)' }} />
            </div>
            <a href="#contacto" style={{
              display: 'inline-block',
              fontFamily: 'var(--font-raleway)', fontSize: '.62rem',
              letterSpacing: '.3em', textTransform: 'uppercase',
              color: '#1A0E05', background: '#C8922A',
              padding: '.9rem 2.5rem', textDecoration: 'none',
            }}>
              RESERVAR MESA
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}