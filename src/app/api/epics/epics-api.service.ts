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
import { Epic, EpicFilter } from './epics.model';

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
}
