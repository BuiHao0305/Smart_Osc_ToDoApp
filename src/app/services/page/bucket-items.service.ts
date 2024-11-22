import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/app/core/environments/environment';
import { Observable } from 'rxjs';
import {
  BucketItem,
  BucketItemsResponse,
} from 'src/app/core/store/interface/bucket-items.interface';

@Injectable()
export class BucketItemsService {
  private apiUrl = `${environments.API_URL}/${environments.ENDPOINT_METHOD.BUCKET}`;

  constructor(private http: HttpClient) {}
  getContentItems(
    bucketId: number,
    page = 1,
    limit = 99,
    query = '',
    done: string | null = null
  ): Observable<BucketItemsResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
  
    if (query) {
      params = params.set('query', query); 
    }
    if (done !== null && done !== '') {
      params = params.set('done', done); 
    }
  
    const url = `${this.apiUrl}/${bucketId}/items`;
    return this.http.get<BucketItemsResponse>(url, { params });
  }
  addContentItems(
    bucketId: number,
    contentData: { content: string }
  ): Observable<BucketItem> {
    const url = `${this.apiUrl}/${bucketId}/items`;

    return this.http.post<BucketItem>(url, contentData);
  }

  updateItem(
    bucketId: number,
    itemId: number,
    data: { content: string; done: boolean }
  ): Observable<string> {
    const url = `${this.apiUrl}/${bucketId}/items/${itemId}`;
    return this.http.patch<string>(url, data);
  }
  deleteItem(bucketId: number, itemId: number): Observable<string> {
    const url = `${this.apiUrl}/${bucketId}/items/${itemId}`;
    return this.http.delete<string>(url);
  }
}
