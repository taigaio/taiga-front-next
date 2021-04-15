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
import { WebhookDetail, WebhookCreationData } from './webhooks.model';

@Injectable()
export class WebhooksApiService {

  constructor(
    private http: HttpClient,
    private config: ConfigService) { }

  public get base() {
    return `${this.config.apiUrl}/webhooks`;
  }

  public list(project?: number) {
    return this.http.get<WebhookDetail[]>(this.base, {
      params: UtilsService.buildQueryParams({
        ...(project && { project }),
      }),
    });
  }

  public create(webhook: WebhookCreationData) {
    return this.http.post<WebhookDetail>(this.base, webhook);
  }

  public get(id: number) {
    return this.http.get<WebhookDetail>(`${this.base}/${id}`);
  }

  public put(id: number, webhook: WebhookDetail) {
    return this.http.put<WebhookDetail>(`${this.base}/${id}`, webhook);
  }

  public patch(id: number, webhook: Partial<WebhookDetail>) {
    return this.http.patch<WebhookDetail>(`${this.base}/${id}`, webhook);
  }

  public delete(id: number) {
    return this.http.delete(`${this.base}/${id}`);
  }

  public test(id: number) {
    return this.http.post(`${this.base}/${id}/test`, null);
  }

}
