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
