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

import { UserStorageApiService } from './user-storage-api.service';

describe('UserStorageApiService', () => {
  let spectator: SpectatorHttp<UserStorageApiService>;
  const createHttp = createHttpFactory({
    service: UserStorageApiService,
    providers: [
      { provide: ConfigService, useValue: ConfigServiceMock },
    ],
  });

  beforeEach(() => spectator = createHttp());

  it('list', () => {
    spectator.service.list().subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/user-storage`, HttpMethod.GET);
  });

  it('create', () => {
    const data = {
      test1: 'value1',
      test2: 'value2',
    };

    spectator.service.create(data).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/user-storage`, HttpMethod.POST);

    expect(req.request.body).toEqual(data);
  });

  it('get', () => {
    const key = 'test-key';

    spectator.service.get(key).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/user-storage/${key}`, HttpMethod.GET);
  });

  it('put', () => {
    const key = 'test-key';
    const data = {
      test1: 'value1',
      test2: 'value2',
    };

    spectator.service.put(key, data).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/user-storage/${key}`, HttpMethod.PUT);

    expect(req.request.body).toEqual(data);
  });

  it('patch', () => {
    const key = 'test-key';
    const data = {
      test1: 'value1',
      test2: 'value2',
    };

    spectator.service.patch(key, data).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/user-storage/${key}`, HttpMethod.PATCH);

    expect(req.request.body).toEqual(data);
  });

  it('delete', () => {
    const key = 'test-key';

    spectator.service.delete(key).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/user-storage/${key}`, HttpMethod.DELETE);
  });

});
