import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/app/core/environments/environment';
import { AuthServiceService } from '../auth-service.service';

@Injectable(
)
export class PaginationService {
  private apiUrl = `${environments.API_URL}/${environments.ENDPOINT_METHOD.BUCKET}`;

  constructor(private http: HttpClient, private authService: AuthServiceService) {}

  // getPaginatedData(
  //   page: number = 1,
  //   limit: number = 99,
  // ): Observable<any> {
  //   const params = new HttpParams()
  //     .set('page', page)
  //     .set('limit', limit)
  //   return this.http.get(`${this.apiUrl}`, { params });
  // }
  getPaginatedData(
    page: number = 1,
    limit: number = 99,
  ): Observable<any> {
    const token = this.authService.getToken(); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get(`${this.apiUrl}`, { headers, params });  
  }
}
