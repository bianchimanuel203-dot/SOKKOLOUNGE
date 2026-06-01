import { getMenu } from '../lib/wordpress';

const categoriaLabel: Record<string, string> = {
  entrante: 'Starters',
  principal: 'Mains',
  postre: 'Desserts',
  bebida: 'Drinks',
  cocktail: 'Cocktails',
};

const ordenCategorias = ['entrante', 'principal', 'postre'];

export default async function MenuSection() {
  const platos = await getMenu();
  const disponibles = platos.filter(p => p.acf.disponible);

  const porCategoriaComida = ordenCategorias.reduce((acc, cat) => {
    const items = disponibles.filter(p => p.acf.categoria === cat && p.acf.tipo === 'comida');
    if (items.length > 0) acc[cat] = items;
    return acc;
  }, {} as Record<string, typeof platos>);

  const bebidas = disponibles.filter(p => p.acf.tipo === 'bebida');
  const cocktails = bebidas.filter(p => p.acf.categoria === 'cocktail');
  const otrasBebidas = bebidas.filter(p => p.acf.categoria !== 'cocktail');

  return (
    <section id="menu" style={{ background: '#F5F0E8' }}>

      {/* HEADER */}
      <div style={{ padding: '6rem 2rem 4rem', textAlign: 'center', borderBottom: '1px solid rgba(201,168,76,.2)' }}>
        <p style={{ fontSize: '.6rem', letterSpacing: '.6em', color: '#8A6E2F', textTransform: 'uppercase', margin: 0 }}>
          06 — Gastronomy
        </p>
        <h2 style={{
          fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          color: '#1A1208', letterSpacing: '.2em', marginTop: '1rem', marginBottom: 0,
        }}>
          THE GASTRONOMY
        </h2>
        <div style={{ width: '60px', height: '2px', background: '#C9A84C', margin: '1.75rem auto' }} />
        <p style={{
          fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
          fontSize: '1.1rem', color: '#5C4A1E',
          maxWidth: '480px', margin: '0 auto', lineHeight: '1.8',
        }}>
          Canarian cuisine with soul. Local ingredients, authentic flavours.
        </p>
      </div>

      {/* 3-COLUMN LAYOUT */}
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '0',
        borderBottom: '1px solid rgba(201,168,76,.15)',
      }}>

        {/* COL 1 — FOOD */}
        <div style={{ padding: '3.5rem 3rem', borderRight: '1px solid rgba(201,168,76,.15)' }}>
          <p style={{ fontSize: '.55rem', letterSpacing: '.45em', color: '#8A6E2F', textTransform: 'uppercase', marginBottom: '2.5rem' }}>
            Kitchen
          </p>
          {Object.entries(porCategoriaComida).map(([cat, items], catIdx, arr) => (
            <div key={cat} style={{ marginBottom: catIdx < arr.length - 1 ? '2.5rem' : 0 }}>
              <p style={{
                fontFamily: 'var(--font-cinzel)', fontSize: '.75rem',
                color: '#C9A84C', letterSpacing: '.15em', textTransform: 'uppercase',
                marginBottom: '1.25rem',
              }}>
                {categoriaLabel[cat]}
              </p>
              {items.map((p, i) => (
                <div key={p.id} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                  gap: '1rem', paddingBottom: '1rem',
                  marginBottom: i < items.length - 1 ? '0' : '0',
                  borderBottom: i < items.length - 1 ? '1px solid rgba(201,168,76,.08)' : 'none',
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
                        fontSize: '.82rem', color: '#5C4A1E',
                        marginTop: '.2rem', lineHeight: '1.5', marginBottom: 0,
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
              ))}
            </div>
          ))}
          {Object.keys(porCategoriaComida).length === 0 && (
            <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', color: '#8A6E2F', fontSize: '.9rem' }}>
              Menu coming soon.
            </p>
          )}
        </div>

        {/* COL 2 — COCKTAILS */}
        <div style={{ padding: '3.5rem 3rem', borderRight: '1px solid rgba(201,168,76,.15)', background: '#EDE8DC' }}>
          <p style={{ fontSize: '.55rem', letterSpacing: '.45em', color: '#8A6E2F', textTransform: 'uppercase', marginBottom: '2.5rem' }}>
            Cocktails
          </p>
          <p style={{
            fontFamily: 'var(--font-cinzel)', fontSize: '.75rem',
            color: '#C9A84C', letterSpacing: '.15em', textTransform: 'uppercase',
            marginBottom: '1.25rem',
          }}>
            Signature Drinks
          </p>
          {cocktails.length === 0 ? (
            <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', color: '#8A6E2F', fontSize: '.9rem' }}>
              Cocktail menu coming soon.
            </p>
          ) : cocktails.map((p, i) => (
            <div key={p.id} style={{
              paddingBottom: '1rem',
              borderBottom: i < cocktails.length - 1 ? '1px solid rgba(201,168,76,.1)' : 'none',
              marginBottom: i < cocktails.length - 1 ? '0' : '0',
              position: 'relative',
            }}>
              {p.acf.destacado && (
                <span style={{
                  fontSize: '.42rem', letterSpacing: '.2em', color: '#C4693E',
                  textTransform: 'uppercase', marginBottom: '.3rem', display: 'block',
                }}>
                  ★ Signature
                </span>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                <p style={{
                  fontFamily: 'var(--font-cinzel)', fontSize: '.78rem',
                  color: '#1A1208', letterSpacing: '.04em', margin: 0,
                }}>
                  {p.title.rendered}
                </p>
                <p style={{
                  fontFamily: 'var(--font-cinzel)', fontSize: '.82rem',
                  color: '#C9A84C', flexShrink: 0, margin: 0,
                }}>
                  {p.acf.precio}€
                </p>
              </div>
              {p.acf.descripcion && (
                <p style={{
                  fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
                  fontSize: '.82rem', color: '#5C4A1E',
                  marginTop: '.2rem', lineHeight: '1.5', marginBottom: 0,
                }}>
                  {p.acf.descripcion}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* COL 3 — DRINKS */}
        <div style={{ padding: '3.5rem 3rem' }}>
          <p style={{ fontSize: '.55rem', letterSpacing: '.45em', color: '#8A6E2F', textTransform: 'uppercase', marginBottom: '2.5rem' }}>
            Bar
          </p>
          <p style={{
            fontFamily: 'var(--font-cinzel)', fontSize: '.75rem',
            color: '#C9A84C', letterSpacing: '.15em', textTransform: 'uppercase',
            marginBottom: '1.25rem',
          }}>
            Drinks & Beverages
          </p>
          {otrasBebidas.length === 0 ? (
            <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', color: '#8A6E2F', fontSize: '.9rem' }}>
              Drinks menu coming soon.
            </p>
          ) : otrasBebidas.map((p, i) => (
            <div key={p.id} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
              gap: '1rem', paddingBottom: '1rem',
              borderBottom: i < otrasBebidas.length - 1 ? '1px solid rgba(201,168,76,.08)' : 'none',
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
                    fontSize: '.82rem', color: '#5C4A1E',
                    marginTop: '.2rem', lineHeight: '1.5', marginBottom: 0,
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
          ))}

          {/* Divider + note */}
          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(201,168,76,.15)' }}>
            <p style={{
              fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
              fontSize: '.85rem', color: '#8A6E2F', lineHeight: '1.6',
            }}>
              All our cocktails are crafted with premium spirits and house-made infusions.
            </p>
            <a href="#terraza" style={{
              display: 'inline-block', marginTop: '1.5rem',
              fontFamily: 'var(--font-raleway)', fontSize: '.58rem',
              letterSpacing: '.3em', textTransform: 'uppercase',
              color: '#1A1208', background: '#C9A84C',
              padding: '.7rem 1.6rem', textDecoration: 'none',
            }}>
              BOOK A TABLE
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
