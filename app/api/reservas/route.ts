import { NextRequest, NextResponse } from 'next/server';

const WP_API = process.env.NEXT_PUBLIC_WP_API;
const WP_USER = process.env.WP_USER;
const WP_PASSWORD = process.env.WP_PASSWORD;

export async function POST(req: NextRequest) {
  try {
    const { nombre, correo, telefono } = await req.json();

    if (!nombre || !correo || !telefono) {
      return NextResponse.json({ error: 'Faltan campos' }, { status: 400 });
    }

    const credentials = Buffer.from(`${WP_USER}:${WP_PASSWORD}`).toString('base64');

    const res = await fetch(`${WP_API}/reservas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${credentials}`
      },
      body: JSON.stringify({
        title: `Reserva — ${nombre}`,
        status: 'publish',
        acf: {
          nombre,
          correo,
          telefono,
          estado: 'pendiente'
        }
      })
    });

    if (!res.ok) throw new Error('Error al crear reserva en WordPress');

    return NextResponse.json({ ok: true }, { status: 200 });

  } catch (err) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}