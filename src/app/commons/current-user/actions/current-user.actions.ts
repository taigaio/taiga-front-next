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
