import { Route } from '@angular/router';
import { NotFoundComponent } from './shared/component/not-found/not-found.component';
import { guardGuard } from './core/guard/guard.guard';

export const appRoutes: Route[] = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () =>
      import('./modules/authentication/authentication-routing').then(
        (m) => m.authenticationRoutes
      ),
  },
  {
    path: 'layout',
    loadChildren: () =>
      import('./modules/layout/layout-routing').then((m) => m.layoutRoutes),
    canActivate: [guardGuard],
  },
  {
    path: 'notfound',
    component: NotFoundComponent,
  },
  { path: '**', redirectTo: '/notfound' },
];
