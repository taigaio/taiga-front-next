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
import { Epic, EpicFilter, EpicCreationData, EpicPartialInput, EpicCreationInBulk, EpicFilters } from './epics.model';

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

  public edit(id: number, data: EpicPartialInput) {
    return this.http.patch<Epic>(`${this.base}/${id}`, data);
  }

  public delete(id: number) {
    return this.http.delete(`${this.base}/${id}`);
  }

  public bulkCreate(data: EpicCreationInBulk) {

    const bulkEpics = data.bulkEpics.reduce( (accumulator, subject) => `${accumulator} /n ${subject}` );

    const input = {
      projectId: data.project,
      bulkEpics,
      ...(data.statusId && {statusId: data.statusId}),
    };

    return this.http.post<Epic[]>(`${this.base}/bulk_create`, input);
  }

  public getFilters(id: number) {
    return this.http.get<EpicFilters>(`${this.base}/${id}/filters_data`, {
      params: {
        project: id.toString(),
      },
    });
  }
}
