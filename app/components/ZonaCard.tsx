'use client';

interface ZonaCardProps {
  numero: string;
  icono: string;
  nombre: string;
  subtitulo: string;
  descripcion: string;
  tags: string;
}

export default function ZonaCard({ numero, icono, nombre, subtitulo, descripcion, tags }: ZonaCardProps) {
  return (
    <div
      style={{
        background: '#1C1710', padding: '3rem 2.5rem',
        border: '1px solid rgba(201,168,76,.08)',
        position: 'relative', overflow: 'hidden',
        transition: 'border-color .4s, background .4s', cursor: 'none'
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201,168,76,.3)';
        (e.currentTarget as HTMLDivElement).style.background = '#221E14';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201,168,76,.08)';
        (e.currentTarget as HTMLDivElement).style.background = '#1C1710';
      }}
    >
      <span style={{
        position: 'absolute', right: '1.5rem', top: '1rem',
        fontFamily: 'var(--font-cinzel)', fontSize: '4rem', fontWeight: 600,
        color: 'rgba(201,168,76,.04)', lineHeight: 1, pointerEvents: 'none'
      }}>
        {numero.padStart(2, '0')}
      </span>

      <div style={{
        width: '60px', height: '60px',
        border: '1px solid rgba(201,168,76,.2)', borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '1.5rem'
      }}>
        <span style={{ fontSize: '1.4rem', color: 'rgba(201,168,76,.5)' }}>{icono}</span>
      </div>

      <p style={{ fontFamily: 'var(--font-cinzel)', fontSize: '.6rem', letterSpacing: '.35em', color: '#8A6E2F', marginBottom: '.8rem', textTransform: 'uppercase' }}>
        {numero.padStart(2, '0')} · Zona
      </p>
      <h3 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '1.3rem', color: '#C9A84C', letterSpacing: '.08em', marginBottom: '.5rem' }}>
        {nombre}
      </h3>
      <p style={{ fontFamily: 'var(--font-cormorant)', fontStyle: 'italic', fontSize: '.9rem', color: '#8A6E2F', marginBottom: '1.2rem' }}>
        {subtitulo}
      </p>
      <p style={{ fontSize: '.78rem', lineHeight: '1.9', color: '#B8A980', marginBottom: '1.5rem' }}>
        {descripcion}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem' }}>
        {tags.split(',').map((tag, i) => (
          <span key={i} style={{
            fontSize: '.5rem', letterSpacing: '.25em', textTransform: 'uppercase',
            color: '#8A6E2F', padding: '.25rem .7rem',
            border: '1px solid rgba(201,168,76,.15)'
          }}>
            {tag.trim()}
          </span>
        ))}
      </div>
    </div>
  );
}