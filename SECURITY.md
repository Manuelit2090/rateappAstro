# 🔒 Seguridad en RateApp

Documento que detalla las prácticas de seguridad implementadas en RateApp y recomendaciones para mantener la aplicación segura.

---

## Tabla de Contenidos
1. [Autenticación y Autorización](#autenticación-y-autorización)
2. [Gestión de Cookies](#gestión-de-cookies)
3. [Encriptación](#encriptación)
4. [Validación](#validación)
5. [Protección contra Ataques](#protección-contra-ataques)
6. [Variables de Entorno](#variables-de-entorno)
7. [Auditoría y Monitoreo](#auditoría-y-monitoreo)

---

## Autenticación y Autorización

### Flujo de Autenticación

```
┌─────────────────────────────────────────────────┐
│ 1. Usuario ingresa credenciales en /login       │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────┐
│ 2. Frontend: POST /api/auth/login   │
│    con email y password             │
└──────────────────┬──────────────────┘
                   │
┌──────────────────▼──────────────────────────────────┐
│ 3. Backend: src/pages/api/auth/login.ts            │
│    - Busca customer por email                       │
│    - Verifica password con bcrypt.compare()         │
│    - Genera JWT token                              │
│    - Retorna Set-Cookie: auth_token                │
└──────────────────┬──────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│ 4. Browser: Recibe y almacena cookie       │
│    (automático, no accesible desde JS)      │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────┐
│ 5. Siguiente petición: Cookie enviada       │
│    automáticamente en headers               │
└──────────────────┬──────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────┐
│ 6. Backend: Verifica token en /api/auth/me         │
│    - Lee cookie auth_token                         │
│    - jwt.verify() valida firma y expiración        │
│    - Retorna datos del usuario o 401               │
└──────────────────────────────────────────────────────┘
```

### Endpoints de Autenticación

#### Registro: `POST /api/auth/register`
```typescript
/**
 * Archivo: src/pages/api/auth/register.ts
 * 
 * Validaciones:
 * 1. Campos requeridos: full_name, username, email, password
 * 2. Password length >= 8 caracteres
 * 3. Email y username únicos en BD
 * 4. Password encriptado con bcrypt (12 rounds)
 * 
 * Seguridad:
 * ✅ No retorna password_hash
 * ✅ No retorna datos sensibles
 * ✅ HTTP 409 si email/username ya existe (info válida)
 * ✅ Cookie httpOnly, Secure, SameSite=Strict
 */
```

**Respuesta exitosa (201):**
```json
{
  "message": "Registro exitoso",
  "uuid": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Respuesta con error:**
```json
// Email o username ya existe (409)
{ "error": "El email o usuario ya está registrado" }

// Password muy corto (400)
{ "error": "La contraseña debe tener al menos 8 caracteres" }

// Error del servidor (500)
{ "error": "Error interno del servidor" }
```

#### Login: `POST /api/auth/login`
```typescript
/**
 * Archivo: src/pages/api/auth/login.ts
 * 
 * Validaciones:
 * 1. Email y password requeridos
 * 2. Customer existe en BD
 * 3. Password coincide con hash (bcrypt.compare)
 * 4. Cuenta está activa (status = 'active')
 * 
 * Operaciones:
 * 1. Crea entrada en customer_sessions
 * 2. Actualiza last_login_at
 * 3. Genera JWT con expiración 7 días
 * 4. Retorna token en cookie httpOnly
 * 
 * Seguridad:
 * ✅ No retorna password
 * ✅ Usa constante de tiempo en comparación (bcrypt)
 * ✅ No devela si email existe (mismo mensaje de error)
 * ✅ Registra intento de login en BD
 */
```

#### Get Current User: `GET /api/auth/me`
```typescript
/**
 * Archivo: src/pages/api/auth/me.ts
 * 
 * Validaciones:
 * 1. Cookie auth_token debe existir
 * 2. Token debe ser válido (jwt.verify)
 * 3. Usuario debe existir en BD
 * 
 * Retorna:
 * {
 *   "user": {
 *     "id": 1,
 *     "uuid": "...",
 *     "full_name": "...",
 *     "username": "...",
 *     "email": "...",
 *     "avatar_url": null,
 *     "status": "active"
 *   }
 * }
 * 
 * Seguridad:
 * ✅ No retorna password_hash
 * ✅ Valida token en cada petición
 * ✅ 401 si token es inválido/expirado
 */
```

#### Logout: `POST /api/auth/logout`
```typescript
/**
 * Archivo: src/pages/api/auth/logout.ts
 * 
 * Operaciones:
 * 1. Marca sesión como revocada en BD (revoked_at = NOW())
 * 2. Limpia cookie auth_token (Max-Age=0)
 * 
 * Seguridad:
 * ✅ Invalida token en servidor (no confía en cliente)
 * ✅ Cookie se elimina del navegador
 * ✅ Próximas peticiones fallarán sin token válido
 */
```

---

## Gestión de Cookies

### Atributos de Cookie Implementados

```javascript
Set-Cookie: auth_token=${token}; HttpOnly; Secure; Path=/; Max-Age=604800; SameSite=Strict
```

| Atributo | Valor | Propósito | Protege contra |
|----------|-------|----------|---|
| `auth_token` | JWT firmado | Identifica sesión del usuario | - |
| `HttpOnly` | ✅ | No accesible desde JavaScript | XSS (Cross-Site Scripting) |
| `Secure` | ✅ | Solo transmitida por HTTPS | MITM (Man-in-the-Middle) |
| `Path=/` | ✅ | Disponible en toda la aplicación | Aislamiento de rutas |
| `Max-Age=604800` | 7 días | Expira automáticamente | Tokens eternos |
| `SameSite=Strict` | ✅ | No enviada en peticiones cross-site | CSRF (Cross-Site Request Forgery) |

### Flujo de Protección de Cookie

```
┌──────────────────────────────────────┐
│ XSS Attack: JavaScript intenta leer  │
│ document.cookie                      │
└──────────────────┬───────────────────┘
                   │
            HttpOnly = ✅
                   │
                   ▼
        ❌ Acceso bloqueado
        Error: No puede acceder a cookie
```

```
┌──────────────────────────────────────┐
│ MITM Attack: Atacante intercepta     │
│ tráfico HTTP en red pública          │
└──────────────────┬───────────────────┘
                   │
            Secure = ✅
                   │
                   ▼
        ❌ Cookie no enviada por HTTP
        Solo por HTTPS cifrado
```

---

## Encriptación

### Contraseñas: bcryptjs

**Versión:** `bcryptjs@2.4.3`  
**Rounds:** 12 (recomendado OWASP 2024)

```typescript
import bcrypt from 'bcryptjs';

// Registro: Encriptar password
const password_hash = await bcrypt.hash(userPassword, 12);
// Resultado: $2b$12$...(60 caracteres)

// Login: Verificar password
const isValid = await bcrypt.compare(userPassword, password_hash);
// Retorna: true | false

// Tiempo de procesamiento (por seguridad):
// - 10 rounds: ~10ms
// - 12 rounds: ~100ms (se usa este)
// - 14 rounds: ~1s (demasiado lento)
```

**Por qué bcrypt:**
- ✅ Función de hash one-way (irreversible)
- ✅ Incluye salt aleatorio
- ✅ Resistente a ataques de fuerza bruta (lento por diseño)
- ✅ Factor de trabajo adaptable (más rounds = más lento)
- ✅ Estándar de la industria (OWASP recomendado)

### Tokens: JWT (jsonwebtoken)

**Versión:** `jsonwebtoken@9.1.2`  
**Algoritmo:** HS256 (HMAC con SHA-256)  
**Expiración:** 7 días

```typescript
import jwt from 'jsonwebtoken';

// Generar token
const token = jwt.sign(
  { id: 1, uuid: '...', email: '...', role: 'customer' },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);
// Resultado: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

// Verificar token
const payload = jwt.verify(token, process.env.JWT_SECRET);
// Retorna: { id, uuid, email, role, iat, exp }

// Si token expirado o firma inválida:
// throw new Error('jwt expired' | 'invalid signature')
```

**Estructura del JWT:**
```
Header.Payload.Signature
│       │       │
│       │       └─ HMAC-SHA256(Header.Payload, SECRET)
│       └──────── Base64({ id, email, iat, exp })
└────────────── Base64({ alg: 'HS256', typ: 'JWT' })
```

**Por qué JWT:**
- ✅ Stateless (no requiere sesión en servidor)
- ✅ Autocontenido (incluye datos del usuario)
- ✅ Firmado y verificable
- ✅ Expiración automática
- ✅ Compatible con API REST

---

## Validación

### Validación en Backend

```typescript
// TODOS los endpoints validan:

// 1. Campos requeridos
if (!email || !password) {
  return new Response(
    JSON.stringify({ error: 'Campos requeridos' }),
    { status: 400 }
  );
}

// 2. Tipos de datos
if (typeof email !== 'string' || typeof password !== 'string') {
  return error400();
}

// 3. Longitud
if (password.length < 8) {
  return error400('Password muy corto');
}

// 4. Rangos válidos (ej: ratings 1-5)
if (rating < 1 || rating > 5) {
  return error400('Rating debe ser 1-5');
}

// 5. Valores únicos en BD
const [existing] = await pool.execute(
  'SELECT id FROM customers WHERE email = ?',
  [email]
);
if (existing.length > 0) {
  return error409('Email ya existe');
}
```

### Validación de Entrada (Input Sanitization)

**Técnica: Parameterized Queries**

```typescript
// ✅ SEGURO: Parámetros separados (previene SQL injection)
const [rows] = await pool.execute(
  'SELECT * FROM customers WHERE email = ?',
  [email]  // ← Valor nunca se interpola en query
);

// ❌ INSEGURO: String interpolation (vulnerable)
const query = `SELECT * FROM customers WHERE email = '${email}'`;
// Si email = "' OR '1'='1", retorna todos los registros
```

---

## Protección contra Ataques

### 1. SQL Injection

**Cómo prevenimos:**
- ✅ Todas las queries usan parameterized queries
- ✅ Valores nunca se interpolan en SQL string
- ✅ Driver `mysql2/promise` usa prepared statements

**Ejemplo vulnerable:**
```typescript
// ❌ NUNCA hacer esto:
const query = `SELECT * FROM users WHERE email = '${email}'`;
// Si email = "admin'--", obtiene todos los usuarios
```

**Ejemplo seguro:**
```typescript
// ✅ Siempre usar placeholders:
const [rows] = await pool.execute(
  'SELECT * FROM users WHERE email = ?',
  [email]
);
```

### 2. XSS (Cross-Site Scripting)

**Cómo prevenimos:**
- ✅ Cookies `HttpOnly` (no accesibles desde JS)
- ✅ Vue escapa automáticamente output (v-text, {{ }})
- ✅ Validación backend de entrada

**Ejemplo de protección:**
```vue
<!-- Vue escapa automáticamente -->
<p>{{ userInput }}</p>
<!-- Si userInput = "<img src=x onerror=alert('xss')>" -->
<!-- Se renderiza como texto, no se ejecuta -->

<!-- Output: <img src=x onerror=alert('xss')> -->
```

### 3. CSRF (Cross-Site Request Forgery)

**Cómo prevenimos:**
- ✅ Cookie `SameSite=Strict`
- ✅ Credenciales no se envían en peticiones cross-site
- ✅ Tokens accionables solo desde mismo origen

**Ejemplo de ataque bloqueado:**
```
Atacante crea: <img src="https://rateapp.com/api/coupons" />
Victima carga página maliciosa
Navegador envía petición... ❌ BLOQUEADA
- Cookie no se envía (SameSite=Strict)
- Petición falla sin autenticación
```

### 4. MITM (Man-in-the-Middle)

**Cómo prevenimos:**
- ✅ Cookies `Secure` (solo HTTPS)
- ✅ HTTPS requerido en producción
- ✅ SSL/TLS certificados válidos

**Ejemplo de ataque bloqueado:**
```
Atacante intercepta tráfico HTTP
Trata de robar cookie auth_token... ❌ BLOQUEADA
- Cookie tiene flag Secure
- No se envía por HTTP
- Solo por HTTPS (cifrado)
```

### 5. Brute Force (Fuerza Bruta)

**Cómo prevenimos:**
- ⚠️ SIN implementar todavía (pendiente)
- Recomendación: Rate limiting en `/api/auth/login`

**Próximo paso:**
```typescript
// Implementar: Máximo 5 intentos fallidos por IP por minuto
// Usar: Redis o memoria en caché para registrar intentos
// Acción: Bloquear IP temporalmente tras 5 intentos
```

---

## Variables de Entorno

### Archivo: `.env`

```bash
# ===== BASE DE DATOS =====
DB_HOST=localhost          # Servidor MySQL (localhost en desarrollo)
DB_PORT=3306              # Puerto MySQL estándar
DB_USER=root              # Usuario DB (cambiar en producción)
DB_PASSWORD=              # Password DB (seguro en producción)
DB_NAME=AppBD             # Nombre de la BD

# ===== AUTENTICACIÓN =====
JWT_SECRET=RateApp_Secret_Key_v1_$(uuidgen)_SuperSecure2024  # Cambiar en producción
JWT_EXPIRES_IN=7d         # Expiración del token (7 días)
```

### En Producción

```bash
# ⚠️ NUNCA usar valores de .env.example

# Generar JWT_SECRET seguro:
openssl rand -base64 32
# Salida: a3F9kL2mN4pQ6rS8tU0vW1xY2zA3bC4dE5fG6hI7jJ8kL9

# Usar variables de entorno del servidor:
# - GitHub Actions Secrets
# - AWS Secrets Manager
# - Azure Key Vault
# - Heroku Config Vars
# - Vercel Environment Variables

# NUNCA commitear .env a Git
# .gitignore debe incluir: .env .env.local .env.*.local
```

---

## Auditoría y Monitoreo

### Logs a Registrar

```typescript
// LOGIN EXITOSO
console.log(`[AUTH] User logged in: ${email}, IP: ${ip}, Time: ${timestamp}`);

// LOGIN FALLIDO
console.log(`[SECURITY] Failed login attempt: ${email}, Reason: ${reason}`);

// CAMBIO DE CONTRASEÑA
console.log(`[SECURITY] Password changed: ${userId}, Time: ${timestamp}`);

// CAMBIO DE EMAIL
console.log(`[AUDIT] Email changed: ${userId}, Old: ${oldEmail}, New: ${newEmail}`);

// INTENTO DE ACCESO NO AUTORIZADO
console.log(`[SECURITY] Unauthorized access attempt: ${resource}, User: ${userId}`);

// CANJEO DE CUPÓN
console.log(`[AUDIT] Coupon redeemed: ${couponId}, User: ${userId}, Points: ${points}`);
```

### Monitoreo Recomendado

1. **Intentos fallidos de login:** Alertar si > 5 en 1 minuto desde IP
2. **Cuentas bloqueadas:** Notificar usuario
3. **Cambios en datos críticos:** Email, teléfono, dirección
4. **Canjeos anómalos:** Usuario redime múltiples cupones en corto tiempo
5. **Acceso desde nuevo dispositivo:** Notificar usuario

---

## Checklist de Seguridad

### Desarrollo
- ✅ Usar HTTPS en producción
- ✅ JWT_SECRET es aleatorio y fuerte
- ✅ Passwords encriptados con bcrypt
- ✅ Validación en backend (no solo frontend)
- ✅ Parameterized queries (no SQL injection)
- ✅ HttpOnly cookies (no XSS)
- ✅ Secure cookies (no MITM)
- ✅ SameSite=Strict (no CSRF)
- ⚠️ Rate limiting en auth endpoints
- ⚠️ Logs de auditoría

### Deployment
- [ ] Certificado SSL/TLS válido
- [ ] HTTPS redirigido desde HTTP
- [ ] JWT_SECRET desde secrets manager (no hardcoded)
- [ ] DB credentials desde secrets manager
- [ ] Backups regulares de BD
- [ ] Logs centralizados (ELK, Datadog, etc.)
- [ ] Monitoreo de seguridad activo

### Post-Deployment
- [ ] Pruebas de penetración
- [ ] Escaneo de vulnerabilidades (OWASP ZAP)
- [ ] Auditoría de código de seguridad
- [ ] Revisión de permisos BD
- [ ] Política de rotación de secrets

---

## Referencias

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [RFC 6265 - HTTP State Management](https://tools.ietf.org/html/rfc6265)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8949)
- [bcryptjs Documentation](https://www.npmjs.com/package/bcryptjs)
- [MySQL Security](https://dev.mysql.com/doc/refman/8.0/en/security.html)

---

## Contacto de Seguridad

Si encontras una vulnerabilidad:
1. **NO** crear issue público
2. Enviar correo a security@rateapp.com
3. Incluir descripción detallada y pasos para reproducir
4. Permitir 48 horas para respuesta

Agradecemos tu ayuda en mantener RateApp seguro.
