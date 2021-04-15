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

import { WikiLink, WikiLinkCreationData } from './wiki.model';
import { UtilsService } from '@/app/commons/utils/utils-service.service';

@Injectable()
export class WikiLinksApiService {
  constructor(private http: HttpClient, private config: ConfigService) { }

  public get base() {
    return `${this.config.apiUrl}/wiki-links`;
  }

  public list(project?: number) {
    return this.http.get<WikiLink[]>(this.base, {
      params: UtilsService.buildQueryParams({
        ...(project && { project }),
      }),
    });
  }

  public get(id: number) {
    return this.http.get<WikiLink>(`${this.base}/${id}`);
  }

  public create(wikiLink: WikiLinkCreationData) {
    return this.http.post<WikiLink>(this.base, wikiLink);
  }

  public put(wikiLink: WikiLink) {
    return this.http.put<WikiLink>(`${this.base}/${wikiLink.id}`, wikiLink);
  }

  public patch(id: number, wikiLink: Partial<WikiLink>) {
    return this.http.patch<WikiLink>(`${this.base}/${id}`, wikiLink);
  }

  public delete(id: number) {
    return this.http.delete(`${this.base}/${id}`);
  }
}
