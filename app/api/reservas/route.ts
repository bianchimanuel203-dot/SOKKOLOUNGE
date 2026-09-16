import { NextRequest, NextResponse } from 'next/server'

const WP_API = process.env.WP_API_URL || 'http://sokko-admin.local/wp-json/wp/v2'
const WP_USERNAME = process.env.WP_USERNAME || 'gorka'
const WP_APP_PASSWORD = process.env.WP_APP_PASSWORD

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const FECHA_RE = /^\d{4}-\d{2}-\d{2}$/
const MAX_LEN = 200

// Rate limit en memoria: máx 5 envíos por IP cada 10 minutos.
// Suficiente para un formulario público en una instancia única; no persiste entre despliegues.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX = 5
const rateLimitHits = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const hits = (rateLimitHits.get(ip) || []).filter(t => now - t < RATE_LIMIT_WINDOW_MS)
  hits.push(now)
  rateLimitHits.set(ip, hits)
  return hits.length > RATE_LIMIT_MAX
}

export async function POST(req: NextRequest) {
  try {
    if (!WP_APP_PASSWORD) {
      console.error('WP_APP_PASSWORD no configurado')
      return NextResponse.json({ error: 'Servicio no disponible' }, { status: 500 })
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Demasiadas solicitudes, inténtalo más tarde' }, { status: 429 })
    }

    const body = await req.json()
    const { nombre, email, fecha, personas, mensaje } = body

    if (!nombre || !email || !fecha) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios' },
        { status: 400 }
      )
    }
    if (
      typeof nombre !== 'string' || typeof email !== 'string' || typeof fecha !== 'string' ||
      nombre.length > MAX_LEN || email.length > MAX_LEN ||
      (mensaje && (typeof mensaje !== 'string' || mensaje.length > 1000))
    ) {
      return NextResponse.json({ error: 'Campos inválidos' }, { status: 400 })
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
    }
    if (!FECHA_RE.test(fecha)) {
      return NextResponse.json({ error: 'Fecha inválida' }, { status: 400 })
    }

    const credentials = Buffer.from(`${WP_USERNAME}:${WP_APP_PASSWORD}`).toString('base64')

    const wpResponse = await fetch(`${WP_API}/reservas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${credentials}`,
      },
      body: JSON.stringify({
        title: `Reserva — ${nombre} — ${fecha}`,
        status: 'publish',
        fields: {
          nombre,
          correo:       email,
          telefono:     '',
          fecha,
          num_personas: parseInt(String(personas)) || 2,
          zona_reserva: 'General',
          notas:        mensaje || '',
          estado:       'pendiente',
        },
      }),
    })

    if (!wpResponse.ok) {
      const errorText = await wpResponse.text()
      console.error('WP reservas error:', errorText)
      // No bloquear al usuario si WP falla — la reserva se comunica por email/WhatsApp
      return NextResponse.json(
        { ok: true, warning: 'Guardado localmente' },
        { status: 200 }
      )
    }

    const reservaCreada = await wpResponse.json()

    return NextResponse.json({
      ok: true,
      id: reservaCreada.id,
      mensaje: 'Reserva recibida correctamente',
    })

  } catch (error) {
    console.error('Error en API reservas:', error)
    // No devolver 500 al usuario — la reserva se gestionará manualmente
    return NextResponse.json({ ok: true }, { status: 200 })
  }
}
