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
  Issue,
  IssueFilter,
  IssueCreationData,
  IssueListItem,
  IssueOrderBy,
  IssueFiltersData,
  IssueVoter,
  IssueWatcher,
  Attachment,
  AttachmentCreationData
} from './issues.model';
import { UtilsService } from '@/app/commons/utils/utils-service.service';

@Injectable()
export class IssuesApiService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  public get base() {
    return `${this.config.apiUrl}/issues`;
  }

  public list(filter: Partial<IssueFilter> = {}, orderBy?: IssueOrderBy) {
    return this.http.get<IssueListItem[]>(this.base, {
      params: UtilsService.buildQueryParams({
        ...filter,
        ...(orderBy && { orderBy }),
      }, {
        statusIsClosed: 'status__is_closed',
      }),
    });
  }

  public create(newIssue: IssueCreationData) {
    return this.http.post<Issue>(this.base, newIssue);
  }

  public get(id: number) {
    return this.http.get<Issue>(`${this.base}/${id}`);
  }

  public getByRefAndProjectSlug(ref: number, projectSlug: string) {
    return this.http.get<Issue>(this.base, {
      params: UtilsService.buildQueryParams({
        ref,
        projectSlug,
      }, {
        projectSlug: 'project__slug',
      }),
    });
  }

  public getByRefAndProjectId(ref: number, projectId: number) {
    return this.http.get<Issue>(this.base, {
      params: UtilsService.buildQueryParams({
        ref,
        project: projectId,
      }),
    });
  }

  public patch(id: number, issue: Partial<Issue>) {
    return this.http.patch<Issue>(`${this.base}/${id}`, issue);
  }

  public put(id: number, issue: Issue) {
    return this.http.put<Issue>(`${this.base}/${id}`, issue);
  }

  public delete(id: number) {
    return this.http.delete(`${this.base}/${id}`);
  }

  public filtersData(project: number) {
    return this.http.get<IssueFiltersData>(`${this.base}/filters_data`, {
      params: UtilsService.buildQueryParams({
        project: project.toString(),
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
    return this.http.get<IssueVoter[]>(`${this.base}/${id}/voters`);
  }

  public watch(id: number) {
    return this.http.get(`${this.base}/${id}/watch`);
  }

  public unwatch(id: number) {
    return this.http.get(`${this.base}/${id}/unwatch`);
  }

  public watchers(id: number) {
    return this.http.get<IssueWatcher>(`${this.base}/${id}/watchers`);
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

    return this.http.put<Attachment>(`${this.base}/attachments/${id}`, formData);
  }

  public patchAttachment(id: number, attachment: Partial<AttachmentCreationData>) {
    const formData = UtilsService.buildFormData(attachment);

    return this.http.patch<Attachment>(`${this.base}/attachments/${id}`, formData);
  }

  public deleteAttachment(attachmentId: number) {
    return this.http.delete(`${this.base}/attachments/${attachmentId}`);
  }
}
