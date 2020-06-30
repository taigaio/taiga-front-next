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

  it('List ALL tasks filter by project', () => {
    const filter = {
      project: 1,
    };

    const query = {
      project: '1',
    };
    spectator.service.list(filter).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics?${new URLSearchParams(query)}`, HttpMethod.GET);
  });
});
