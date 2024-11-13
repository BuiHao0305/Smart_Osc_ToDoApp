import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ChangeLanguagesComponent } from 'src/app/shared/component/change-languages/change-languages.component';
import { AppLang } from 'src/app/core/enum/languages.enum';
import { AppLangService } from 'src/app/services/app-lang.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { Store } from '@ngrx/store';
import { authActions } from 'src/app/core/store/auth/auth.action';
import { Observable } from 'rxjs';

import { AuthState } from 'src/app/core/store/auth/auth.reducer';
import {
  selectError,
  selectLoading,
  selectUser,
} from 'src/app/core/store/auth/auth.selectors';

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
  showChild = false;
  showOverlay = false;

  loginForm: FormGroup;
  emailError = '';
  passwordError = '';
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  user$: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AuthState>,
    private appLangService: AppLangService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      rememberMe: [false],
    });

    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
    this.user$ = this.store.select(selectUser);
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

  showChildClick(value: boolean) {
    this.showChild = value;
  }

  ngOnDestroy(): void {
    this.appLangService.clearLangContext();
  }

  validateLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    // Dispatch action with signInData
    this.store.dispatch(authActions.login({ signInData: { email, password } }));

    // Subscribe to error and loading states
    this.error$.subscribe((error) => {
      if (error) {
        this.handleErrors(error);
      }
    });

    this.loading$.subscribe((loading) => {
      if (!loading) {
        this.router.navigate(['layout/dashboard']);
      }
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
