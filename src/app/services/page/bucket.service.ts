import { Injectable } from '@angular/core';
import { environments } from 'src/app/core/environments/environment';
import { AuthServiceService } from '../auth-service.service';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListBucket } from 'src/app/core/store/interface/bucket.interface';





@Injectable()
export class BucketService {
  private apiUrl = `${environments.API_URL}/${environments.ENDPOINT_METHOD.BUCKET}`;

  constructor(
    private http: HttpClient,
    private authService: AuthServiceService
  ) {}
  addBucket(bucketData: { title: string; public: boolean }): Observable<string> {
    return this.http.post<string>(this.apiUrl, bucketData);
  }
  getBucketById(bucketId: number): Observable<{ data: ListBucket }> {
    return this.http.get<{ data: ListBucket }>(`${this.apiUrl}/${bucketId}`);
  }
  updateBucket(
    bucketId: number,
    bucketData: { title: string; public: boolean }
  ): Observable<string> {
    return this.http.patch<string>(`${this.apiUrl}/${bucketId}`, bucketData);
  }
  deleteBucket(bucketId: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${bucketId}`);
  }
}
