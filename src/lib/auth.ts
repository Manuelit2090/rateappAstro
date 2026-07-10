/**
 * @file auth.ts
 * @description Funciones de autenticación: encriptación de contraseñas con bcrypt y gestión de tokens JWT.
 * @dependencies bcryptjs, jsonwebtoken
 */

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET = import.meta.env.JWT_SECRET;

/**
 * Tipos de payload válidos para JWT
 */
type TokenPayload = {
  id: number;
  email: string;
  role: 'customer' | 'owner';
};

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
 * Acepta hashes bcrypt y contraseñas antiguas almacenadas en texto plano.
 * @param password - Contraseña en texto plano a verificar
 * @param hash - Valor almacenado en la base de datos
 * @returns Promise que resuelve a true si coinciden, false si no
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  if (!hash) {
    return false;
  }

  if (hash.startsWith('$2')) {
    return bcrypt.compare(password, hash);
  }

  return password === hash;
}

/**
 * Genera un token JWT con expiración de 7 días.
 * @param payload - Objeto con datos del usuario (id, email, role)
 * @returns String con el token JWT firmado
 */
export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' });
}

/**
 * Verifica y decodifica un token JWT.
 * @param token - Token JWT a verificar
 * @returns Payload decodificado si es válido, null si no
 */
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET) as { id: number; email: string; role: string; };
  } catch {
    return null;
  }
}