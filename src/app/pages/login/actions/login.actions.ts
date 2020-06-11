/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
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
