import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

/** Saqlanadigan barcha kalitlar shu yerda — tasodifiy string kalitlarning oldini oladi */
export type StorageKey = 'token' | 'refresh' | 'user' | 'lang';

@Injectable({ providedIn: 'root' })
export class AppStorage {
  async get(key: StorageKey): Promise<string | null> {
    const { value } = await Preferences.get({ key });
    return value;
  }

  set(key: StorageKey, value: string): Promise<void> {
    return Preferences.set({ key, value });
  }

  remove(key: StorageKey): Promise<void> {
    return Preferences.remove({ key });
  }

  async getJson<T>(key: StorageKey): Promise<T | null> {
    const raw = await this.get(key);
    if (raw === null) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      await this.remove(key);
      return null;
    }
  }

  setJson(key: StorageKey, value: unknown): Promise<void> {
    return this.set(key, JSON.stringify(value));
  }
}
