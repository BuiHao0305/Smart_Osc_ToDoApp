import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppLangService } from 'src/app/services/app-lang.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomTranslateHttpLoader implements TranslateLoader {
  constructor(
    private http: HttpClient,
    private appLangService: AppLangService
  ) {}

  getTranslation(lang: string): Observable<any> {
    const langContext = this.appLangService.getLangContext(); 
    console.log('Current Lang Context:', langContext);
    return this.http.get(`/assets/i18n/${langContext}/${lang}.json`); 
  }
}

export function HttpLoaderFactory(http: HttpClient, appLangService: AppLangService) {
  return new CustomTranslateHttpLoader(http, appLangService); // Trả về một instance của CustomTranslateHttpLoader
}

export const translationProviders = [
  TranslateModule.forRoot({
    defaultLanguage: 'en',
    loader: {
      provide: TranslateLoader,
      useFactory: (http: HttpClient, appLangService: AppLangService) =>
        HttpLoaderFactory(http, appLangService),
      deps: [HttpClient, AppLangService],
    },
  }).providers!,
];
