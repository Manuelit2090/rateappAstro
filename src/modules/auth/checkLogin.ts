import type { User } from '../../data/user';
import { localUsers } from '../../data/localUsers';

export async function checkLogin(email: string, password: string): Promise<User | null> {
  const normalizedEmail = email.trim().toLowerCase();
  const user = localUsers.find(
    (item) => item.email.toLowerCase() === normalizedEmail && item.password === password
  );
  return user ?? null;
}
