import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppLang } from 'src/app/core/enum/languages.enum';
import { authActions } from 'src/app/core/store/auth/auth.action';
import {
  selectSignUpError,
  selectSignUpLoading,
} from 'src/app/core/store/auth/auth.selectors';
import { AppLangService } from 'src/app/services/app-lang.service';
import { ChangeLanguagesComponent } from 'src/app/shared/component/change-languages/change-languages.component';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';

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
  ],
})
export class SingUpComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  emailError: string[] = [];
  passwordError: string[] = [];
  userNameError: string[] = [];
  signUpLoading$ = this.store.select(selectSignUpLoading);
  signUpError$ = this.store.select(selectSignUpError);

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private appLangService: AppLangService,
    private store: Store,
    private router: Router,
    private snackbar :SnackbarService
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]],
      username: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.appLangService.clearLangContext();
    this.appLangService.setLangContext(AppLang.SIGN_UP);
  }

  ngOnDestroy(): void {
    this.appLangService.clearLangContext();
  }

  loadLanguage(langPrefix: string) {
    this.translate.setDefaultLang('en');
    this.translate.use(langPrefix);
  }

  onRegister() {
    if (this.registerForm.valid) {
      const signUpData = this.registerForm.value;
      this.store.dispatch(authActions.signUp({ signUpData }));
      console.log(signUpData);
      this.router.navigate(['/sign-in']);
      this.snackbar.show('SignUp Success');
    } else {
      this.validationRegister();
    }
  }

  validationRegister() {
    this.emailError = [];
    this.passwordError = [];
    this.userNameError = [];
  }
}
