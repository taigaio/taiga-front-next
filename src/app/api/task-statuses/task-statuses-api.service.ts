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
