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
import { AsanaAuthToken, AsanaAuthUrl, AsanaImportData, AsanaProject, AsanaUser, ImportedAsanaProject, ImportProjectTask } from './importer.model';

@Injectable()
export class AsanaImporterApiService {

  constructor(
    private http: HttpClient,
    private config: ConfigService) { }

  public get base() {
    return `${this.config.apiUrl}/asana`;
  }

  public getAuthUrl() {
    return this.http.get<AsanaAuthUrl>(`${this.base}/auth_url`);
  }

  public auth() {
    return this.http.post<AsanaAuthToken>(`${this.base}/authorize`, null);
  }

  public listUsers(project: number, token: AsanaAuthToken) {
    const params = {
      project,
      token,
    };

    return this.http.post<AsanaUser[]>(`${this.base}/list_users`, params);
  }

  public listProjects(token: AsanaAuthToken) {
    const params = {
      token,
    };

    return this.http.post<AsanaProject[]>(`${this.base}/list_projects`, params);
  }

  public importProject(project: AsanaImportData) {
    return this.http.post<ImportedAsanaProject | ImportProjectTask>(`${this.base}/import`, project);
  }
}
