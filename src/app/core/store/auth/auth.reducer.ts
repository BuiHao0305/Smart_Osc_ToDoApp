import { createReducer, on } from '@ngrx/store';
import { LoginFailure, LoginSuccess, Logout, StartLogin } from './auth.action';

export interface AuthState {
  loggedIn: boolean;
  isLoggingIn: boolean;
  error?: string;
}

export const initialState: AuthState = {
  loggedIn: false,
  isLoggingIn: false,
  error: undefined,
};

export const authReducer = createReducer(
  initialState,
  on(StartLogin, (state) => {
    return {
      ...state,
      isLoggingIn: true,
    };
  }),
  on(LoginSuccess, (state) => {
    return {
      ...state,
      loggedIn: true,
      isLoggingIn: false,
    };
  }),
  on(LoginFailure, (state, { error }) => {
    return {
      ...state,
      loggedIn: false,
      isLoggingIn: false,
      error,
    };
  }),
  on(Logout, (state) => ({
    ...state,
    loggedIn: false,
    isLoggingIn: false,
    error: undefined,
  })),
);
