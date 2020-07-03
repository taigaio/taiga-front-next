// /**
//  * Copyright (c) 2014-2020 Taiga Agile LLC
//  *
//  * This source code is licensed under the terms of the
//  * GNU Affero General Public License found in the LICENSE file in
//  * the root directory of this source tree.
//  */

import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';

import { ConfigService } from '@/app/config.service';
import { ConfigServiceMock } from '@/app/config.service.mock';

import { TasksApiService } from './tasks-api.service';
import * as faker from 'faker';
import { UtilsService } from '@/app/commons/utils/utils-service.service';
import { TaskCreationDataMockFactory } from './tasks.model.mock';


describe('TasksApiService', () => {
  let spectator: SpectatorHttp<TasksApiService>;
  const createHttp = createHttpFactory({
    service: TasksApiService,
    providers: [
      {
        provide: ConfigService,
        useValue: ConfigServiceMock,
      },
    ],
  });

  beforeEach(() => spectator = createHttp());

  it('list', () => {
    const filter = {
      project: faker.random.number(),
      statusIsClosed: faker.random.boolean(),
    };

    const expectedParams = {
      project: filter.project,
      status__is_closed: filter.statusIsClosed,
    };

    spectator.service.list(filter).subscribe();
    spectator.expectOne(
      `${ConfigServiceMock.apiUrl}/tasks?${UtilsService.buildQueryParams(expectedParams)}`,
      HttpMethod.GET
    );
  });

  it('create', () => {
    const data = TaskCreationDataMockFactory.build();

    spectator.service.create(data).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/tasks`, HttpMethod.POST);
    expect(req.request.body).toEqual(data);
  });
});
