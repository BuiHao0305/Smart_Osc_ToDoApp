import { Component, OnInit, ViewChild } from '@angular/core';
import { PaginationService } from 'src/app/services/page/pagination.service';
import { AddBucketComponent } from '../../../shared/component/add-bucket/add-bucket.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, switchMap } from 'rxjs';

import { ListBucket } from 'src/app/core/store/interface/bucket.interface';
import { TranslateModule } from '@ngx-translate/core';
import { RelativeTimePipe } from 'src/app/shared/pipe/relative-time.pipe';
import { UpdateBacketComponent } from '../../../shared/component/update-backet/update-backet.component';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';

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
    private snackBar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.loadBuckets(1, this.pageSize, '');
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
    // if (!value) {
    //   const query = this.searchControl.value || '';
    //   this.loadBuckets(this.pageIndex + 1, this.pageSize, query);
    // }
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
          if (query && query.length >= 2) {
            const searchQuery = query || '';
            this.pageIndex = 0;
            if (this.paginator) {
              this.paginator.pageIndex = 0;
            }

            return this.paginationService.getPaginatedData(
              1,
              this.pageSize,
              searchQuery
            );
          } else {
            this.snackBar.show(
              'Search query must be at least 2 characters long '
            );
            return [];
          }
        })
      )
      .subscribe({
        next: (response) => {
          this.listBucket = response?.data ?? [];
          this.totalItems = response?.total ?? 0;
        },
        error: (err) => {
          this.snackBar.show('An error occurred while fetching data: ' + err);
        },
      });
  }
  reloadData(): void {
    const query = this.searchControl.value || '';
    this.loadBuckets(this.pageIndex + 1, this.pageSize, query);
  }
}
