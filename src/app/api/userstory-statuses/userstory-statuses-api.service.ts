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
