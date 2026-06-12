# Estrategia SEO — BEMYTECH

> Objetivo: rankear en Google para búsquedas comerciales de desarrollo de software en Colombia/LATAM y convertir ese tráfico en cotizaciones por WhatsApp.

## 1. Keywords objetivo

### Principales (alta intención comercial)
| Keyword | Dónde se usa |
|---|---|
| desarrollo de software a la medida | `<title>`, meta description, footer, FAQ, og-image |
| empresa de desarrollo de software en Colombia | `<title>`, schema, FAQ |
| desarrollo de software Pereira | badge del hero, schema LocalBusiness, footer |
| desarrollo de aplicaciones móviles Colombia | servicios, FAQ |
| consultoría en inteligencia artificial | servicios, FAQ, portafolio (Visual Emotion) |

### Long-tail (capturadas por el FAQ)
- "¿cuánto cuesta desarrollar una app a la medida?" → FAQ q2
- "¿cuánto tiempo toma desarrollar un MVP?" → FAQ q3
- "chatbot de WhatsApp para empresas" → FAQ q5 + testimonio de Amatista
- "fábrica de software [ciudad]" → variantes locales

**Regla:** una keyword principal por página. Hoy todo vive en la landing; al crecer, cada servicio debe tener su propia página (ver §4).

## 2. Implementado en el código (esta iteración)

- ✅ `<title>` y meta description con keywords por idioma (ES/EN)
- ✅ Datos estructurados:
  - `ProfessionalService` con NAP completo (nombre, dirección Pereira/Risaralda, teléfono, email), geocoordenadas, horario, área servida y catálogo de 6 servicios
  - `FAQPage` con 6 preguntas/respuestas por idioma (elegible para rich results)
- ✅ Sección FAQ visible (contenido long-tail real, no solo schema)
- ✅ Testimonios reales con nombre, cargo y empresa (E-E-A-T: señales de confianza)
- ✅ `og-image.jpg` 1200×630 generada (antes era un 404) — mejora CTR al compartir en WhatsApp/LinkedIn
- ✅ `hreflang` es/en + canonical por ruta + sitemap automático + robots.txt
- ✅ Rutas estáticas reales para idiomas (`/` y `/en`) en vez de query params que Google no indexaba
- ✅ Rendimiento: sitio estático de ~400KB, sin loader artificial (Core Web Vitals)

## 3. Acciones fuera del código (CRÍTICAS — hacerlas esta semana)

1. **Google Business Profile** (la palanca #1 de SEO local):
   - Crear/reclamar el perfil "BEMYTECH" en Pereira
   - Categoría: "Empresa de desarrollo de software"
   - Mismo NAP que el sitio: BEMYTECH · Pereira, Risaralda · +57 311 430 22 56
   - Subir 10+ fotos (oficina, equipo, capturas de productos) — las fichas con 10+ fotos reciben ~35% más clics
   - Pedir reseñas de Google a Maryury, Jeison y Lorenza (¡ya son fans!)
2. **Google Search Console**: verificar bemytech.io, enviar el sitemap, monitorear queries reales
3. **NAP consistente** en todos lados: LinkedIn, directorios (Clutch, GoodFirms, Sortlist), redes — exactamente el mismo nombre/teléfono/ciudad
4. **LinkedIn de empresa** activo y enlazado en `sameAs` del schema (cuando exista, agregar la URL en `Layout.astro`)

## 4. Plan de contenidos (mes 2-3)

El sitio actual es una landing; para escalar tráfico orgánico:
- **Páginas de servicio** dedicadas: `/desarrollo-web`, `/desarrollo-movil`, `/inteligencia-artificial` (1 keyword principal c/u)
- **Casos de estudio** con métricas reales: "Cómo Castevo eliminó los errores de inventario de la Sociedad de Mejoras de Pereira" — esto rankea Y convierte
- **Blog técnico-comercial** (2 posts/mes): "¿Cuánto cuesta una app en Colombia en 2026?", "Chatbot de WhatsApp para tu negocio: guía completa" — las preguntas del FAQ son los títulos
- Cada producto del portafolio (Castevo, RikDrive…) debería enlazar a su dominio propio y viceversa (backlinks propios)

## 5. Métricas a vigilar (Search Console + GBP)

- Impresiones/clics para "desarrollo de software" + ciudad
- Llamadas y clics a WhatsApp desde la ficha de GBP
- Posición media de la landing para las 5 keywords principales
- Envíos del formulario / clics al botón de WhatsApp (considerar agregar analytics ligero, p. ej. Plausible o Umami — sin cookies, no requiere banner)
