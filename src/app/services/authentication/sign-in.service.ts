import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from 'src/app/core/environments/environment';
import {
  SignIn,
  SignInResponse,
  User,
} from 'src/app/core/store/type/auth.type';
import { AuthServiceService } from '../auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class SignInServiceService {
  constructor(
    private http: HttpClient,
    private authService: AuthServiceService
  ) {}

  login(loginData: SignIn): Observable<SignInResponse> {
    console.log(loginData);
    return this.http.post<SignInResponse>(
      `${environments.API_URL}/${environments.ENDPOINT_METHOD.LOGIN}`,
      loginData
    );
  }
  getUserInfo(): Observable<User> {
    const token = this.authService.getToken();
    console.log(token);
    
    if (!token) {
      throw new Error('Token not available');
    }
    const params = new HttpParams().set('access_token', token); 
    return this.http.get<User>(
      `${environments.API_URL}/${environments.ENDPOINT_METHOD.GET_USER_INFOR}`,
      { params }
    );
  }
}
