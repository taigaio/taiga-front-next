
/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { ConfigService } from '@/app/config.service';
import { SpectatorHttp, createHttpFactory, HttpMethod } from '@ngneat/spectator';
import { ConfigServiceMock } from '@/app/config.service.mock';
import * as faker from 'faker';
import { TasksCustomAttributesValueApiService } from './tasks-custom-attributes-value-api.service';


describe('TaskCustomAttributeValuesApiService', () => {
  let spectator: SpectatorHttp<TasksCustomAttributesValueApiService>;
  const createHttp = createHttpFactory({
    service: TasksCustomAttributesValueApiService,
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
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/task-custom-attributes/${id}`, HttpMethod.GET);
  });

  it('put', () => {
    const id = faker.random.number();
    const data = {
      test: faker.random.word(),
    };

    spectator.service.put(id, data).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/task-custom-attributes/${id}`, HttpMethod.PUT);
    expect(req.request.body).toEqual(data);
  });

  it('patch', () => {
    const id = faker.random.number();
    const data = {
      test: faker.random.word(),
    };

    spectator.service.patch(id, data).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/task-custom-attributes/${id}`, HttpMethod.PATCH);
    expect(req.request.body).toEqual(data);
  });
});
