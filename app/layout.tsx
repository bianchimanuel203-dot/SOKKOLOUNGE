import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Raleway } from "next/font/google";
import "./globals.css";
import Cursor from "./components/Cursor";

const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" });
const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["300", "400", "600"], 
  style: ["normal", "italic"], 
  variable: "--font-cormorant" 
});
const raleway = Raleway({ 
  subsets: ["latin"], 
  weight: ["200", "300", "400"], 
  variable: "--font-raleway" 
});

export const metadata: Metadata = {
  title: "SOKKO Lounge · El Resguardo del Viento",
  description: "SOKKO Lounge, Lanzarote. Refugio, calma, conexión y experiencia.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${cinzel.variable} ${cormorant.variable} ${raleway.variable}`} style={{ cursor: 'none' }}>
        <Cursor />
        {children}
      </body>
    </html>
  );
}