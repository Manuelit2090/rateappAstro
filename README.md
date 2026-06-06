# RateApp — Astro + Vue + MySQL

Aplicación de reseñas de restaurantes con sistema de puntos y canjeo. Convertida de React + TanStack Router → **Astro 5 + Vue 3 (Composition API `<script setup>`)** + **MySQL backend**.

## Stack tecnológico

- **Frontend**: Astro 5 + Vue 3 Composition API
- **Backend**: Astro API Routes + MySQL con `mysql2/promise`
- **Autenticación**: JWT tokens en cookies httpOnly + bcrypt
- **Estilos**: Tailwind v4 + DaisyUI (tema: abyss)
- **Package Manager**: pnpm

## Características implementadas

✅ Autenticación segura (registro, login, logout)
✅ Búsqueda de restaurantes cercanos (fórmula Haversine)
✅ Sistema de reseñas con validación
✅ Sistema de puntos automático (10 puntos por reseña)
✅ Gestión de cupones con transacciones atómicas
✅ Favoritos personalizados
✅ Dashboard de usuario

## Endpoints API

**Autenticación:**
- `POST /api/auth/register` — Registro de nuevo usuario
- `POST /api/auth/login` — Iniciar sesión (genera JWT en cookie)
- `POST /api/auth/logout` — Cerrar sesión
- `GET /api/auth/me` — Obtener datos del usuario autenticado

**Restaurantes:**
- `GET /api/restaurants/nearby?lat=40.4&lon=-3.7&radius=10` — Restaurantes cercanos
- `GET /api/restaurants/search?q=burger&category=burgers&page=1` — Búsqueda
- `GET /api/restaurants/[slug]` — Detalle de restaurante

**Reseñas y Puntos:**
- `POST /api/reviews` — Crear reseña (automáticamente +10 puntos)
- `GET /api/reviews?business_id=1` — Obtener reseñas de restaurante
- `GET /api/points` — Obtener saldo de puntos del usuario

**Cupones y Favoritos:**
- `GET /api/coupons` — Listar cupones disponibles
- `POST /api/coupons` — Canjear cupón (transacción atómica)
- `POST /api/favorites` — Agregar/quitar favorito
- `GET /api/favorites` — Listar favoritos del usuario

**Utilidades:**
- `GET /api/test-connection` — Verificar conexión a BD

Ver `API_DOCUMENTATION.md` para documentación detallada.

## Estructura del proyecto
│   ├── AppSidebar.vue      ← sidebar con toggle reactivo (useState → ref)
│   ├── ProfileCard.vue     ← tarjeta de perfil estática
│   ├── QuestCard.vue       ← tarjeta individual de quest con progress
│   ├── QuestsCard.vue      ← panel de quests semanales
│   └── RestaurantCard.vue  ← tarjeta de restaurante con router-link
├── data/
│   ├── restaurants.ts      ← sin cambios (TypeScript puro)
│   └── quests.ts           ← sin cambios (TypeScript puro)
├── layouts/
│   └── BaseLayout.astro    ← shell HTML global (equivale a __root.tsx)
├── pages/
│   └── index.astro         ← página principal Feed (equivale a routes/index.tsx)
└── styles/
    └── global.css          ← sin cambios (Tailwind v4 + CSS vars)
```

## Equivalencias clave

| React / TanStack                        | Astro + Vue                              |
|-----------------------------------------|------------------------------------------|
| `useState(true)`                        | `ref(true)`                              |
| `useLocation()` / `pathname`            | `useRoute()` / `route.path`              |
| `<Link to="...">` (TanStack)            | `<RouterLink :to="...">` (vue-router)    |
| `createFileRoute("/")({ component })`  | `src/pages/index.astro`                  |
| `__root.tsx` shell                      | `src/layouts/BaseLayout.astro`           |
| JSX `{condition && <Tag />}`            | `v-if="condition"` + `<component :is>`   |
| `className={...}`                       | `:class="[...]"` o `:class="{}"`         |
| `style={{ width: val }}`               | `:style="{ width: val }"`               |
| `onClick={(e) => e.preventDefault()}`  | `@click.prevent`                         |
| `lucide-react`                          | `lucide-vue-next`                        |

## Instalación

```bash
npm install        # o: pnpm install / bun install
npm run dev        # http://localhost:4321
```

## Instalación y configuración

### 1. Instalar dependencias
```bash
pnpm install
# o
npm install
```

### 2. Configurar variables de entorno
Crea un archivo `.env` en la raíz:
```bash
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=AppBD
JWT_SECRET=tu_secreto_muy_largo_y_seguro_aqui
JWT_EXPIRES_IN=7d
```

### 3. Verificar conexión a BD
```bash
curl http://localhost:3000/api/test-connection
```

### 4. Ejecutar el servidor de desarrollo
```bash
pnpm dev
# o
npm run dev
```

Abre [http://localhost:4321](http://localhost:4321)

## Comandos disponibles

```bash
pnpm dev        # Servidor de desarrollo
pnpm build      # Build de producción
pnpm preview    # Preview del build
```

## Documentación adicional

- **`API_DOCUMENTATION.md`** — Guía completa de endpoints con ejemplos
- **`PROYECTO_COMPLETADO.md`** — Resumen ejecutivo de la implementación
- **`AGENT.md`** — Guía de arquitectura y convenciones del proyecto
- **`plan_desarrollo_rateapp.md`** — Plan de desarrollo estructurado

## Migración de React a Astro + Vue

| React / TanStack                        | Astro + Vue                              |
|-----------------------------------------|------------------------------------------|
| `useState(true)`                        | `ref(true)`                              |
| `useLocation()` / `pathname`            | `useRoute()` / `route.path`              |
| `<Link to="...">` (TanStack)            | `<RouterLink :to="...">` (vue-router)    |
| `createFileRoute("/")({ component })`  | `src/pages/index.astro`                  |
| `__root.tsx` shell                      | `src/layouts/BaseLayout.astro`           |
| JSX `{condition && <Tag />}`            | `v-if="condition"` + `<component :is>`   |
| `className={...}`                       | `:class="[...]"` o `:class="{}"`         |
| `style={{ width: val }}`               | `:style="{ width: val }"`               |
| `onClick={(e) => e.preventDefault()}`  | `@click.prevent`                         |
| `lucide-react`                          | `lucide-vue-next`                        |

## Notas importantes

- Los componentes Vue usan `client:load` en páginas Astro para activar reactividad
- Las páginas estáticas pueden omitir `client:*` — ventaja de Astro
- El tema activo de DaisyUI es `abyss` — no modificar sin consultar
- La protección de rutas se maneja en `src/middleware.ts`
