import { createAction, props } from '@ngrx/store';

export const StartLogin = createAction('[Login Page] Start Login');

export const Login = createAction(
  '[Login Page] Login',
  props<{ email: string; password: string }>()
);

export const LoginSuccess = createAction(
  '[Auth API] Login Success',
  props<{ access_token: string; role: string; message: string }>()
);

export const LoginFailure = createAction(
  '[Auth API] Login Failure',
  props<{ error: string }>()
);

export const Logout = createAction('[Auth] Logout');
