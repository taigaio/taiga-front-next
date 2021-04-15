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
