import { getHorarios } from '@/app/lib/wordpress'
import HorariosClient, { type DiaHorario } from '@/app/components/HorariosClient'

const ORDEN_DIAS = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo']

const FALLBACK: DiaHorario[] = [
  { dia: 'Lunes',     horario: 'Cerrado',       abierto: false, nota: '' },
  { dia: 'Martes',    horario: 'Cerrado',        abierto: false, nota: '' },
  { dia: 'Miércoles', horario: '15:00 — 02:00', abierto: true,  nota: '' },
  { dia: 'Jueves',    horario: '15:00 — 02:00', abierto: true,  nota: '' },
  { dia: 'Viernes',   horario: '15:00 — 02:00', abierto: true,  nota: '' },
  { dia: 'Sábado',    horario: '12:00 — 02:00', abierto: true,  nota: '' },
  { dia: 'Domingo',   horario: '12:00 — 02:00', abierto: true,  nota: '' },
]

export default async function HorariosSection() {
  let diasHorario: DiaHorario[] = FALLBACK

  try {
    const horariosWP = await getHorarios()

    if (horariosWP.length > 0) {
      diasHorario = ORDEN_DIAS.map(dia => {
        const wpDia = horariosWP.find(
          h => h.acf?.dia?.toLowerCase() === dia.toLowerCase()
        )
        if (wpDia && wpDia.acf?.apertura && wpDia.acf?.cierre) {
          return {
            dia,
            horario: `${wpDia.acf.apertura} — ${wpDia.acf.cierre}`,
            abierto: true,
            nota: wpDia.acf.nota || '',
          }
        }
        return { dia, horario: 'Cerrado', abierto: false, nota: '' }
      })
    }
  } catch (error) {
    console.error('Error cargando horarios de WP:', error)
  }

  return <HorariosClient diasHorario={diasHorario} />
}
