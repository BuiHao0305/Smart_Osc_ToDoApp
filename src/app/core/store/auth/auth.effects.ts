// auth.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { authActions } from './auth.action';
import { SignInResponse, ErrorResponse, SignIn } from '../type/auth.type';
import { SignInServiceService } from 'src/app/services/authentication/sign-in.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private signInService: SignInServiceService,
    private authService: AuthServiceService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login), 
      mergeMap(({ signInData }: { signInData: SignIn }) =>
        this.signInService.login(signInData).pipe(
          map((response: SignInResponse) => {
            this.authService.saveToken(response.access_token);
            return authActions.loginSuccess({ user: response });
          }),
          catchError((error: ErrorResponse) =>
            of(authActions.loginError({ error }))
          )
        )
      )
    )
  );
}
