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
import { Priority, PriorityInput, PriorityPartialInput, PrioritiesOrderList } from './priorities.model';

@Injectable()
export class PrioritiesApiService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  public get base() {
    return `${this.config.apiUrl}/priorities`;
  }

  public list(project?: number) {
    const query = {
      ...(project && { project: project.toString() }),
    };

    return this.http.get<Priority[]>(this.base, {
      params: query,
    });
  }

  public get(priorityId: number) {
    return this.http.get<Priority>(`${this.base}/${priorityId}`);
  }

  public create(data: PriorityInput) {
    return this.http.post<Priority>(this.base, data);
  }

  public put(priorityId: number, data: Priority) {
    return this.http.put<Priority>(`${this.base}/${priorityId}`, data);
  }

  public patch(priorityId: number, data: PriorityPartialInput) {
    return this.http.patch<Priority>(`${this.base}/${priorityId}`, data);
  }

  public delete(priorityId: number) {
    return this.http.delete(`${this.base}/${priorityId}`);
  }

  public updateOrderInBulk(project: number, newOrder: PrioritiesOrderList) {
    const data = {
      bulkPriorities: newOrder,
      project,
    };
    return this.http.post(`${this.base}/bulk_update_order`, data);
  }
}
