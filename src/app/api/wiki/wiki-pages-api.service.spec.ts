/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import * as faker from 'faker';

import { ConfigService } from '@/app/config.service';
import { ConfigServiceMock } from '@/app/config.service.mock';
import { UtilsService } from '@/app/commons/utils/utils-service.service';

import { WikiPageMockFactory, WikiPageAttachmentCreationMockFactory, WikiPageAttachmentMockFactory } from './wiki.model.mock';
import { WikiPagesApiService } from './wiki-pages-api.service';

describe('WikiPagesApiService', () => {
  let spectator: SpectatorHttp<WikiPagesApiService>;
  const createHttp = createHttpFactory({
    service: WikiPagesApiService,
    providers: [
      {
        provide: ConfigService,
        useValue: ConfigServiceMock,
      },
    ],
  });

  beforeEach(() => spectator = createHttp());

  it('list', () => {
    spectator.service.list().subscribe();
    spectator.expectOne(
      `${ConfigServiceMock.apiUrl}/wiki`,
      HttpMethod.GET
    );
  });

  it('listi by project', () => {
    const project = faker.random.number();

    spectator.service.list(project).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/wiki?${UtilsService.buildQueryParams({
      project,
    })}`, HttpMethod.GET);
  });

  it('create', () => {
    const data = WikiPageMockFactory.build();

    spectator.service.create(data).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/wiki`, HttpMethod.POST);
    expect(req.request.body).toEqual(data);
  });

  it('get', () => {
    const id = faker.random.number();
    spectator.service.get(id).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/wiki/${id}`, HttpMethod.GET);
  });

  it('get by slug', () => {
    const slug = faker.lorem.slug();
    const project = faker.random.number();

    spectator.service.getBySlug(project, slug).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/wiki/by_slug?${UtilsService.buildQueryParams({
      project,
      slug,
    })}`, HttpMethod.GET);
  });

  it('put', () => {
    const data = WikiPageMockFactory.build();

    spectator.service.put(data).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/wiki/${data.id}`, HttpMethod.PUT);
    expect(req.request.body).toEqual(data);
  });

  it('patch', () => {
    const data = WikiPageMockFactory.build();

    spectator.service.patch(data.id, data).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/wiki/${data.id}`, HttpMethod.PATCH);
    expect(req.request.body).toEqual(data);
  });

  it('delete', () => {
    const id = faker.random.number();

    spectator.service.delete(id).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/wiki/${id}`, HttpMethod.DELETE);
  });

  it('watch', () => {
    const id = faker.random.number();

    spectator.service.watch(id).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/wiki/${id}/watch`, HttpMethod.GET);
  });

  it('unwatch', () => {
    const id = faker.random.number();

    spectator.service.unwatch(id).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/wiki/${id}/unwatch`, HttpMethod.GET);
  });

  it('list watchers', () => {
    const id = faker.random.number();

    spectator.service.listWatchers(id).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/wiki/${id}/watchers`, HttpMethod.GET);
  });

  it('list attachments', () => {
    const project = faker.random.number();
    const objectId = faker.random.number();

    spectator.service.listAttachments(project, objectId).subscribe();

    spectator.expectOne(`${ConfigServiceMock.apiUrl}/wiki/attachments?${UtilsService.buildQueryParams({
      project,
      objectId,
    })}`, HttpMethod.GET);
  });

  it('create attachment', () => {
    const mockAttachment = WikiPageAttachmentCreationMockFactory.build();

    const formData = UtilsService.buildFormData(mockAttachment);

    spectator.service.createAttachment(mockAttachment).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/wiki/attachments`, HttpMethod.POST);

    expect(req.request.body).toEqual(formData);
  });

  it('get attachment', () => {
    const attachment = faker.random.number();

    spectator.service.getAttachment(attachment).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/wiki/attachments/${attachment}`, HttpMethod.GET);
  });

  it('put attachment', () => {
    const mockAttachment = WikiPageAttachmentMockFactory.build();

    const formData = UtilsService.buildFormData(mockAttachment);

    spectator.service.putAttachment(mockAttachment).subscribe();
    const req = spectator.expectOne(
      `${ConfigServiceMock.apiUrl}/wiki/attachments/${mockAttachment.id}`,
       HttpMethod.PUT);

    expect(req.request.body).toEqual(formData);
  });

  it('patch attachment', () => {
    const id = faker.random.number();
    const data = {isDeprecated: true};
    const formData = UtilsService.buildFormData(data);

    spectator.service.patchAttachment(id, data).subscribe();
    const req = spectator.expectOne(
      `${ConfigServiceMock.apiUrl}/wiki/attachments/${id}`,
       HttpMethod.PATCH);

    expect(req.request.body).toEqual(formData);
  });

  it('delete attachment', () => {
    const id = faker.random.number();
    spectator.service.deleteAttachment(id).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/wiki/attachments/${id}`, HttpMethod.DELETE);
  });
});
