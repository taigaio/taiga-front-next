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
import { Milestone, MilestoneCreationData, MilestonePartialInput } from './milestones.model';

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
      params: {
        ...(project && { project: project.toString() }),
        ...(closed && { closed: closed.toString() }),
      },
    });
  }

  public create(data: MilestoneCreationData) {
    const query = {
      project: data.project,
      name: data.name,
      estimatedStart: data.estimatedStart,
      estimatedFinish: data.estimatedFinish,
      ...(data.disponibility && { disponibility: data.disponibility }),
      ...(data.slug && { slug: data.slug }),
      ...(data.order && { order: data.order }),
      ...(data.watchers && { watchers: data.watchers }),
    };

    return this.http.post<Milestone>(this.base, query);
  }

  public get(milestoneId: number) {
    return this.http.get<Milestone>(`${this.base}/${milestoneId}`);
  }

  public edit(milestoneId: number, data: MilestonePartialInput) {
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
