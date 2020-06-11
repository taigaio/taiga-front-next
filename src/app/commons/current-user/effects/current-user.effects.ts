/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as CurrentUserActions from '../actions/current-user.actions';

@Injectable()
export class CurrentUserEffects {

  loadCurrentUser$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CurrentUserActions.loadCurrentUser),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => CurrentUserActions.loadCurrentUserSuccess({ data })),
          catchError(error => of(CurrentUserActions.loadCurrentUserFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions) {}

}
