import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ButtonComponent,
  ButtonSize,
  ButtonVariant,
} from '../button/button.directive';
import { CustomInputComponent } from '../custom-input/custom-input.component';

@Component({
  selector: 'app-btn-selector',
  templateUrl: './btn-selector.component.html',

  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NgTemplateOutlet,
    ButtonComponent,
    CustomInputComponent,
  ],
})
export class BtnSelectorComponent {
  readonly variants = Object.keys(
    ButtonVariant
  ) as (keyof typeof ButtonVariant)[];
  readonly sizes = Object.keys(ButtonSize) as (keyof typeof ButtonSize)[];
  selectedVariant: keyof typeof ButtonVariant = 'primary';
  selectedSize: keyof typeof ButtonSize = 'large';
  isDisabled: boolean = false;
  isLoading: boolean = false;
}
