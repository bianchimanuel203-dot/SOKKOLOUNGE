import { getMenuByCategoria } from '@/app/lib/wordpress'
import MenuSectionClient, { type MenuData } from '@/app/components/MenuSectionClient'

const FALLBACK: MenuData = {
  entrantes: [
    { nombre: 'CEVICHE DE CORVINA',      desc: 'Corvina fresca marinada en limón canario, ají amarillo y cilantro',                    precio: '14€', destacado: true,  imagen: '' },
    { nombre: 'TATAKI DE ATÚN ROJO',     desc: 'Atún rojo del Atlántico sellado con sésamo negro, aguacate y salsa ponzu',             precio: '16€', destacado: false, imagen: '' },
    { nombre: 'TABLA DE QUESOS',         desc: 'Selección de quesos canarios con miel de palma y membrillo',                           precio: '12€', destacado: false, imagen: '' },
    { nombre: 'PAPAS ARRUGADAS',         desc: 'Patatas canarias tradicionales con mojo rojo y mojo verde',                           precio: '8€',  destacado: false, imagen: '' },
  ],
  principales: [
    { nombre: 'LUBINA A LA SAL NEGRA',   desc: 'Lubina entera a la sal volcánica negra con aceite de oliva virgen y hierbas frescas', precio: '26€', destacado: true,  imagen: '' },
    { nombre: 'SOLOMILLO LANZAROTEÑO',   desc: 'Lomo de res madurado con reducción de vino tinto, patatas volcánicas y trufa',        precio: '28€', destacado: false, imagen: '' },
    { nombre: 'ROPA VIEJA CANARIA',      desc: 'Garbanzo, pollo y ternera estofados. Receta tradicional de las islas',               precio: '16€', destacado: false, imagen: '' },
    { nombre: 'RISOTTO DE MARISCOS',     desc: 'Arroz cremoso con gambas, almejas y azafrán canario',                                 precio: '19€', destacado: false, imagen: '' },
  ],
  postres: [
    { nombre: 'TARTA DE MANGO VOLCÁNICO',desc: 'Mousse de mango canario con base de bizcocho de almendra y coulis de maracuyá',       precio: '9€',  destacado: true,  imagen: '' },
    { nombre: 'COULANT DE CHOCOLATE',    desc: 'Coulant de chocolate negro 70% con helado de vainilla bourbon y sal volcánica',       precio: '8€',  destacado: false, imagen: '' },
    { nombre: 'BIENMESABE',              desc: 'Crema tradicional canaria de almendra, canela y limón con helado artesanal',           precio: '7€',  destacado: false, imagen: '' },
  ],
}

function getImgUrl(img: unknown): string {
  if (!img) return ''
  if (typeof img === 'string') return img
  if (typeof img === 'object' && img !== null && 'url' in img) return (img as { url: string }).url
  return ''
}

export default async function MenuSection() {
  let menuData: MenuData = FALLBACK

  try {
    const [entrantes, principales, postres] = await Promise.all([
      getMenuByCategoria('entrante'),
      getMenuByCategoria('principal'),
      getMenuByCategoria('postre'),
    ])

    if (entrantes.length > 0 || principales.length > 0 || postres.length > 0) {
      const mapear = (p: Awaited<ReturnType<typeof getMenuByCategoria>>[number]) => ({
        nombre: p.title.rendered.toUpperCase(),
        desc: p.acf.descripcion || '',
        precio: p.acf.precio ? `${p.acf.precio}€` : '',
        destacado: p.acf.destacado || false,
        imagen: getImgUrl(p.acf.imagen),
      })

      menuData = {
        entrantes:   entrantes.length   > 0 ? entrantes.map(mapear)   : FALLBACK.entrantes,
        principales: principales.length > 0 ? principales.map(mapear) : FALLBACK.principales,
        postres:     postres.length     > 0 ? postres.map(mapear)     : FALLBACK.postres,
      }
    }
  } catch (error) {
    console.error('Error cargando menú de WP:', error)
  }

  return <MenuSectionClient menuData={menuData} />
}
