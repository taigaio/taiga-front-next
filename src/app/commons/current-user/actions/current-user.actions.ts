/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { createAction, props } from '@ngrx/store';
import { User } from '@/app/api/users/users.model';

export const loadCurrentUser = createAction(
  '[CurrentUser] Load CurrentUser'
);

export const loadCurrentUserSuccess = createAction(
  '[CurrentUser] Load CurrentUser Success',
  props<{ data: User }>()
);

export const loadCurrentUserFailure = createAction(
  '[CurrentUser] Load CurrentUser Failure',
  props<{ error: any }>()
);

export const loadCurrentUserAfterLoginSuccess = createAction(
  '[CurrentUser] Load CurrentUser After Login Success',
  props<{ data: User }>()
);
