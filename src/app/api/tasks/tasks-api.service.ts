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

import { Task, TaskFilter, TaskCreationData } from './tasks.model';
import { UtilsService } from '@/app/commons/utils/utils-service.service';

@Injectable()
export class TasksApiService {

  constructor(
    private http: HttpClient,
    private config: ConfigService) { }

  public get base() {
    return `${this.config.apiUrl}/tasks`;
  }

  public list(filter: Partial<TaskFilter>) {

    const excludedTags = filter.excludeTags?.reduce( (accumulator, tag) => `${accumulator}, ${tag}` );
    const tags = filter.excludeTags?.reduce( (accumulator, tag) => `${accumulator}, ${tag}` );

    const keyMap = {
      statusIsClosed: 'status__is_closed',
    };

    const params = UtilsService.buildQueryParams(filter, keyMap);

    return this.http.get<Task[]>(this.base, {
      params,
      ...(tags && { tags }),
      ...(excludedTags && { exclude_tags: excludedTags }),
    });
  }

  public create(data: TaskCreationData) {
    return this.http.post<Task>(this.base, data);
  }
}
