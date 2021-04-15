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
import { Milestone, MilestoneCreationData, MilestonePartialInput } from './milestones.model';
import { UtilsService } from '@/app/commons/utils/utils-service.service';

@Injectable()
export class MilestoneApiService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  public get base() {
    return `${this.config.apiUrl}/milestones`;
  }

  public list(project?: number, closed?: boolean) {
    return this.http.get<Milestone[]>(this.base, {
      params: UtilsService.buildQueryParams({
        ...(project && { project }),
        ...(closed && { closed }),
      }),
    });
  }

  public create(data: MilestoneCreationData) {
    return this.http.post<Milestone>(this.base, data);
  }

  public get(milestoneId: number) {
    return this.http.get<Milestone>(`${this.base}/${milestoneId}`);
  }

  public put(milestoneId: number, data: Milestone) {
    return this.http.put<Milestone>(`${this.base}/${milestoneId}`, data);
  }

  public patch(milestoneId: number, data: MilestonePartialInput) {
    return this.http.patch<Milestone>(`${this.base}/${milestoneId}`, data);
  }

  public delete(milestoneId: number) {
    return this.http.delete(`${this.base}/${milestoneId}`);
  }

  public stats(milestoneId: number) {
    return this.http.get<Milestone>(`${this.base}/${milestoneId}/stats`);
  }

  public watch(milestoneId: number) {
    return this.http.post(`${this.base}/${milestoneId}/watch`, null);
  }

  public unwatch(milestoneId: number) {
    return this.http.post(`${this.base}/${milestoneId}/unwatch`, null);
  }

  public watchers(milestoneId: number) {
    return this.http.get<Milestone>(`${this.base}/${milestoneId}/watchers`);
  }
}
