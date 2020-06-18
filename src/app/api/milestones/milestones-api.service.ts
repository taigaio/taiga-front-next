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
import { Milestone } from './milestones.model';

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
}
