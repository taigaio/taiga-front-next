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

import { ApplicationsApiService } from './applications-api.service';

describe('ApplicationsApiService', () => {
  let spectator: SpectatorHttp<ApplicationsApiService>;

  const createHttp = createHttpFactory({
    service: ApplicationsApiService,
    providers: [
      { provide: ConfigService, useValue: ConfigServiceMock },
    ],
  });

  beforeEach(() => spectator = createHttp());

  it('get', () => {
    const tokenId = '123';
    spectator.service.get(tokenId).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/applications/${tokenId}`, HttpMethod.GET);
  });

  it('getToken', () => {
    const tokenId = '123';
    spectator.service.getToken(tokenId).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/applications/${tokenId}/token`, HttpMethod.GET);
  });
});
