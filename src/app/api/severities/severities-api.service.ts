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
import { Severity, SeverityInput, SeverityPartialInput, SeveritiesOrderList } from './severities.model';

@Injectable()
export class SeveritiesApiService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  public get base() {
    return `${this.config.apiUrl}/severities`;
  }

  public list(project?: number) {
    const query = {
      ...(project && { project: project.toString() }),
    };

    return this.http.get<Severity[]>(this.base, {
      params: query,
    });
  }

  public get(severityId: number) {
    return this.http.get<Severity>(`${this.base}/${severityId}`);
  }

  public create(data: SeverityInput) {
    return this.http.post<Severity>(this.base, data);
  }

  public put(severityId: number, data: Severity) {
    return this.http.put<Severity>(`${this.base}/${severityId}`, data);
  }

  public patch(severityId: number, data: SeverityPartialInput) {
    return this.http.patch<Severity>(`${this.base}/${severityId}`, data);
  }

  public delete(severityId: number) {
    return this.http.delete(`${this.base}/${severityId}`);
  }

  public updateOrderInBulk(project: number, newOrder: SeveritiesOrderList) {
    const data = {
      bulkSeverities: newOrder,
      project,
    };
    return this.http.post(`${this.base}/bulk_update_order`, data);
  }
}
