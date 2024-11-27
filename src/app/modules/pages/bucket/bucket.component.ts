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
  ],
  providers: [PaginationService],
})
export class BucketComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchControl = new FormControl('');
  showChild = false;
  listBucket: ListBucket[] = [];
  totalItems = 0;
  pageSize = 12;
  pageIndex = 0;
  loading = false;

  constructor(
    private paginationService: PaginationService,
    private router: Router
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
    this.router.navigate([`layout/update-bucket/${bucketId}`]);
  }

  onBucketItemsClick(bucketId: number): void {
    this.router.navigate([`layout/bucket-items/${bucketId}`]);
  }

  searchQueryControl(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        switchMap((query) => {
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
        })
      )
      .subscribe((response) => {
        this.listBucket = response.data;
        this.totalItems = response.total;
      });
  }
}
