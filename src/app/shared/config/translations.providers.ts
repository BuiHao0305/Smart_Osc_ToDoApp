import { HttpClient } from '@angular/common/http';

import {
  IModuleTranslationOptions,
  ModuleTranslateLoader,
} from '@larscom/ngx-translate-module-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http, './assets/i18n/sign-in/', '.json');
// }

// export function HttpLoaderFactory(_httpBackend: HttpBackend) {
//   return new MultiTranslateHttpLoader(_httpBackend, [
//     '/assets/i18n/sign-in/',
//     '/assets/i18n/sign-up/',
//   ]);
// }

export function HttpLoaderFactory(http: HttpClient) {
  const baseTranslateUrl = 'assets/i18n';

  const options: IModuleTranslationOptions = {
    modules: [
      { baseTranslateUrl: `${baseTranslateUrl}/sign-in` },
      { baseTranslateUrl: `${baseTranslateUrl}/sign-up` },
      { baseTranslateUrl: `${baseTranslateUrl}/forgot-password` },
      { baseTranslateUrl: `${baseTranslateUrl}/layout` },
      { baseTranslateUrl: `${baseTranslateUrl}/bucket` },
      { baseTranslateUrl: `${baseTranslateUrl}/dashboard` },
      { baseTranslateUrl: `${baseTranslateUrl}/profile` },
      { baseTranslateUrl: `${baseTranslateUrl}/bucket-modal` },
      { baseTranslateUrl: `${baseTranslateUrl}/bucket-items` },
      { baseTranslateUrl: `${baseTranslateUrl}/bucket-items-modal` }
    ],
    lowercaseNamespace: true,
  };
  return new ModuleTranslateLoader(http, options);
}

export const translationProviders = [
  TranslateModule.forRoot({
    defaultLanguage: 'vi',
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient],
    },
  }).providers!,
];
