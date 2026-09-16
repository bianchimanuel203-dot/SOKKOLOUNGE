# SOKKO Lounge 🌋

Web premium para lounge de copas en Caleta de Fuste, Fuerteventura.
Arquitectura headless CMS con Next.js en el frontend y WordPress como backend de contenidos.

---

## Stack

- **Frontend:** Next.js 16 (App Router) · TypeScript · CSS inline
- **Backend/CMS:** WordPress (headless) con ACF + CPT UI
- **Tipografía:** Cinzel · Cormorant Garamond · Raleway
- **Paleta:** Dark volcanic (#1A0E05, #1A1208) · Gold (#C8922A, #D4982E)

---

## Funcionalidades

- Carta de cócteles y menú gestionado desde WordPress
- Sistema de reservas con formulario integrado
- Eventos y programación cultural desde CPT WordPress
- Horarios dinámicos gestionados desde el CMS
- Diseño premium dark con identidad de marca propia

---

## Arquitectura headless

WordPress (backend) Next.js (frontend)
───────────────── ──────────────────
CPT: eventos → /eventos
CPT: menu → /carta
CPT: horarios → /horarios
CPT: reservas → /reservas
ACF fields → API REST WordPress


---

## Instalación local

```bash
git clone https://github.com/bianchimanuel203-dot/SOKKOLOUNGE.git
cd SOKKOLOUNGE
npm install
cp .env.local.example .env.local
# Configura WP_API_URL, WP_USERNAME y WP_APP_PASSWORD en .env.local
npm run dev
```

---

---

## Cliente

Proyecto real para **SOKKO Lounge**, Caleta de Fuste, Fuerteventura.
