import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { AuthServiceService } from './services/auth-service.service';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { TokenInterceptor } from './core/interceptors/token-interceptor.interceptor';
import { provideStore } from '@ngrx/store';
import { authReducer } from './core/store/auth/auth.reducer';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './core/store/auth/auth.effects';
import { translationProviders } from './shared/config/translations.providers';
import { animationsProviders } from './shared/config/animations.providers';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthTokenInterceptor } from './core/interceptors/auth-interceptor.interceptor';
import { en_US, NZ_I18N, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    AuthServiceService,
    provideRouter(appRoutes),
    provideClientHydration(),
    provideHttpClient(),
    provideHttpClient(withFetch()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true,
    },
    { provide: NZ_I18N, useValue: en_US },
    provideHttpClient(withInterceptorsFromDi()),
    provideStore({ auth: authReducer }),
    provideEffects([AuthEffects]),
    ...animationsProviders,
    ...translationProviders,
    provideAnimationsAsync(), provideNzI18n(en_US), importProvidersFrom(FormsModule), provideAnimationsAsync(), provideHttpClient(),
  ],
};
