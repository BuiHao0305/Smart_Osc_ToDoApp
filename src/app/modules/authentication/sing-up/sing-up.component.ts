import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppErrorDirective } from 'src/app/core/directive/error.directive';

import { authActions } from 'src/app/core/store/auth/auth.action';
import {
  selectSignUpError,
  selectSignUpSuccess,
} from 'src/app/core/store/auth/auth.selectors';
import { ChangeLanguagesComponent } from 'src/app/shared/component/change-languages/change-languages.component';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { ThemeSwitcherComponent } from '../../../shared/component/theme-switcher/theme-switcher.component';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    ChangeLanguagesComponent,
    TranslateModule,
    AppErrorDirective,
    ThemeSwitcherComponent,
  ],
})
export class SingUpComponent {
  registerForm: FormGroup;
  emailError: string[] = [];
  passwordError: string[] = [];
  userNameError: string[] = [];
  loading = false;
  signUpError$ = this.store.select(selectSignUpError);

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private store: Store,
    private router: Router,
    private snackbar: SnackbarService
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(2)]],
      passwordconfirm: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  onRegister() {
    if (this.registerForm.invalid) {
      return;
    }

    const { email, password, username } = this.registerForm.value;
    this.loading = true;

    this.store.dispatch(
      authActions.signUp({ signUpData: { email, password, username } })
    );

    this.store.select(selectSignUpError).subscribe((error) => {
      if (error) {
        this.loading = false;
        this.snackbar.show('User already exists');
      }
    });

    this.store.select(selectSignUpSuccess).subscribe((success) => {
      if (success) {
        this.loading = false;
        this.router.navigate(['/sign-in']);
      }
    });
  }
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const passwordConfirm = control.get('passwordconfirm')?.value;

    if (password && passwordConfirm) {
      if (password.length == passwordConfirm.length) {
        return { lengthMismatch: true };
      }

      if (password !== passwordConfirm) {
        return { passwordMismatch: true };
      }
    }

    return null;
  }
}
