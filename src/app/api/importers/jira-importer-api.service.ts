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
