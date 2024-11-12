import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import {
  LoginResponse,
  UnauthorizedResponse,
  ValidationErrorResponse,
} from 'src/app/core/store/interface/auth.interface';
import { environments } from 'src/app/core/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignInServiceService {
  constructor(private http: HttpClient) {}

  login(loginData: {
    email: string;
    password: string;
  }): Observable<
    LoginResponse | ValidationErrorResponse | UnauthorizedResponse
  > {
    const url = `${environments.API_URL}/${environments.ENDPOINT_METHOD.LOGIN}`;

    return this.http
      .post<LoginResponse | ValidationErrorResponse | UnauthorizedResponse>(
        url,
        loginData
      )
      .pipe();
  }
}
