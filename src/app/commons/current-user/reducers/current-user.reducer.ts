/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { createReducer, on } from '@ngrx/store';
import * as CurrentUserActions from '../actions/current-user.actions';
import { User } from '@/app/api/users/users.model';

export const currentUserFeatureKey = 'currentUser';

export interface CurrentUserState {
  profile?: User;
  error: any;
  loading: boolean;
}

export const initialState: CurrentUserState = {
  profile: undefined,
  error: null,
  loading: false,
};

export const reducer = createReducer(
  initialState,

  on(CurrentUserActions.loadCurrentUser, state => {
    return {
      ...state,
      error: null,
      loading: true,
    };
  }),
  on(CurrentUserActions.loadCurrentUserSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      profile: action.data,
    };
  }),
  on(CurrentUserActions.loadCurrentUserFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false,
    };
  }),
  on(CurrentUserActions.loadCurrentUserAfterLoginSuccess, (state, action) => {
    return {
      ...state,
      profile: action.data,
    };
  })
);
