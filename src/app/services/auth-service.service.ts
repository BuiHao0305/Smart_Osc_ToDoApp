import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private currentToken: string | null = null;

  constructor(private http: HttpClient) {
    this.restoreTokenFromStorage();
  }

  saveToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem('access_token', token);
      this.currentToken = token;
      console.log(token);
    }
  }
  getToken(): string | null {
    return this.isBrowser() ? localStorage.getItem('access_token') : null;

  }

  clearToken(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('access_token');
      this.currentToken = null;
      console.log('Token cleared');
    }
  }

  restoreTokenFromStorage(): void {
    this.currentToken = this.getToken();
  }

  isTokenMatched(): boolean {
    const storedToken = this.getToken();
    return storedToken === this.currentToken;
  }

  refreshToken(): Observable<string> {
    return this.http.post<string>('', {}).pipe(
      tap((newToken) => {
        this.saveToken(newToken);
      })
    );
  }

  isTokenValid(token: string | null): boolean {
    if (!token) {
      return false;
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
      return false;
    }
    const header = parts[0];
    const payload = parts[1];
    const signature = parts[2];
    
    if (!header || !payload || !signature) {
      return false;
    }
    return true;
  }
  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }
}
