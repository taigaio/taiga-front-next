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
import {
  ProjectResolver,
  IssueResolver,
  TaskResolver,
  MilestoneResolver,
  MultipleResolver,
  RefResolver,
  WikiPageResolver
} from './resolver.model';
import { UtilsService } from '@/app/commons/utils/utils-service.service';

@Injectable()
export class ResolverApiService {
  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  public get base() {
    return `${this.config.apiUrl}/resolver`;
  }

  public project(project: string) {
    return this.http.get<ProjectResolver>(this.base, {
      params: UtilsService.buildQueryParams({
        project,
      }),
    });
  }

  public userStory(project: string, us: number) {
    return this.http.get<ProjectResolver>(this.base, {
      params: UtilsService.buildQueryParams({
        project,
        us,
      }),
    });
  }

  public issue(project: string, issue: number) {
    return this.http.get<IssueResolver>(this.base, {
      params: UtilsService.buildQueryParams({
        project,
        issue,
      }),
    });
  }

  public task(project: string, task: number) {
    return this.http.get<TaskResolver>(this.base, {
      params: UtilsService.buildQueryParams({
        project,
        task,
      }),
    });
  }

  public milestone(project: string, milestone: string) {
    return this.http.get<MilestoneResolver>(this.base, {
      params: UtilsService.buildQueryParams({
        project,
        milestone,
      }),
    });
  }

  public wikiPage(project: string, wikipage: string) {
    return this.http.get<WikiPageResolver>(this.base, {
      params: UtilsService.buildQueryParams({
        project,
        wikipage,
      }),
    });
  }

  public multiple(data: MultipleResolver) {
    return this.http.get<MultipleResolver>(this.base, {
      params: UtilsService.buildQueryParams({
        ...data,
      }),
    });
  }

  public ref(project: string, ref: number) {
    return this.http.get<RefResolver>(this.base, {
      params: UtilsService.buildQueryParams({
        project,
        ref,
      }),
    });
  }
}
