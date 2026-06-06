import {
  getEventos,
  getCategoriaColumna,
  getLabelCategoria,
  formatFechaACF,
  getDiaSemana,
  getDiaNumero,
  formatPrecioEvento,
  getImagenUrl,
  type WPEvento,
} from '@/app/lib/wordpress'
import EventosSectionClient, { type EventoData } from '@/app/components/EventosSectionClient'

function mapearEvento(e: WPEvento): EventoData {
  return {
    slug: e.slug,
    titulo: e.title.rendered,
    subtitulo: e.acf.hora_evento || '',
    fecha: getDiaSemana(e.acf.fecha_evento),
    dia: getDiaNumero(e.acf.fecha_evento),
    mes: formatFechaACF(e.acf.fecha_evento).split(' ')[1] || '',
    horario: e.acf.hora_evento || '',
    precio: formatPrecioEvento(e.acf.precio),
    imagen: getImagenUrl(e.acf.imagen_evento),
    badge: getLabelCategoria(e.acf.categoria),
    categoria: e.acf.categoria,
  }
}

export default async function EventosSection() {
  const eventosWP = await getEventos()

  const talleres = eventosWP
    .filter(e => getCategoriaColumna(e.acf.categoria) === 'talleres')
    .map(mapearEvento)

  const shows = eventosWP
    .filter(e => getCategoriaColumna(e.acf.categoria) === 'shows')
    .map(mapearEvento)

  const artistas = eventosWP
    .filter(e => getCategoriaColumna(e.acf.categoria) === 'artistas')
    .map(mapearEvento)

  return (
    <EventosSectionClient
      talleres={talleres}
      shows={shows}
      artistas={artistas}
    />
  )
}
