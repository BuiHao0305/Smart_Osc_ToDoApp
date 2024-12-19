import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-status',
  templateUrl: './custom-status.component.html',
  styleUrls: ['./custom-status.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class CustomStatusComponent {
  @Input() value = false;
  @Input() iconStart = '';
  @Input() iconEnd = '';
  @Input() status1 = '';
  @Input() status2 = '';
  @Output() valueChange = new EventEmitter<boolean>();

  changeStatus(status: boolean): void {
    this.valueChange.emit(status);
    console.log(status);
  }
}
