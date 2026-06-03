'use client'

type HeaderItem = {
  tipo: 'header'
  seccion: string
  subtitulo: string
}

type CoctelItem = {
  tipo?: never
  nombre: string
  desc: string
  precio: string
  destacado: boolean
}

type ListItem = HeaderItem | CoctelItem

const cocteles: ListItem[] = [
  // FIRMA SOKKO
  { tipo: 'header', seccion: 'FIRMA SOKKO', subtitulo: 'Creaciones exclusivas de nuestra barra' },
  { nombre: 'SOKKO SUNSET',    desc: 'Ron añejo, maracuyá canario, jengibre, lima y espuma de hibiscus',          precio: '11€', destacado: true  },
  { nombre: 'VIENTO DEL ESTE', desc: 'Gin premium, pepino, albahaca, tónica artesanal y notas de azafrán',        precio: '10€', destacado: false },
  { nombre: 'LAVA FLOW',       desc: 'Vodka, licor de fresa, piña colada, coco y sal volcánica',                  precio: '11€', destacado: false },
  { nombre: 'CALIMA',          desc: 'Mezcal, amaretto, lima, sirope de agave y sal de guayaba',                  precio: '12€', destacado: false },

  // CLÁSICOS
  { tipo: 'header', seccion: 'CLÁSICOS', subtitulo: 'Los imprescindibles de siempre' },
  { nombre: 'NEGRONI',         desc: 'Gin, Campari, vermú rojo. Servido con piel de naranja',                     precio: '9€',  destacado: false },
  { nombre: 'MOJITO',          desc: 'Ron blanco, hierbabuena fresca, lima, azúcar de caña, soda',                precio: '9€',  destacado: false },
  { nombre: 'APEROL SPRITZ',   desc: 'Aperol, Prosecco, soda, naranja. El aperitivo perfecto',                   precio: '8€',  destacado: false },
  { nombre: 'MARGARITA',       desc: 'Tequila reposado, triple seco, lima, sal en el borde',                      precio: '9€',  destacado: false },
  { nombre: 'OLD FASHIONED',   desc: 'Bourbon, azúcar, angostura, piel de naranja y cereza',                     precio: '10€', destacado: false },

  // SIN ALCOHOL
  { tipo: 'header', seccion: 'SIN ALCOHOL', subtitulo: 'Todo el sabor, sin el alcohol' },
  { nombre: 'CANARIAS LIBRE',  desc: 'Zumo de mango, maracuyá, jengibre, lima y ginger beer',                    precio: '6€',  destacado: true  },
  { nombre: 'AGUA DE ISLA',    desc: 'Pepino, albahaca, lima, agua con gas y sirope de agave',                    precio: '5€',  destacado: false },
  { nombre: 'PONCHE CANARIO',  desc: 'Zumo de piña, naranja, granadina, lima y soda',                            precio: '5€',  destacado: false },
]

export default function CocteleSection() {
  return (
    <section id="cocteles" style={{ padding: '8rem 4rem' }}>

      <div style={{ maxWidth: '700px', margin: '0 auto' }}>

        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <p style={{
            fontFamily: 'var(--font-cinzel, Cinzel, serif)',
            fontSize: '11px',
            color: '#A07850',
            letterSpacing: '0.5em',
            marginBottom: '1rem',
          }}>
            MIXOLOGÍA CANARIA
          </p>
          <h2 style={{
            fontFamily: 'var(--font-cinzel, Cinzel, serif)',
            fontSize: 'clamp(28px, 4vw, 48px)',
            color: '#D4982E',
            letterSpacing: '0.08em',
            marginBottom: '1rem',
          }}>
            CÓCTELES PREMIUM
          </h2>
          <p style={{
            fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
            fontStyle: 'italic',
            fontSize: 'clamp(15px, 1.4vw, 19px)',
            color: '#D4B896',
            margin: 0,
          }}>
            Sabores del archipiélago en cada trago.
          </p>
        </div>

        {/* LISTA EDITORIAL COMPLETA */}
        {cocteles.map((item, i) => {

          // Header de sección
          if ('tipo' in item && item.tipo === 'header') {
            return (
              <div key={i} style={{
                marginTop: i === 0 ? '0' : '3.5rem',
                marginBottom: '1.5rem',
                paddingBottom: '1rem',
                borderBottom: '1px solid rgba(212,152,46,0.3)',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                  fontSize: 'clamp(14px, 1.5vw, 18px)',
                  color: '#D4982E',
                  letterSpacing: '0.2em',
                  margin: '0 0 4px',
                }}>
                  {item.seccion}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                  fontStyle: 'italic',
                  fontSize: '14px',
                  color: '#A07850',
                  margin: 0,
                }}>
                  {item.subtitulo}
                </p>
              </div>
            )
          }

          // Item de cóctel
          const coctel = item as CoctelItem
          return (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '1.5rem',
              alignItems: 'start',
              padding: '1.25rem 0',
              borderBottom: '1px solid rgba(212,152,46,0.07)',
            }}>
              <div>
                {coctel.destacado && (
                  <span style={{
                    fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                    fontSize: '9px',
                    color: '#1A0E05',
                    background: '#D4982E',
                    padding: '2px 10px',
                    letterSpacing: '0.2em',
                    marginBottom: '6px',
                    display: 'inline-block',
                  }}>
                    ESTRELLA
                  </span>
                )}
                <p style={{
                  fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                  fontSize: 'clamp(13px, 1.2vw, 15px)',
                  color: '#F4EDD8',
                  letterSpacing: '0.05em',
                  margin: coctel.destacado ? '4px 0 4px' : '0 0 4px',
                  lineHeight: 1.3,
                }}>
                  {coctel.nombre}
                </p>
                <p style={{
                  fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
                  fontStyle: 'italic',
                  fontSize: '15px',
                  color: '#D4B896',
                  margin: 0,
                  lineHeight: 1.5,
                }}>
                  {coctel.desc}
                </p>
              </div>
              <p style={{
                fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                fontSize: '15px',
                color: '#D4982E',
                margin: 0,
                whiteSpace: 'nowrap',
                paddingTop: coctel.destacado ? '20px' : '0',
              }}>
                {coctel.precio}
              </p>
            </div>
          )
        })}

        <p style={{
          fontFamily: 'var(--font-cormorant, "Cormorant Garamond", serif)',
          fontStyle: 'italic',
          fontSize: '14px',
          color: '#A07850',
          textAlign: 'center',
          marginTop: '3rem',
          marginBottom: 0,
        }}>
          También disponemos de vinos, cervezas artesanales y refrescos
        </p>

      </div>
    </section>
  )
}
