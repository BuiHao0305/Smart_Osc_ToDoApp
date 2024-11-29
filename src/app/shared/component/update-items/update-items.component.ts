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
import { SnackbarService } from '../../snackbar/snackbar.service';
import { CommonModule } from '@angular/common';
import { BucketItemsService } from 'src/app/services/page/bucket-items.service';

import { BucketItem} from 'src/app/core/store/interface/bucket-items.interface';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { RelativeTimePipe } from "../../pipe/relative-time.pipe";

@Component({
  selector: 'app-update-items',
  templateUrl: './update-items.component.html',
  styleUrls: ['./update-items.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TranslateModule, RelativeTimePipe],
  providers: [],
})
export class UpdateItemsComponent implements OnInit, OnChanges {
  @Input() bucketItemsbyId: BucketItem| null = null;
  @Output() previewVisible = new EventEmitter<boolean>();
  @Output() reloadData = new EventEmitter<void>();

  bucketId: number | null = null;
  itemId: number | null = null;
  loading = false;
  updateContentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private bucketItemsService: BucketItemsService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bucketItemsbyId'] && this.bucketItemsbyId) {
      this.bucketId = this.bucketItemsbyId.bucketId;
      this.itemId = this.bucketItemsbyId.id;

      if (!this.updateContentForm) {
        this.initForm();
      }

      this.updateContentForm.patchValue({
        content: this.bucketItemsbyId.content,
        done: this.bucketItemsbyId.done,
      });
    }
  }

  private initForm() {
    this.updateContentForm = this.fb.group({
      content: [
        this.bucketItemsbyId ? this.bucketItemsbyId.content : '',
        Validators.required,
      ],
      done: [this.bucketItemsbyId ? this.bucketItemsbyId.done : ''],
    });
  }
  updateItem(): void {
    if (this.updateContentForm.invalid) {
      this.snackbar.show('Form is invalid! Please check your input.');
      return;
    }
    if (this.bucketId === null || this.itemId === null) {
      this.snackbar.show('Bucket ID or Item ID is missing!');
      return;
    }
    this.loading = true;
    const { content, done } = this.updateContentForm.value;
    this.bucketItemsService
      .updateItem(this.bucketId, this.itemId, { content, done })
      .subscribe({
        next: () => {
          this.snackbar.show('Item updated successfully!');
          this.reloadData.emit();
          this.previewVisible.emit(false);
          this.loading = false
        },
        error: (err) => {
          this.snackbar.show(`Error updating item: ${err.message}`);
          this.loading = false;
        },
      });
  }
  deleteItem(): void {
    
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe((result) =>{
      if(result){
        if (this.bucketId === null || this.itemId === null) {
          this.snackbar.show('Bucket ID or Item ID is missing!');
          return;
        }
        this.loading = true
        this.bucketItemsService.deleteItem(this.bucketId, this.itemId).subscribe({
          next: () => {
            this.snackbar.show('Item deleted successfully!');
            this.reloadData.emit();
            this.previewVisible.emit(false);
            this.loading = false
          },
          error: (err) => {
            this.snackbar.show(`Error deleting item: ${err.message}`);
            this.loading = false
          },
        });
      }
    })
  }

  changeVisibleUpdateContent(event: MouseEvent): void {
    event.stopPropagation();
    this.previewVisible.emit(false);
  }

  blockFormClosing(event: MouseEvent): void {
    event.stopPropagation();
  }
  setDoneStatus(status: boolean): void {
    if (this.updateContentForm) {
      this.updateContentForm.patchValue({ done: status });
    }
  }
}
