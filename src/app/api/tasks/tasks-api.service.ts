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

import {
  Task,
  TaskFilter,
  TaskCreationData,
  TaskGet,
  TaskBulkCreationData,
  TaskFiltersData,
  TaskVoter,
  TaskWatcher,
  Attachment,
  AttachmentCreationData
} from './tasks.model';
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

  public get(id: number) {
    return this.http.get<TaskGet>(`${this.base}/${id}`);
  }

  public getByRefAndProjectSlug(ref: number, projectSlug: string) {
    return this.http.get<TaskGet>(this.base, {
      params: UtilsService.buildQueryParams({
        ref,
        projectSlug,
      }, {
        projectSlug: 'project__slug',
      }),
    });
  }

  public getByRefAndProjectId(ref: number, projectId: number) {
    return this.http.get<TaskGet>(this.base, {
      params: UtilsService.buildQueryParams({
        ref,
        project: projectId,
      }),
    });
  }

  public put(id: number, us: Partial<Task>) {
    return this.http.put<Task>(`${this.base}/${id}`, us);
  }

  public patch(id: number, us: Partial<Task>) {
    return this.http.patch<Task>(`${this.base}/${id}`, us);
  }

  public delete(id: number) {
    return this.http.delete(`${this.base}/${id}`);
  }

  public bulkCreation(data: TaskBulkCreationData) {
    const tasks = data.bulkTasks?.reduce( (accumulator, tag) => `${accumulator}, ${tag}` );

    return this.http.post<Task[]>(`${this.base}/bulk_create`, {
      ...data,
      bulkTasks: tasks,
    });
  }

  public filters(project: number) {
    return this.http.get<TaskFiltersData>(`${this.base}/filters_data`, {
      params: UtilsService.buildQueryParams({
        project,
      }),
    });
  }

  public upvote(id: number) {
    return this.http.post(`${this.base}/${id}/upvote`, null);
  }

  public downvote(id: number) {
    return this.http.post(`${this.base}/${id}/downvote`, null);
  }

  public voters(id: number) {
    return this.http.get<TaskVoter[]>(`${this.base}/${id}/voters`);
  }

  public watch(id: number) {
    return this.http.get(`${this.base}/${id}/watch`);
  }

  public unwatch(id: number) {
    return this.http.get(`${this.base}/${id}/unwatch`);
  }

  public watchers(id: number) {
    return this.http.get<TaskWatcher>(`${this.base}/${id}/watchers`);
  }

  public attachments(projectId: number, objectId: number) {
    return this.http.get<Attachment[]>(`${this.base}/attachments`, {
      params: UtilsService.buildQueryParams({
        project: projectId,
        objectId,
      }),
    });
  }

  public createAttachment(attachment: AttachmentCreationData) {
    const formData = UtilsService.buildFormData(attachment);

    return this.http.post<Attachment>(`${this.base}/attachments`, formData);
  }

  public getAttachment(attachmentId: number) {
    return this.http.get<Attachment>(`${this.base}/attachments/${attachmentId}`);
  }

  public putAttachment(id: number, attachment: Partial<AttachmentCreationData>) {
    const formData = UtilsService.buildFormData(attachment);

    return this.http.put<Attachment>(`${this.base}/attachments${id}`, formData);
  }

  public patchAttachment(id: number, attachment: Partial<AttachmentCreationData>) {
    const formData = UtilsService.buildFormData(attachment);

    return this.http.put<Attachment>(`${this.base}/attachments/${id}`, formData);
  }

  public deleteAttachment(attachmentId: number) {
    return this.http.delete(`${this.base}/attachments/${attachmentId}`);
  }
}
