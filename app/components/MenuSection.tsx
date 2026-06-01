import { getMenu } from '../lib/wordpress';

const categoriaLabel: Record<string, string> = {
  entrante:  'Entrantes',
  principal: 'Principales',
  postre:    'Postres',
  bebida:    'Bebidas',
  cocktail:  'Cócteles',
};

const ordenCategorias = ['entrante', 'principal', 'postre'];

// Shared styles (cannot use variables in value position, so defined as consts)
const HEADING: React.CSSProperties = {
  fontFamily: 'var(--font-cinzel)',
  fontSize: '.7rem',
  color: '#C9A84C',
  letterSpacing: '.2em',
  textTransform: 'uppercase',
  margin: '0 0 1.5rem',
};

const SEPARATOR: React.CSSProperties = {
  border: 'none',
  borderTop: '1px solid rgba(90,60,20,0.15)',
  margin: '0',
};

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
    <section id="menu" style={{ background: '#F5F0E8' }}>

      {/* ── HEADER ── */}
      <div style={{
        padding: '6rem 3rem 4rem', textAlign: 'center',
        borderBottom: '1px solid rgba(90,60,20,0.15)',
      }}>
        <p style={{
          fontSize: '.6rem', letterSpacing: '.6em', color: '#7A6040',
          textTransform: 'uppercase', margin: 0,
        }}>
          06 — Gastronomía
        </p>
        <h2 style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          color: '#1A1208', letterSpacing: '.2em',
          marginTop: '1rem', marginBottom: 0,
        }}>
          NUESTRA CARTA
        </h2>
        <div style={{ width: '60px', height: '2px', background: '#C9A84C', margin: '1.75rem auto' }} />
        <p style={{
          fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
          fontSize: '1.1rem', color: '#5C4A1E',
          maxWidth: '480px', margin: '0 auto', lineHeight: '1.8',
        }}>
          Cocina canaria con alma. Ingredientes locales, sabores auténticos.
        </p>
      </div>

      {/* ── 3 COLUMNAS ── */}
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
        borderBottom: '1px solid rgba(90,60,20,0.15)',
      }}>

        {/* COL 1 — CÓCTELES */}
        <div style={{
          padding: '3.5rem 3rem',
          borderRight: '1px solid rgba(90,60,20,0.15)',
        }}>
          <p style={HEADING}>Cócteles</p>
          {cocktails.length === 0 ? (
            <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', color: '#7A6040', fontSize: '.9rem' }}>
              Próximamente.
            </p>
          ) : cocktails.map((p, i) => (
            <div key={p.id}>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'flex-start', gap: '1rem', padding: '1rem 0',
              }}>
                <div style={{ flex: 1 }}>
                  {p.acf.destacado && (
                    <span style={{
                      fontSize: '.42rem', letterSpacing: '.2em', color: '#C4693E',
                      textTransform: 'uppercase', display: 'block', marginBottom: '.25rem',
                    }}>
                      ★ Signature
                    </span>
                  )}
                  <p style={{
                    fontFamily: 'var(--font-cinzel)', fontSize: '.78rem',
                    color: '#1A1208', letterSpacing: '.04em', margin: 0,
                  }}>
                    {p.title.rendered}
                  </p>
                  {p.acf.descripcion && (
                    <p style={{
                      fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
                      fontSize: '.82rem', color: '#7A6040',
                      margin: '.2rem 0 0', lineHeight: '1.5',
                    }}>
                      {p.acf.descripcion}
                    </p>
                  )}
                </div>
                <p style={{
                  fontFamily: 'var(--font-cinzel)', fontSize: '.82rem',
                  color: '#C9A84C', flexShrink: 0, margin: 0,
                }}>
                  {p.acf.precio}€
                </p>
              </div>
              {i < cocktails.length - 1 && <hr style={SEPARATOR} />}
            </div>
          ))}
        </div>

        {/* COL 2 — COCINA */}
        <div style={{
          padding: '3.5rem 3rem',
          borderRight: '1px solid rgba(90,60,20,0.15)',
        }}>
          {Object.entries(porCategoriaComida).length === 0 ? (
            <>
              <p style={HEADING}>Cocina</p>
              <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', color: '#7A6040', fontSize: '.9rem' }}>
                Próximamente.
              </p>
            </>
          ) : (
            Object.entries(porCategoriaComida).map(([cat, items], catIdx, arr) => (
              <div key={cat} style={{ marginBottom: catIdx < arr.length - 1 ? '2.5rem' : 0 }}>
                <p style={HEADING}>{categoriaLabel[cat]}</p>
                {items.map((p, i) => (
                  <div key={p.id}>
                    <div style={{
                      display: 'flex', justifyContent: 'space-between',
                      alignItems: 'flex-start', gap: '1rem', padding: '1rem 0',
                    }}>
                      <div style={{ flex: 1 }}>
                        <p style={{
                          fontFamily: 'var(--font-cinzel)', fontSize: '.78rem',
                          color: '#1A1208', letterSpacing: '.04em', margin: 0,
                        }}>
                          {p.title.rendered}
                        </p>
                        {p.acf.descripcion && (
                          <p style={{
                            fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
                            fontSize: '.82rem', color: '#7A6040',
                            margin: '.2rem 0 0', lineHeight: '1.5',
                          }}>
                            {p.acf.descripcion}
                          </p>
                        )}
                      </div>
                      <p style={{
                        fontFamily: 'var(--font-cinzel)', fontSize: '.82rem',
                        color: '#C9A84C', flexShrink: 0, margin: 0,
                      }}>
                        {p.acf.precio}€
                      </p>
                    </div>
                    {i < items.length - 1 && <hr style={SEPARATOR} />}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>

        {/* COL 3 — BEBIDAS + CTA */}
        <div style={{ padding: '3.5rem 3rem', display: 'flex', flexDirection: 'column' }}>
          <p style={HEADING}>Bebidas</p>
          {otras.length === 0 ? (
            <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', color: '#7A6040', fontSize: '.9rem' }}>
              Próximamente.
            </p>
          ) : otras.map((p, i) => (
            <div key={p.id}>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'flex-start', gap: '1rem', padding: '1rem 0',
              }}>
                <div style={{ flex: 1 }}>
                  <p style={{
                    fontFamily: 'var(--font-cinzel)', fontSize: '.78rem',
                    color: '#1A1208', letterSpacing: '.04em', margin: 0,
                  }}>
                    {p.title.rendered}
                  </p>
                  {p.acf.descripcion && (
                    <p style={{
                      fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
                      fontSize: '.82rem', color: '#7A6040',
                      margin: '.2rem 0 0', lineHeight: '1.5',
                    }}>
                      {p.acf.descripcion}
                    </p>
                  )}
                </div>
                <p style={{
                  fontFamily: 'var(--font-cinzel)', fontSize: '.82rem',
                  color: '#C9A84C', flexShrink: 0, margin: 0,
                }}>
                  {p.acf.precio}€
                </p>
              </div>
              {i < otras.length - 1 && <hr style={SEPARATOR} />}
            </div>
          ))}

          {/* Spacer + CTA */}
          <div style={{ flex: 1 }} />
          <div style={{
            marginTop: '3rem', paddingTop: '2rem',
            borderTop: '1px solid rgba(90,60,20,0.15)',
            textAlign: 'center',
          }}>
            <p style={{
              fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
              fontSize: '.9rem', color: '#7A6040', lineHeight: '1.7',
              marginBottom: '1.5rem',
            }}>
              Todos nuestros cócteles están elaborados con destilados premium e infusiones de la casa.
            </p>
            <a href="#terraza" style={{
              display: 'inline-block',
              fontFamily: 'var(--font-raleway)', fontSize: '.62rem',
              letterSpacing: '.3em', textTransform: 'uppercase',
              color: '#1A1208', background: '#C9A84C',
              padding: '.85rem 2.2rem', textDecoration: 'none',
            }}>
              RESERVAR MESA
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
