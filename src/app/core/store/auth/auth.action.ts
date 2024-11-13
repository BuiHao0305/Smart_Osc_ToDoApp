import {createActionGroup, props} from "@ngrx/store";

import { ErrorResponse, SignIn, SignInResponse } from "../type/auth.type";

export const authActions = createActionGroup({
  source: '[Auth]',
  events: {
    'Login': props<{ signInData: SignIn }>(),
    'Login success': props<{ user: SignInResponse }>(), 
    'Login error': props<{ error: ErrorResponse }>(),
  }
})