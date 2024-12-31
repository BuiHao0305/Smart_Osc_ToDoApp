import {
  Component,
  ElementRef,
  input,
  Input,
  Renderer2,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { InputType } from '../types/type.input';
import {
  ControlValueAccessor,
  FormsModule,
  NgControl,
  Validators,
} from '@angular/forms';
import { LabelFieldComponent } from './label-field/label-field.component';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  standalone: true,
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => CustomInputComponent),
  //     multi: true,
  //   },
  // ],
  imports: [FormsModule, CommonModule, LabelFieldComponent],
})
export class CustomInputComponent implements ControlValueAccessor {
  readonly startIcon = input<TemplateRef<any> | null>(null);
  readonly endIcon = input<TemplateRef<any> | null>(null);
  /**
   * Label text
   */
  @Input() labelText: string = '';
  /**
   * Input has different types - text, email, number
   */
  @Input() inputType: InputType = 'text';
  /**
   * Placeholder text
   */
  @Input() placeholderText: string = '';
  /**
   * Flag which allows display required symbol (*) manually
   */
  @Input() isRequired?: boolean;
  /**
   * Custom error message that will be displayed in @see{@link ErrorMessageComponent}
   */
  @Input() customErrorMessage?: string;
  /**
   * Setter for @see{@link isDisabled} property
   */
  @Input() set disabled(value: boolean) {
    this.setDisabledState(value);
  }

  /**
   * Reference to input element
   */
  @ViewChild('input', { static: true })
  input: ElementRef | null = null;

  /**
   * Flag for control disabled state
   */
  public isDisabled?: boolean;
  /**
   * Control value
   */
  public value: any;
  private onChange = (value: any) => {};
  private onTouched = () => {};

  constructor(private renderer: Renderer2, public ngControl: NgControl) {
    ngControl.valueAccessor = this;
  }

  writeValue(obj: any): void {
    if (this.input) {
      this.renderer.setProperty(this.input.nativeElement, 'value', obj);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  /**
   * Getter for abstract control
   */
  public get control() {
    return this.ngControl.control;
  }

  /**
   * Fired when control value changed
   */
  public onValueChange(): void {
    if (!this.input) {
      return;
    }
    this.value = this.input.nativeElement.value;
    this.onChange(this.value);
  }

  /**
   * Fired when user focusing to control
   */
  public onFocusOut(): void {
    this.onTouched();
  }

  /**
   * Checks if control has required / requiredTrue validators.
   * @returns TRUE if has, otherwise FALSE
   */
  hasRequiredValidators(): boolean {
    if (!this.control) {
      return false;
    }
    return (
      this.control.hasValidator(Validators.required) ||
      this.control.hasValidator(Validators.requiredTrue)
    );
  }
}
