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
      params: {
        project,
      },
    });
  }

  public userStory(project: string, us: number) {
    return this.http.get<ProjectResolver>(this.base, {
      params: {
        project,
        us: us.toString(),
      },
    });
  }

  public issue(project: string, issue: number) {
    return this.http.get<IssueResolver>(this.base, {
      params: {
        project,
        issue: issue.toString(),
      },
    });
  }

  public task(project: string, task: number) {
    return this.http.get<TaskResolver>(this.base, {
      params: {
        project,
        task: task.toString(),
      },
    });
  }

  public milestone(project: string, milestone: string) {
    return this.http.get<MilestoneResolver>(this.base, {
      params: {
        project,
        milestone,
      },
    });
  }

  public wikiPage(project: string, wikiPage: string) {
    return this.http.get<WikiPageResolver>(this.base, {
      params: {
        project,
        wikipage: wikiPage,
      },
    });
  }

  public multiple(project: string, task?: number, us?: number, wikiPage?: string) {
    const query = {
      project,
      ...(task && { task: task.toString() }),
      ...(us && { us: us.toString() }),
      ...(wikiPage && { wikiPage: wikiPage.toString() }),
    };

    return this.http.get<MultipleResolver>(this.base, {
      params: query,
    });
  }

  public ref(project: string, ref: number) {
    return this.http.get<RefResolver>(this.base, {
      params: {
        project,
        ref: ref.toString(),
      },
    });
  }
}
