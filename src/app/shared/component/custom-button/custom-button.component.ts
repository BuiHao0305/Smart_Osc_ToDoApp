import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class CustomButtonComponent {
  @Input() buttonText = '';
  @Input() icon1Name = '';
  @Input() icon2Name = '';

  @Input() isDisabled = false;
  @Input() isLoading = false;

  isHovered = false;
  isPressed = false;

  onHover() {
    if (!this.isDisabled) {
      this.isHovered = true;
    }
  }

  onLeave() {
    this.isHovered = false;
  }

  onPress() {
    if (!this.isDisabled) {
      this.isPressed = true;
    }
  }

  onRelease() {
    this.isPressed = false;
  }
}
