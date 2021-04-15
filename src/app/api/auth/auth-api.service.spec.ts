/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { AuthApiService } from './auth-api.service';
import { ConfigService } from '@/app/config.service';
import { ConfigServiceMock } from '@/app/config.service.mock';
import { LoginInput, PublicRegistryInput } from './auth.model';
import * as faker from 'faker';

describe('AuthApiService', () => {
  let spectator: SpectatorHttp<AuthApiService>;
  const createHttp = createHttpFactory({
    service: AuthApiService,
    providers: [
      { provide: ConfigService, useValue: ConfigServiceMock },
    ],
  });

  beforeEach(() => spectator = createHttp());

  it('login', () => {
    const data: LoginInput = {
      type: 'normal',
      password: '123123',
      username: 'admin',
    };
    spectator.service.login(data).subscribe();
    const call = spectator.expectOne(`${ConfigServiceMock.apiUrl}/auth`, HttpMethod.POST);
    expect(call.request.body).toEqual(data);
  });

  it('register', () => {
    const data: PublicRegistryInput = {
      type: 'public',
      username: faker.internet.userName(),
      password: faker.internet.password(),
      email: faker.internet.email(),
      fullName: faker.name.findName(),
      acceptedTerms: faker.random.boolean(),
    };
    spectator.service.register(data).subscribe();
    const call = spectator.expectOne(`${ConfigServiceMock.apiUrl}/auth/register`, HttpMethod.POST);
    expect(call.request.body).toEqual(data);
  });
});
