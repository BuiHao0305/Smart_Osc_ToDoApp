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

  getPaginatedData(
    page: number = 1,
    limit: number = 99,
    query: string = ''  
  ): Observable<any> {
   
    
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
  
    if (query) {
      // Gán lại params khi có giá trị query
      params = params.set('query', query);
    }  
  
    return this.http.get(`${this.apiUrl}`, {params });  
  }
}  
