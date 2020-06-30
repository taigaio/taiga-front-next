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

import { Task, TaskFilter } from './task.model';

@Injectable()
export class TasksApiService {

  constructor(
    private http: HttpClient,
    private config: ConfigService) { }

  public get base() {
    return `${this.config.apiUrl}/epics`;
  }

  public list(filter: TaskFilter) {
    const excludedTags = filter.excludeTags.reduce( (accumulator, tag) => `${accumulator}, ${tag}` );
    const tags = filter.excludeTags.reduce( (accumulator, tag) => `${accumulator}, ${tag}` );


    return this.http.get<Task[]>(this.base, {
      params: {
        ...(filter.assignedTo && { assigned_to: filter.assignedTo.toString() }),
        ...(filter.excludeAssignedTo && { exclude_assigned_to: filter.excludeAssignedTo.toString() }),
        ...(filter.excludeOwner && { exclude_owner: filter.excludeOwner.toString() }),
        ...(filter.excludeRole && { exclude_role: filter.excludeRole.toString() }),
        ...(filter.excludeStatus && { exclude_status: filter.excludeStatus.toString() }),
        ...(filter.excludeTags && { exclude_tags: excludedTags }),
        ...(filter.milestone && { milestone: filter.milestone.toString() }),
        ...(filter.owner && { owner: filter.owner.toString() }),
        ...(filter.project && { project: filter.project.toString() }),
        ...(filter.role && { role: filter.role.toString() }),
        ...(filter.status && { status: filter.status.toString() }),
        ...(tags && { tags }),
        ...(filter.userStory && { user_story: filter.userStory.toString() }),
        ...(filter.watchers && { watchers: filter.watchers.toString() }),
        ...(filter.statusIsClosed && { status__is_closed: filter.statusIsClosed.toString() }),
      },
    });
  }
}
