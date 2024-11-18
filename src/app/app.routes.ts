import { Route } from '@angular/router';
import { NotFoundComponent } from './shared/component/not-found/not-found.component';

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
    path:'layout',
    loadChildren:()=>
      import('./modules/layout/layout-routing').then(
        (m) => m.layoutRoutes
      )
  },
  {
    path: 'notfound',
    component: NotFoundComponent,
  },
];
