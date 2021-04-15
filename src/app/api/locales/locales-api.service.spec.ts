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
import { LocalesApiService } from './locales-api.service';

describe('LocalesApiService', () => {
  let spectator: SpectatorHttp<LocalesApiService>;
  const createHttp = createHttpFactory({
    service: LocalesApiService,
    providers: [
      {
        provide: ConfigService,
        useValue: ConfigServiceMock,
      },
    ],
  });

  beforeEach(() => spectator = createHttp());

  it('get locales', () => {
    spectator.service.get().subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/locales`, HttpMethod.GET);
  });
});
