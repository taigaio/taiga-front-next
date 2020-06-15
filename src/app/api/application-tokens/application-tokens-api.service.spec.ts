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

import { ApplicationTokensApiService } from './application-tokens-api.service';

describe('ApplicationTokenApiService', () => {
  let spectator: SpectatorHttp<ApplicationTokensApiService>;

  const createHttp = createHttpFactory({
    service: ApplicationTokensApiService,
    providers: [
      { provide: ConfigService, useValue: ConfigServiceMock },
    ],
  });

  beforeEach(() => spectator = createHttp());

  it('list', () => {
    spectator.service.list().subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/application-tokens`, HttpMethod.GET);
  });

  it('get', () => {
    const tokenId = '123';
    spectator.service.get(tokenId).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/application-tokens/${tokenId}`, HttpMethod.GET);
  });

  it('delete', () => {
    const tokenId = '123';
    spectator.service.delete(tokenId).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/application-tokens/${tokenId}`, HttpMethod.DELETE);
  });

  it('authorize', () => {
    const authorizationInput = {
      application: '123',
      state: 'random-state',
    };

    spectator.service.authorize(authorizationInput).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/application-tokens/authorize`, HttpMethod.POST);
    expect(req.request.body).toEqual(authorizationInput);
  });


  it('getToken', () => {
    const validateInput = {
      application: '123',
      auth_code: 'xx-yy',
      state: 'random-state',
    };

    spectator.service.validate(validateInput).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/application-tokens/validate`, HttpMethod.POST);
    expect(req.request.body).toEqual(validateInput);
  });
});
