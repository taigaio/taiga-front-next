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
  Epic,
  EpicFilter,
  EpicCreationData,
  EpicPartialInput,
  EpicCreationInBulk,
  EpicFilters,
  EpicUserStory,
  EpicUserStoryPartialInput,
  RelatedUserStoryCreationInBulk,
  EpicVoterWatcher,
  EpicAttachment,
  EpicAttachmentCreationData,
} from './epics.model';
import { UtilsService } from '@/app/commons/utils/utils-service.service';

@Injectable()
export class EpicsApiService {

  constructor(
    private http: HttpClient,
    private config: ConfigService) { }

  public get base() {
    return `${this.config.apiUrl}/epics`;
  }

  public list(filter: EpicFilter) {
    return this.http.get<Epic[]>(this.base, {
      params: UtilsService.buildQueryParams(filter),
    });
  }

  public create(data: EpicCreationData) {
    return this.http.post<Epic>(this.base, data);
  }

  public get(id: number) {
    return this.http.get<Epic>(`${this.base}/${id}`);
  }

  public put(id: number, data: Epic) {
    return this.http.put<Epic>(`${this.base}/${id}`, data);
  }

  public patch(id: number, data: EpicPartialInput) {
    return this.http.patch<Epic>(`${this.base}/${id}`, data);
  }

  public delete(id: number) {
    return this.http.delete(`${this.base}/${id}`);
  }

  public bulkCreate(data: EpicCreationInBulk) {

    const bulkEpics = data.bulkEpics.reduce( (accumulator, subject) => `${accumulator} /n ${subject}` );

    const input = {
      projectId: data.projectId,
      bulkEpics,
      ...(data.statusId && {statusId: data.statusId}),
    };

    return this.http.post<Epic[]>(`${this.base}/bulk_create`, input);
  }

  public getFilters(id: number) {
    return this.http.get<EpicFilters>(`${this.base}/filters_data`, {
      params: UtilsService.buildQueryParams({
        project: id.toString(),
      }),
    });
  }

  public listRelatedUserStories(id: number) {
    return this.http.get<EpicUserStory[]>(`${this.base}/${id}/related_userstories`);
  }

  public createRelatedUserStory(id: number, userStoryId: number) {
    const query = {
      epic: id,
      userStory: userStoryId,
    };

    return this.http.post<EpicUserStory>(`${this.base}/${id}/related_userstories`, query);
  }

  public bulkCreateRelatedUserStory(id: number, data: RelatedUserStoryCreationInBulk) {
    const stories = data.bulkUserStories.reduce((accumulator, subject) => `${accumulator} /n ${subject}` );

    const body = {
      projectId: data.projectId,
      bulkUserStories: stories,
    };

    return this.http.post<EpicUserStory>(`${this.base}/${id}/related_userstories/bulk_create`, body);
  }

  public getRelatedUserStory(epic: number, userStory: number) {
    return this.http.get<EpicUserStory>(`${this.base}/${epic}/related_userstories/${userStory}`);
  }

  public patchRelatedUserStory(epic: number, userStory: number, data: EpicUserStoryPartialInput) {
    return this.http.patch<EpicUserStory>(`${this.base}/${epic}/related_userstories/${userStory}`, data);
  }

  public deleteRelatedUserStory(epic: number, userStory: number) {
    return this.http.delete(`${this.base}/${epic}/related_userstories/${userStory}`);
  }

  public vote(epic: number) {
    return this.http.post(`${this.base}/${epic}/upvote`, null);
  }

  public downvote(epic: number) {
    return this.http.post(`${this.base}/${epic}/downvote`, null);
  }

  public getVoters(epic: number) {
    return this.http.get<EpicVoterWatcher>(`${this.base}/${epic}/voters`);
  }

  public watch(epic: number) {
    return this.http.post(`${this.base}/${epic}/watch`, null);
  }

  public unwatch(epic: number) {
    return this.http.post(`${this.base}/${epic}/unwatch`, null);
  }

  public getWatchers(epic: number) {
    return this.http.get<EpicVoterWatcher>(`${this.base}/${epic}/watchers`);
  }

  public getAttachments(project: number, epic: number) {
    return this.http.get<EpicAttachment[]>(`${this.base}/attachments`, {
      params: UtilsService.buildQueryParams({
        project: project.toString(),
        object_id: epic.toString(),
      }),
    });
  }

  public createAttachment(attachment: EpicAttachmentCreationData) {
    const formData = UtilsService.buildFormData(attachment);

    return this.http.post<EpicAttachment>(`${this.base}/attachments`, formData);
  }

  public getAttachment(attachmentId: number) {
    return this.http.get<EpicAttachment>(`${this.base}/attachments/${attachmentId}`);
  }

  public patchAttachment(id: number, attachment: Partial<EpicAttachmentCreationData>) {
    const formData = UtilsService.buildFormData(attachment);

    return this.http.patch<EpicAttachment>(`${this.base}/attachments/${id}`, formData);
  }

  public putAttachment(id: number, attachment: Partial<EpicAttachmentCreationData>) {
    const formData = UtilsService.buildFormData(attachment);

    return this.http.put<EpicAttachment>(`${this.base}/attachments/${id}`, formData);
  }

  public deleteAttachment(attachmentId: number) {
    return this.http.delete(`${this.base}/attachments/${attachmentId}`);
  }

}
