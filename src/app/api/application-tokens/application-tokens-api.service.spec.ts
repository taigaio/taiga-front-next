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
import faker from 'faker';
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
    const tokenId = faker.random.alphaNumeric();
    spectator.service.get(tokenId).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/application-tokens/${tokenId}`, HttpMethod.GET);
  });

  it('delete', () => {
    const tokenId = faker.random.alphaNumeric();
    spectator.service.delete(tokenId).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/application-tokens/${tokenId}`, HttpMethod.DELETE);
  });

  it('authorize', () => {
    const authorizationInput = {
      application: faker.random.alphaNumeric(),
      state: faker.random.word(),
    };

    spectator.service.authorize(authorizationInput).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/application-tokens/authorize`, HttpMethod.POST);
    expect(req.request.body).toEqual(authorizationInput);
  });


  it('getToken', () => {
    const validateInput = {
      application: faker.random.alphaNumeric(),
      authCode: faker.random.alphaNumeric(),
      state: faker.random.word(),
    };

    spectator.service.validate(validateInput).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/application-tokens/validate`, HttpMethod.POST);
    expect(req.request.body).toEqual(validateInput);
  });
});
