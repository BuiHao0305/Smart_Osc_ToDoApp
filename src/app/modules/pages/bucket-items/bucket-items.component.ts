import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BucketItemsService } from 'src/app/services/page/bucket-items.service';
import { AddContentItemsComponent } from '../../../shared/component/add-content-items/add-content-items.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PaginationService } from 'src/app/services/page/pagination.service';
import { UpdateItemsComponent } from '../../../shared/component/update-items/update-items.component';

import { BucketItem } from 'src/app/core/store/interface/bucket-items.interface';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, switchMap } from 'rxjs';
import { RelativeTimePipe } from 'src/app/shared/pipe/relative-time.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { DeadlineWarningDirective } from 'src/app/core/directive/deadlinewarning.direcitve';

@Component({
  selector: 'app-bucket-items',
  templateUrl: './bucket-items.component.html',
  styleUrls: ['./bucket-items.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    MatPaginator,
    AddContentItemsComponent,
    UpdateItemsComponent,
    MatInputModule,
    ReactiveFormsModule,
    TranslateModule,
    RelativeTimePipe,
    DeadlineWarningDirective,
  ],
  providers: [BucketItemsService, PaginationService],
})
export class BucketItemsComponent implements OnInit {
  isSelecting = false;
  selectedItems: number[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchControl = new FormControl('');
  doneControl = new FormControl('');
  showChildAdd = false;
  showChildUpdate = false;
  showOverlay = false;
  selectedItemId: number | null = null;
  bucketItemlist: BucketItem[] = [];
  totalItems = 0;
  pageSize = 10;
  pageIndex = 0;
  bucketItemsbyId: BucketItem | null = null;
  isLoading = false;

  constructor(
    private bucketItemsService: BucketItemsService,
    private route: ActivatedRoute,

    private router: Router
  ) {}
  toggleSelectMode(): void {
    this.isSelecting = !this.isSelecting;
    if (!this.isSelecting) {
      this.selectedItems = [];
      this.showChildUpdate = false;
    }
  }

  onItemSelect(taskId: number, event: Event): void {
    event.stopPropagation();
    if (this.selectedItems.includes(taskId)) {
      this.selectedItems = this.selectedItems.filter((id) => id !== taskId);
    } else {
      this.selectedItems.push(taskId);
    }

    console.log('Selected Items:', this.selectedItems);
  }

  ngOnInit(): void {
    const bucketId = this.route.snapshot.paramMap.get('bucketId');
    this.route.queryParams.subscribe((params) => {
      this.pageIndex = params['page'] ? +params['page'] - 1 : 0;
      const searchQuery = params['searchQuery'] || '';
      const done = params['done'] || '';

      this.searchControl.setValue(searchQuery, { emitEvent: false });
      this.doneControl.setValue(done, { emitEvent: false });

      if (bucketId) {
        this.loadBucketItems(
          +bucketId,
          this.pageIndex + 1,
          this.pageSize,
          searchQuery,
          done
        );
      }
    });
    this.searchQueryControl();
    this.doneFilterControl();
  }

  toggleChildAddContent() {
    this.showChildAdd = !this.showChildAdd;
  }

  showChildClickAddContent(value: boolean) {
    this.showChildAdd = value;
  }
  toggleChildUpdateContent() {
    this.showChildUpdate = !this.showChildUpdate;
  }

  showChildClickUpdateContent(value: boolean) {
    this.showChildUpdate = value;
  }
  private loadBucketItems(
    bucketId: number,
    page: number,
    limit: number,
    searchQuery: string,
    done: string | null
  ): void {
    this.isLoading = true;
    this.bucketItemsService
      .getContentItems(bucketId, page, limit, searchQuery, done)
      .subscribe({
        next: (response) => {
          this.bucketItemlist = response.data;
          this.totalItems = response.total;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading bucket items:', error);
          this.isLoading = false;
        },
      });
  }

  onPageEvent(event: PageEvent): void {
    const bucketId = this.route.snapshot.paramMap.get('bucketId');
    if (bucketId) {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
      const page = this.pageIndex + 1;
      const query = this.searchControl.value || '';
      const done = this.doneControl.value || '';
      this.updateQueryParams(page, query, done);
      this.loadBucketItems(+bucketId, page, this.pageSize, query, done);
    }
  }

  onSelectItem(itemId: number) {
    const selectedItem = this.getItemById(itemId);
    if (selectedItem) {
      this.selectedItemId = selectedItem.id;
      this.bucketItemsbyId = selectedItem;
      this.showChildUpdate = true;
    }
  }
  getItemById(itemId: number) {
    const item = this.bucketItemlist.find((item) => item.id === itemId);
    if (item) {
      return item;
    } else {
      return null;
    }
  }
  searchQueryControl(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        switchMap((query) => {
          const searchQuery = query || '';
          const bucketId = this.route.snapshot.paramMap.get('bucketId');
          const done = this.doneControl.value || '';

          if (bucketId) {
            this.pageIndex = 0;
            if (this.paginator) {
              this.paginator.pageIndex = 0;
            }

            this.router.navigate([], {
              relativeTo: this.route,
              queryParams: { searchQuery, done },
              queryParamsHandling: 'merge',
            });

            return this.bucketItemsService.getContentItems(
              +bucketId,
              1,
              this.pageSize,
              searchQuery.length > 1 ? searchQuery : '',
              done
            );
          }
          return [];
        })
      )
      .subscribe({
        next: (response) => {
          this.bucketItemlist = response.data || [];
          this.totalItems = response.total || 0;
        },
        error: (error) => {
          console.error('Error fetching search results:', error);
        },
      });
  }

  // doneFilterControl(): void {
  //   this.doneControl.valueChanges.subscribe((done) => {
  //     const bucketId = this.route.snapshot.paramMap.get('bucketId');
  //     const searchQuery = this.searchControl.value || '';
  //     if (bucketId) {
  //       const doneValue = done === null ? '' : done;

  //       this.updateQueryParams(1, searchQuery, doneValue);

  //       this.loadBucketItems(
  //         +bucketId,
  //         1,
  //         this.pageSize,
  //         searchQuery,
  //         doneValue
  //       );
  //     }
  //   });
  // }

  doneFilterControl(): void {
    this.doneControl.valueChanges.subscribe((done) => {
      const bucketId = this.route.snapshot.paramMap.get('bucketId');
      const searchQuery = this.searchControl.value || '';
      if (bucketId) {
        const doneValue = done === null ? '' : done;
        this.updateQueryParams(1, searchQuery, doneValue);
        this.loadBucketItems(
          +bucketId,
          1,
          this.pageSize,
          searchQuery,
          doneValue
        );
      }
    });
  }

  onReloadData(): void {
    const bucketId = this.route.snapshot.paramMap.get('bucketId');
    if (bucketId) {
      const query = this.searchControl.value || '';
      const done = this.doneControl.value || '';
      const page = this.pageIndex + 1;
      this.loadBucketItems(+bucketId, page, this.pageSize, query, done);
    }
  }
  updateQueryParams(page: number, searchQuery: string, done: string): void {
    const queryParams = {
      page: page.toString(),
      searchQuery: searchQuery,
      done: done,
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }
}
