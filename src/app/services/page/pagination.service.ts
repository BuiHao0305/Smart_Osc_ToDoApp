import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/app/core/environments/environment';
import { AuthServiceService } from '../auth-service.service';
import { ListBucketResponse } from 'src/app/core/store/interface/bucket.interface';

@Injectable()
export class PaginationService {
  private apiUrl = `${environments.API_URL}/${environments.ENDPOINT_METHOD.BUCKET}`;

  constructor(
    private http: HttpClient,
  ) {}

  getPaginatedData(page = 1, limit = 99, query = ''): Observable<ListBucketResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (query) {
      params = params.set('query', query);
    }

    return this.http.get<ListBucketResponse>(`${this.apiUrl}`, { params });
  }
}
