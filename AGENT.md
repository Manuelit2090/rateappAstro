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
El proyecto está **completamente migrado a SQL** (MySQL en Aiven). Toda la lógica de negocio está implementada en endpoints API RESTful en `src/pages/api/`. No hay datos locales en archivos `.ts` en `src/data/` — estos son solo para tipos TypeScript.

**Endpoints implementados:**
- `POST /api/auth/register` — Registro de usuarios
- `POST /api/auth/login` — Autenticación
- `GET /api/auth/me` — Obtener usuario autenticado
- `POST /api/auth/logout` — Cerrar sesión
- `GET /api/restaurants/nearby` — Restaurantes cercanos (Haversine)
- `GET /api/restaurants/search` — Búsqueda con filtros y paginación
- `GET /api/restaurants/[slug]` — Detalles de restaurante
- `POST /api/reviews` — Crear reseña (otorga 10 puntos)
- `GET /api/reviews` — Obtener reseñas de restaurante
- `GET /api/points` — Saldo de puntos del usuario
- `POST /api/coupons` — Canjear cupón (transacción atómica)
- `GET /api/coupons` — Listar cupones disponibles
- `POST /api/favorites` — Agregar/quitar favoritos
- `GET /api/favorites` — Listar favoritos
- `GET /api/test-connection` — Verificar conexión a BD

**Conexión centralizada:** `src/lib/db.ts` (pool MySQL con max 10 conexiones)
**Autenticación:** `src/lib/auth.ts` (bcrypt para contraseñas, JWT tokens)

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
La sesión se guarda en **cookies httpOnly** (secure) generadas por los endpoints `/api/auth/`.

```ts
// Los tokens se almacenan automáticamente en cookies httpOnly
// No requiere code manual en el frontend — el navegador maneja las cookies

// Verificar si el usuario está autenticado:
const response = await fetch('/api/auth/me');
const user = await response.json();
```

**Implementado según mejores prácticas:**
- ✅ Contraseñas encriptadas con bcrypt (12 rounds)
- ✅ JWT tokens con expiración 7 días
- ✅ Cookies httpOnly (protegidas contra XSS)
- ✅ CSRF protection via SameSite=Strict

La protección de rutas del lado del servidor se puede implementar en `src/middleware.ts` verificando el token JWT desde cookies.

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

## Documentación del Proyecto

### Archivos de Referencia Principal
- **`AGENT.md`** (este archivo) — Convenciones, arquitectura, estándares de código
- **`SECURITY.md`** — Prácticas de seguridad implementadas, mejores prácticas
- **`CHANGELOG.md`** — Historial detallado de cambios y auditoría
- **`API_DOCUMENTATION.md`** — Especificación completa de endpoints
- **`PROYECTO_COMPLETADO.md`** — Estado ejecutivo del proyecto

### Archivos de Referencia Rápida
- **`RESUMEN_CAMBIOS.txt`** — Quick reference de últimos cambios (cambiar en cada auditoría)
- **`README.md`** — Guía de instalación y uso
- **`plan_desarrollo_rateapp.md`** — Plan de fases y equipo

### Cómo Usar Documentación
1. Entender proyecto → **AGENT.md** + **README.md**
2. Entender seguridad → **SECURITY.md**
3. Ver cambios recientes → **CHANGELOG.md** o **RESUMEN_CAMBIOS.txt**
4. Usar APIs → **API_DOCUMENTATION.md**
5. Verificar estado → **PROYECTO_COMPLETADO.md**

## Control de Cambios

Cuando realices cambios:
1. Agregar cabecera JSDoc a archivos modificados/creados
2. Documentar cambio en **CHANGELOG.md** con:
   - ID del cambio (ej: FEAT-001, BUG-002, SEC-003)
   - Archivo afectado
   - ANTES/DESPUÉS
   - Razón del cambio
   - Impacto en el sistema
3. Actualizar **RESUMEN_CAMBIOS.txt** si es cambio mayor
4. Actualizar **README.md** si afecta instalación/uso
5. Actualizar **SECURITY.md** si afecta seguridad