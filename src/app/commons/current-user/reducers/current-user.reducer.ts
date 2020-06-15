/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
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
