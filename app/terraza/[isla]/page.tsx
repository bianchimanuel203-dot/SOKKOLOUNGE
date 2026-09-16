import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import IslaPageClient from './IslaPageClient'
import { islas } from './islas-data'

function nombreIsla(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

export async function generateMetadata(
  { params }: { params: Promise<{ isla: string }> }
): Promise<Metadata> {
  const { isla: islaSlug } = await params
  const isla = islas[islaSlug]
  if (!isla) return { title: 'Isla no encontrada — SOKKO Lounge' }

  const nombre = nombreIsla(islaSlug)
  const title = `${nombre} · Terraza SOKKO Lounge — Reserva tu mesa`
  const description = isla.desc

  return {
    title,
    description,
    openGraph: { title, description, images: [isla.imagen] },
    twitter: { card: 'summary_large_image', title, description, images: [isla.imagen] },
  }
}

export function generateStaticParams() {
  return Object.keys(islas).map(isla => ({ isla }))
}

export default async function IslaPage(
  { params }: { params: Promise<{ isla: string }> }
) {
  const { isla: islaSlug } = await params
  if (!islas[islaSlug]) notFound()

  return <IslaPageClient islaSlug={islaSlug} />
}
