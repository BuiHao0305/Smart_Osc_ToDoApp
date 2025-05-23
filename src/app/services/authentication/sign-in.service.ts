import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environments } from 'src/app/core/environments/environment';
import {
  SignIn,
  SignInResponse,
  User,
} from 'src/app/core/store/type/auth.type';

@Injectable({
  providedIn: 'root',
})
export class SignInServiceService {
  private userInfo: User | null = null;
  constructor(private http: HttpClient) {}

  login(loginData: SignIn): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(
      `${environments.API_URL}/${environments.ENDPOINT_METHOD.LOGIN}`,
      loginData
    );
  }
  getUserInfo(): Observable<User> {
    if (this.userInfo) {
      return of(this.userInfo);
    }
    return this.http.get<User>(
      `${environments.API_URL}/${environments.ENDPOINT_METHOD.GET_USER_INFOR}`
    );
  }
}
