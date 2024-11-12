import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private http: HttpClient) {}

  saveToken(access_token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem('access_token', access_token);
    }
  }
  getToken(): string | null {
    return this.isBrowser() ? localStorage.getItem('access_token') : null;
  }
  clearToken(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('access_token');
      console.log('Token cleared');
    }
  }

  refreshToken(): Observable<string> {
    return this.http.post<string>('your-refresh-token-endpoint', {});
  }
  private isBrowser(): boolean {
    return typeof window !== 'undefined';
  }
}
