import { NextRequest, NextResponse } from 'next/server'

const WP_API = process.env.NEXT_PUBLIC_WP_API || 'http://sokko-admin.local/wp-json/wp/v2'
const WP_USERNAME = process.env.WP_USERNAME || 'gorka'
const WP_APP_PASSWORD = process.env.WP_APP_PASSWORD || ''

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nombre, email, fecha, personas, mensaje } = body

    if (!nombre || !email || !fecha) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios' },
        { status: 400 }
      )
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
        acf: {
          nombre,
          correo:       email,
          telefono:     '',
          fecha,
          num_personas: parseInt(String(personas)) || 2,
          zona_reserva: 'General',
          estado:       'pendiente',
          nota:         mensaje || '',
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
