import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/app/core/environments/environment';
import { User } from 'src/app/core/store/type/auth.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  updateUser(formData: FormData): Observable<User> {
    const url = `${environments.API_URL}/${environments.ENDPOINT_METHOD.UPDATE}`;
    return this.http.put<User>(url, formData);
  }
}
