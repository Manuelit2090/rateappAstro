import { reactive } from 'vue';
import type { User } from '../data/user';

export type SessionUser = Omit<User, 'password'>;

export const dataUser = reactive<{ user: SessionUser | null }>({
  user: null
});

export function setDataUser(user: User | SessionUser) {
  let session: SessionUser;
  
  if ('password' in user) {
    const { password, ...rest } = user;
    session = rest;
  } else {
    session = user;
  }
  
  dataUser.user = session;
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('rateapp-user', JSON.stringify(session));
  }
}

export function loadDataUserFromStorage() {
  if (typeof window === 'undefined') return;
  const stored = window.localStorage.getItem('rateapp-user');
  if (stored) {
    dataUser.user = JSON.parse(stored);
  }
}

export function logoutUser() {
  dataUser.user = null;
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem('rateapp-user');
  }
}

