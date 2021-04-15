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

import { TasksApiService } from './tasks-api.service';
import * as faker from 'faker';
import { UtilsService } from '@/app/commons/utils/utils-service.service';
import { TaskCreationDataMockFactory, TaskMockFactory, TaskAttachmentCreationMockFactory } from './tasks.model.mock';


describe('TasksApiService', () => {
  let spectator: SpectatorHttp<TasksApiService>;
  const createHttp = createHttpFactory({
    service: TasksApiService,
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
      statusIsClosed: faker.random.boolean(),
    };

    const expectedParams = {
      project: filter.project,
      status__is_closed: filter.statusIsClosed,
    };

    spectator.service.list(filter).subscribe();
    spectator.expectOne(
      `${ConfigServiceMock.apiUrl}/tasks?${UtilsService.buildQueryParams(expectedParams)}`,
      HttpMethod.GET
    );
  });

  it('create', () => {
    const data = TaskCreationDataMockFactory.build();

    spectator.service.create(data).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/tasks`, HttpMethod.POST);
    expect(req.request.body).toEqual(data);
  });

  it('get task', () => {
    const id = faker.random.number();
    spectator.service.get(id).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/tasks/${id}`, HttpMethod.GET);
  });

  it('get task by ref and project', () => {
    const ref = faker.random.number();
    const project = faker.random.number();

    spectator.service.getByRefAndProjectId(ref, project).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/tasks?${UtilsService.buildQueryParams({
      ref,
      project,
    })}`, HttpMethod.GET);
  });

  it('get task by ref and slug', () => {
    const ref = faker.random.number();
    const projectSlug = faker.lorem.slug();

    spectator.service.getByRefAndProjectSlug(ref, projectSlug).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/tasks?${UtilsService.buildQueryParams({
      ref,
      project__slug: projectSlug,
    })}`, HttpMethod.GET);
  });

  it('put', () => {
    const id = faker.random.number();
    const data = TaskMockFactory.build();

    spectator.service.put(id, data).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/tasks/${id}`, HttpMethod.PUT);
    expect(req.request.body).toEqual(data);
  });

  it('patch', () => {
    const id = faker.random.number();
    const data = {
      subject: 'Patching subject',
      version: 1,
  };

    spectator.service.patch(id, data).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/tasks/${id}`, HttpMethod.PATCH);
    expect(req.request.body).toEqual(data);
  });

  it('delete task', () => {
    const id = faker.random.number();

    spectator.service.delete(id).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/tasks/${id}`, HttpMethod.DELETE);
  });

  it('bulk creation', () => {
    const data = {
      projectId: faker.random.number(),
      statusId: faker.random.number(),
      bulkTasks: ['1', '2', '3'],
    };
    spectator.service.bulkCreation(data).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/tasks/bulk_create`, HttpMethod.POST);
    expect(req.request.body).toEqual({
      projectId: data.projectId,
      bulkTasks: '1, 2, 3',
      statusId: data.statusId,
    });
  });

  it('filters data', () => {
    const project = faker.random.number();

    spectator.service.filters(project).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/tasks/filters_data?${UtilsService.buildQueryParams({
      project,
    })}`, HttpMethod.GET);
  });

  it('upvote', () => {
    const id = faker.random.number();

    spectator.service.upvote(id).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/tasks/${id}/upvote`, HttpMethod.POST);
  });

  it('downvote', () => {
    const id = faker.random.number();

    spectator.service.downvote(id).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/tasks/${id}/downvote`, HttpMethod.POST);
  });

  it('voters', () => {
    const id = faker.random.number();

    spectator.service.voters(id).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/tasks/${id}/voters`, HttpMethod.GET);
  });

  it('watch', () => {
    const id = faker.random.number();

    spectator.service.watch(id).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/tasks/${id}/watch`, HttpMethod.GET);
  });

  it('unwatch', () => {
    const id = faker.random.number();

    spectator.service.unwatch(id).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/tasks/${id}/unwatch`, HttpMethod.GET);
  });

  it('watchers', () => {
    const id = faker.random.number();

    spectator.service.watchers(id).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/tasks/${id}/watchers`, HttpMethod.GET);
  });

  it('get attachments', () => {
    const projectId = faker.random.number();
    const objectId = faker.random.number();

    spectator.service.attachments(projectId, objectId).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/tasks/attachments?${UtilsService.buildQueryParams({
      project: projectId,
      objectId,
    })}`, HttpMethod.GET);
  });

  it('create attachment', () => {
    const mockAttachment = TaskAttachmentCreationMockFactory.build();

    const formData = UtilsService.buildFormData(mockAttachment);

    spectator.service.createAttachment(mockAttachment).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/tasks/attachments`, HttpMethod.POST);

    expect(req.request.body).toEqual(formData);
  });

  it('get attachment', () => {
    const attachment = faker.random.number();

    spectator.service.getAttachment(attachment).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/tasks/attachments/${attachment}`, HttpMethod.GET);
  });

  it('put attachment', () => {
    const attachment = faker.random.number();
    const mockAttachment = TaskAttachmentCreationMockFactory.build();

    const formData = UtilsService.buildFormData(mockAttachment);

    spectator.service.patchAttachment(attachment, mockAttachment).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/tasks/attachments/${attachment}`, HttpMethod.PUT);

    expect(req.request.body).toEqual(formData);
  });

  it('delete attachment', () => {
    const attachment = faker.random.number();
    spectator.service.deleteAttachment(attachment).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/tasks/attachments/${attachment}`, HttpMethod.DELETE);
  });

});
