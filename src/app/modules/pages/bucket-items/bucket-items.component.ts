import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BucketItemsService } from 'src/app/services/page/bucket-items.service';
import { AddContentItemsComponent } from "../../../shared/component/add-content-items/add-content-items.component";
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PaginationService } from 'src/app/services/page/pagination.service';
import { UpdateItemsComponent } from "../../../shared/component/update-items/update-items.component";

export interface BucketItems{
  id: number,
  bucketId: number,
  parentId: number,
  content: string,
  done: boolean,
  createdAt: Date,
  updatedAt: Date,
  total: number,
}

@Component({
  selector: 'app-bucket-items',
  templateUrl: './bucket-items.component.html',
  styleUrls: ['./bucket-items.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, MatPaginator, AddContentItemsComponent, UpdateItemsComponent],
  providers: [BucketItemsService,PaginationService],
})


export class BucketItemsComponent implements OnInit{

  showChildAdd = false;
  showChildUpdate = false;
  showOverlay = false;
  selectedItemId: number |null = null;
  bucketItemlist : BucketItems[] =[]
  totalItems = 0;
  pageSize = 10;
  pageIndex = 0;
  bucketItemsbyId: BucketItems | null = null; 

  constructor(
    private bucketItemsService: BucketItemsService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const bucketId = this.route.snapshot.paramMap.get('bucketId');
    if (bucketId) {
      this.loadBucketItems(+bucketId, 1, this.pageSize); 
    }
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
  // getBucketItems(bucketId:number): void {
  //   this.bucketItemsService.getContentItems(bucketId).subscribe(
  //     (response) => {
  //       this.bucketItemlist = response.data;
  //       console.log('Tasks fetched successfully:', this.bucketItemlist);
  //     },
  //     (error) => {
  //       console.error('Error fetching tasks:', error);
  //     }
  //   );
  // }
  private loadBucketItems(bucketId: number, page: number, limit: number): void {
    console.log('Bucket ID:', bucketId, 'Page:', page, 'Limit:', limit);
    this.bucketItemsService.getContentItems(bucketId, page, limit).subscribe((response) => {
      console.log('items:', response.data);
      this.bucketItemlist = response.data;
      this.totalItems = response.total;
    });
  }
  
  onPageEvent(event: PageEvent): void {
    const bucketId = this.route.snapshot.paramMap.get('bucketId');
    if (bucketId) {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
      const page = this.pageIndex + 1; 
      this.loadBucketItems(+bucketId, page, this.pageSize); 
    }
  }
  onSelectItem(itemId: number) {
    const selectedItem = this.getItemById(itemId); 
    if (selectedItem) {
      console.log('Selected Item:', selectedItem);
      this.selectedItemId = selectedItem.id; 
      this.bucketItemsbyId = selectedItem; 
      this.showChildUpdate = true; 
    }
  }
  getItemById(itemId: number) {
    const item = this.bucketItemlist.find((item) => item.id === itemId);
    if (item) {
      console.log('Found item:', item);
      return item;
    } else {
      console.log('Item not found!');
      return null;
    }
  }
}
