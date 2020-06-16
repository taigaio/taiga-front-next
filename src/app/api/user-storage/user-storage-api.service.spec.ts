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
