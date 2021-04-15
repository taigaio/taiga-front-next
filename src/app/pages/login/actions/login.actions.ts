/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { createAction, props } from '@ngrx/store';
import { LoginInput, Auth } from '@/app/api/auth/auth.model';

export const login = createAction(
  '[Login] Init login',
  props<{ data: LoginInput }>()
);

export const loginSuccess = createAction(
  '[Login] Login Success',
  props<{ data: Auth }>()
);

export const loginFailure = createAction(
  '[Login] Login Failure',
  props<{ error: any }>()
);
