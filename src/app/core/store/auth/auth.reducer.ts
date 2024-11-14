import { createReducer, on } from '@ngrx/store';
import { SignInResponse, ErrorResponse } from '../type/auth.type';
import { authActions } from './auth.action'; 

export interface AuthState {
  user: SignInResponse | null;
  error: ErrorResponse | null;
  loading: boolean;
}

export const initialState: AuthState = {
  user: null,
  error: null,
  loading: false,
};

export const authReducer = createReducer(
  initialState,

  on(authActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(authActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null,
  })),

  on(authActions.loginError, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
