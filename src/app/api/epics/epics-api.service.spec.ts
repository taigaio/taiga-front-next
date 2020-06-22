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
// import * as faker from 'faker';
import { EpicsApiService } from './epics-api.service';

describe('EpicsApiService', () => {
  let spectator: SpectatorHttp<EpicsApiService>;
  const createHttp = createHttpFactory({
    service: EpicsApiService,
    providers: [
      {
        provide: ConfigService,
        useValue: ConfigServiceMock,
      },
    ],
  });

  beforeEach(() => spectator = createHttp());

  const project = 1;
  // const milestone = 2;
  // const username = faker.internet.email();

  it('List ALL Epics by project', () => {
    const filter = {
      project,
    };

    const query = {
      project: project.toString(),
    };
    spectator.service.list(filter).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics?${new URLSearchParams(query)}`, HttpMethod.GET);
  });
});
