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
