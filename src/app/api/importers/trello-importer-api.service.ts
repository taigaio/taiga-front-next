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
import { ImportedTrelloProject, ImportProjectTask, TrelloAuthToken, TrelloImportData, TrelloProject, TrelloUser } from './importer.model';

@Injectable()
export class TrelloImporterApiService {

  constructor(
    private http: HttpClient,
    private config: ConfigService) { }

  public get base() {
    return `${this.config.apiUrl}/trello`;
  }

  public getAuthUrl() {
    return this.http.get<TrelloAuthToken>(`${this.base}/auth_url`);
  }

  public auth(code: string) {
    const params = {
      code,
    };

    return this.http.post<TrelloAuthToken>(`${this.base}/authorize`, params);
  }

  public listUsers(project: string, token: string) {
    const params = {
      project,
      token,
    };

    return this.http.post<TrelloUser[]>(`${this.base}/list_users`, params);
  }

  public listProjects(token: string) {
    const params = {
      token,
    };

    return this.http.post<TrelloProject[]>(`${this.base}/list_projects`, params);
  }

  public importProject(project: TrelloImportData) {
    return this.http.post<ImportedTrelloProject | ImportProjectTask>(`${this.base}/import`, project);
  }
}
