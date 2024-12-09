import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Observable } from 'rxjs';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  private authService = inject(AuthServiceService);
  intercept(
    request: HttpRequest<object>,
    next: HttpHandler
  ): Observable<HttpEvent<object>> {
    const token = this.authService.getToken();
    let clonedRequest = request;
    if (token) {
      clonedRequest = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token),
      });
    }
    return next.handle(clonedRequest);
  }
}
