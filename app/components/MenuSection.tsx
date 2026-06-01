import { getMenu } from '../lib/wordpress';

const categoriaLabel: Record<string, string> = {
  entrante: 'Entrantes',
  principal: 'Principales',
  postre: 'Postres',
  bebida: 'Bebidas',
  cocktail: 'Cócteles',
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

  const comidaEntries = Object.entries(porCategoriaComida);

  return (
    <section id="menu">

      {/* HEADER */}
      <div style={{ background: '#F2E8D0', padding: '5rem 2rem 0', textAlign: 'center' }}>
        <p style={{ fontSize: '.65rem', letterSpacing: '.5em', color: '#8A6E2F', textTransform: 'uppercase' }}>
          06 — Carta
        </p>
        <h2 style={{
          fontFamily: 'var(--font-cinzel)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          color: '#1A1208', letterSpacing: '.15em', marginTop: '1rem'
        }}>
          Nuestra Carta
        </h2>
        <div style={{ width: '60px', height: '2px', background: '#C9A84C', margin: '1.5rem auto' }} />
        <p style={{
          fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
          fontSize: '1.05rem', color: '#5C4A1E',
          maxWidth: '520px', margin: '0 auto 4rem', lineHeight: '1.8'
        }}>
          Cocina canaria con alma. Ingredientes locales, sabores auténticos.
        </p>
      </div>

      {/* COCKTAILS SHOWCASE — dark dramatic panel */}
      {cocktails.length > 0 && (
        <div style={{
          background: '#160F08', padding: '5rem 2rem',
          position: 'relative', overflow: 'hidden',
          borderTop: '1px solid rgba(201,168,76,.15)',
          borderBottom: '1px solid rgba(201,168,76,.15)',
        }}>
          {/* Watermark */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            fontFamily: 'var(--font-cinzel)',
            fontSize: 'clamp(6rem, 18vw, 14rem)',
            color: 'rgba(201,168,76,.03)', letterSpacing: '.1em',
            whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none',
          }}>
            COCKTAILS
          </div>

          <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
            {/* Section title */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '3.5rem', flexWrap: 'wrap' }}>
              <h3 style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                color: '#C9A84C', letterSpacing: '.12em', margin: 0
              }}>
                Cócteles
              </h3>
              <div style={{ flex: 1, minWidth: '60px', height: '1px', background: 'rgba(201,168,76,.2)', alignSelf: 'center' }} />
              <p style={{
                fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
                color: '#8A6E2F', fontSize: '1rem', margin: 0
              }}>
                El alma de SOKKO
              </p>
            </div>

            {/* Cocktail grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1px',
              background: 'rgba(201,168,76,.08)',
            }}>
              {cocktails.map(p => (
                <div key={p.id} style={{
                  background: '#160F08',
                  padding: '2rem',
                  position: 'relative',
                  borderLeft: p.acf.destacado ? '2px solid #C9A84C' : '2px solid transparent',
                }}>
                  {p.acf.destacado && (
                    <span style={{
                      position: 'absolute', top: '1.5rem', right: '1.5rem',
                      fontSize: '.42rem', letterSpacing: '.25em',
                      color: '#C4693E', border: '1px solid rgba(196,105,62,.4)',
                      padding: '.15rem .5rem', textTransform: 'uppercase',
                      background: 'rgba(196,105,62,.08)',
                    }}>
                      Signature
                    </span>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '.5rem' }}>
                    <p style={{
                      fontFamily: 'var(--font-cinzel)', fontSize: '.9rem',
                      color: '#D4BC8A', letterSpacing: '.06em', lineHeight: '1.4', margin: 0
                    }}>
                      {p.title.rendered}
                    </p>
                    <p style={{
                      fontFamily: 'var(--font-cinzel)', fontSize: '1.05rem',
                      color: '#C9A84C', flexShrink: 0, margin: 0
                    }}>
                      {p.acf.precio}€
                    </p>
                  </div>
                  {p.acf.descripcion && (
                    <p style={{
                      fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
                      fontSize: '.85rem', color: '#6A5832', lineHeight: '1.6', margin: 0
                    }}>
                      {p.acf.descripcion}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FOOD CATEGORIES — editorial layout */}
      {comidaEntries.length > 0 && (
        <div style={{ background: '#F2E8D0', padding: '5rem 2rem' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {comidaEntries.map(([cat, items], index) => (
              <div key={cat} style={{
                display: 'grid',
                gridTemplateColumns: '180px 1fr',
                gap: '3rem',
                paddingTop: index > 0 ? '3.5rem' : '0',
                paddingBottom: '3.5rem',
                borderBottom: index < comidaEntries.length - 1
                  ? '1px solid rgba(201,168,76,.15)'
                  : 'none',
              }}>
                {/* Category label */}
                <div style={{ paddingTop: '.2rem' }}>
                  <p style={{
                    fontFamily: 'var(--font-cinzel)',
                    fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                    color: '#C9A84C', letterSpacing: '.1em', lineHeight: '1.2', margin: 0
                  }}>
                    {categoriaLabel[cat]}
                  </p>
                  <div style={{ width: '28px', height: '1px', background: '#C9A84C', marginTop: '1rem', opacity: .5 }} />
                </div>

                {/* Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {items.map((p, i) => (
                    <div key={p.id} style={{
                      display: 'flex', justifyContent: 'space-between',
                      alignItems: 'flex-start', gap: '2rem',
                      padding: '1rem 0',
                      borderBottom: i < items.length - 1 ? '1px solid rgba(201,168,76,.1)' : 'none',
                    }}>
                      <div style={{ flex: 1 }}>
                        <p style={{
                          fontFamily: 'var(--font-cinzel)', fontSize: '.85rem',
                          color: '#1A1208', letterSpacing: '.05em', margin: 0
                        }}>
                          {p.title.rendered}
                        </p>
                        {p.acf.descripcion && (
                          <p style={{
                            fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
                            fontSize: '.85rem', color: '#5C4A1E',
                            marginTop: '.25rem', lineHeight: '1.6', marginBottom: 0
                          }}>
                            {p.acf.descripcion}
                          </p>
                        )}
                      </div>
                      <p style={{
                        fontFamily: 'var(--font-cinzel)', fontSize: '.9rem',
                        color: '#C9A84C', flexShrink: 0, margin: 0
                      }}>
                        {p.acf.precio}€
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* OTHER DRINKS */}
      {otrasBebidas.length > 0 && (
        <div style={{ background: '#E8DCC4', padding: '4rem 2rem', borderTop: '1px solid rgba(201,168,76,.2)' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
              <h3 style={{
                fontFamily: 'var(--font-cinzel)', fontSize: '1.2rem',
                color: '#8A6E2F', letterSpacing: '.12em', margin: 0
              }}>
                Bebidas
              </h3>
              <div style={{ flex: 1, minWidth: '40px', height: '1px', background: 'rgba(201,168,76,.25)', alignSelf: 'center' }} />
            </div>
            {otrasBebidas.map((p, i) => (
              <div key={p.id} style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'flex-start', gap: '1rem',
                padding: '1rem 0',
                borderBottom: i < otrasBebidas.length - 1 ? '1px solid rgba(201,168,76,.12)' : 'none',
              }}>
                <div>
                  <p style={{
                    fontFamily: 'var(--font-cinzel)', fontSize: '.8rem',
                    color: '#1A1208', letterSpacing: '.05em', margin: 0
                  }}>
                    {p.title.rendered}
                  </p>
                  {p.acf.descripcion && (
                    <p style={{
                      fontFamily: 'var(--font-cormorant)', fontStyle: 'italic',
                      fontSize: '.8rem', color: '#5C4A1E', marginTop: '.2rem', marginBottom: 0
                    }}>
                      {p.acf.descripcion}
                    </p>
                  )}
                </div>
                <p style={{
                  fontFamily: 'var(--font-cinzel)', fontSize: '.85rem',
                  color: '#C9A84C', flexShrink: 0, margin: 0
                }}>
                  {p.acf.precio}€
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

    </section>
  );
}
