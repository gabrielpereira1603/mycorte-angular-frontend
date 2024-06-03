import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionClientService {
  private readonly TOKEN_KEY = 'token';
  private readonly CLIENT_KEY = 'user';

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setClient(user: any): void {
    localStorage.setItem(this.CLIENT_KEY, JSON.stringify(user));
  }

  getClient(): any {
    const user = localStorage.getItem(this.CLIENT_KEY);
    return user ? JSON.parse(user) : null;
  }

  clear(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.CLIENT_KEY);
  }
}
