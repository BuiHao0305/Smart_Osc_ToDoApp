import { Route } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SingUpComponent } from './sing-up/sing-up.component';

export const authenticationRoutes: Route[] = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SingUpComponent },
];
