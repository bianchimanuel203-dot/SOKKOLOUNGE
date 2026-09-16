import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Raleway } from "next/font/google";
import "./globals.css";
import Cursor from "./components/Cursor";
import SmoothScroll from "./components/SmoothScroll";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cinzel",
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
  variable: "--font-raleway",
});

// TODO: sustituir por el dominio real de producción (o configurar SITE_URL en el entorno).
const SITE_URL = process.env.SITE_URL || 'https://TODO-configura-el-dominio-de-produccion.example'
const TITLE = "SOKKO Lounge · Bar Cóctel y Terraza en Caleta de Fuste, Fuerteventura"
const DESCRIPTION = "SOKKO Lounge, Fuerteventura. Refugio, calma, conexión y experiencia."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    siteName: 'SOKKO Lounge',
    locale: 'es_ES',
    type: 'website',
    images: ['/hero/hero-portada.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/hero/hero-portada.jpg'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BarOrPub',
  name: 'SOKKO Lounge',
  description: DESCRIPTION,
  image: `${SITE_URL}/hero/hero-portada.jpg`,
  telephone: '+34643830451',
  email: 'sokkolounge@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Alcalde Juan Ramón Soto Morales, 7',
    addressLocality: 'Castillo Caleta de Fuste',
    postalCode: '35610',
    addressRegion: 'Las Palmas',
    addressCountry: 'ES',
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Wednesday', 'Thursday', 'Friday'], opens: '15:00', closes: '02:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '12:00', closes: '02:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '12:00', closes: '02:00' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body
        className={`${cinzel.variable} ${cormorant.variable} ${raleway.variable}`}
        style={{ cursor: 'none', background: '#1A0E05' }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Cursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}