import { getCocteles } from '@/app/lib/wordpress'
import CocteleSectionClient, { type CoctelesData } from '@/app/components/CocteleSectionClient'

const FALLBACK: CoctelesData = {
  firma: [
    { nombre: 'SOKKO SIGNATURE',     desc: 'Ron añejo, flor de hibisco, cítrico y espuma de coco',      precio: '13€',   destacado: true  },
    { nombre: 'BRISA DEL ATLÁNTICO', desc: 'Ginebra botánica, pepino, aloe vera y agua tónica',         precio: '12€',   destacado: true  },
    { nombre: 'VOLCÁN DE FUEGO',     desc: 'Mezcal, maracuyá, jengibre y chile ahumado',                precio: '13.50€',destacado: true  },
    { nombre: 'ROSA CANARIA',        desc: 'Hibisco, frambuesa, lima y jarabe natural',                 precio: '7€',    destacado: true  },
    { nombre: 'OASIS VERDE',         desc: 'Pepino, menta, limón y agua de coco',                       precio: '7.50€', destacado: true  },
    { nombre: 'NOCHE ESTRELLADA',    desc: 'Mora, lavanda, limón y soda artesanal',                     precio: '8€',    destacado: true  },
  ],
  clasicos: [
    { nombre: 'MOJITO CANARIO',      desc: 'Ron blanco, lima fresca, menta y azúcar de caña',          precio: '9€',    destacado: false },
    { nombre: 'NEGRONI CLÁSICO',     desc: 'Ginebra, vermú rojo y Campari con naranja',                precio: '10€',   destacado: false },
    { nombre: 'DAIQUIRI DE MANGO',   desc: 'Ron blanco, mango tropical, lima y jarabe natural',        precio: '9.50€', destacado: false },
    { nombre: 'OLD FASHIONED',       desc: 'Bourbon premium, azúcar moreno y angostura',              precio: '11€',   destacado: false },
    { nombre: 'APEROL SPRITZ',       desc: 'Aperol, prosecco seco y un toque de naranja',             precio: '9€',    destacado: false },
    { nombre: 'MARGARITA PICANTE',   desc: 'Tequila, triple sec, lima y jalapeño fresco',             precio: '10.50€',destacado: false },
  ],
}

function getImgUrl(img: unknown): string {
  if (!img) return ''
  if (typeof img === 'string') return img
  if (typeof img === 'object' && img !== null && 'url' in img) return (img as { url: string }).url
  return ''
}

export default async function CocteleSection() {
  let coctelesData: CoctelesData = FALLBACK

  try {
    const coctelesWP = await getCocteles()

    if (coctelesWP.length > 0) {
      const mapear = (p: Awaited<ReturnType<typeof getCocteles>>[number]) => ({
        nombre: p.title.rendered.toUpperCase(),
        desc: p.acf.descripcion || '',
        precio: p.acf.precio ? `${p.acf.precio}€` : '',
        destacado: p.acf.destacado || false,
        imagen: getImgUrl(p.acf.imagen),
      })

      coctelesData = {
        firma:    coctelesWP.filter(c => c.acf.destacado).map(mapear),
        clasicos: coctelesWP.filter(c => !c.acf.destacado).map(mapear),
      }

      // Si todos son firma o todos son clásicos, evitar columna vacía
      if (coctelesData.firma.length === 0)    coctelesData.firma    = FALLBACK.firma
      if (coctelesData.clasicos.length === 0) coctelesData.clasicos = FALLBACK.clasicos
    }
  } catch (error) {
    console.error('Error cargando cócteles de WP:', error)
  }

  return <CocteleSectionClient coctelesData={coctelesData} />
}
