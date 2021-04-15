/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';

import { ConfigService } from '@/app/config.service';
import { ConfigServiceMock } from '@/app/config.service.mock';
import { CurrentUserApiService } from './current-user-api.service';

describe('CurrentUserApiService', () => {
  let spectator: SpectatorHttp<CurrentUserApiService>;
  const createHttp = createHttpFactory({
    service: CurrentUserApiService,
    providers: [
      { provide: ConfigService, useValue: ConfigServiceMock },
    ],
  });

  beforeEach(() => spectator = createHttp());

  it('get current user data', () => {
    spectator.service.getCurrentUser().subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/me`, HttpMethod.GET);
  });
});
