# neon-peach-feed — Astro + Vue conversion

Converted from React + TanStack Router → **Astro 5 + Vue 3 (Composition API `<script setup>`)**.

## Project structure

```
src/
├── components/
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

## Notas

- Los componentes Vue usan `client:load` en las páginas Astro para activar
  la hidratación en el cliente (necesario para reactividad: toggle sidebar, etc.).
- Las páginas puramente estáticas pueden omitir `client:*` y renderizarse solo en
  el servidor — ventaja de Astro sobre una SPA pura.
- `vue-router` es necesario porque `RestaurantCard` y `AppSidebar` usan
  `RouterLink` / `useRoute`. En Astro con SSR completo se puede reemplazar
  por links `<a>` normales si se prefiere.
