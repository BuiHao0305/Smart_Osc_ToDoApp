import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { AuthServiceService } from './services/auth-service.service';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { TokenInterceptor } from './core/interceptors/token-interceptor.interceptor';
import { provideStore } from '@ngrx/store';
import { authReducer } from './core/store/auth/auth.reducer';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './core/store/auth/auth.effects';
import { translationProviders } from './shared/config/translations.providers';
import { animationsProviders } from './shared/config/animations.providers';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    AuthServiceService,
    provideRouter(appRoutes),
    provideClientHydration(),
    provideHttpClient(withFetch()),  
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    
    provideStore({ auth: authReducer }),
    provideEffects([AuthEffects]),
    ...animationsProviders,
    ...translationProviders,
    provideAnimationsAsync(), 
  ],
};
