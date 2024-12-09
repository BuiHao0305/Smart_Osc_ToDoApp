import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';

import { AuthServiceService } from 'src/app/services/auth-service.service';
import { SignInServiceService } from 'src/app/services/authentication/sign-in.service';

@Injectable({
  providedIn: 'root',
})
export class guardGuard implements CanActivate {
  private router = inject(Router);
  private authService = inject(AuthServiceService);
  private signinService = inject(SignInServiceService);
  private isBrowser(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof window.localStorage !== 'undefined'
    );
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    if (!this.isBrowser()) {
      return of(false);
    }

    const token = localStorage.getItem('access_token');

    if (!token || !this.authService.isTokenValid(token)) {
      const redirectUrl = state.url;
      localStorage.setItem('redirectUrl', redirectUrl);

      this.authService.clearToken();
      this.router.navigate(['/sign-in']);
      return of(false);
    }

    return this.signinService.getUserInfo().pipe(
      map(() => true),
      catchError(() => {
        const redirectUrl = state.url;
        localStorage.setItem('redirectUrl', redirectUrl);

        this.router.navigate(['/sign-in']);
        return of(false);
      })
    );
  }
}
