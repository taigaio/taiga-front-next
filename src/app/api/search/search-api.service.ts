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
