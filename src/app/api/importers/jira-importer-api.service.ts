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
import { UtilsService } from '@/app/commons/utils/utils-service.service';
import {
  ImportedJiraProject,
  ImportProjectTask,
  JiraAuthToken,
  JiraAuthUrl,
  JiraImportData,
  JiraProject,
  JiraUser
} from './importer.model';

@Injectable()
export class JiraImporterApiService {

  constructor(
    private http: HttpClient,
    private config: ConfigService) { }

  public get base() {
    return `${this.config.apiUrl}/jira`;
  }

  public getAuthUrl(url: string) {
    const params = UtilsService.buildQueryParams({
      url,
    });

    return this.http.get<JiraAuthUrl>(`${this.base}/auth_url`, {
      params,
    });
  }

  public auth() {
    return this.http.post<JiraAuthToken>(`${this.base}/authorize`, null);
  }

  public listUsers(project: string, token: string, url: string) {
    const params = {
      project,
      token,
      url,
    };

    return this.http.post<JiraUser[]>(`${this.base}/list_users`, params);
  }

  public listProjects(token: string, url: string) {
    const params = {
      token,
      url,
    };

    return this.http.post<JiraProject[]>(`${this.base}/list_projects`, params);
  }

  public importProject(project: JiraImportData) {
    return this.http.post<ImportedJiraProject | ImportProjectTask>(`${this.base}/import`, project);
  }
}
