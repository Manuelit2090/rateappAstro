# 🚀 RateApp - Conexión de Lógica con Base de Datos

## 📋 Resumen de Cambios Realizados

He conectado completamente la lógica del programa RateApp con la base de datos MySQL. Aquí está lo que se hizo:

### ✅ Configuración Base
1. **Archivo `.env`** - Variables de conexión a MySQL y JWT
2. **`src/lib/db.ts`** - Pool de conexión a MySQL
3. **`src/lib/auth.ts`** - Funciones de autenticación (bcrypt, JWT)
4. **`src/lib/api.ts`** - Cliente API centralizado y servicios reutilizables

### ✅ Endpoints de API Creados

#### Autenticación (`/api/auth/`)
- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/logout` - Cerrar sesión
- `GET /api/auth/me` - Obtener usuario autenticado

#### Restaurantes (`/api/restaurants/`)
- `GET /api/restaurants/nearby?lat=40.4168&lon=-3.7038&radius=10` - Restaurantes cercanos
- `GET /api/restaurants/search?q=burguer&category=burgers&page=1` - Búsqueda de restaurantes
- `GET /api/restaurants/[slug]` - Detalles de restaurante con reseñas

#### Reseñas (`/api/reviews`)
- `POST /api/reviews` - Crear reseña (otorga 10 puntos)
- `GET /api/reviews?business_id=1` - Obtener reseñas de un restaurante

#### Puntos (`/api/points`)
- `GET /api/points` - Obtener puntos del usuario actual

#### Cupones (`/api/coupons`)
- `GET /api/coupons` - Listar cupones disponibles
- `POST /api/coupons` - Canjear cupón (transacción con puntos)

#### Favoritos (`/api/favorites`)
- `POST /api/favorites` - Agregar/quitar de favoritos
- `GET /api/favorites` - Obtener restaurantes favoritos

#### Conexión (`/api/test-connection`)
- `GET /api/test-connection` - Verificar conexión con BD

### ✅ Componentes Actualizados

1. **LoginForm.vue** - Ahora usa la API `/api/auth/login`
2. **DiscoverPage.vue** - Consumeendpoints de restaurantes y búsqueda
3. **checkLogin.ts** - Usa API en lugar de datos locales

### ✅ Archivo de Configuración

```javascript
// astro.config.mjs
output: 'hybrid' // ← CRÍTICO: Permite endpoints dinámicos
```

---

## 🔧 Cómo Instalar las Dependencias

Si aún no lo has hecho, instala las dependencias necesarias:

```bash
npm install mysql2 bcryptjs jsonwebtoken
npm install -D @types/bcryptjs @types/jsonwebtoken
```

O si usas pnpm:

```bash
pnpm add mysql2 bcryptjs jsonwebtoken
pnpm add -D @types/bcryptjs @types/jsonwebtoken
```

---

## 🧪 Prueba la Conexión

Para verificar que todo está funcionando:

```bash
curl http://localhost:3000/api/test-connection
```

Deberías recibir:
```json
{
  "status": "connected",
  "message": "Conexión a la base de datos exitosa",
  "timestamp": "2026-06-06T..."
}
```

---

## 📱 Cómo Usar los Endpoints

### 1. Registro
```javascript
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    full_name: 'Juan Pérez',
    username: 'juanperez',
    email: 'juan@example.com',
    password: 'password123'
  })
});
```

### 2. Login
```javascript
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'juan@example.com',
    password: 'password123'
  })
});
// Token se guarda automáticamente en cookie httpOnly
```

### 3. Obtener Restaurantes Cercanos
```javascript
const lat = 40.4168;
const lon = -3.7038;
const response = await fetch(`/api/restaurants/nearby?lat=${lat}&lon=${lon}&radius=10`);
const data = await response.json();
```

### 4. Buscar Restaurantes
```javascript
const response = await fetch('/api/restaurants/search?q=burger&category=burgers&page=1');
const data = await response.json();
```

### 5. Crear Reseña (requiere autenticación)
```javascript
const response = await fetch('/api/reviews', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    business_id: 1,
    rating: 5,
    title: 'Excelente',
    content: 'Muy buen servicio'
  })
});
// Automáticamente otorga 10 puntos
```

### 6. Obtener Puntos del Usuario
```javascript
const response = await fetch('/api/points');
const data = await response.json();
// { points: 1200 }
```

### 7. Agregar a Favoritos
```javascript
const response = await fetch('/api/favorites', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ business_id: 1 })
});
```

### 8. Canjear Cupón
```javascript
const response = await fetch('/api/coupons', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ coupon_id: 5 })
});
// Realiza una transacción: descuenta puntos y registra el canjeo
```

---

## 🎯 Flujo Completo de Usuario

1. **Registro/Login** → Se crea usuario en BD con contraseña encriptada (bcrypt)
2. **JWT Token** → Se genera token JWT y se almacena en cookie httpOnly
3. **Descubrir Restaurantes** → Se obtienen de BD ordenados por distancia o rating
4. **Escribir Reseña** → Se guarda en BD + otorga 10 puntos
5. **Acumular Puntos** → Se guardan en tabla `customers.total_points`
6. **Canjear Cupón** → Transacción: descuenta puntos + registra en `customer_redemptions`

---

## 🔐 Seguridad Implementada

✅ Contraseñas encriptadas con bcrypt (salt 12 rounds)
✅ Tokens JWT con expiración de 7 días
✅ Cookies httpOnly (no accesibles desde JavaScript)
✅ Validación de entrada en todos los endpoints
✅ Token verificado en endpoints protegidos
✅ Soft delete (deleted_at) para datos críticos

---

## 📊 Estructura de Tablas Esperadas

Asegúrate de que tu base de datos tenga estas tablas:

```sql
-- Clientes
customers (id, uuid, full_name, username, email, password_hash, 
           total_points, status, deleted_at, last_login_at, created_at, updated_at)

