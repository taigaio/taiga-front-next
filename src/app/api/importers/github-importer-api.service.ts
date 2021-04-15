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
import { GithubAuthToken, GithubImportData, GithubProject, GithubUser, ImportedGithubProject, ImportProjectTask } from './importer.model';

@Injectable()
export class GithubImporterApiService {

  constructor(
    private http: HttpClient,
    private config: ConfigService) { }

  public get base() {
    return `${this.config.apiUrl}/github`;
  }

  public getAuthUrl() {
    return this.http.get<GithubAuthToken>(`${this.base}/auth_url`);
  }

  public auth(code: string) {
    const params = {
      code,
    };

    return this.http.post<GithubAuthToken>(`${this.base}/authorize`, params);
  }

  public listUsers(project: string, token: string) {
    const params = {
      project,
      token,
    };

    return this.http.post<GithubUser[]>(`${this.base}/list_users`, params);
  }

  public listRepositories(token: string) {
    const params = {
      token,
    };

    return this.http.post<GithubProject[]>(`${this.base}/list_projects`, params);
  }

  public importProject(project: GithubImportData) {
    return this.http.post<ImportedGithubProject | ImportProjectTask>(`${this.base}/import`, project);
  }
}
