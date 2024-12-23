import { Component, forwardRef, Input } from '@angular/core';
import { InputType } from './type.input';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class CustomInputComponent implements ControlValueAccessor {
  @Input() type: InputType = 'text';
  @Input() id = '';
  @Input() label = 'Noi Dung';
  @Input() placeholder = '';

  value = '';

  private onChange: (value: string | null) => void = () => {
    return null;
  };
  private onTouched: () => void = () => {
    return null;
  };

  writeValue(value: string | null): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(): void {
    console.log();
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;

    if (this.onChange) {
      this.onChange(this.value);
    }

    if (this.onTouched) {
      this.onTouched();
    }
  }
}
