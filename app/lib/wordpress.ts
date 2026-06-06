const WP_API = process.env.NEXT_PUBLIC_WP_API || 'http://sokko-admin.local/wp-json/wp/v2'

// ── HELPER — fetch con revalidación ─────────────────────────────
async function wpFetch<T>(endpoint: string, revalidate = 300): Promise<T> {
  const res = await fetch(`${WP_API}${endpoint}`, {
    next: { revalidate },
    headers: { 'Content-Type': 'application/json' },
  })
  if (!res.ok) throw new Error(`WP fetch error: ${endpoint}`)
  return res.json()
}

// ── TIPOS — ZONAS (existente) ────────────────────────────────────

export interface Zona {
  id: number
  slug: string
  title: { rendered: string }
  acf: {
    numero_zona: string
    subtitulo: string
    descripcion: string
    tipo_de_ilustracion: string
    tags: string
  }
}

export async function getZonas(): Promise<Zona[]> {
  try {
    return await wpFetch<Zona[]>('/zonas?_fields=id,slug,title,acf&per_page=20&orderby=id&order=asc', 3600)
  } catch (error) {
    console.error('Error fetching zonas:', error)
    return []
  }
}

export async function getZonaBySlug(slug: string): Promise<Zona | null> {
  try {
    const data = await wpFetch<Zona[]>(`/zonas?slug=${slug}&_fields=id,slug,title,acf`, 3600)
    return data[0] ?? null
  } catch {
    return null
  }
}

// ── TIPOS — EVENTOS ──────────────────────────────────────────────

export interface WPEvento {
  id: number
  slug: string
  title: { rendered: string }
  acf: {
    fecha_evento: string        // formato ACF Date Picker: "dd/mm/yyyy" → "13/06/2026"
    hora_evento: string         // ej: "20:00 — 02:00"
    description: string
    precio: string | number
    imagen_evento: string | { url: string; alt: string } | null
    categoria: 'musica' | 'dj' | 'gastronomia' | 'taller' | 'especial'
    aforo: number
    activo: boolean
  }
}

// Alias de compatibilidad con código anterior
export type Evento = WPEvento

export async function getEventos(): Promise<WPEvento[]> {
  try {
    const data = await wpFetch<WPEvento[]>(
      '/eventos?acf_format=standard&per_page=20&_fields=id,slug,title,acf'
    )
    return data.filter(e => e.acf?.activo === true)
  } catch (error) {
    console.error('Error fetching eventos:', error)
    return []
  }
}

export async function getEventoBySlug(slug: string): Promise<WPEvento | null> {
  try {
    const data = await wpFetch<WPEvento[]>(
      `/eventos?slug=${slug}&acf_format=standard&_fields=id,slug,title,acf`
    )
    return data[0] || null
  } catch {
    return null
  }
}

export async function getEventosByColumna(
  columna: 'talleres' | 'shows' | 'artistas'
): Promise<WPEvento[]> {
  const todos = await getEventos()
  return todos.filter(e => getCategoriaColumna(e.acf?.categoria || '') === columna)
}

// ── TIPOS — MENÚ ─────────────────────────────────────────────────

export interface WPMenu {
  id: number
  slug: string
  title: { rendered: string }
  acf: {
    precio: number
    descripcion: string
    categoria: 'entrante' | 'principal' | 'postre' | 'coctel'
    tipo: 'comida' | 'coctel'
    destacado: boolean
    disponible: boolean
    imagen: {
      url: string
      alt: string
    } | null
  }
}

// Alias de compatibilidad con código anterior
export type Plato = WPMenu

export async function getMenu(): Promise<WPMenu[]> {
  try {
    const data = await wpFetch<WPMenu[]>(
      '/menu?acf_format=standard&per_page=50&_fields=id,slug,title,acf',
      3600
    )
    return data.filter(p => p.acf?.disponible === true)
  } catch (error) {
    console.error('Error fetching menu:', error)
    return []
  }
}

