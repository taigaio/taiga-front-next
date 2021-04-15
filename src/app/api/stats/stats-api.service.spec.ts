/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { StatsApiService } from './stats-api.service';
import { ConfigService } from '@/app/config.service';
import { ConfigServiceMock } from '@/app/config.service.mock';

describe('StatsApiService', () => {
  let spectator: SpectatorHttp<StatsApiService>;
  const createHttp = createHttpFactory({
    service: StatsApiService,
    providers: [
      { provide: ConfigService, useValue: ConfigServiceMock },
    ],
  });

  beforeEach(() => spectator = createHttp());

  it('get discover data', () => {
    spectator.service.getDiscover().subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/stats/discover`, HttpMethod.GET);
  });
});
