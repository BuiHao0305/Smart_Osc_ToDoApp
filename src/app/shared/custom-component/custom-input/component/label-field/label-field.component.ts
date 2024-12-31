import { Component, Input } from '@angular/core';
import { RequiredSymbolDirective } from '../../directives/required-symbol.directive';

@Component({
  selector: 'label-field',
  templateUrl: './label-field.component.html',
  styleUrls: ['./label-field.component.scss'],
  standalone: true,
  imports: [RequiredSymbolDirective],
})
export class LabelFieldComponent {
  @Input() text = '';
  /**
   * Flag which allows display required symbol (*) manually
   */
  @Input() isRequired?: boolean;
  /**
   * Flag which tell us if control is in disabled state
   */
  @Input() isDisabled?: boolean;
  /**
   * Flag which tell us if control has required validators (Validators.required or Validators.requiredTrue)
   */
  @Input() hasRequiredValidator = false;
}
