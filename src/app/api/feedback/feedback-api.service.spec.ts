/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { createHttpFactory, SpectatorHttp, HttpMethod } from '@ngneat/spectator';

import { ConfigService } from '@/app/config.service';
import { ConfigServiceMock } from '@/app/config.service.mock';
import * as faker from 'faker';

import { FeedbackApiService } from './feedback-api.service';

describe('FeedbackApiService', () => {

  let spectator: SpectatorHttp<FeedbackApiService>;
  const createHttp = createHttpFactory({
    service: FeedbackApiService,
    providers: [
      { provide: ConfigService, useValue: ConfigServiceMock },
    ],
  });

  beforeEach(() => spectator = createHttp());

  it('create', () => {
    const comment = faker.lorem.paragraph();

    spectator.service.create(comment).subscribe();

    const req = spectator.expectOne(
      `${ConfigServiceMock.apiUrl}/feedback`,
      HttpMethod.POST
    );
    expect(req.request.body).toEqual(comment);
  });
});
