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

import * as LoginActions from '@/app/pages/login/actions/login.actions';
import { CurrentUserApiService } from '@/app/api/current-user/current-user-api.service';
import * as CurrentUserActions from '../actions/current-user.actions';

@Injectable()
export class CurrentUserEffects {

  loadCurrentUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CurrentUserActions.loadCurrentUser),
      exhaustMap(() =>
        this.currentUserApiService
          .getCurrentUser()
          .pipe(
            map(data => CurrentUserActions.loadCurrentUserSuccess({ data })),
            catchError(({ error }) => of(CurrentUserActions.loadCurrentUserFailure({ error })))
          )
      )
    );
  });

  loadCurrentUserAfterLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginActions.loginSuccess),
      map(data => {
        return CurrentUserActions.loadCurrentUserAfterLoginSuccess(data);
      })
    );
  });

  constructor(private actions$: Actions,
              private currentUserApiService: CurrentUserApiService) {}
}
