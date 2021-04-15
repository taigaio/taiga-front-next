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
import { IssueStatus, IssueStatusInput, IssueStatusPartialInput, IssueStatusesOrderList } from './issue-statuses.model';

@Injectable()
export class IssueStatusesApiService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  public get base() {
    return `${this.config.apiUrl}/issue-statuses`;
  }

  public list(project?: number) {
    const query = {
      ...(project && { project: project.toString() }),
    };

    return this.http.get<IssueStatus[]>(this.base, {
      params: query,
    });
  }

  public get(issueStatusId: number) {
    return this.http.get<IssueStatus>(`${this.base}/${issueStatusId}`);
  }

  public create(data: IssueStatusInput) {
    return this.http.post<IssueStatus>(this.base, data);
  }

  public put(issueStatusId: number, data: IssueStatus) {
    return this.http.put<IssueStatus>(`${this.base}/${issueStatusId}`, data);
  }

  public patch(issueStatusId: number, data: IssueStatusPartialInput) {
    return this.http.patch<IssueStatus>(`${this.base}/${issueStatusId}`, data);
  }

  public delete(issueStatusId: number) {
    return this.http.delete(`${this.base}/${issueStatusId}`);
  }

  public updateOrderInBulk(project: number, newOrder: IssueStatusesOrderList) {
    const data = {
      bulkIssueStatuses: newOrder,
      project,
    };
    return this.http.post(`${this.base}/bulk_update_order`, data);
  }
}
