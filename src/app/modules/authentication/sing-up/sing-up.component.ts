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
  selectSignUpSuccess,
} from 'src/app/core/store/auth/auth.selectors';
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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]],
      username: ['', Validators.required],
    });
  }




  loadLanguage(langPrefix: string) {
    this.translate.setDefaultLang('en');
    this.translate.use(langPrefix);
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
      }
    });
  
    this.store.select(selectSignUpSuccess).subscribe((success) => {
      if (success) {
        this.loading = false;
        this.router.navigate(['/sign-in']);
      }
    });
  }

  validationRegister() {
    this.emailError = [];
    this.passwordError = [];
    this.userNameError = [];
  }
}
