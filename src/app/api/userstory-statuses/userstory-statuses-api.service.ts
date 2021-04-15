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
import { UserstoryStatus, UserstoryStatusInput, UserstoryStatusPartialInput, UserstoryStatusesOrderList } from './userstory-statuses.model';

@Injectable()
export class UserstoryStatusesApiService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  public get base() {
    return `${this.config.apiUrl}/userstory-statuses`;
  }

  public list(project?: number) {
    const query = {
      ...(project && { project: project.toString() }),
    };

    return this.http.get<UserstoryStatus[]>(this.base, {
      params: query,
    });
  }

  public get(userstoryStatusId: number) {
    return this.http.get<UserstoryStatus>(`${this.base}/${userstoryStatusId}`);
  }

  public create(data: UserstoryStatusInput) {
    return this.http.post<UserstoryStatus>(this.base, data);
  }

  public put(userstoryStatusId: number, data: UserstoryStatus) {
    return this.http.put<UserstoryStatus>(`${this.base}/${userstoryStatusId}`, data);
  }

  public patch(userstoryStatusId: number, data: UserstoryStatusPartialInput) {
    return this.http.patch<UserstoryStatus>(`${this.base}/${userstoryStatusId}`, data);
  }

  public delete(userstoryStatusId: number) {
    return this.http.delete(`${this.base}/${userstoryStatusId}`);
  }

  public updateOrderInBulk(project: number, newOrder: UserstoryStatusesOrderList) {
    const data = {
      bulkUserstoryStatuses: newOrder,
      project,
    };
    return this.http.post(`${this.base}/bulk_update_order`, data);
  }
}
