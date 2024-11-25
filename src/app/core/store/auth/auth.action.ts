import { createActionGroup, props } from '@ngrx/store';
import {

  ErrorResponse,
  SignIn,
  SignInResponse,
  SignUp,
  SignUpResponse,
  User,
} from '../type/auth.type';

export const authActions = createActionGroup({
  source: '[Auth]',
  events: {
    Login: props<{ signInData: SignIn }>(),
    'Login Success': props<{ user: SignInResponse }>(),
    'Login Error': props<{ error: ErrorResponse }>(),

    SignUp: props<{ signUpData: SignUp }>(),
    'SignUp Success': props<{ signup: SignUpResponse }>(),
    'SignUp Error': props<{ error: ErrorResponse }>(),

    User: props<{ userInfo: User }>(),
    'Update User Success': props<{ user: User}>,
    'User Error': props<{ error: ErrorResponse }>(),

    LogOut: props,
  },
});
