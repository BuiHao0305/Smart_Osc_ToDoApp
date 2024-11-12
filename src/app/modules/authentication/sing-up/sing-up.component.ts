import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppLang } from 'src/app/core/enum/languages.enum';
import { AppLangService } from 'src/app/services/app-lang.service';
import { ChangeLanguagesComponent } from 'src/app/shared/component/change-languages/change-languages.component';

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

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private appLangService: AppLangService
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      userName: ['', Validators.required],
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
  validationRegister() {
    this.emailError = [];
    this.passwordError = [];
    this.userNameError = [];
    console.log(this.registerForm.value);
  }
}