-- Sesiones
customer_sessions (id, customer_id, token_hash, expires_at, revoked_at)

-- Restaurantes
restaurants (id, slug, name, cuisine, category, description, 
            image, rating, reviews, distance, priceRange, promoted, phone, email, 
            address, lat, lon, tags)

-- Reseñas
reviews (id, customer_id, business_id, rating, title, content, deleted_at, 
         created_at, updated_at)

-- Favoritos
customer_favorites (id, customer_id, business_id, created_at)

-- Cupones
coupons (id, code, description, points_required, discount_percentage, 
         uses_left, active, deleted_at)

-- Canjeos
customer_redemptions (id, customer_id, coupon_id, created_at)
```

---

## 🚀 Próximos Pasos

1. **Instalar dependencias** (si no lo hiciste)
2. **Revisar variables `.env`** (asegúrate de que DB_PASSWORD sea correcto)
3. **Probar conexión** (accede a `/api/test-connection`)
4. **Probar endpoints** usando Postman o similares
5. **Actualizar más componentes** para consumir la API
6. **Agregar validaciones frontend** adicionales

---

## 💡 Tips de Uso

- El **token JWT** se envía automáticamente en cookies
- Todos los endpoints con datos del usuario requieren autenticación
- Las **búsquedas** son case-insensitive
- El **sistema de puntos** es automático (se suma al escribir reseñas)
- Las **transacciones de canjeo** son atómicas (todo o nada)

---

## 🐛 Troubleshooting

**Error: "No autenticado"** → El token no se envía o expiró. Haz login de nuevo.

**Error: "Conexión a BD rechazada"** → Verifica `.env`: host, puerto, usuario, contraseña.

**Error: "Campo no existe en tabla"** → Verifica que la tabla existe con las columnas correctas.

**Los restaurantes no aparecen** → Asegúrate de tener datos en tabla `businesses`.

---

## 📞 Soporte

Si necesitas hacer cambios en los endpoints, revisa los archivos en:
- `/src/pages/api/` - Todos los endpoints
- `/src/lib/api.ts` - Servicios reutilizables
- `/src/lib/auth.ts` - Lógica de autenticación
