import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { NavController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { environment } from '@env/environment';
import { AppStorage } from '@core/native/app-storage';
import type { LoginRequest, RefreshResponse, SessionResponse, User } from './auth.models';

const API = {
  login: `${environment.apiUrl}/auth/login`,
  refresh: `${environment.apiUrl}/auth/refresh`,
  me: `${environment.apiUrl}/me`,
} as const;

@Injectable({ providedIn: 'root' })
export class Auth {
  private readonly http = inject(HttpClient);
  private readonly storage = inject(AppStorage);
  private readonly nav = inject(NavController);

  private readonly _token = signal<string | null>(null);
  private readonly _user = signal<User | null>(null);
  /** Bir vaqtda kelgan 401 lar uchun bitta refresh so'rovi */
  private refreshing: Promise<string | null> | null = null;

  readonly token = this._token.asReadonly();
  readonly user = this._user.asReadonly();
  readonly isAuthed = computed(() => this._token() !== null);

  async restore(): Promise<void> {
    const [token, user] = await Promise.all([this.storage.get('token'), this.storage.getJson<User>('user')]);
    this._token.set(token);
    this._user.set(user);
  }

  async login(req: LoginRequest): Promise<void> {
    const res = await firstValueFrom(this.http.post<SessionResponse>(API.login, req));
    await this.setSession(res);
  }

  async refreshMe(): Promise<void> {
    const user = await firstValueFrom(this.http.get<User>(API.me));
    this._user.set(user);
    await this.storage.setJson('user', user);
  }

  refresh(): Promise<string | null> {
    this.refreshing ??= this.doRefresh().finally(() => (this.refreshing = null));
    return this.refreshing;
  }

  async logout(): Promise<void> {
    this._token.set(null);
    this._user.set(null);
    await Promise.all([this.storage.remove('token'), this.storage.remove('refresh'), this.storage.remove('user')]);
    await this.nav.navigateRoot('/login', { replaceUrl: true });
  }

  isRefreshUrl(url: string): boolean {
    return url === API.refresh;
  }

  private async doRefresh(): Promise<string | null> {
    const refreshToken = await this.storage.get('refresh');
    if (!refreshToken) {
      await this.logout();
      return null;
    }
    try {
      const res = await firstValueFrom(this.http.post<RefreshResponse>(API.refresh, { refresh_token: refreshToken }));
      await this.setTokens(res.access_token, res.refresh_token);
      return res.access_token;
    } catch {
      await this.logout();
      return null;
    }
  }

  private async setSession({ access_token, refresh_token, user }: SessionResponse): Promise<void> {
    this._user.set(user);
    await Promise.all([this.setTokens(access_token, refresh_token), this.storage.setJson('user', user)]);
  }

  private async setTokens(access: string, refresh: string): Promise<void> {
    this._token.set(access);
    await Promise.all([this.storage.set('token', access), this.storage.set('refresh', refresh)]);
  }
}
