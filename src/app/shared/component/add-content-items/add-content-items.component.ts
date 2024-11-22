import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BucketItemsService } from 'src/app/services/page/bucket-items.service';
import { SnackbarService } from '../../snackbar/snackbar.service';

@Component({
  selector: 'app-add-content-items',
  templateUrl: './add-content-items.component.html',
  styleUrls: ['./add-content-items.component.scss'],
  imports: [ReactiveFormsModule],
  providers: [BucketItemsService],
  standalone: true,
})
export class AddContentItemsComponent implements OnInit {
  addcontentForm!: FormGroup;
  showChildAdd = false;
  loading = false;
  @Output() previewVisible = new EventEmitter<boolean>();
  @Output() reloadData = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private addContentItem: BucketItemsService,
    private snackBar: SnackbarService
  ) {}
  ngOnInit() {
    this.addcontentForm = this.fb.group({
      content: ['', [Validators.required]],
    });
  }
  changeVisibleAddContent() {
    this.previewVisible.emit(false);
  }
  blockFormClosing(event: MouseEvent) {
    event.stopPropagation();
  }
  onSubmit(): void {
    if (this.addcontentForm.valid) {
      const contentData = {
        content: this.addcontentForm.get('content')?.value,
      };
      this.loading = true;
      const bucketId = this.route.snapshot.paramMap.get('bucketId');
      if (bucketId) {
        this.addContentItem.addContentItems(+bucketId, contentData).subscribe(
          (response) => {
            this.snackBar.show('Content added successfully: ' + response);
            this.reloadData.emit();
            this.previewVisible.emit(false);
            this.loading = false
          },
          (error) => {
            this.snackBar.show('Error adding content: ' + error.message);
            this.loading = false
          }
        );
      }
    }
  }
}
