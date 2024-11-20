import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BucketItemsService } from 'src/app/services/page/bucket-items.service';

interface BucketItems{
  id: number,
  bucketId: number,
  parentId: number,
  content: string,
  done: boolean,
  createdAt: Date,
  updatedAt: Date
}

@Component({
  selector: 'app-bucket-items',
  templateUrl: './bucket-items.component.html',
  styleUrls: ['./bucket-items.component.scss'],
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  providers: [BucketItemsService],
})
export class BucketItemsComponent {

  bucketItemlist : BucketItems[] =[]
  bucketId: number = 0;

  constructor(
    private bucketItemsService: BucketItemsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const bucketId = this.route.snapshot.paramMap.get('bucketId');
    if (bucketId) {
      this.getBucketItems(+bucketId);
    }
  }

  getBucketItems(bucketId:number): void {
    this.bucketItemsService.getBucketItems(bucketId).subscribe(
      (response) => {
        this.bucketItemlist = response.data;
        console.log('Tasks fetched successfully:', this.bucketItemlist);
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

}
