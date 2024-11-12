// src/app/app-routing.ts
import { Route } from '@angular/router';
import { layoutRoutes } from './modules/layout/layout-routing';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/authentication/authentication-routing').then(
        (m) => m.authenticationRoutes
      ),
  },
  ...layoutRoutes,
];
