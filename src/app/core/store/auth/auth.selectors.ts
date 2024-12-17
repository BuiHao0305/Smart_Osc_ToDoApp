import { createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export interface RootState {
  auth: AuthState;
}

const selectAuthState = (state: any): AuthState => state.auth;

export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);
export const selectError = createSelector(selectAuthState, (state: AuthState) =>
  state.error ? state.error.message : null
);
export const selectLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.loading
);

export const selectSignUpUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.signupUser
);

export const selectSignUpError = createSelector(
  selectAuthState,
  (state: AuthState) => (state.signupError ? state.signupError.message : null)
);
export const selectSignUpSuccess = createSelector(
  selectAuthState,
  (state) => state.signUpSuccess
);

export const selectUserInfo = createSelector(
  selectAuthState,
  (state: AuthState) => state.userInfo
);
export const selectUserError = createSelector(
  selectAuthState,
  (state: AuthState) => (state.error ? state.error.message : null)
);
