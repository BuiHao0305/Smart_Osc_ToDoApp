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
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';

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
    private appLangService: AppLangService,
    private snackbar: SnackbarService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]],
      rememberMe: [false],
    });

    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit(): void {
    this.appLangService.clearLangContext();
    this.appLangService.setLangContext(AppLang.SIGN_IN);
    this.user$.subscribe((user) => {
      if (user) {
        this.router.navigate(['layout/dashboard']);
        this.snackbar.show('Đăng nhập thành công');
      }
    });
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

    // Dispatch login action without using startLogin
    this.store.dispatch(authActions.login({ signInData: { email, password } }));

    // Subscribe to the error observable and show snackbar if there's an error
    this.error$.subscribe((error) => {
      if (error) {
        this.snackbar.show(error);
      }
    });
  }

  clearEmailError() {
    this.emailError = '';
  }

  clearPasswordError() {
    this.passwordError = '';
  }
}
