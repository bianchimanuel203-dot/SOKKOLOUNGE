const API = process.env.NEXT_PUBLIC_WP_API;

export interface Zona {
  id: number;
  slug: string;
  title: { rendered: string };
  acf: {
    numero_zona: string;
    subtitulo: string;
    descripcion: string;
    tipo_de_ilustracion: string;
    tags: string;
  };
}

export async function getZonas(): Promise<Zona[]> {
  const res = await fetch(
    `${API}/zonas?_fields=id,slug,title,acf&per_page=20&orderby=id&order=asc`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Error al cargar zonas');
  return res.json();
}

export async function getZonaBySlug(slug: string): Promise<Zona | null> {
  const res = await fetch(
    `${API}/zonas?slug=${slug}&_fields=id,slug,title,acf`,
    { next: { revalidate: 3600 } }
  );
  const data = await res.json();
  return data[0] ?? null;
}

export interface Evento {
  id: number;
  slug: string;
  title: { rendered: string };
  acf: {
    fecha_evento: string;
    hora_evento: string;
    description: string;
    precio: number;
    imagen_evento: { url: string } | false;
    categoria: string;
    aforo: number;
    activo: boolean;
  };
}

export async function getEventos(): Promise<Evento[]> {
  const res = await fetch(
    `${API}/eventos?_fields=id,slug,title,acf&per_page=20`,
    { next: { revalidate: 300 } }
  );
  if (!res.ok) throw new Error('Error al cargar eventos');
  return res.json();
}

export interface Horario {
  id: number;
  title: { rendered: string };
  acf: {
    dia: string;
    apertura: string;
    cierre: string;
    nota: string;
    cerrado: boolean;
  };
}

export async function getHorarios(): Promise<Horario[]> {
  const res = await fetch(
    `${API}/horarios?_fields=id,title,acf&per_page=20`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Error al cargar horarios');
  return res.json();
}

export interface Plato {
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
}

export async function getMenu(): Promise<Plato[]> {
  const res = await fetch(
    `${API}/menu?_fields=id,title,acf&per_page=50`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error('Error al cargar menú');
  return res.json();
}

export interface Reserva {
  nombre: string;
  email: string;
  telefono?: string;
  fecha: string;
  hora: string;
  personas: string;
  isla: string;
  mensaje?: string;
}