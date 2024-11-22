import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/app/core/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) {}
  
  updateUser(formData: FormData): Observable<string> {
    const url = `${environments.API_URL}/${environments.ENDPOINT_METHOD.UPDATE}`;
    return this.http.put<string>(url, formData);
  }
}
