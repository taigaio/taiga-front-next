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
import { EpicStatus, EpicStatusInput, EpicStatusPartialInput, EpicStatusesOrderList } from './epic-statuses.model';

@Injectable()
export class EpicStatusesApiService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  public get base() {
    return `${this.config.apiUrl}/epic-statuses`;
  }

  public list(project?: number) {
    const query = {
      ...(project && { project: project.toString() }),
    };

    return this.http.get<EpicStatus[]>(this.base, {
      params: query,
    });
  }

  public get(epicStatusId: number) {
    return this.http.get<EpicStatus>(`${this.base}/${epicStatusId}`);
  }

  public create(data: EpicStatusInput) {
    return this.http.post<EpicStatus>(this.base, data);
  }

  public put(epicStatusId: number, data: EpicStatus) {
    return this.http.put<EpicStatus>(`${this.base}/${epicStatusId}`, data);
  }

  public patch(epicStatusId: number, data: EpicStatusPartialInput) {
    return this.http.patch<EpicStatus>(`${this.base}/${epicStatusId}`, data);
  }

  public delete(epicStatusId: number) {
    return this.http.delete(`${this.base}/${epicStatusId}`);
  }

  public updateOrderInBulk(project: number, newOrder: EpicStatusesOrderList) {
    const data = {
      bulkEpicStatuses: newOrder,
      project,
    };
    return this.http.post(`${this.base}/bulk_update_order`, data);
  }
}
