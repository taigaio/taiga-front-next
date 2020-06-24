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
import { EpicCreationMockFactory, EpicCreationInBulkMockFactory } from './epics.model.mock';
import { EpicPartialInput, EpicUserStoryPartialInput } from './epics.model';

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
  const userStory = 3;

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
      ...(data.assignedTo && { assignedTo: data.assignedTo }),
      ...(data.blockedNote && { blockedNote: data.blockedNote }),
      ...(data.description && { description: data.description }),
      ...(data.isBlocked && { isBlocked: data.isBlocked }),
      ...(data.isClosed && { isClosed: data.isClosed }),
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

  it('edit epic', () => {
    const data: EpicPartialInput = {
      color: '#fabada',
    };

    spectator.service.edit(epic, data).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/${epic}`, HttpMethod.PATCH);

    expect(req.request.body).toEqual(data);
  });


  it('delete epic', () => {
    spectator.service.delete(epic).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/${epic}`, HttpMethod.DELETE);
  });

  it('bulk create', () => {
    const data = EpicCreationInBulkMockFactory.build();

    const body = {
      project_id: data.project,
      status_id: data.statusId,
      bulk_epics: data.bulkEpics.reduce( (accumulator: string, subject: string) => `${accumulator} /n ${subject}` ),
    };

    spectator.service.bulkCreate(data).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/bulk_create`, HttpMethod.POST);

    expect(req.request.body).toEqual(body);
  });

  it('Get Epic filters', () => {
    const query = {
      project: project.toString(),
    };
    spectator.service.getFilters(epic).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/${epic}/filters_data?${new URLSearchParams(query)}`, HttpMethod.GET);
  });

  it('list related User Stories', () => {
    spectator.service.listRelatedUserStories(epic).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/${epic}/related_userstories`, HttpMethod.GET);
  });

  it('create related user story', () => {
    const body = {
      epic,
      user_story: userStory,
    };

    spectator.service.createRelatedUserStory(epic, userStory).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/${epic}/related_userstories`, HttpMethod.POST);

    expect(req.request.body).toEqual(body);
  });

  it('get related User Story', () => {
    spectator.service.getRelatedUserStory(epic, userStory).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/${epic}/related_userstories/${userStory}`, HttpMethod.GET);
  });

  it('edit related user story', () => {
    const data: EpicUserStoryPartialInput = {
      order: 100,
    };

    spectator.service.editRelatedUserStory(epic, userStory, data).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/${epic}/related_userstories/${userStory}`, HttpMethod.PATCH);

    expect(req.request.body).toEqual(data);
  });
});
