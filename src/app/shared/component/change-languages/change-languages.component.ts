import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-change-languages',
  templateUrl: './change-languages.component.html',
  styleUrls: ['./change-languages.component.scss'],
  standalone: true,
  imports: [TranslateModule],
})
export class ChangeLanguagesComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const lang = this.getSessionStorageItem('lang') || 'vi';
    this.translate.use(lang);
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    this.cdr.detectChanges();
    this.setSessionStorageItem('lang', lang);
  }

  private getSessionStorageItem(key: string): string | null {
    if (typeof sessionStorage !== 'undefined') {
      return sessionStorage.getItem(key);
    }
    return null;
  }

  private setSessionStorageItem(key: string, value: string): void {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem(key, value);
    }
  }
}
