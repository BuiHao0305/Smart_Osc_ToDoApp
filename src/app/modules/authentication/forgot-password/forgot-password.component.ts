import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
})
export class ForgotPasswordComponent {
  showChild = false;

  @Output() previewVisible = new EventEmitter<boolean>();

  changeVisible() {
    this.previewVisible.emit(false);
  }

  blockFormClosing(event: MouseEvent) {
    event.stopPropagation();
  }
}
