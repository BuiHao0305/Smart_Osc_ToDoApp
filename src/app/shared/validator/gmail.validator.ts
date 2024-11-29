import { AbstractControl, ValidationErrors } from '@angular/forms';

export function gmailValidator(control: AbstractControl): ValidationErrors | null {
  const email = control.value;
  if (email && !email.endsWith('@gmail.com')) {
    return { invalidGmail: true }; 
  }
  return null;
}
