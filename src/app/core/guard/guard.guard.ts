import { inject, Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot,} from '@angular/router';
import { Observable, of } from 'rxjs';

import { AuthServiceService } from 'src/app/services/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class guardGuard implements CanActivate {
  private router = inject(Router);
  private authService = inject(AuthServiceService);

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const token = this.authService.getToken();

    if (state.url === '/sign-in') {
      return of(true); 
    }
    if (!token || !this.authService.isTokenValid(token)) {
      return of(false);
    }

    return of(true);
  }
}