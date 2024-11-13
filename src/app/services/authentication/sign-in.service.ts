import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environments } from 'src/app/core/environments/environment';
import { SignIn, SignInResponse } from 'src/app/core/store/type/auth.type';

@Injectable({
  providedIn: 'root',
})
export class SignInServiceService { // Giữ nguyên tên này
  constructor(private http: HttpClient) {}

  login(loginData: SignIn): Observable<SignInResponse> {
    const url = `${environments.API_URL}/${environments.ENDPOINT_METHOD.LOGIN}`;
    return this.http.post<SignInResponse>(url, loginData);
  }
}
