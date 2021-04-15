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
import { UserstoriesApiService } from './userstories-api.service';
import * as faker from 'faker';
import { UtilsService } from '@/app/commons/utils/utils-service.service';
import { UserstoryCreationDataMockFactory, UserstoryMockFactory, UserstoryAttachmentCreationMockFactory } from './userstories.model.mock';

describe('UserstoriesApiService', () => {
  let spectator: SpectatorHttp<UserstoriesApiService>;
  const createHttp = createHttpFactory({
    service: UserstoriesApiService,
    providers: [
      {
        provide: ConfigService,
        useValue: ConfigServiceMock,
      },
    ],
  });

  beforeEach(() => spectator = createHttp());

  it('list', () => {
    const filter = {
      project: faker.random.number(),
      milestoneIsNull: faker.random.boolean(),
      statusIsArchived: faker.random.boolean(),
      statusIsClosed: faker.random.boolean(),
    };

    const expectedParams = {
      project: filter.project,
      milestone__isnull: filter.milestoneIsNull,
      status__is_archived: filter.statusIsArchived,
      status__is_closed: filter.statusIsClosed,
    };

    spectator.service.list(filter).subscribe();
    spectator.expectOne(
      `${ConfigServiceMock.apiUrl}/userstories?${UtilsService.buildQueryParams(expectedParams)}`,
      HttpMethod.GET
    );
  });

  it('create', () => {
    const data = UserstoryCreationDataMockFactory.build();

    spectator.service.create(data).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories`, HttpMethod.POST);
    expect(req.request.body).toEqual(data);
  });

  it('get userstory', () => {
    const id = faker.random.number();
    spectator.service.get(id).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories/${id}`, HttpMethod.GET);
  });

  it('get userstory by ref', () => {
    const ref = faker.random.number();
    const project = faker.random.number();

    spectator.service.getByRef(project, ref).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories?${UtilsService.buildQueryParams({
      project,
      ref,
    })}`, HttpMethod.GET);
  });

  it('put', () => {
    const id = faker.random.number();
    const data = UserstoryMockFactory.build();

    spectator.service.put(id, data).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories/${id}`, HttpMethod.PUT);
    expect(req.request.body).toEqual(data);
  });

  it('patch', () => {
    const id = faker.random.number();
    const data = UserstoryMockFactory.build();

    spectator.service.patch(id, data).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories/${id}`, HttpMethod.PATCH);
    expect(req.request.body).toEqual(data);
  });

  it('delete userstory', () => {
    const id = faker.random.number();

    spectator.service.delete(id).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories/${id}`, HttpMethod.DELETE);
  });

  it('bulk creation', () => {
    const projectId = faker.random.number();
    const bulkStories = '1,2,3';
    const statusId = faker.random.number();

    spectator.service.bulkCreation(projectId, bulkStories, statusId).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories/bulk_create`, HttpMethod.POST);
    expect(req.request.body).toEqual({
      projectId,
      bulkStories,
      statusId,
    });
  });

  it('bulk update backlog order', () => {
    const projectId = faker.random.number();
    const bulkStories = [
      {order: faker.random.number(), usId: faker.random.number()},
    ];

    spectator.service.bulkUpdateBacklogOrder(projectId, bulkStories).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories/bulk_update_backlog_order`, HttpMethod.POST);
    expect(req.request.body).toEqual({
      projectId,
      bulkStories,
    });
  });

  it('bulk update kanban order', () => {
    const projectId = faker.random.number();
    const bulkStories = [
      {order: faker.random.number(), usId: faker.random.number()},
    ];

    spectator.service.bulkUpdateKanbanOrder(projectId, bulkStories).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories/bulk_update_kanban_order`, HttpMethod.POST);
    expect(req.request.body).toEqual({
      projectId,
      bulkStories,
    });
  });

  it('bulk update sprint order', () => {
    const projectId = faker.random.number();
    const bulkStories = [
      {order: faker.random.number(), usId: faker.random.number()},
    ];

    spectator.service.bulkUpdateSprintOrder(projectId, bulkStories).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories/bulk_update_sprint_order`, HttpMethod.POST);
    expect(req.request.body).toEqual({
      projectId,
      bulkStories,
    });
  });

  it('bulk update milestone order', () => {
    const projectId = faker.random.number();
    const milestoneId = faker.random.number();
    const bulkStories = [
      {order: faker.random.number(), usId: faker.random.number()},
    ];

    spectator.service.bulkUpdateMilestoneOrder(projectId, milestoneId, bulkStories).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories/bulk_update_sprint_order`, HttpMethod.POST);
    expect(req.request.body).toEqual({
      projectId,
      milestoneId,
      bulkStories,
    });
  });

  it('filters data', () => {
    const project = faker.random.number();

    spectator.service.filtersData(project).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories/filters_data?${UtilsService.buildQueryParams({
      project,
    })}`, HttpMethod.GET);
  });

  it('upvote', () => {
    const id = faker.random.number();

    spectator.service.upvote(id).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories/${id}/upvote`, HttpMethod.POST);
  });

  it('downvote', () => {
    const id = faker.random.number();

    spectator.service.downvote(id).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories/${id}/downvote`, HttpMethod.POST);
  });

  it('voters', () => {
    const id = faker.random.number();

    spectator.service.voters(id).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories/${id}/voters`, HttpMethod.GET);
  });

  it('watch', () => {
    const id = faker.random.number();

    spectator.service.watch(id).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories/${id}/watch`, HttpMethod.GET);
  });

  it('unwatch', () => {
    const id = faker.random.number();

    spectator.service.unwatch(id).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories/${id}/unwatch`, HttpMethod.GET);
  });

  it('watchers', () => {
    const id = faker.random.number();

    spectator.service.watchers(id).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories/${id}/watchers`, HttpMethod.GET);
  });

  it('get attachments', () => {
    const projectId = faker.random.number();
    const objectId = faker.random.number();

    spectator.service.attachments(projectId, objectId).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories/attachments?${UtilsService.buildQueryParams({
      project: projectId,
      objectId,
    })}`, HttpMethod.GET);
  });

  it('create attachment', () => {
    const mockAttachment = UserstoryAttachmentCreationMockFactory.build();

    const formData = UtilsService.buildFormData(mockAttachment);

    spectator.service.createAttachment(mockAttachment).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories/attachments`, HttpMethod.POST);

    expect(req.request.body).toEqual(formData);
  });

  it('get attachment', () => {
    const attachment = faker.random.number();

    spectator.service.getAttachment(attachment).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories/attachments/${attachment}`, HttpMethod.GET);
  });

  it('put attachment', () => {
    const attachment = faker.random.number();
    const mockAttachment = UserstoryAttachmentCreationMockFactory.build();

    const formData = UtilsService.buildFormData(mockAttachment);

    spectator.service.patchAttachment(attachment, mockAttachment).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories/attachments/${attachment}`, HttpMethod.PUT);

    expect(req.request.body).toEqual(formData);
  });

  it('delete attachment', () => {
    const attachment = faker.random.number();
    spectator.service.deleteAttachment(attachment).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstories/attachments/${attachment}`, HttpMethod.DELETE);
  });
});
