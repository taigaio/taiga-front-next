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
import { ProjectTemplate, ProjectTemplateInput, ProjectTemplatePartialInput } from './project-templates.model';

@Injectable()
export class ProjectTemplatesApiService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  get base() {
    return `${this.config.apiUrl}/project-templates`;
  }

  public list() {
    return this.http.get<ProjectTemplate[]>(this.base);
  }

  public get(projectTemplateId: number) {
    return this.http.get<ProjectTemplate>(`${this.base}/${projectTemplateId}`);
  }

  public create(data: ProjectTemplateInput) {
    return this.http.post<ProjectTemplate>(this.base, data);
  }

  public put(projectTemplateId: number, data: ProjectTemplate) {
    return this.http.put<ProjectTemplate>(`${this.base}/${projectTemplateId}`, data);
  }

  public patch(projectTemplateId: number, data: ProjectTemplatePartialInput) {
    return this.http.patch<ProjectTemplate>(`${this.base}/${projectTemplateId}`, data);
  }

  public delete(projectTemplateId: number) {
    return this.http.delete(`${this.base}/${projectTemplateId}`);
  }
}
