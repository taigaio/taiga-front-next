/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
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
