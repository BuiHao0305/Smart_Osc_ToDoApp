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
    }
  }
  getToken(): string | null {
    const token = this.isBrowser()
      ? localStorage.getItem('access_token')
      : null;
    return token;
  }

  clearToken(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('access_token');
      this.currentToken = null;
    }
  }

  saveUser(emai: string): void {
    if (this.isBrowser()) {
      sessionStorage.setItem('user', emai);
      console.log('user', emai);
    }
  }
  getUser() {
    if (this.isBrowser()) {
      sessionStorage.getItem('user');
    }
  }
  remoteUser() {
    if (this.isBrowser()) {
      sessionStorage.removeItem('email');
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

    try {
      const payload = JSON.parse(atob(parts[1])); // Decode phần payload của token
      const exp = payload.exp; // Hạn sử dụng của token (nếu có)
      if (exp && Date.now() >= exp * 1000) {
        // Kiểm tra nếu token đã hết hạn
        return false;
      }
    } catch (error) {
      console.error('Invalid token payload', error);
      return false;
    }

    return true;
  }
  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }
}
