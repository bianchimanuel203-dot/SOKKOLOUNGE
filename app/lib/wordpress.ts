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
    fecha_evento: string        // formato ACF Date Picker: "20260613"
    hora_evento: string         // ej: "20:00 — 02:00"
    description: string
    precio: number
    imagen_evento: {
      url: string
      alt: string
    } | null
    categoria: 'taller' | 'show' | 'artista'
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

export async function getEventosByCategoria(
  categoria: 'taller' | 'show' | 'artista'
): Promise<WPEvento[]> {
  const todos = await getEventos()
  return todos.filter(e => e.acf?.categoria === categoria)
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
// ACF Date Picker devuelve "Ymd" → "20260613"

export function formatFechaACF(fecha: string): string {
  if (!fecha || fecha.length !== 8) return fecha
  const year  = fecha.slice(0, 4)
  const month = fecha.slice(4, 6)
  const day   = fecha.slice(6, 8)
  const meses = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC']
  const mesNombre = meses[parseInt(month) - 1]
  return `${day} ${mesNombre} ${year}`
  // Devuelve: "13 JUN 2026"
}

export function getDiaSemana(fecha: string): string {
  if (!fecha || fecha.length !== 8) return ''
  const year  = parseInt(fecha.slice(0, 4))
  const month = parseInt(fecha.slice(4, 6)) - 1
  const day   = parseInt(fecha.slice(6, 8))
  const date  = new Date(year, month, day)
  const dias  = ['DOMINGO','LUNES','MARTES','MIÉRCOLES','JUEVES','VIERNES','SÁBADO']
  return dias[date.getDay()]
}
