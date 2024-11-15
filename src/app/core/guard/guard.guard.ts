import { inject, Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class guardGuard implements CanActivate {
  private router = inject(Router);
  private authService = inject(AuthServiceService);

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const token = this.authService.getToken();

    if (token) {
      return true;
    } else {
      this.router.navigate(['/sign-in']);
      return false;
      
    }
  }
}
