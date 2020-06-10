/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
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
