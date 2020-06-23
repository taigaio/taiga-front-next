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
import { EpicsApiService } from './epics-api.service';
import { EpicCreationMockFactory } from './epics.model.mock';

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
  const epic = 2;
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
    const data = EpicCreationMockFactory.build();

    const body = {
      ...(data.assignedTo && { assigned_to: data.assignedTo }),
      ...(data.blockedNote && { blocked_note: data.blockedNote }),
      ...(data.description && { description: data.description }),
      ...(data.isBlocked && { is_blocked: data.isBlocked }),
      ...(data.isClosed && { is_closed: data.isClosed }),
      ...(data.color && { color: data.color }),
      ...(data.tags && { tags: data.tags }),
      ...(data.watchers && { watchers: data.watchers }),
      project: data.project,
      subject: data.subject,
    };

    spectator.service.create(data).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics`, HttpMethod.POST);

    expect(req.request.body).toEqual(body);
  });

  it('get epic', () => {
    spectator.service.get(epic).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/${epic}`, HttpMethod.GET);
  });
});
