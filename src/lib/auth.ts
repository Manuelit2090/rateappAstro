import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET = import.meta.env.JWT_SECRET;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(payload: { id: number; uuid: string; email: string; role: 'customer' | 'owner'; }): string {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET) as { id: number; uuid: string; email: string; role: string; };
  } catch {
    return null;
  }
}