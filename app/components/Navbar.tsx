'use client';

import { useState } from 'react';
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from '../../components/ui/resizable-navbar';

const NAV_ITEMS = [
  { name: 'INICIO',   link: '#inicio' },
  { name: 'ZONAS',    link: '#espacios' },
  { name: 'ISLAS',    link: '#islas' },
  { name: 'EVENTOS',  link: '#eventos' },
  { name: 'CARTA',    link: '#menu' },
  { name: 'HORARIOS', link: '#horarios' },
];

export default function SokkoNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200 }}>
      <Navbar>
        {/* ── Desktop ──────────────────────────────────────────── */}
        <NavBody className="sokko-navbody">
          {/* Logo */}
          <a
            href="/"
            style={{
              fontFamily: 'var(--font-cinzel)',
              fontSize: '14px',
              color: '#C8922A',
              letterSpacing: '.3em',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              position: 'relative',
              zIndex: 20,
            }}
          >
            SOKKO LOUNGE
          </a>

          {/* Links */}
          <NavItems
            items={NAV_ITEMS}
            className="sokko-navitems"
          />

          {/* Botón RESERVAR */}
          <a
            href="#contacto"
            style={{
              fontFamily: 'var(--font-raleway)',
              fontWeight: 400,
              fontSize: '11px',
              letterSpacing: '.28em',
              textTransform: 'uppercase',
              color: '#C8922A',
              border: '1px solid rgba(200,146,42,0.65)',
              padding: '9px 22px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              position: 'relative',
              zIndex: 20,
              transition: 'background .25s ease, color .25s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = '#C8922A';
              (e.currentTarget as HTMLElement).style.color = '#1A0E05';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.color = '#C8922A';
            }}
          >
            RESERVAR
          </a>
        </NavBody>

        {/* ── Mobile ───────────────────────────────────────────── */}
        <MobileNav className="sokko-mobilenav">
          <MobileNavHeader>
            <a
              href="/"
              style={{
                fontFamily: 'var(--font-cinzel)',
                fontSize: '13px',
                color: '#C8922A',
                letterSpacing: '.25em',
                textDecoration: 'none',
              }}
            >
              SOKKO LOUNGE
            </a>
            <MobileNavToggle
              isOpen={mobileOpen}
              onClick={() => setMobileOpen(v => !v)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={mobileOpen}
            onClose={() => setMobileOpen(false)}
            className="sokko-mobilemenu"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.link}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: 'var(--font-raleway)',
                  fontWeight: 300,
                  fontSize: '13px',
                  letterSpacing: '.2em',
                  textTransform: 'uppercase',
                  color: '#C4A882',
                  textDecoration: 'none',
                  padding: '.6rem 0',
                  borderBottom: '1px solid rgba(200,146,42,0.08)',
                  display: 'block',
                  width: '100%',
                }}
              >
                {item.name}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block',
                textAlign: 'center',
                fontFamily: 'var(--font-cinzel)',
                fontSize: '11px',
                letterSpacing: '.2em',
                color: '#C8922A',
                border: '1px solid rgba(200,146,42,0.6)',
                padding: '12px',
                marginTop: '1rem',
                textDecoration: 'none',
              }}
            >
              RESERVAR
            </a>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Estilos SOKKO para los primitivos de Aceternity */}
      <style>{`
        /* Contenedor fijo en top */
        .sokko-navbody {
          min-width: unset !important;
          background: transparent !important;
          border-radius: 0 !important;
        }
        /* Cuando está visible (scrolled): fondo oscuro */
        .sokko-navbody[style*="width: 40%"] {
          background: rgba(26,14,5,0.94) !important;
          border-bottom: 1px solid rgba(200,146,42,0.15) !important;
          backdrop-filter: blur(14px) !important;
          -webkit-backdrop-filter: blur(14px) !important;
          border-radius: 0 !important;
          width: 100% !important;
        }
        /* Links en Raleway dorado suave con espacios */
        .sokko-navitems {
          display: flex !important;
          gap: 0 !important;
        }
        .sokko-navitems a {
          font-family: var(--font-raleway) !important;
          font-size: 11px !important;
          letter-spacing: .18em !important;
          text-transform: uppercase !important;
          color: #C4A882 !important;
          font-weight: 300 !important;
          padding: 8px 16px !important;
        }
        .sokko-navitems a:hover {
          color: #C8922A !important;
        }
        /* Hover bg dorado sutil en lugar de gris */
        .sokko-navitems div[class*="rounded"] {
          background: rgba(200,146,42,0.1) !important;
          border-radius: 2px !important;
        }
        /* Mobile nav: fondo oscuro */
        .sokko-mobilenav {
          background: rgba(26,14,5,0.96) !important;
          border-bottom: 1px solid rgba(200,146,42,0.15) !important;
          padding: 1rem 1.5rem !important;
          border-radius: 0 !important;
          width: 100% !important;
        }
        /* Iconos hamburguesa dorados */
        .sokko-mobilenav svg {
          color: #C8922A !important;
          stroke: #C8922A !important;
        }
        /* Menú mobile: fondo muy oscuro */
        .sokko-mobilemenu {
          background: rgba(13,8,2,0.98) !important;
          border: 1px solid rgba(200,146,42,0.15) !important;
          border-radius: 0 !important;
          box-shadow: none !important;
          padding: 1.5rem !important;
        }
      `}</style>
    </div>
  );
}
