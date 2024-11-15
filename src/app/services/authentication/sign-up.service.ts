import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/app/core/environments/environment';
import { SignUp, SignUpResponse } from 'src/app/core/store/type/auth.type';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  constructor(private http: HttpClient) {}

  signUp(signData: SignUp): Observable<SignUpResponse> {
    // const url = `${environments.API_URL}/${environments.ENDPOINT_METHOD.REGISTER}`;
    return this.http.post<SignUpResponse>(
      `${environments.API_URL}/${environments.ENDPOINT_METHOD.REGISTER}`,
      signData
    );
  }
}
