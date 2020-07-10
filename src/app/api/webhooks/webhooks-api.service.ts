/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
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
