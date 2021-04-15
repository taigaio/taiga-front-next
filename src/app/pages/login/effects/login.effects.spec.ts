/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { provideMockActions } from '@ngrx/effects/testing';
import { marbles } from 'rxjs-marbles/jest';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import * as faker from 'faker';

import { LoginEffects } from './login.effects';
import { login, loginSuccess, loginFailure } from '../actions/login.actions';
import { LoginInput } from '@/app/api/auth/auth.model';
import { AuthApiService } from '@/app/api/auth/auth-api.service';
import { AuthMockFactory } from '@/app/api/auth/auth.model.mock';
import { LocalStorageService } from '@/app/commons/local-storage/local-storage.service';

describe('LoginEffects', () => {
  let actions$: Observable<Action>;
  let spectator: SpectatorService<LoginEffects>;
  const createService = createServiceFactory({
    service: LoginEffects,
    providers: [
      provideMockActions(() => actions$),
    ],
    mocks: [
      AuthApiService,
      LocalStorageService,
    ],
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('login success', marbles(m => {
    const loginData: LoginInput = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      type: 'normal',
    };
    const response = AuthMockFactory.build();
    const authApiService = spectator.inject(AuthApiService);
    const effects = spectator.inject(LoginEffects);

    authApiService.login.and.returnValue(
      m.cold('-b|', { b: response })
    );

    actions$ = m.hot('-a', { a:  login({ data: loginData })});

    const expected = m.cold('--a', {
      a: loginSuccess({ data: response }),
    });

    m.expect(
      effects.login$
    ).toBeObservable(expected);
  }));

  it('login error', marbles(m => {
    const loginData: LoginInput = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      type: 'normal',
    };
    const authApiService = spectator.inject(AuthApiService);
    const effects = spectator.inject(LoginEffects);
    const error = 'Something goes wrong';

    authApiService.login.and.returnValue(
      m.cold('-#|', {}, {error})
    );

    actions$ = m.hot('-a', { a:  login({ data: loginData })});

    const expected = m.cold('--a', {
      a: loginFailure({ error }),
    });

    m.expect(
      effects.login$
    ).toBeObservable(expected);
  }));

  it('on login success store the token in localStorage', marbles(m => {
    const localStorageService = spectator.inject(LocalStorageService);
    const response = AuthMockFactory.build();
    const effects = spectator.inject(LoginEffects);

    actions$ = m.hot('-a', { a:  loginSuccess({ data: response })});

    effects.loginSuccess$.subscribe();
    m.flush();

    expect(localStorageService.set).toHaveBeenCalledWith('token', response.authToken);
  }));
});
