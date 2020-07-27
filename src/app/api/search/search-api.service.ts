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
import { SearchResults } from './search.model';
import { UtilsService } from '@/app/commons/utils/utils-service.service';
import { Project } from '../projects/projects.model';

@Injectable()
export class SearchApiService {
  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  public get base() {
    return `${this.config.apiUrl}/search`;
  }

  public search(projectId: Project['id'], text: string) {
    return this.http.get<SearchResults>(this.base, {
      params: UtilsService.buildQueryParams({
        project: projectId,
        text,
      }),
    });
  }
}
