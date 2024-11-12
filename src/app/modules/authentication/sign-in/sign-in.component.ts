import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SignInServiceService } from 'src/app/services/authentication/sign-in.service';
import { TranslateModule} from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ChangeLanguagesComponent } from 'src/app/shared/component/change-languages/change-languages.component';
import { AppLang } from 'src/app/core/enum/languages.enum';
import { AppLangService } from 'src/app/services/app-lang.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    TranslateModule,
    ChangeLanguagesComponent,
    ForgotPasswordComponent,
  ],
})
export class SignInComponent implements OnInit, OnDestroy {
  showChildClick(value: boolean) {
    this.showChild = value;
  }

  showChild = false;

  showOverlay = false;

  loginForm: FormGroup;
  emailError = '';
  passwordError = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthServiceService,
    private signInService: SignInServiceService,
    private appLangService: AppLangService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      rememberMe: [false],
    });
  }

  ngOnInit(): void {
    this.appLangService.clearLangContext();
    this.appLangService.setLangContext(AppLang.SIGN_IN);
  }
  checkLangContext() {
    const langContext = this.appLangService.getLangContext();
    console.log('Current Lang Context:', langContext);
  }

  toggleChild() {
    this.showChild = !this.showChild;
  }

  ngOnDestroy(): void {
    this.appLangService.clearLangContext();
  }

  validateLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    this.signInService.login({ email, password }).subscribe({
      next: (response) => {
        if ('access_token' in response) {
          this.authService.saveToken(response.access_token);
          this.router.navigate(['layout/dashboard']);
        } else if ('message' in response) {
          this.handleErrors(response.message);
        }
      },
      error: () => {
        this.passwordError = 'Có lỗi xảy ra, vui lòng thử lại';
      },
    });
  }

  private handleErrors(error: string) {
    if (error.includes('email')) {
      this.emailError = error;
    } else if (error.includes('password')) {
      this.passwordError = error;
    } else {
      this.passwordError = 'Có lỗi xảy ra, vui lòng thử lại';
    }
  }

  clearEmailError() {
    this.emailError = '';
  }

  clearPasswordError() {
    this.passwordError = '';
  }
}
