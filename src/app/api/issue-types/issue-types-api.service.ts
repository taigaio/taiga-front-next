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
import { IssueType, IssueTypeInput, IssueTypePartialInput, IssueTypesOrderList } from './issue-types.model';

@Injectable()
export class IssueTypesApiService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  public get base() {
    return `${this.config.apiUrl}/issue-types`;
  }

  public list(project?: number) {
    const query = {
      ...(project && { project: project.toString() }),
    };

    return this.http.get<IssueType[]>(this.base, {
      params: query,
    });
  }

  public get(issueTypeId: number) {
    return this.http.get<IssueType>(`${this.base}/${issueTypeId}`);
  }

  public create(data: IssueTypeInput) {
    return this.http.post<IssueType>(this.base, data);
  }

  public put(issueTypeId: number, data: IssueType) {
    return this.http.put<IssueType>(`${this.base}/${issueTypeId}`, data);
  }

  public patch(issueTypeId: number, data: IssueTypePartialInput) {
    return this.http.patch<IssueType>(`${this.base}/${issueTypeId}`, data);
  }

  public delete(issueTypeId: number) {
    return this.http.delete(`${this.base}/${issueTypeId}`);
  }

  public updateOrderInBulk(project: number, newOrder: IssueTypesOrderList) {
    const data = {
      bulkIssueTypes: newOrder,
      project,
    };
    return this.http.post(`${this.base}/bulk_update_order`, data);
  }
}