export async function getMenuByCategoria(
  categoria: 'entrante' | 'principal' | 'postre'
): Promise<WPMenu[]> {
  const todos = await getMenu()
  return todos.filter(p =>
    p.acf?.tipo === 'comida' &&
    p.acf?.categoria === categoria
  )
}

export async function getCocteles(): Promise<WPMenu[]> {
  const todos = await getMenu()
  return todos.filter(p => p.acf?.tipo === 'coctel')
}

// ── TIPOS — HORARIOS ─────────────────────────────────────────────

export interface WPHorario {
  id: number
  acf: {
    dia: string       // "Lunes", "Martes", etc.
    apertura: string  // "15:00"
    cierre: string    // "02:00"
    nota: string
  }
}

// Alias de compatibilidad con código anterior
export type Horario = WPHorario & { title?: { rendered: string } }

export async function getHorarios(): Promise<WPHorario[]> {
  try {
    return await wpFetch<WPHorario[]>(
      '/horarios?acf_format=standard&per_page=7&_fields=id,acf',
      3600
    )
  } catch (error) {
    console.error('Error fetching horarios:', error)
    return []
  }
}

// ── TIPOS — RESERVA (existente) ───────────────────────────────────

export interface Reserva {
  nombre: string
  email: string
  telefono?: string
  fecha: string
  hora: string
  personas: string
  isla: string
  mensaje?: string
}

// ── HELPERS — FORMATO DE FECHAS ACF ──────────────────────────────
// ACF Date Picker devuelve "dd/mm/yyyy" → "13/06/2026"

export function formatFechaACF(fecha: string): string {
  if (!fecha) return ''
  const partes = fecha.split('/')
  if (partes.length !== 3) return fecha
  const [dia, mes, year] = partes
  const meses = ['ENE','FEB','MAR','ABR','MAY','JUN',
                  'JUL','AGO','SEP','OCT','NOV','DIC']
  const mesNombre = meses[parseInt(mes) - 1]
  return `${dia} ${mesNombre} ${year}`
  // Devuelve: "13 JUN 2026"
}

export function getDiaSemana(fecha: string): string {
  if (!fecha) return ''
  const partes = fecha.split('/')
  if (partes.length !== 3) return ''
  const [dia, mes, year] = partes
  const date = new Date(parseInt(year), parseInt(mes) - 1, parseInt(dia))
  const dias = ['DOMINGO','LUNES','MARTES','MIÉRCOLES','JUEVES','VIERNES','SÁBADO']
  return dias[date.getDay()]
}

export function getDiaNumero(fecha: string): string {
  if (!fecha) return ''
  return fecha.split('/')[0] || ''
  // Devuelve: "13"
}

// ── HELPERS — CATEGORÍAS DE EVENTOS ──────────────────────────────

export function getCategoriaColumna(
  categoria: string
): 'talleres' | 'shows' | 'artistas' {
  switch (categoria) {
    case 'taller':
      return 'talleres'
    case 'musica':
    case 'dj':
      return 'artistas'
    case 'gastronomia':
    case 'especial':
    default:
      return 'shows'
  }
}

export function getLabelCategoria(categoria: string): string {
  const labels: Record<string, string> = {
    musica:      'MÚSICA EN DIRECTO',
    dj:          'SESIÓN DJ',
    gastronomia: 'CENA TEMÁTICA',
    taller:      'TALLER CREATIVO',
    especial:    'EVENTO ESPECIAL',
  }
  return labels[categoria] || categoria.toUpperCase()
}

// ── HELPERS — PRECIO ─────────────────────────────────────────────

export function formatPrecioEvento(precio: string | number): string {
  if (!precio || precio === '' || precio === 0 || precio === '0') {
    return 'ENTRADA LIBRE'
  }
  return `${precio}€`
}

// ── HELPER — URL de imagen ACF ───────────────────────────────────

export function getImagenUrl(
  imagen: string | { url: string; alt?: string } | null | undefined,
  fallback = '/eventos/placeholder.jpg'
): string {
  if (!imagen) return fallback
  if (typeof imagen === 'string') return imagen
  return imagen.url || fallback
}
