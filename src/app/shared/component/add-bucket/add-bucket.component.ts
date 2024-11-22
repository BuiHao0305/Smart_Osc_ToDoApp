import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BucketService } from 'src/app/services/page/bucket.service';

@Component({
  selector: 'app-add-bucket',
  templateUrl: './add-bucket.component.html',
  styleUrls: ['./add-bucket.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  providers: [BucketService,HttpClientModule],
})
export class AddBucketComponent implements OnInit {
  bucketForm!: FormGroup;

  showChild = false;
  constructor(private fb: FormBuilder, private bucketService: BucketService) {}
  @Output() previewVisible = new EventEmitter<boolean>();
  @Output() reloadData = new EventEmitter<void>();
  ngOnInit() {
    this.bucketForm = this.fb.group({
      title: ['', [Validators.required]],
      public: [false, Validators.required],
    });
  }
  onSubmit() {
    if (this.bucketForm.valid) {
      const formData = this.bucketForm.value;
      formData.public = Boolean(this.bucketForm.get('public')?.value)
      this.bucketService.addBucket(formData).subscribe({
        next: (response) => {
          console.log('Bucket added successfully', response);
          this.reloadData.emit();
          this.changeVisible();
          this.previewVisible.emit(false);
        },
        error: (error) => {
          console.error('Error adding bucket', error);
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }

  changeVisible() {
    this.previewVisible.emit(false);
  }

  blockFormClosing(event: MouseEvent) {
    event.stopPropagation();
  }
  setDoneStatus(status: boolean): void {
    if (this.bucketForm) {
      this.bucketForm.patchValue({ public: status });
    }
  }
}
