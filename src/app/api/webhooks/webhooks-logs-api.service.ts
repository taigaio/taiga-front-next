/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '@/app/config.service';

import { UtilsService } from '@/app/commons/utils/utils-service.service';
import { WebhookLog } from './webhooks.model';

@Injectable()
export class WebhooksLogsApiService {

  constructor(
    private http: HttpClient,
    private config: ConfigService) { }

  public get base() {
    return `${this.config.apiUrl}/webhooklogs`;
  }

  public list(webhook?: number) {
    return this.http.get(this.base, {
      params: UtilsService.buildQueryParams({
        ...(webhook && { webhook }),
      }),
    });
  }

  public get(id: number) {
    return this.http.get<WebhookLog>(`${this.base}/${id}`);
  }

  public resend(id: number) {
    return this.http.post<WebhookLog>(`${this.base}/${id}/resend`, null);
  }
}
