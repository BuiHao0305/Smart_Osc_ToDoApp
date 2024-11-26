import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ChangeLanguagesComponent } from 'src/app/shared/component/change-languages/change-languages.component';
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
export class SignInComponent implements OnInit {
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
    private snackbar: SnackbarService,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef
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
    this.user$.subscribe((user) => {
      if (user) {
        this.router.navigate(['layout/dashboard']);
        this.snackbar.show('Đăng nhập thành công');
      }
    });
  }

  toggleChild() {
    this.showChild = !this.showChild;
  }

  showChildClick(value: boolean) {
    this.showChild = value;
  }
  validateLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    const { email, password } = this.loginForm.value;
    this.store.dispatch(authActions.login({ signInData: { email, password } }));
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
