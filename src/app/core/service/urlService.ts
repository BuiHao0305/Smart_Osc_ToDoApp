import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  private queryParamsSubject = new BehaviorSubject<any>({});
  public queryParams$ = this.queryParamsSubject.asObservable();

  constructor(private router: Router, private route: ActivatedRoute) {}

  loadQueryParams(): void {
    const queryParams = this.route.snapshot.queryParams;
    console.log('Loaded Query Params:', queryParams); 
    this.queryParamsSubject.next(queryParams);
  }


  updateQueryParams(params: any): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
    });
  }
  getQueryParams(): any {
    return this.queryParamsSubject.value;
  }
}
