import { Component, OnInit, ViewChild } from '@angular/core';
import { PaginationService } from 'src/app/services/page/pagination.service';
import { AddBucketComponent } from '../../../shared/component/add-bucket/add-bucket.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, switchMap } from 'rxjs';
import { ListBucket } from 'src/app/core/store/interface/bucket.interface';
import { TranslateModule } from '@ngx-translate/core';
import { RelativeTimePipe } from 'src/app/shared/pipe/relative-time.pipe';
import { UpdateBacketComponent } from '../../../shared/component/update-backet/update-backet.component';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { UrlService } from 'src/app/core/service/urlService';
import { CustomButtonComponent } from '../../../shared/component/custom-button/custom-button.component';

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.scss'],
  standalone: true,
  imports: [
    AddBucketComponent,
    ReactiveFormsModule,
    MatPaginator,
    RouterModule,
    FormsModule,
    MatInputModule,
    TranslateModule,
    RelativeTimePipe,
    UpdateBacketComponent,
    CustomButtonComponent,
  ],
  providers: [PaginationService],
})
export class BucketComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchControl = new FormControl('');
  showChild = false;
  showChildUpdate = false;
  selectedBucketId!: number;
  listBucket: ListBucket[] = [];
  totalItems = 0;
  pageSize = 10;
  pageIndex = 0;
  loading = false;

  constructor(
    private paginationService: PaginationService,
    private router: Router,
    private snackBar: SnackbarService,
    private route: ActivatedRoute,
    private urlService: UrlService
  ) {}
  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParams;
    const page = queryParams['page'] || '1';
    const pageSize = 10;
    const searchQuery = queryParams['searchQuery'] || '';

    this.pageIndex = Number(page) - 1;
    this.pageSize = Number(pageSize);

    if (this.paginator) {
      this.paginator.pageIndex = this.pageIndex;
      this.paginator.pageSize = this.pageSize;
    }
    this.loadBuckets(Number(page), this.pageSize, searchQuery);
    this.searchControl.setValue(searchQuery);
    // this.urlService.loadQueryParams();
    this.searchQueryControl();
  }

  toggleChild() {
    this.showChild = !this.showChild;
  }

  showChildClick(value: boolean) {
    this.showChild = value;
    if (!value) {
      this.loadBuckets(1, this.pageSize, '');
    }
  }

  toggleChildUpdateBucket() {
    this.showChildUpdate = !this.showChildUpdate;
  }

  showChildClickUpdateBucket(value: boolean) {
    this.showChildUpdate = value;
  }

  private loadBuckets(page: number, limit: number, searchQuery: string): void {
    this.loading = true;
    this.paginationService
      .getPaginatedData(page, limit, searchQuery)
      .subscribe((response) => {
        this.listBucket = response.data;
        this.totalItems = response.total;
        this.loading = false;
      });
  }

  onPageEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    const page = this.pageIndex + 1;
    const query = this.searchControl.value || '';

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page, searchQuery: query },
      queryParamsHandling: 'merge',
    });

    this.loadBuckets(page, this.pageSize, query);
  }

  onBucketClick(bucketId: number): void {
    console.log('Selected Bucket ID:', bucketId);
    this.selectedBucketId = bucketId;
  }

  onBucketItemsClick(bucketId: number): void {
    this.router.navigate([`layout/bucket-items/${bucketId}`]);
  }

  searchQueryControl(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        switchMap((query) => {
          const searchQuery = query?.trim() || '';
          this.pageIndex = 0;
          if (this.paginator) {
            this.paginator.pageIndex = 0;
          }

          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { searchQuery },
            queryParamsHandling: 'merge',
          });

          return this.paginationService.getPaginatedData(
            1,
            this.pageSize,
            searchQuery.length > 1 ? searchQuery : ''
          );
        })
      )
      .subscribe({
        next: (response) => {
          this.listBucket = response.data;
          this.totalItems = response.total;
        },
      });
  }

  reloadData(): void {
    const query = this.searchControl.value || '';
    this.loadBuckets(this.pageIndex + 1, this.pageSize, query);
  }
}
