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
import * as faker from 'faker';
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

  it('create epic', () => {
    const data = {
      assignedTo: 1,
      blockedNote: 'string',
      description: 'string',
      isBlocked: true,
      isClosed: false,
      color: 'string',
      project: 1,
      subject: 'string',
      tags: ['string'],
      watchers: [1],
    };

    const body = {
      assigned_to: data.assignedTo,
      blocked_note: data.blockedNote,
      description: data.description,
      is_blocked: data.isBlocked,
      is_closed: data.isClosed,
      color: data.color,
      project: data.project,
      subject: data.subject,
      tags: data.tags,
      watchers: data.watchers,
    };

    spectator.service.create(data).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics`, HttpMethod.POST);

    expect(req.request.body).toEqual(body);
  });
});
