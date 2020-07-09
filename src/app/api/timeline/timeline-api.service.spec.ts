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
import { TimelineApiService } from './timeline-api.service';
import * as faker from 'faker';

describe('TimelineApiService', () => {
  let spectator: SpectatorHttp<TimelineApiService>;
  const createHttp = createHttpFactory({
    service: TimelineApiService,
    providers: [
      {
        provide: ConfigService,
        useValue: ConfigServiceMock,
      },
    ],
  });

  beforeEach(() => spectator = createHttp());

  it('user timeline', () => {
    const id = faker.random.number();
    spectator.service.user(id).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/timeline/user/${id}`, HttpMethod.GET);
  });

  it('profile timeline', () => {
    const id = faker.random.number();
    spectator.service.profile(id).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/timeline/profile/${id}`, HttpMethod.GET);
  });

  it('project timeline', () => {
    const id = faker.random.number();
    spectator.service.project(id).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/timeline/project/${id}`, HttpMethod.GET);
  });
});
