import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { SignInServiceService } from 'src/app/services/authentication/sign-in.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { authActions } from './auth.action';
import { SignUpService } from 'src/app/services/authentication/sign-up.service';


@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private signInService: SignInServiceService,
    private authService: AuthServiceService,
    private signUpService: SignUpService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      mergeMap(({ signInData }) =>
        this.signInService.login(signInData).pipe(
          map((response) => {
            this.authService.saveToken(response.access_token);
            console.log(response);
            
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
      ofType(authActions.loginSuccess),
      mergeMap(() => 
        this.signInService.getUserInfo().pipe( 
          map((userInfo) => {
            console.log('Thông tin người dùng từ API:', userInfo);
            return authActions.user({ userInfo });
          }),
          tap((action) => {
            localStorage.setItem('userInfo', JSON.stringify(action.userInfo));
          }),
          catchError((error) => {
            return of(authActions.userError({ error }));
          })
        )
      )
    )
  );
}
