import type { StudentProfile } from '../types/index.ts';

const STORAGE_KEY = 'placement360_user_profile';
const AUTH_KEY = 'placement360_auth_user';

export interface AuthUser {
  uid: string;
  name: string;
  email: string;
  isDemo?: boolean;
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user: AuthUser | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (user) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  } catch (err) {
    console.error('Failed to set stored user:', err);
  }
}

export function getStoredProfile(userId: string): StudentProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY}_${userId}`);
    if (raw) {
      return JSON.parse(raw);
    }
    return null;
  } catch (err) {
    console.error('Failed to get stored profile:', err);
    return null;
  }
}

export function saveStoredProfile(userId: string, profile: StudentProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${STORAGE_KEY}_${userId}`, JSON.stringify(profile));
  } catch (err) {
    console.error('Failed to save stored profile:', err);
  }
}

export function clearAllStorage(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(AUTH_KEY);
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith(STORAGE_KEY) || key.startsWith('placement360_'))) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
  } catch (err) {
    console.error('Failed to clear storage:', err);
  }
}

