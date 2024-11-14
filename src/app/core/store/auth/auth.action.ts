import { createActionGroup, props } from '@ngrx/store';
import { ErrorResponse, SignIn, SignInResponse } from '../type/auth.type';

export const authActions = createActionGroup({
  source: '[Auth]',
  events: {
    'Login': props<{ signInData: SignIn }>(),             
    'Login Success': props<{ user: SignInResponse }>(),
    'Login Error': props<{ error: ErrorResponse }>(),    
  }
});
