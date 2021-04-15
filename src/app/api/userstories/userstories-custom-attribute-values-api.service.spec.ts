/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { ConfigService } from '@/app/config.service';
import { SpectatorHttp, createHttpFactory, HttpMethod } from '@ngneat/spectator';
import { ConfigServiceMock } from '@/app/config.service.mock';
import * as faker from 'faker';
import { UserstoriesCustomAttributeValuesApiService } from '@/app/api/userstories/userstories-custom-attribute-values-api.service';

describe('UserstoriesCustomAttributeValuesApiService', () => {
  let spectator: SpectatorHttp<UserstoriesCustomAttributeValuesApiService>;
  const createHttp = createHttpFactory({
    service: UserstoriesCustomAttributeValuesApiService,
    providers: [
      {
        provide: ConfigService,
        useValue: ConfigServiceMock,
      },
    ],
  });

  beforeEach(() => spectator = createHttp());

  it('get', () => {
    const id = faker.random.number();
    spectator.service.get(id).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories/custom-attributes-values/${id}`, HttpMethod.GET);
  });

  it('put', () => {
    const id = faker.random.number();
    const data = {
      test: faker.random.word(),
    };

    spectator.service.put(id, data).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories/custom-attributes-values/${id}`, HttpMethod.PUT);
    expect(req.request.body).toEqual(data);
  });

  it('patch', () => {
    const id = faker.random.number();
    const data = {
      test: faker.random.word(),
    };

    spectator.service.patch(id, data).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories/custom-attributes-values/${id}`, HttpMethod.PATCH);
    expect(req.request.body).toEqual(data);
  });
});
