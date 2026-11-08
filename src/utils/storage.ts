import { HomeBooking, MutabaahItem, GamificationProfile, SecurityState } from '../types';

const STORAGE_KEYS = {
  BOOKINGS: 'mualafcity_bookings_v1',
  MUTABAAH: 'mualafcity_mutabaah_v1',
  GAMIFICATION: 'mualafcity_gamification_v1',
  SECURITY: 'mualafcity_security_v1',
  FORUM_POSTS: 'mualafcity_forum_posts_v1',
  LANG: 'mualafcity_lang_v1',
  THEME: 'mualafcity_theme_v1',
  NOTIFICATIONS: 'mualafcity_notifications_v1',
};

export const defaultSecurityState: SecurityState = {
  twoFactorEnabled: true,
  cloudBackupProvider: 'Google Drive',
  autoSyncEnabled: true,
  lastBackupDate: new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }),
  isEncrypted: true,
  offlineMode: false,
};

export function loadStoredData<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error('Error loading stored key', key, e);
    return fallback;
  }
}

export function saveStoredData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving stored key', key, e);
  }
}

export { STORAGE_KEYS };
