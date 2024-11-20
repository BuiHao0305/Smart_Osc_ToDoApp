import { Component } from '@angular/core';
import { PaginationService } from 'src/app/services/page/pagination.service';
import { ForgotPasswordComponent } from "../../authentication/forgot-password/forgot-password.component";
import { AddBucketComponent } from "../../../shared/component/add-bucket/add-bucket.component";
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router, RouterModule } from '@angular/router';

interface ListBucket {
  id: number,
  userId: string,
  title: string,
  public: boolean,
  total: number
}

@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.scss'],
  standalone: true,
  imports: [ForgotPasswordComponent, AddBucketComponent,MatPaginator,RouterModule],
  providers: [PaginationService], 
})
export class BucketComponent {

  showChild = false;
  showOverlay = false;

  listBucket: ListBucket[] = [];
  totalItems = 0; 
  pageSize = 12; 
  pageIndex = 0;
  constructor(private paginationService: PaginationService, private router: Router) {}

  ngOnInit(): void {
   this.loadBuckets(1, this.pageSize);
  }

  toggleChild() {
    this.showChild = !this.showChild;
  }

  showChildClick(value: boolean) {
    this.showChild = value;
    if (!value) {
      this.loadBuckets(1, this.pageSize);
    }
  }
  private loadBuckets(page: number, limit: number): void {
    this.paginationService.getPaginatedData(page, limit).subscribe((response) => {
      console.log('Buckets loaded:', response.data);
      this.listBucket = response.data;
      this.totalItems = response.total; 
    });
  }
  onPageEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    const page = this.pageIndex + 1; 
    this.loadBuckets(page, this.pageSize); 
  }
  onBucketClick(bucketId: number): void {
    
    this.router.navigate([`layout/update-bucket/${bucketId}`]);
    console.log('butketId', bucketId);
  }
  onBucketItemsClick(bucketId: number): void {
    this.router.navigate([`layout/bucket-items/${bucketId}`]);
    // this.router.navigate([`layout/update-bucket/${bucketId}`]);
    console.log('butketId', bucketId);
  }
}
