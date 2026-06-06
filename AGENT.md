# AGENT.md

## Descripción general del proyecto
App de reseñas de restaurantes. Los usuarios pueden explorar negocios, escribir reseñas detalladas (iluminación, comida, comodidad, etc.), acumular puntos y canjearlos por cupones. Los negocios pueden registrarse para aumentar su visibilidad.

## Stack tecnológico
- **Astro** — framework base, maneja páginas, routing y SSR
- **Vue 3** — componentes interactivos y paneles del dashboard (`<script setup>`)
- **Tailwind CSS + DaisyUI** — estilos, tema activo: `abyss`
- **pnpm** — gestor de paquetes
- **TypeScript** — en todo el proyecto

## Estructura de carpetas
src/
├── components/
│   ├── (*.vue)        # Componentes Vue — dashboard y paneles (PascalCase)
│   ├── ui/            # Componentes adicionales de UI
│   └── astro/         # Componentes .astro del dashboard y página inicial
├── pages/             # Páginas Astro (routing)
├── layouts/           # Layouts base
├── data/              # Archivos .ts con datos locales (en migración a SQL)
├── utils/             # Helpers y utilidades (ej: checkLogin.ts)
├── styles/            # global.css y variables
└── middleware.ts      # Protección de rutas (auth)

## Base de datos
El proyecto está migrando de archivos `.ts` locales en `src/data/` a una base de datos **SQL hosteada en Aiven**. Durante la migración pueden coexistir ambas fuentes. Al tocar lógica de datos, verificar si ya existe el módulo migrado antes de leer del archivo local.

## Routing
El proyecto usa **dos sistemas de routing en paralelo**:

- **Astro** maneja el routing de páginas (`src/pages/`). Es la fuente de verdad
  para la navegación entre páginas.
- **Vue Router** se usa dentro de componentes Vue que requieren navegación
  interna sin recargar página (barra de búsqueda, tabs del dashboard, etc.).
  Estos componentes se montan en páginas Astro con `client:load`.

Al crear rutas nuevas: si es una página completa → `src/pages/`. Si es
navegación dentro de un componente Vue → Vue Router.

## Autenticación y sesión
La sesión se guarda actualmente en **localStorage** por simplicidad.

```ts
// Guardar sesión
localStorage.setItem("session", JSON.stringify({ userId, token }))

// Leer sesión
const session = JSON.parse(localStorage.getItem("session") ?? "null")
```

> ⚠️ **Deuda técnica conocida**: migrar a cookies de sesión HttpOnly para mayor
> seguridad. Al implementar esta migración, actualizar `src/middleware.ts` y
> `src/utils/checkLogin.ts` para leer desde cookies en lugar de localStorage.
> Documentar el cambio en la rama `base-de-datos`.

La protección de rutas del lado del servidor vive en `src/middleware.ts`.
Mientras se use localStorage, la validación real ocurre en el cliente
(componentes Vue); el middleware solo puede validar una vez se migre a cookies.

## Convenciones de código

### Nomenclatura
- Componentes Vue y Astro del dashboard: **PascalCase** (`RestaurantCard.vue`, `QuestsPage.vue`)
- Utilidades y helpers: **camelCase** (`checkLogin.ts`, `getRestaurant.ts`)
- Páginas Astro: **kebab-case** (`restaurant/[slug].astro`)

### Documentación obligatoria en cada archivo
Todo archivo creado o modificado debe incluir:
1. **Cabecera**: descripción breve, propósito del archivo y dependencias externas
2. **JSDoc** en cada función, indicando parámetros, retorno y comportamiento

Ejemplo:
```ts
/**
 * @file checkLogin.ts
 * @description Valida si el usuario tiene sesión activa mediante cookies.
 * @depends astro:cookies, src/utils/jwt.ts
 */

/**
 * Verifica si la cookie de autenticación existe y es válida.
 * @param cookies - Objeto AstroCookies del request actual
 * @returns true si el usuario está autenticado, false si no
 */
export function checkLogin(cookies: AstroCookies): boolean { ... }
```

### Componentes Vue
- Usar siempre `<script setup lang="ts">`
- Props tipadas con `defineProps<{}>()`
- Emits tipados con `defineEmits<{}>()`

## Ramas de Git y flujo de trabajo
| Tipo de cambio | Rama destino |
|---|---|
| Rama Principal | `main`|
| Cambios de UI / estilos | `dashboard-style` |
| Lógica de base de datos | `base-de-datos` |
| Lógica de negocio / features | `develop` |

Antes de crear un archivo nuevo, confirmar en qué rama debe ir según la tabla anterior.

## Comandos útiles
```bash
pnpm install          # Instalar dependencias
pnpm dev              # Servidor de desarrollo
pnpm build            # Build de producción
pnpm preview          # Preview del build
```

## Notas de arquitectura
- La protección de rutas se maneja en `src/middleware.ts`
- Los componentes Vue que necesiten reactividad en páginas Astro deben usar `client:load`
- El tema DaisyUI activo es `abyss`; no sobreescribir variables del tema sin consultar