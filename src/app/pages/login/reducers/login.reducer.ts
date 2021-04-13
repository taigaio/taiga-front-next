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
