import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { authActions } from '../store/auth/auth.action';
import { Store } from '@ngrx/store';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class AuthTokenInterceptor implements HttpInterceptor {
  private authService = inject(AuthServiceService);
  private router = inject(Router);
  private snackbar = inject(SnackbarService);
  private store = inject(Store);

  intercept(
    request: HttpRequest<object>,
    next: HttpHandler
  ): Observable<HttpEvent<object>> {
    const token = this.authService.getToken();

    if (token && !this.authService.isTokenValid(token)) {
      this.handleInvalidToken();
      return throwError(() => new Error('Token không hợp lệ'));
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          const currentUrl = this.router.url;
          localStorage.setItem('redirectUrl', currentUrl);

          this.handleInvalidToken();
        }
        return throwError(() => error);
      })
    );
  }

  private handleInvalidToken(): void {
    this.authService.clearToken();
    this.store.dispatch(authActions.logOut());
    this.router.navigate(['/sign-in']);
    this.snackbar.show('Token không hợp lệ hoặc đã hết hạn');
  }
}
