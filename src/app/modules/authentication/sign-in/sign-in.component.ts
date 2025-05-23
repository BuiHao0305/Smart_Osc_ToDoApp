import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
import { AppErrorDirective } from 'src/app/core/directive/error.directive';
import { ThemeSwitcherComponent } from '../../../shared/component/theme-switcher/theme-switcher.component';
import { CustomInputComponent } from 'src/app/shared/custom-component/custom-input/component/custom-input.component';

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
    AppErrorDirective,
    ThemeSwitcherComponent,
  ],
})
export class SignInComponent implements OnInit {
  showChild = false;
  showOverlay = false;
  useremail = '';
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
    @Inject(PLATFORM_ID) private platformId: string
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.email],
      password: ['', [Validators.required, Validators.minLength(4)]],
      rememberMe: [false],
    });

    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const redirectUrl = localStorage.getItem('redirectUrl');
      const email = localStorage.getItem('email');

      this.user$.subscribe((user) => {
        if (user) {
          if (email === this.useremail) {
            if (redirectUrl) {
              localStorage.removeItem('redirectUrl');
              this.router.navigateByUrl(redirectUrl).then();
            } else {
              this.router.navigate(['layout/dashboard']);
            }
          } else {
            this.router.navigate(['layout/dashboard']);
          }
        }
      });
    }

    this.error$.subscribe((error) => {
      if (error) {
        this.snackbar.show(error);
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
    this.useremail = email;

    if (this.router.url !== '/sign-in') {
      localStorage.setItem('redirectUrl', this.router.url);
    }
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
