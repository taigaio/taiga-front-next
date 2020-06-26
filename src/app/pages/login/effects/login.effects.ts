/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
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
