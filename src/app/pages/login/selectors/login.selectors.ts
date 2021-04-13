import { createFeatureSelector } from '@ngrx/store';
import * as fromLogin from '../reducers/login.reducer';

export const selectLoginState = createFeatureSelector<fromLogin.LoginState>(
  fromLogin.loginFeatureKey
);
