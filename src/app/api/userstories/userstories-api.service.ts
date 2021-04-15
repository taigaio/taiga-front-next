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
  Userstory,
  UserstoryList,
  UserstoryFilter,
  UserstoryCreationData,
  UserstoryFiltersData,
  UserstoryVoter
} from './userstories.model';
import { UtilsService } from '@/app/commons/utils/utils-service.service';
import { UserstoryWatcher, Attachment, AttachmentCreationData } from './userstories.model';

@Injectable()
export class UserstoriesApiService {
  constructor(private http: HttpClient, private config: ConfigService) { }

  public get base() {
    return `${this.config.apiUrl}/userstories`;
  }

  public list(filter: Partial<UserstoryFilter>) {
    const keyMap = {
      milestoneIsNull: 'milestone__isnull',
      statusIsArchived: 'status__is_archived',
      statusIsClosed: 'status__is_closed',
    };

    const params = UtilsService.buildQueryParams(filter, keyMap);

    return this.http.get<UserstoryList[]>(this.base, {
      params,
    });
  }

  public create(newProject: UserstoryCreationData) {
    return this.http.post<Userstory>(this.base, newProject);
  }

  public get(id: number) {
    return this.http.get<Userstory>(`${this.base}/${id}`);
  }

  public getByRef(project: number, ref: number) {
    return this.http.get<Userstory>(this.base, {
      params: UtilsService.buildQueryParams({
        project,
        ref,
      }),
    });
  }

  public put(id: number, us: Partial<Userstory>) {
    return this.http.put<Userstory>(`${this.base}/${id}`, us);
  }

  public patch(id: number, us: Partial<Userstory>) {
    return this.http.patch<Userstory>(`${this.base}/${id}`, us);
  }

  public delete(id: number) {
    return this.http.delete(`${this.base}/${id}`);
  }

  public bulkCreation(projectId: number, stories: string, statusId?: number) {
    return this.http.post<Userstory[]>(`${this.base}/bulk_create`, {
      projectId,
      bulkStories: stories,
      ...(statusId && { statusId }),
    });
  }

  public bulkUpdateBacklogOrder(projectId: number, bulkStories: {order: number; usId: number}[]) {
    return this.http.post<Userstory[]>(`${this.base}/bulk_update_backlog_order`, {
      projectId,
      bulkStories,
    });
  }

  public bulkUpdateKanbanOrder(projectId: number, bulkStories: {order: number; usId: number}[]) {
    return this.http.post<Userstory[]>(`${this.base}/bulk_update_kanban_order`, {
      projectId,
      bulkStories,
    });
  }

  public bulkUpdateSprintOrder(projectId: number, bulkStories: {order: number; usId: number}[]) {
    return this.http.post<Userstory[]>(`${this.base}/bulk_update_sprint_order`, {
      projectId,
      bulkStories,
    });
  }

  public bulkUpdateMilestoneOrder(projectId: number, milestoneId: number, bulkStories: {order: number; usId: number}[]) {
    return this.http.post(`${this.base}/bulk_update_sprint_order`, {
      projectId,
      milestoneId,
      bulkStories,
    });
  }

  public filtersData(project: number) {
    return this.http.get<UserstoryFiltersData>(`${this.base}/filters_data`, {
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
    return this.http.get<UserstoryVoter[]>(`${this.base}/${id}/voters`);
  }

  public watch(id: number) {
    return this.http.get(`${this.base}/${id}/watch`);
  }

  public unwatch(id: number) {
    return this.http.get(`${this.base}/${id}/unwatch`);
  }

  public watchers(id: number) {
    return this.http.get<UserstoryWatcher>(`${this.base}/${id}/watchers`);
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
