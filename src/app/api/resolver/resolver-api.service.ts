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
