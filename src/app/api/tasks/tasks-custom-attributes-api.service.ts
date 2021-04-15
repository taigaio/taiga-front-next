/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { Injectable } from '@angular/core';
import { ConfigService } from '@/app/config.service';
import { HttpClient } from '@angular/common/http';
import { TaskCustomAttribute, TaskCustomAttributeCreationData } from './task-custom-attribute.model';
import { UtilsService } from '@/app/commons/utils/utils-service.service';

@Injectable()
export class TaskCustomAttributesApiService {
  constructor(private http: HttpClient, private config: ConfigService) { }

  public get base() {
    return `${this.config.apiUrl}/task-custom-attributes`;
  }

  public list(projectId: number) {
    return this.http.get<TaskCustomAttribute[]>(this.base, {
      params: UtilsService.buildQueryParams({
        project: projectId.toString(),
      }),
    });
  }

  public create(taskCustomAttribute: TaskCustomAttributeCreationData) {
    return this.http.post<TaskCustomAttribute>(this.base, taskCustomAttribute);
  }

  public get(id: number) {
    return this.http.get<TaskCustomAttribute>(`${this.base}/${id}`);
  }

  public put(id: number, task: Partial<TaskCustomAttribute>) {
    return this.http.put<TaskCustomAttribute>(`${this.base}/${id}`, task);
  }

  public patch(id: number, task: Partial<TaskCustomAttribute>) {
    return this.http.patch<TaskCustomAttribute>(`${this.base}/${id}`, task);
  }

  public delete(id: number) {
    return this.http.delete(`${this.base}/${id}`);
  }

  public bulkUpdateOrder(projectId: number, bulkTaskCustomAttributes: [number, number][]) {
    return this.http.post(`${this.base}/bulk_update_order`, {
      projectId,
      bulkTaskCustomAttributes,
    });
  }

}
