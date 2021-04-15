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

import { WikiPage, WikiPageCreationData, Attachment, AttachmentCreationData, WikiPageWatcher } from './wiki.model';
import { UtilsService } from '@/app/commons/utils/utils-service.service';

@Injectable()
export class WikiPagesApiService {
  constructor(private http: HttpClient, private config: ConfigService) { }

  public get base() {
    return `${this.config.apiUrl}/wiki`;
  }

  public list(project?: number) {
    return this.http.get<WikiPage[]>(this.base, {
      params: UtilsService.buildQueryParams({
        ...(project && { project }),
      }),
    });
  }

  public get(id: number) {
    return this.http.get<WikiPage>(`${this.base}/${id}`);
  }

  public getBySlug(project: number, slug: string) {
    return this.http.get<WikiPage>(`${this.base}/by_slug`, {
      params: UtilsService.buildQueryParams({
        project,
        slug,
      }),
    });
  }

  public create(wikiPage: WikiPageCreationData) {
    return this.http.post<WikiPage>(this.base, wikiPage);
  }

  public put(wikiPage: WikiPage) {
    return this.http.put<WikiPage>(`${this.base}/${wikiPage.id}`, wikiPage);
  }

  public patch(id: number, wikiPage: Partial<WikiPage>) {
    return this.http.patch<WikiPage>(`${this.base}/${id}`, wikiPage);
  }

  public delete(id: number) {
    return this.http.delete(`${this.base}/${id}`);
  }

  public watch(id: number) {
    return this.http.get(`${this.base}/${id}/watch`);
  }

  public unwatch(id: number) {
    return this.http.get(`${this.base}/${id}/unwatch`);
  }

  public listWatchers(id: number) {
    return this.http.get<WikiPageWatcher>(`${this.base}/${id}/watchers`);
  }

  public listAttachments(projectId: number, objectId: number) {
    return this.http.get<Attachment[]>(`${this.base}/attachments`, {
      params: UtilsService.buildQueryParams({
        project: projectId,
        objectId,
      }),
    });
  }

  public getAttachment(attachmentId: number) {
    return this.http.get<Attachment>(`${this.base}/attachments/${attachmentId}`);
  }

  public createAttachment(attachment: AttachmentCreationData) {
    const formData = UtilsService.buildFormData(attachment);

    return this.http.post<Attachment>(`${this.base}/attachments`, formData);
  }

  public putAttachment(attachment: Attachment) {
    const formData = UtilsService.buildFormData(attachment);

    return this.http.put<Attachment>(`${this.base}/attachments/${attachment.id}`, formData);
  }

  public patchAttachment(id: number, attachment: Partial<AttachmentCreationData>) {
    const formData = UtilsService.buildFormData(attachment);

    return this.http.patch<Attachment>(`${this.base}/attachments/${id}`, formData);
  }

  public deleteAttachment(attachmentId: number) {
    return this.http.delete(`${this.base}/attachments/${attachmentId}`);
  }
}
