import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { SignInServiceService } from 'src/app/services/authentication/sign-in.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { authActions } from './auth.action';
import { SignUpService } from 'src/app/services/authentication/sign-up.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private signInService = inject(SignInServiceService);
  private authService = inject(AuthServiceService);
  private signUpService = inject(SignUpService);
  private snackbar = inject(SnackbarService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      mergeMap(({ signInData }) =>
        this.signInService.login(signInData).pipe(
          map((response) => {
            this.authService.saveToken(response.access_token);
            console.log(response);
            if (response.message) {
              this.snackbar.show(response.message);
            }
            return authActions.loginSuccess({ user: response });
          }),
          catchError((error) => {
            return of(authActions.loginError({ error }));
          })
        )
      )
    )
  );
  sign$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.signUp),
      mergeMap(({ signUpData }) =>
        this.signUpService.signUp(signUpData).pipe(
          map((response) => {
            if (response.message) {
              this.snackbar.show(response.message);
            }
            return authActions.signUpSuccess({ signup: response });
          }),
          catchError((error) => {
            return of(authActions.signUpError({ error }));
          })
        )
      )
    )
  );
  getUserInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.loginSuccess, authActions.updateUserSuccess),
      mergeMap(() =>
        this.signInService.getUserInfo().pipe(
          map((userInfo) => {
            return authActions.user({ userInfo });
          }),
          tap((action) => {
            console.log('user');
            localStorage.setItem('userInfo', JSON.stringify(action.userInfo));
            if (action.userInfo && action.userInfo.email) {
              localStorage.setItem('email', action.userInfo.email);
            }
          }),
          catchError((error) => {
            return of(authActions.userError({ error }));
          })
        )
      )
    )
  );
}
