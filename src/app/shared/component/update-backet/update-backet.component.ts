import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BucketService } from 'src/app/services/page/bucket.service';
import { SnackbarService } from '../../snackbar/snackbar.service';

import { CommonModule } from '@angular/common';
import { ListBucket } from 'src/app/core/store/interface/bucket.interface';
import { DeleteDialogComponent } from '../../custom-component/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { CustomStatusComponent } from '../../custom-component/custom-status/custom-status.component';

@Component({
  selector: 'app-update-backet',
  templateUrl: './update-backet.component.html',
  styleUrls: ['./update-backet.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule,
    CustomStatusComponent,
  ],
  providers: [BucketService],
})
export class UpdateBacketComponent implements OnInit, OnChanges {
  @Input() bucketId!: number;
  @Output() previewVisible = new EventEmitter<boolean>();
  @Output() reloadData = new EventEmitter<void>();

  bucketForm!: FormGroup;
  bucketData!: ListBucket;
  showChild = false;
  loading = false;
  constructor(
    private fb: FormBuilder,
    private bucketService: BucketService,
    private snackBar: SnackbarService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.bucketForm = this.fb.group({
      title: ['', Validators.required],
      public: [false],
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bucketId'] && changes['bucketId'].currentValue) {
      this.getBucketById(this.bucketId);
    }
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
      this.loading = true;
      if (this.bucketId) {
        this.bucketService.updateBucket(this.bucketId, updatedBucket).subscribe(
          () => {
            this.snackBar.show('Bucket updated ');
            this.reloadData.emit();
            this.previewVisible.emit(false);
            this.loading = false;
          },
          (error) => {
            this.snackBar.show('Error ' + error);
            this.loading = false;
          }
        );
      }
    }
  }

  onDelete(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result && this.bucketId) {
        this.loading = true;
        this.bucketService.deleteBucket(this.bucketId).subscribe(
          () => {
            this.snackBar.show('Bucket deleted ');
            this.reloadData.emit();
            this.previewVisible.emit(false);
            this.loading = false;
          },
          (error) => {
            this.snackBar.show('Error deleting bucket ' + error);
            this.loading = false;
          }
        );
      }
    });
  }
  setDoneStatus(status: boolean): void {
    if (this.bucketForm) {
      this.bucketForm.patchValue({ public: status });
    }
  }
  changeVisibleUpdateBucket(event: MouseEvent): void {
    event.stopPropagation();
    this.previewVisible.emit(false);
  }
  blockFormClosing(event: MouseEvent): void {
    event.stopPropagation();
  }
}
