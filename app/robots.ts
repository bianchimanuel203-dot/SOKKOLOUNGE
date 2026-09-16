import type { MetadataRoute } from 'next'

// TODO: sustituir por el dominio real de producción (o configurar SITE_URL en el entorno).
const SITE_URL = process.env.SITE_URL || 'https://TODO-configura-el-dominio-de-produccion.example'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
