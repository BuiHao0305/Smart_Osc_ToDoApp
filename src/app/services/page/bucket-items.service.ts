import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/app/core/environments/environment';
import { AuthServiceService } from '../auth-service.service';
import { Observable } from 'rxjs';

@Injectable()
export class BucketItemsService {
  private apiUrl = `${environments.API_URL}/${environments.ENDPOINT_METHOD.BUCKET}`;

  constructor(
    private http: HttpClient,
    private authService: AuthServiceService
  ) {}
  getBucketItems(
    bucketId: number,
    page: number = 1,
    limit: number = 10
  ): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    const url = `${this.apiUrl}/${bucketId}/items`;
    return this.http.get(url, { headers, params });
  }
}
