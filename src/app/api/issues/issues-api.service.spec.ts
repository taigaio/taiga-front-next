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
import * as faker from 'faker';
import { UtilsService } from '@/app/commons/utils/utils-service.service';
import { IssueCreationDataMockFactory, IssueMockFactory, IssueAttachmentCreationMockFactory } from './issues.model.mock';

import { IssuesApiService } from './issues-api.service';

describe('IssuesApiService', () => {
  let spectator: SpectatorHttp<IssuesApiService>;
  const createHttp = createHttpFactory({
    service: IssuesApiService,
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
      `${ConfigServiceMock.apiUrl}/issues?${UtilsService.buildQueryParams(expectedParams)}`,
      HttpMethod.GET
    );
  });

  it('create', () => {
    const data = IssueCreationDataMockFactory.build();

    spectator.service.create(data).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/issues`, HttpMethod.POST);
    expect(req.request.body).toEqual(data);
  });

  it('get issue', () => {
    const id = faker.random.number();
    spectator.service.get(id).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/issues/${id}`, HttpMethod.GET);
  });

  it('get issue by ref & slug', () => {
    const ref = faker.random.number();
    const slug = 'project-slug';

    spectator.service.getByRefAndProjectSlug(ref, slug).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/issues?${UtilsService.buildQueryParams({
      ref,
      project__slug: slug,
    })}`, HttpMethod.GET);
  });

  it('get issue by ref & project id', () => {
    const ref = faker.random.number();
    const project = faker.random.number();

    spectator.service.getByRefAndProjectId(ref, project).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/issues?${UtilsService.buildQueryParams({
      ref,
      project,
    })}`, HttpMethod.GET);
  });

  it('put', () => {
    const id = faker.random.number();
    const data = IssueMockFactory.build();

    spectator.service.put(id, data).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/issues/${id}`, HttpMethod.PUT);
    expect(req.request.body).toEqual(data);
  });

  it('patch', () => {
    const id = faker.random.number();
    const data = IssueMockFactory.build();

    spectator.service.patch(id, data).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/issues/${id}`, HttpMethod.PATCH);
    expect(req.request.body).toEqual(data);
  });

  it('delete issue', () => {
    const id = faker.random.number();

    spectator.service.delete(id).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/issues/${id}`, HttpMethod.DELETE);
  });


  it('filters data', () => {
    const project = faker.random.number();

    spectator.service.filtersData(project).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/issues/filters_data?${UtilsService.buildQueryParams({
      project,
    })}`, HttpMethod.GET);
  });

  it('upvote', () => {
    const id = faker.random.number();

    spectator.service.upvote(id).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/issues/${id}/upvote`, HttpMethod.POST);
  });

  it('downvote', () => {
    const id = faker.random.number();

    spectator.service.downvote(id).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/issues/${id}/downvote`, HttpMethod.POST);
  });

  it('voters', () => {
    const id = faker.random.number();

    spectator.service.voters(id).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/issues/${id}/voters`, HttpMethod.GET);
  });

  it('watch', () => {
    const id = faker.random.number();

    spectator.service.watch(id).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/issues/${id}/watch`, HttpMethod.GET);
  });

  it('unwatch', () => {
    const id = faker.random.number();

    spectator.service.unwatch(id).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/issues/${id}/unwatch`, HttpMethod.GET);
  });

  it('watchers', () => {
    const id = faker.random.number();

    spectator.service.watchers(id).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/issues/${id}/watchers`, HttpMethod.GET);
  });

  it('get attachments', () => {
    const projectId = faker.random.number();
    const objectId = faker.random.number();

    spectator.service.attachments(projectId, objectId).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/issues/attachments?${UtilsService.buildQueryParams({
      project: projectId,
      objectId,
    })}`, HttpMethod.GET);
  });

  it('create attachment', () => {
    const mockAttachment = IssueAttachmentCreationMockFactory.build();

    const formData = UtilsService.buildFormData(mockAttachment);

    spectator.service.createAttachment(mockAttachment).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/issues/attachments`, HttpMethod.POST);

    expect(req.request.body).toEqual(formData);
  });

  it('get attachment', () => {
    const attachment = faker.random.number();

    spectator.service.getAttachment(attachment).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/issues/attachments/${attachment}`, HttpMethod.GET);
  });

  it('put attachment', () => {
    const attachment = faker.random.number();
    const mockAttachment = IssueAttachmentCreationMockFactory.build();

    const formData = UtilsService.buildFormData(mockAttachment);

    spectator.service.putAttachment(attachment, mockAttachment).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/issues/attachments/${attachment}`, HttpMethod.PUT);

    expect(req.request.body).toEqual(formData);
  });

  it('patch attachment', () => {
    const attachment = faker.random.number();
    const mockAttachment = IssueAttachmentCreationMockFactory.build();

    const formData = UtilsService.buildFormData(mockAttachment);

    spectator.service.patchAttachment(attachment, mockAttachment).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/issues/attachments/${attachment}`, HttpMethod.PATCH);

    expect(req.request.body).toEqual(formData);
  });

  it('delete attachment', () => {
    const attachment = faker.random.number();
    spectator.service.deleteAttachment(attachment).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/issues/attachments/${attachment}`, HttpMethod.DELETE);
  });
});
