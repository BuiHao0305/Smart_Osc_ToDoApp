import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BucketService } from 'src/app/services/page/bucket.service';
import { SnackbarService } from '../../snackbar/snackbar.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {
  ListBucket,
  ListBucketResponse,
} from 'src/app/core/store/interface/bucket.interface';

@Component({
  selector: 'app-update-backet',
  templateUrl: './update-backet.component.html',
  styleUrls: ['./update-backet.component.scss'],
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, HttpClientModule, CommonModule],
  providers: [BucketService],
})
export class UpdateBacketComponent implements OnInit {
  bucketForm!: FormGroup;
  bucketData!: ListBucket;
  showChild = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bucketService: BucketService,
    private snackBar: SnackbarService
  ) {}

  ngOnInit(): void {
    const bucketId = this.route.snapshot.paramMap.get('bucketId');
    if (bucketId) {
      this.getBucketById(+bucketId);
    }
    this.bucketForm = this.fb.group({
      title: ['', Validators.required],
      public: [false],
    });
  }
  getBucketById(bucketId: number): void {
    this.bucketService.getBucketById(bucketId).subscribe(
      (response: { data: ListBucket }) => {
        this.bucketData = response.data;
        this.bucketForm.patchValue({
          title: this.bucketData.title,
          public: this.bucketData.public,
        });
      },
      (error) => {
        console.error('Error fetching bucket:', error);
      }
    );
  }
  onSubmit(): void {
    if (this.bucketForm.valid) {
      const updatedBucket = {
        title: this.bucketForm.get('title')?.value,
        public: this.bucketForm.get('public')?.value,
      };
      const bucketId = this.route.snapshot.paramMap.get('bucketId');
      if (bucketId) {
        this.bucketService.updateBucket(+bucketId, updatedBucket).subscribe(
          (response) => {
            this.snackBar.show('Bucket updated ' + response);
            this.router.navigate(['layout/bucket']);
          },
          (error) => {
            this.snackBar.show('Error ' + error);
          }
        );
      }
    }
  }
  onDelete(): void {
    const bucketId = this.route.snapshot.paramMap.get('bucketId');
    if (bucketId) {
      this.bucketService.deleteBucket(+bucketId).subscribe(
        (response) => {
          this.snackBar.show('Bucket deleted ' + response);
          this.router.navigate(['layout/bucket']);
        },
        (error) => {
          this.snackBar.show('Error deleting bucket ' + error);
        }
      );
    }
  }
  setDoneStatus(status: boolean): void {
    if (this.bucketForm) {
      this.bucketForm.patchValue({ public: status });
    }
  }
}
