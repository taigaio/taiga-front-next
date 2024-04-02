/**
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 *
 * Copyright (c) 2021-present Kaleidos INC
 */

import { createFeatureSelector } from '@ngrx/store';
import * as fromCurrentUser from '../reducers/current-user.reducer';

export const selectCurrentUserState = createFeatureSelector<fromCurrentUser.CurrentUserState>(
  fromCurrentUser.currentUserFeatureKey
);
