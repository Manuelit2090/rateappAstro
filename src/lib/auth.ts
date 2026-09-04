/**
 * @file auth.ts
 * @description Funciones de autenticación: encriptación de contraseñas con bcrypt y gestión de tokens JWT.
 * @dependencies bcryptjs, jsonwebtoken
 */

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET =
  typeof import.meta.env.JWT_SECRET === 'string' && import.meta.env.JWT_SECRET.length > 0
    ? import.meta.env.JWT_SECRET
    : 'rateapp-development-secret-change-me';

export type UserSystem = 'CLIENT' | 'RESTAURANT' | 'ADMIN';

/**
 * Tipos de payload válidos para JWT.
 * Mantiene compatibilidad con el modelo anterior `role` y el modelo nuevo `sys`.
 */
type TokenPayload = {
  id: number;
  email: string;
  sys?: UserSystem;
  restaurant_id?: number | null;
  role?: 'customer' | 'owner' | UserSystem;
};

function normalizeUserSystem(role?: string | null): UserSystem {
  switch (role) {
    case 'RESTAURANT':
    case 'owner':
      return 'RESTAURANT';
    case 'ADMIN':
      return 'ADMIN';
    case 'CLIENT':
    case 'customer':
    default:
      return 'CLIENT';
  }
}

/**
 * Encripta una contraseña usando bcrypt con 12 rondas de salt.
 * @param password - Contraseña en texto plano
 * @returns Promise que resuelve con el hash encriptado
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

/**
 * Verifica que una contraseña coincida con el valor almacenado.
 * Acepta únicamente hashes bcrypt almacenados en la base de datos.
 * @param password - Contraseña en texto plano a verificar
 * @param hash - Valor almacenado en la base de datos
 * @returns Promise que resuelve a true si coinciden, false si no
 */
export async function verifyPassword(password: unknown, hash: unknown): Promise<boolean> {
  if (typeof password !== 'string' || typeof hash !== 'string' || !hash) {
    return false;
  }

  return hash.startsWith('$2') && bcrypt.compare(password, hash);
}

/**
 * Genera un token JWT con expiración de 7 días.
 * @param payload - Objeto con datos del usuario (id, email, sys, restaurant_id)
 * @returns String con el token JWT firmado
 */
export function buildAuthCookie(token: string): string {
  const secureFlag = import.meta.env.PROD ? '; Secure' : '';
  return `auth_token=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax${secureFlag}`;
}

export function generateToken(payload: TokenPayload): string {
  const normalizedSystem = normalizeUserSystem(payload.sys ?? payload.role);

  return jwt.sign(
    {
      ...payload,
      sys: normalizedSystem,
      role: normalizedSystem,
    },
    SECRET,
    { expiresIn: '7d' }
  );
}

/**
 * Verifica y decodifica un token JWT.
 * @param token - Token JWT a verificar
 * @returns Payload decodificado si es válido, null si no
 */
export function verifyToken(token: string): {
  id: number;
  email: string;
  sys: UserSystem;
  restaurant_id: number | null;
  role?: string;
} | null {
  try {
    const decoded = jwt.verify(token, SECRET) as any;

    if (!decoded || typeof decoded !== 'object') {
      return null;
    }

    const id = Number(decoded.id);
    const email = typeof decoded.email === 'string' ? decoded.email : '';
    if (!Number.isFinite(id) || !email) {
      return null;
    }

    return {
      id,
      email,
      sys: normalizeUserSystem(decoded.sys ?? decoded.role),
      restaurant_id: decoded.restaurant_id ?? null,
      role: decoded.role ?? decoded.sys ?? 'CLIENT',
    };
  } catch {
    return null;
  }
}