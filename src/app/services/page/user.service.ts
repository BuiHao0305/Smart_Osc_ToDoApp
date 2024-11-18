import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/app/core/environments/environment';
import { User } from 'src/app/core/store/type/auth.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environments.API_URL}/${environments.ENDPOINT_METHOD.UPDATE}`;

  constructor(private http: HttpClient) {}
  
  updateUser(formData: FormData): Observable<any> {
    const url = `${environments.API_URL}/${environments.ENDPOINT_METHOD.UPDATE}`;
    return this.http.put(url, formData);
  }
}
