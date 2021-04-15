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
