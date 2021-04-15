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
import { TaskStatus, TaskStatusInput, TaskStatusPartialInput, TaskStatusesOrderList } from './task-statuses.model';

@Injectable()
export class TaskStatusesApiService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  public get base() {
    return `${this.config.apiUrl}/task-statuses`;
  }

  public list(project?: number) {
    const query = {
      ...(project && { project: project.toString() }),
    };

    return this.http.get<TaskStatus[]>(this.base, {
      params: query,
    });
  }

  public get(taskStatusId: number) {
    return this.http.get<TaskStatus>(`${this.base}/${taskStatusId}`);
  }

  public create(data: TaskStatusInput) {
    return this.http.post<TaskStatus>(this.base, data);
  }

  public put(taskStatusId: number, data: TaskStatus) {
    return this.http.put<TaskStatus>(`${this.base}/${taskStatusId}`, data);
  }

  public patch(taskStatusId: number, data: TaskStatusPartialInput) {
    return this.http.patch<TaskStatus>(`${this.base}/${taskStatusId}`, data);
  }

  public delete(taskStatusId: number) {
    return this.http.delete(`${this.base}/${taskStatusId}`);
  }

  public updateOrderInBulk(project: number, newOrder: TaskStatusesOrderList) {
    const data = {
      bulkTaskStatuses: newOrder,
      project,
    };
    return this.http.post(`${this.base}/bulk_update_order`, data);
  }
}
