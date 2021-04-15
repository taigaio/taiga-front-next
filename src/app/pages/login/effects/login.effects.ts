/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as LoginActions from '../actions/login.actions';
import { AuthApiService } from '@/app/api/auth/auth-api.service';
import { LocalStorageService } from '@/app/commons/local-storage/local-storage.service';

@Injectable()
export class LoginEffects {

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginActions.login),
      exhaustMap((action) => {
        return this.authApiService.login({
          ...action.data,
          type: 'normal',
        }).pipe(
          map(data => LoginActions.loginSuccess({ data })),
          catchError(({ error }) => of(LoginActions.loginFailure({ error })))
        );
      })
    );
  });

  loginSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginActions.loginSuccess),
      map((action) => {
        this.localStorageService.set('token', action.data.authToken);
      })
    );
  }, { dispatch: false });

  constructor(private actions$: Actions,
              private readonly authApiService: AuthApiService,
              private readonly localStorageService: LocalStorageService) {}

}
