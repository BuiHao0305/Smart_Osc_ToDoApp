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
  getContentItems(
    bucketId: number,
    page: number = 1,
    limit: number = 99
  ): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    const url = `${this.apiUrl}/${bucketId}/items`;
    return this.http.get(url, { headers, params });
  }
  addContentItems(
    bucketId: number,
    contentData: { content: string }
  ): Observable<any> {
    const token = this.authService.getToken();
    const url = `${this.apiUrl}/${bucketId}/items`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(url, contentData, { headers });
  }

  updateItem(
    bucketId: number,
    itemId: number,
    data: { content: string; done: boolean }
  ): Observable<any> {
    const token = this.authService.getToken();
    const url = `${this.apiUrl}/${bucketId}/items/${itemId}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch(url, data, { headers });
  }
  deleteItem(bucketId: number, itemId: number): Observable<any> {
    const token = this.authService.getToken();
    const url = `${this.apiUrl}/${bucketId}/items/${itemId}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(url, { headers });
  }
}
