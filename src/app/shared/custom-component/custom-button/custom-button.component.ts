import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonSize, ButtonStyle } from './custombutton.component';

@Component({
  selector: 'app-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
  host: {
    class: 'btn',
    '[class.btn-primary]': `styleButton === 'primary'`,
    '[class.btn-secondary]': `styleButton === 'secondary'`,
    '[class.btn-tertiary]': `styleButton === 'tertiary'`,
    '[class.btn-neutral]': `styleButton === 'neutral'`,
    '[class.btn-small]': `size === 'small'`,
    '[class.btn-medium]': `size === 'medium'`,
    '[class.btn-large]': `size === 'large'`,
    '[class.btn-disabled]': 'isDisabled',
    '[class.btn-loading]': 'isLoading',
  },
})
export class CustomButtonComponent {
  @Input() buttonText = '';
  @Input() iconStart = '';
  @Input() iconEnd = '';
  @Input() size: ButtonSize = 'medium';
  @Input() styleButton: ButtonStyle = 'primary';
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
