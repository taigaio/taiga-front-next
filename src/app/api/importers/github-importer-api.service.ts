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
