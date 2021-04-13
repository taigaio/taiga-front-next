import { createFeatureSelector } from '@ngrx/store';
import * as fromCurrentUser from '../reducers/current-user.reducer';

export const selectCurrentUserState = createFeatureSelector<fromCurrentUser.CurrentUserState>(
  fromCurrentUser.currentUserFeatureKey
);
