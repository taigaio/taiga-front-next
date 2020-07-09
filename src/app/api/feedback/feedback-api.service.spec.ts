/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
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
