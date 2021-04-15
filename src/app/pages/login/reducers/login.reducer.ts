/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { createReducer, on, Action } from '@ngrx/store';
import * as LoginActions from '../actions/login.actions';

export const loginFeatureKey = 'login';

export interface LoginState {
  error: any;
  loading: boolean;
}

export const initialState: LoginState = {
  error: null,
  loading: false,
};

const loginReducer = createReducer(
  initialState,

  on(LoginActions.login, state => {
    return {
      ...state,
      error: null,
      loading: true,
    };
  }),
  on(LoginActions.loginSuccess, (state) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(LoginActions.loginFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false,
    };
  })
);

export function reducer(state: LoginState | undefined, action: Action) {
  return loginReducer(state, action);
}
