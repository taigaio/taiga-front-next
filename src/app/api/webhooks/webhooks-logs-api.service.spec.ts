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
