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
      params: {
        ...(filter.project && { project: filter.project.toString() }),
        ...(filter.slug && { project__slug: filter.slug }),
        ...(filter.assignedTo && { assigned_to: filter.assignedTo.toString() }),
        ...(filter.closed && { status__is_closed: filter.closed.toString() }),
      },
    });
  }

  public create(data: EpicCreationData) {
    const query = {
      ...(data.assignedTo && { assignedTo: data.assignedTo }),
      ...(data.blockedNote && { blockedNote: data.blockedNote }),
      ...(data.description && { description: data.description }),
      ...(data.isBlocked && { isBlocked: data.isBlocked }),
      ...(data.isClosed && { isClosed: data.isClosed }),
      ...(data.color && { color: data.color }),
      ...(data.tags && { tags: data.tags }),
      ...(data.watchers && { watchers: data.watchers }),
      project: data.project,
      subject: data.subject,
    };
    return this.http.post<Epic>(this.base, query);
  }

  public get(id: number) {
    return this.http.get<Epic>(`${this.base}/${id}`);
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
      params: {
        project: id.toString(),
      },
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
    const stories = data.bulkUserStories.reduce( (accumulator, subject) => `${accumulator} /n ${subject}` );

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
      params: {
        project: project.toString(),
        object_id: epic.toString(),
      },
    });
  }

  public createAttachment(attachment: EpicAttachmentCreationData) {
    const formData = new FormData();

    formData.append('object_id', attachment.objectId.toString());
    formData.append('project', attachment.project.toString());
    formData.append('attached_file', attachment.attachedFile, attachment.attachedFile.name);

    if (attachment.description) {
      formData.append('description', attachment.description);
    }

    if (attachment.isDeprecated) {
      formData.append('is_deprecated', attachment.isDeprecated.toString());
    }

    return this.http.post<EpicAttachment>(`${this.base}/attachments`, formData);
  }

  public getAttachment(attachmentId: number) {
    return this.http.get<EpicAttachment>(`${this.base}/attachments/${attachmentId}`);
  }

  public patchAttachment(id: number, attachment: Partial<EpicAttachmentCreationData>) {
    const formData = new FormData();

    if (attachment.objectId) {
      formData.append('object_id', attachment.objectId.toString());
    }

    if (attachment.project) {
      formData.append('project', attachment.project.toString());
    }

    if (attachment.attachedFile) {
      formData.append('attached_file', attachment.attachedFile, attachment.attachedFile.name);
    }

    if (attachment.description) {
      formData.append('description', attachment.description);
    }

    if (attachment.isDeprecated) {
      formData.append('is_deprecated', attachment.isDeprecated.toString());
    }

    return this.http.patch<EpicAttachment>(`${this.base}/attachments/${id}`, formData);
  }

  public deleteAttachment(attachmentId: number) {
    return this.http.delete(`${this.base}/attachments/${attachmentId}`);
  }

}
