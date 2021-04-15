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
import { WebhooksApiService } from './webhooks-api.service';
import { UtilsService } from '@/app/commons/utils/utils-service.service';
import { WebhookCreationMockFactory, WebhookMockFactory } from './webhooks.model.mock';


describe('WebhooksApiService', () => {
  let spectator: SpectatorHttp<WebhooksApiService>;
  const createHttp = createHttpFactory({
    service: WebhooksApiService,
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
      `${ConfigServiceMock.apiUrl}/webhooks`,
      HttpMethod.GET
    );
  });

  it('list by project', () => {
    const project = faker.random.number();

    spectator.service.list(project).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/webhooks?${UtilsService.buildQueryParams({
      project,
    })}`, HttpMethod.GET);
  });

  it('create', () => {
    const webhook = WebhookCreationMockFactory.build();

    spectator.service.create(webhook).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/webhooks`, HttpMethod.POST);
    expect(req.request.body).toEqual(webhook);
  });


  it('get webhook', () => {
    const id = faker.random.number();

    spectator.service.get(id).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/webhooks/${id}`, HttpMethod.GET);
  });

  it('put', () => {
    const id = faker.random.number();
    const data = WebhookMockFactory.build();

    spectator.service.put(id, data).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/webhooks/${id}`, HttpMethod.PUT);
    expect(req.request.body).toEqual(data);
  });

  it('patch', () => {
    const id = faker.random.number();
    const data = WebhookMockFactory.build();

    const name = { name: data.name };

    spectator.service.patch(id, name).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/webhooks/${id}`, HttpMethod.PATCH);
    expect(req.request.body).toEqual(name);
  });

  it('delete', () => {
    const id = faker.random.number();

    spectator.service.delete(id).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/webhooks/${id}`, HttpMethod.DELETE);
  });

  it('test', () => {
    const id = faker.random.number();

    spectator.service.test(id).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/webhooks/${id}/test`, HttpMethod.POST);
  });

});
