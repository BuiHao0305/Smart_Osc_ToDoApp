import { createReducer, on } from '@ngrx/store';
import { SignInResponse, SignUpResponse, ErrorResponse } from '../type/auth.type';
import { authActions } from './auth.action';

export interface AuthState {
  user: SignInResponse | null;
  signupUser: SignUpResponse | null;
  error: ErrorResponse | null;
  signupError: ErrorResponse | null;
  loading: boolean;
  signupLoading: boolean;
}

export const initialState: AuthState = {
  user: null,
  signupUser: null,
  error: null,
  signupError: null,
  loading: false,
  signupLoading: false,
};

export const authReducer = createReducer(
  initialState,

  //login
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
  })),

  //signup
  on(authActions.signUp, (state) => ({
    ...state,
    signupLoading: true,
    signupError: null,
  })),
  on(authActions.signUpSuccess, (state, { signup }) => ({
    ...state,
    signupUser: signup,
    signupLoading: false,
    signupError: null,
  })),
  on(authActions.signUpError, (state, { error }) => ({
    ...state,
    signupError: error,
    signupLoading: false,
  })),

  //logout
  on(authActions.logOut, (state) => ({
    ...state,
    user: null,
    signupUser: null,
    loading: false,
    signupLoading: false,
    error: null,
    signupError: null,
  }))
);
