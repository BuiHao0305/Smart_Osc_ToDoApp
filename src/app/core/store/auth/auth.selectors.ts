import { createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

const selectAuthState = (state: any): AuthState => state.auth;

export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

export const selectError = createSelector(
    selectAuthState,
    (state: AuthState) => state.error ? state.error.message : null
  );
export const selectLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.loading
);
