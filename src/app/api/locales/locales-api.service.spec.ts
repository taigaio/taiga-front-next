/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
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
