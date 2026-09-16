import type { MetadataRoute } from 'next'
import { getEventos } from '@/app/lib/wordpress'
import { islas } from '@/app/terraza/[isla]/islas-data'

// TODO: sustituir por el dominio real de producción (o configurar SITE_URL en el entorno).
const SITE_URL = process.env.SITE_URL || 'https://TODO-configura-el-dominio-de-produccion.example'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const eventos = await getEventos()

  const eventoUrls = eventos.map(e => ({
    url: `${SITE_URL}/eventos/${e.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const islaUrls = Object.keys(islas).map(slug => ({
    url: `${SITE_URL}/terraza/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    ...eventoUrls,
    ...islaUrls,
  ]
}
