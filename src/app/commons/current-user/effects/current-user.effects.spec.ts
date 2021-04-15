/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { provideMockActions } from '@ngrx/effects/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { Observable } from 'rxjs';
import { marbles } from 'rxjs-marbles/jest';

import { loginSuccess } from '@/app/pages/login/actions/login.actions';
import { UserMockFactory } from '@/app/api/users/users.model.mock';
import { CurrentUserApiService } from '@/app/api/current-user/current-user-api.service';
import { AuthMockFactory } from '@/app/api/auth/auth.model.mock';
import { loadCurrentUser, loadCurrentUserSuccess, loadCurrentUserFailure, loadCurrentUserAfterLoginSuccess } from '../actions/current-user.actions';
import { CurrentUserEffects } from './current-user.effects';

describe('CurrentUserEffects', () => {
  let actions$: Observable<any>;
  let spectator: SpectatorService<CurrentUserEffects>;

  const createService = createServiceFactory({
    service: CurrentUserEffects,
    providers: [
      provideMockActions(() => actions$),
    ],
    mocks: [
      CurrentUserApiService,
    ],
  });

  beforeEach(() => {
    spectator = createService();
  });

  it('current user success', marbles(m => {
    const response = UserMockFactory.build();
    const currentUserApiService = spectator.inject(CurrentUserApiService);
    const effects = spectator.inject(CurrentUserEffects);

    currentUserApiService.getCurrentUser.and.returnValue(
      m.cold('-b|', { b: response })
    );

    actions$ = m.hot('-a', { a:  loadCurrentUser()});

    const expected = m.cold('--a', {
      a: loadCurrentUserSuccess({ data: response }),
    });

    m.expect(
      effects.loadCurrentUser$
    ).toBeObservable(expected);
  }));

  it('current user error', marbles(m => {
    const currentUserApiService = spectator.inject(CurrentUserApiService);
    const effects = spectator.inject(CurrentUserEffects);
    const error = 'Something goes wrong';

    currentUserApiService.getCurrentUser.and.returnValue(
      m.cold('-#|', {}, {error})
    );

    actions$ = m.hot('-a', { a:  loadCurrentUser()});

    const expected = m.cold('--a', {
      a: loadCurrentUserFailure({ error }),
    });

    m.expect(
      effects.loadCurrentUser$
    ).toBeObservable(expected);
  }));

  it('current user updated after login success', marbles(m => {
    const response = AuthMockFactory.build();
    const effects = spectator.inject(CurrentUserEffects);

    actions$ = m.hot('-a', { a:  loginSuccess({ data: response })});

    const expected = m.cold('-a', {
      a: loadCurrentUserAfterLoginSuccess({ data: response }),
    });

    m.expect(
      effects.loadCurrentUserAfterLogin$
    ).toBeObservable(expected);
  }));
});
