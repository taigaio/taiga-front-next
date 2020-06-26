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
