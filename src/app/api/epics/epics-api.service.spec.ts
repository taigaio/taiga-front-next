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
import { EpicsApiService } from './epics-api.service';
import {
  EpicCreationMockFactory,
  EpicCreationInBulkMockFactory,
  RelatedUserStoryCreationInBulkMockFactory,
  AttachmentCreationMockFactory, EpicMockFactory
} from './epics.model.mock';
import { EpicPartialInput, EpicUserStoryPartialInput } from './epics.model';
import { parseQueryParams } from '@/utils/test.helpers';
import faker from 'faker';
import { UtilsService } from '@/app/commons/utils/utils-service.service';

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

  it('List ALL Epics by project', () => {
    const filter = {
      project: faker.random.number(),
    };

    const query = {
      project: filter.project.toString(),
    };
    spectator.service.list(filter).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics?${parseQueryParams(query)}`, HttpMethod.GET);
  });

  it('create epic', () => {
    const data = EpicCreationMockFactory.build();

    spectator.service.create(data).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics`, HttpMethod.POST);

    expect(req.request.body).toEqual(data);
  });

  it('get epic', () => {
    const epic = faker.random.number();

    spectator.service.get(epic).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/${epic}`, HttpMethod.GET);
  });

  it('put epic', () => {
    const epic = faker.random.number();
    const data = EpicMockFactory.build({id: epic});

    spectator.service.put(epic, data).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/${epic}`, HttpMethod.PUT);

    expect(req.request.body).toEqual(data);
  });

  it('patch epic', () => {
    const epic = faker.random.number();
    const data: EpicPartialInput = {
      color: faker.internet.color(),
    };

    spectator.service.patch(epic, data).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/${epic}`, HttpMethod.PATCH);

    expect(req.request.body).toEqual(data);
  });


  it('delete epic', () => {
    const epic = faker.random.number();

    spectator.service.delete(epic).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/${epic}`, HttpMethod.DELETE);
  });

  it('bulk create epic', () => {
    const data = EpicCreationInBulkMockFactory.build();

    const body = {
      ...data,
      bulkEpics: data.bulkEpics.reduce( (accumulator: string, subject: string) => `${accumulator} /n ${subject}` ),
    };

    spectator.service.bulkCreate(data).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/bulk_create`, HttpMethod.POST);

    expect(req.request.body).toEqual(body);
  });

  it('Get Epic filters', () => {
    const project = faker.random.number();
    const query = {
      project: project.toString(),
    };
    spectator.service.getFilters(project).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/filters_data?${parseQueryParams(query)}`, HttpMethod.GET);
  });

  it('list related User Stories', () => {
    const epic = faker.random.number();

    spectator.service.listRelatedUserStories(epic).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/${epic}/related_userstories`, HttpMethod.GET);
  });

  it('create related user story', () => {
    const data = {
      epic: faker.random.number(),
      userStory: faker.random.number(),
    };

    spectator.service.createRelatedUserStory(data.epic, data.userStory).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/${data.epic}/related_userstories`, HttpMethod.POST);

    expect(req.request.body).toEqual(data);
  });

  it('bulk create related user stories', () => {
    const epic = faker.random.number();
    const data = RelatedUserStoryCreationInBulkMockFactory.build();

    const body = {
      ...data,
      bulkUserStories: data.bulkUserStories.reduce( (accumulator: string, subject: string) => `${accumulator} /n ${subject}` ),
    };

    spectator.service.bulkCreateRelatedUserStory(epic, data).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/${epic}/related_userstories/bulk_create`, HttpMethod.POST);

    expect(req.request.body).toEqual(body);
  });

  it('get related User Story', () => {
    const epic = faker.random.number();
    const userStory = faker.random.number();

    spectator.service.getRelatedUserStory(epic, userStory).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/${epic}/related_userstories/${userStory}`, HttpMethod.GET);
  });

  it('edit related user story', () => {
    const epic = faker.random.number();
    const userStory = faker.random.number();
    const data: EpicUserStoryPartialInput = {
      order: faker.random.number(),
    };

    spectator.service.patchRelatedUserStory(epic, userStory, data).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/${epic}/related_userstories/${userStory}`, HttpMethod.PATCH);

    expect(req.request.body).toEqual(data);
  });

  it('edit related user story', () => {
    const epic = faker.random.number();
    const userStory = faker.random.number();

    spectator.service.deleteRelatedUserStory(epic, userStory).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/${epic}/related_userstories/${userStory}`, HttpMethod.DELETE);
  });

  it('vote epic', () => {
    const epic = faker.random.number();

    spectator.service.vote(epic).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/${epic}/upvote`, HttpMethod.POST);
  });

  it('downvote epic', () => {
    const epic = faker.random.number();

    spectator.service.downvote(epic).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/${epic}/downvote`, HttpMethod.POST);
  });

  it('get epic voters', () => {
    const epic = faker.random.number();

    spectator.service.getVoters(epic).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/${epic}/voters`, HttpMethod.GET);
  });

  it('watch epic', () => {
    const epic = faker.random.number();

    spectator.service.watch(epic).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/${epic}/watch`, HttpMethod.POST);
  });

  it('unwatch epic', () => {
    const epic = faker.random.number();

    spectator.service.unwatch(epic).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/${epic}/unwatch`, HttpMethod.POST);
  });

  it('get epic watchers', () => {
    const epic = faker.random.number();

    spectator.service.getWatchers(epic).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/${epic}/watchers`, HttpMethod.GET);
  });

  it('get epic attachments', () => {
    const project = faker.random.number();
    const epic = faker.random.number();

    const query = {
      project: project.toString(),
      object_id: epic.toString(),
    };
    spectator.service.getAttachments(project, epic).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/attachments?${parseQueryParams(query)}`, HttpMethod.GET);
  });

  it('create attachment', () => {
    const mockAttachment = AttachmentCreationMockFactory.build();

    const formData = UtilsService.buildFormData(mockAttachment);

    spectator.service.createAttachment(mockAttachment).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/attachments`, HttpMethod.POST);

    expect(req.request.body).toEqual(formData);
  });

  it('get attachment', () => {
    const attachment = faker.random.number();

    spectator.service.getAttachment(attachment).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/attachments/${attachment}`, HttpMethod.GET);
  });

  it('patch epic attachment', () => {
    const attachment = faker.random.number();
    const mockAttachment = AttachmentCreationMockFactory.build();
    const formData = UtilsService.buildFormData(mockAttachment);

    spectator.service.patchAttachment(attachment, mockAttachment).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/attachments/${attachment}`, HttpMethod.PATCH);

    expect(req.request.body).toEqual(formData);
  });

  it('delete attachment', () => {
    const attachment = faker.random.number();

    spectator.service.deleteAttachment(attachment).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/attachments/${attachment}`, HttpMethod.DELETE);
  });
});
