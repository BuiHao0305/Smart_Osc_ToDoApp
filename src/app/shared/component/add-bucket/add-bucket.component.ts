import { CommonModule } from '@angular/common';

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BucketService } from 'src/app/services/page/bucket.service';
import { SnackbarService } from '../../snackbar/snackbar.service';
import { TranslateModule } from '@ngx-translate/core';
import { CustomStatusComponent } from '../../custom-component/custom-status/custom-status.component';
import { AppErrorDirective } from 'src/app/core/directive/error.directive';
import { CustomInputComponent } from '../../custom-component/custom-input/custom-input.component';
import { CustomButtonComponent } from '../../custom-component/custom-button/custom-button.component';

@Component({
  selector: 'app-add-bucket',
  templateUrl: './add-bucket.component.html',
  styleUrls: ['./add-bucket.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    TranslateModule,
    CustomStatusComponent,
    AppErrorDirective,
    CustomInputComponent,
    CustomButtonComponent,
  ],
  providers: [BucketService],
})
export class AddBucketComponent implements OnInit {
  bucketForm!: FormGroup;
  loading = false;
  showChild = false;
  constructor(
    private fb: FormBuilder,
    private bucketService: BucketService,
    private snackBar: SnackbarService
  ) {}
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
      formData.public = Boolean(this.bucketForm.get('public')?.value);
      this.loading = true;
      this.bucketService.addBucket(formData).subscribe({
        next: () => {
          this.snackBar.show('Bucket added successfully');
          this.reloadData.emit();
          this.changeVisible();

          this.loading = false;
        },
        error: (error) => {
          this.snackBar.show(error);
          this.loading = false;
        },
      });
    } else {
      this.snackBar.show('cancel');
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
