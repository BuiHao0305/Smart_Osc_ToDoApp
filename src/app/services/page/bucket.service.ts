import { Injectable } from '@angular/core';
import { environments } from 'src/app/core/environments/environment';
import { AuthServiceService } from '../auth-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BucketService {
  private apiUrl = `${environments.API_URL}/${environments.ENDPOINT_METHOD.BUCKET}`;

  constructor(
    private http: HttpClient,
    private authService: AuthServiceService
  ) {}
  addBucket(bucketData: { title: string; public: boolean }): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.apiUrl, bucketData, { headers });
  }
  getBucketById(bucketId: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/${bucketId}`, { headers });
  }
  updateBucket(bucketId: number, bucketData: { title: string; public: boolean }): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.patch(`${this.apiUrl}/${bucketId}`, bucketData, { headers });
  }
  deleteBucket(bucketId: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete(`${this.apiUrl}/${bucketId}`, { headers });
  }
}
