import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, switchMap, shareReplay } from 'rxjs/operators';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenInterceptor implements HttpInterceptor {
  private refreshTokenSubject: Subject<string> | null = null; 

  constructor(private authService: AuthServiceService) { }

  intercept(request: HttpRequest<object>, next: HttpHandler): Observable<HttpEvent<object>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (this.isTokenRefreshNeeded(error)) {
          return this.handle401Error(request, next);
        }
        return throwError(error);
      })
    );
  }

  private isTokenRefreshNeeded(error: HttpErrorResponse): boolean {
    return error.status === 401;
  }

  private handle401Error(request: HttpRequest<object>, next: HttpHandler): Observable<HttpEvent<object>> {
    if (!this.refreshTokenSubject) {
      this.refreshTokenSubject = new Subject<string>();

      return this.authService.refreshToken().pipe(
        switchMap((newToken: string) => {
          if (this.refreshTokenSubject) {
            this.refreshTokenSubject.next(newToken);
            this.refreshTokenSubject.complete(); 
          }
          this.refreshTokenSubject = null;

          const clonedRequest = request.clone({
            headers: request.headers.set('Authorization', 'Bearer ' + newToken)
          });
          return next.handle(clonedRequest);
        }),
        catchError((refreshError: HttpErrorResponse) => {
          this.refreshTokenSubject = null; // Reset subject khi có lỗi
          return throwError(refreshError);
        }),
        shareReplay(1) // Chia sẻ kết quả cho tất cả các subscriber
      );
    } else {
      return this.refreshTokenSubject.pipe(
        switchMap((newToken: string) => {
          const clonedRequest = request.clone({
            headers: request.headers.set('Authorization', 'Bearer ' + newToken)
          });
          return next.handle(clonedRequest);
        })
      );
    }
  }
}
