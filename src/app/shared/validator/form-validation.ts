import { FormGroup } from '@angular/forms';
import { ValidationMessages } from 'src/app/core/direcive/message';

export class FormValidationHelper {
  static getErrorMessage(controlName: string, form: FormGroup): string {
    const control = form.get(controlName);

    if (control?.hasError('required')) {
      if (controlName === 'email') {
        return ValidationMessages['emailRequired']();
      } else if (controlName === 'password') {
        return ValidationMessages['passwordRequired']();
      } else if (controlName === 'name') {
        return ValidationMessages['nameRequired']();
      }
    }

    if (control?.hasError('email')) {
      return ValidationMessages['emailInvalid']();
    }

    if (control?.hasError('minlength')) {
      const requiredLength = control.errors?.['minlength'].requiredLength;
      if (controlName === 'password') {
        return ValidationMessages['passwordMinLength']({ requiredLength });
      } else if (controlName === 'name') {
        return ValidationMessages['nameMinLength']({ requiredLength });
      }
    }

    return '';
  }
}
