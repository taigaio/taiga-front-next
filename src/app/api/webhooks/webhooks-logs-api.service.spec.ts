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
import { WebhooksLogsApiService } from './webhooks-logs-api.service';


describe('WebhooksLogsApiService', () => {
  let spectator: SpectatorHttp<WebhooksLogsApiService>;
  const createHttp = createHttpFactory({
    service: WebhooksLogsApiService,
    providers: [
      {
        provide: ConfigService,
        useValue: ConfigServiceMock,
      },
    ],
  });

  beforeEach(() => spectator = createHttp());

  it('list logs', () => {
    spectator.service.list().subscribe();
    spectator.expectOne(
      `${ConfigServiceMock.apiUrl}/webhooklogs`,
      HttpMethod.GET
    );
  });

  it('list logs by project', () => {
    const webhook = faker.random.number();

    spectator.service.list(webhook).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/webhooklogs?${UtilsService.buildQueryParams({
      webhook,
    })}`, HttpMethod.GET);
  });

  it('get webhook log', () => {
    const id = faker.random.number();

    spectator.service.get(id).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/webhooklogs/${id}`, HttpMethod.GET);
  });

  it('resend request', () => {
    const id = faker.random.number();

    spectator.service.resend(id).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/webhooklogs/${id}/resend`, HttpMethod.POST);
  });

});
