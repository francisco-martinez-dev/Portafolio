# Portafolio — Francisco Martínez

Portafolio personal de Francisco Martínez. Experiencia en desarrollo frontend con Angular y TypeScript para el sector bancario, y en QA manual y funcional con Jira y Xray. Incluye proyectos personales de desarrollo web.

**Demo:** [francisco-martinez-dev.vercel.app](https://francisco-martinez-dev.vercel.app)

## Stack

- **[Astro](https://astro.build)** — arquitectura de islas, 0 JS por defecto.
- **React** — solo como isla, en dos puntos puntuales: el toggle de tema y el embed del Dashboard de Clima.
- **Tailwind CSS** — sistema de diseño basado en tokens (`tailwind.config.mjs`).
- **Recharts** — gráfico de tendencia dentro del embed del clima.
- **Formspree** — formulario de contacto, sin backend propio.
- **lucide-astro** / **lucide-react** — iconografía.

## Cómo correr el proyecto localmente

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env
# edita .env y pega tu endpoint real de Formspree

# 3. Levantar el servidor de desarrollo
npm run dev
```

El sitio queda disponible en `http://localhost:4321`.

Otros comandos disponibles:

```bash
npm run build    # build de producción en dist/
npm run preview  # sirve localmente el build de producción
```

## Estructura del proyecto

```
src/
├── components/
│   ├── Header.astro
│   ├── Hero.astro
│   ├── ProjectCard.astro
│   ├── SkillBadge.astro
│   ├── ExperienceItem.astro
│   ├── ContactForm.astro
│   ├── Footer.astro
│   └── react/
│       ├── ThemeToggle.jsx
│       └── WeatherDashboardEmbed.jsx
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   └── index.astro
├── data/
│   └── projects.json
└── styles/
    └── global.css
```

## Decisiones técnicas

- **React solo en dos componentes.** El resto del sitio es HTML estático generado por Astro, así que el JS que se manda al navegador queda cerca de 0kb por defecto. `ThemeToggle` usa `client:load` (se necesita apenas carga la página); `WeatherDashboardEmbed` usa `client:visible` (solo se hidrata si el usuario hace scroll hasta esa tarjeta).
- **`WeatherDashboardEmbed` es una versión compacta**, no una copia del proyecto original de Dashboard de Clima: consume la misma API pública (Open-Meteo) pero con una superficie más chica — búsqueda de ciudad y tendencia de 7 días — pensada para vivir dentro de la tarjeta de proyecto sin duplicar todo el repo original.
- **Los proyectos viven en `src/data/projects.json`**, no hardcodeados en el markup. Agregar un proyecto nuevo es agregar un objeto al array, sin tocar componentes.
- **Modo claro/oscuro** vía clase `dark` en `<html>`, con un script inline en `BaseLayout.astro` que decide el tema antes del primer paint (para no mostrar el tema incorrecto por una fracción de segundo). Respeta `prefers-color-scheme` del sistema y una preferencia manual guardada en `localStorage`.
- **El formulario de contacto es HTML plano**, sin JavaScript, que postea directo a Formspree.

## Variables de entorno

Ver `.env.example`. Actualmente solo se usa:

```
PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/tu-id-de-formulario
```
## Perfil profesional y CV

- La portada y la línea de experiencia presentan dos áreas de experiencia: desarrollo frontend y QA manual/funcional.
- El CV descargable se sirve desde `public/cv-francisco-martinez.pdf`.
- Al actualizar el CV, sustitúyelo por una exportación PDF de la versión vigente antes de desplegar.
