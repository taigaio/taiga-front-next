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
import {
  EpicCreationMockFactory,
  EpicCreationInBulkMockFactory,
  RelatedUserStoryCreationInBulkMockFactory,
  AttachmentCreationMockFactory
} from './epics.model.mock';
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
  const attachment = 4;

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

    spectator.service.patch(epic, data).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/${epic}`, HttpMethod.PATCH);

    expect(req.request.body).toEqual(data);
  });


  it('delete epic', () => {
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
    const query = {
      project: project.toString(),
    };
    spectator.service.getFilters(project).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/filters_data?${new URLSearchParams(query)}`, HttpMethod.GET);
  });

  it('list related User Stories', () => {
    spectator.service.listRelatedUserStories(epic).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/${epic}/related_userstories`, HttpMethod.GET);
  });

  it('create related user story', () => {
    const body = {
      epic,
      userStory,
    };

    spectator.service.createRelatedUserStory(epic, userStory).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/${epic}/related_userstories`, HttpMethod.POST);

    expect(req.request.body).toEqual(body);
  });

  it('bulk create related user stories', () => {
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
    spectator.service.getRelatedUserStory(epic, userStory).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/${epic}/related_userstories/${userStory}`, HttpMethod.GET);
  });

  it('edit related user story', () => {
    const data: EpicUserStoryPartialInput = {
      order: 100,
    };

    spectator.service.patchRelatedUserStory(epic, userStory, data).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/${epic}/related_userstories/${userStory}`, HttpMethod.PATCH);

    expect(req.request.body).toEqual(data);
  });

  it('edit related user story', () => {
    spectator.service.deleteRelatedUserStory(epic, userStory).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/${epic}/related_userstories/${userStory}`, HttpMethod.DELETE);
  });

  it('vote epic', () => {
    spectator.service.vote(epic).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/${epic}/upvote`, HttpMethod.POST);
  });

  it('downvote epic', () => {
    spectator.service.downvote(epic).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/${epic}/downvote`, HttpMethod.POST);
  });

  it('get epic voters', () => {
    spectator.service.getVoters(epic).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/${epic}/voters`, HttpMethod.GET);
  });

  it('watch epic', () => {
    spectator.service.watch(epic).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/${epic}/watch`, HttpMethod.POST);
  });

  it('unwatch epic', () => {
    spectator.service.unwatch(epic).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/${epic}/unwatch`, HttpMethod.POST);
  });

  it('get epic watchers', () => {
    spectator.service.getWatchers(epic).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/${epic}/watchers`, HttpMethod.GET);
  });

  it('get epic attachments', () => {
    const query = {
      project: project.toString(),
      object_id: epic.toString(),
    };
    spectator.service.getAttachments(project, epic).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/attachments?${new URLSearchParams(query)}`, HttpMethod.GET);
  });

  it('create epic attachment', () => {
    const mockAttachment = AttachmentCreationMockFactory.build();

    const formData = new FormData();

    formData.append('object_id', mockAttachment.objectId.toString());
    formData.append('project', mockAttachment.project.toString());
    formData.append('attached_file', mockAttachment.attachedFile, mockAttachment.attachedFile.name);

    if (mockAttachment.description) {
      formData.append('description', mockAttachment.description);
    }

    if (mockAttachment.isDeprecated) {
      formData.append('is_deprecated', mockAttachment.isDeprecated.toString());
    }

    spectator.service.createAttachment(mockAttachment).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/attachments`, HttpMethod.POST);

    expect(req.request.body).toEqual(formData);
  });

  it('get attachment', () => {
    spectator.service.getAttachment(attachment).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/attachments/${attachment}`, HttpMethod.GET);
  });

  it('edit epic attachment', () => {
    const mockAttachment = AttachmentCreationMockFactory.build();

    const formData = new FormData();

    if (mockAttachment.objectId) {
      formData.append('object_id', mockAttachment.objectId.toString());
    }

    if (mockAttachment.project) {
      formData.append('project', mockAttachment.project.toString());
    }

    if (mockAttachment.attachedFile) {
      formData.append('attached_file', mockAttachment.attachedFile, mockAttachment.attachedFile.name);
    }

    if (mockAttachment.description) {
      formData.append('description', mockAttachment.description);
    }

    if (mockAttachment.isDeprecated) {
      formData.append('is_deprecated', mockAttachment.isDeprecated.toString());
    }

    spectator.service.patchAttachment(attachment, mockAttachment).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/attachments/${attachment}`, HttpMethod.PATCH);

    expect(req.request.body).toEqual(formData);
  });

  it('delete attachment', () => {
    spectator.service.deleteAttachment(attachment).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/attachments/${attachment}`, HttpMethod.DELETE);
  });
});
