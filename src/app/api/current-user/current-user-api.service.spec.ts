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
