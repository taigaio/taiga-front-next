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
import { HistoryEntry, HistoryEntryType, HistoryEntryComment } from './history.model';
import { UtilsService } from '@/app/commons/utils/utils-service.service';

@Injectable()
export class HistoryApiService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  public get base() {
    return `${this.config.apiUrl}/history`;
  }

  getHistoryEntry(id: number, type: HistoryEntryType) {
    return this.http.get<HistoryEntry>(`${this.base}/${type}/${id}`);
  }

  getCommentVersions(id: number, type: HistoryEntryType, commentId: string) {
    return this.http.get<HistoryEntryComment>(`${this.base}/${type}/${id}/comment_versions`, {
      params: UtilsService.buildQueryParams({
        id: commentId,
      }),
    });
  }

  public editComment(id: number, type: HistoryEntryType, commentId: string, comment: string) {
    return this.http.post(`${this.base}/${type}/${id}/edit_comment`, { comment }, {
      params: UtilsService.buildQueryParams({
        id: commentId,
      }),
    });
  }

  public deleteComment(id: number, type: HistoryEntryType, commentId: string) {
    return this.http.delete(`${this.base}/${type}/${id}/delete_comment`, {
      params: UtilsService.buildQueryParams({
        id: commentId,
      }),
    });
  }

  public undeleteComment(id: number, type: HistoryEntryType, commentId: string) {
    return this.http.post(`${this.base}/${type}/${id}/undelete_comment`, null, {
      params: UtilsService.buildQueryParams({
        id: commentId,
      }),
    });
  }
}
