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
import { User } from '@/app/api/users/users.model';
import { ProjectTemplate } from '@/app/api/project-templates/project-templates.model';
import {
  ProjectListEntry,
  ProjectsListFilter,
  ProjectsListOrderBy,
  Project,
  NewProject,
  ProjectModules,
  ProjectStats,
  ProjectIssueStats,
  Tag,
  EditTag,
  DuplicateProject,
  SyncExport,
  AsyncExport,
  ImportAccepted,
} from './projects.model';

@Injectable()
export class ProjectsApiService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  public get base() {
    return `${this.config.apiUrl}/projects`;
  }

  public list(filters: ProjectsListFilter = {}, orderBy?: ProjectsListOrderBy) {
    const params = UtilsService.buildQueryParams({
      ...filters,
      orderBy,
    });

    return this.http.get<ProjectListEntry>(this.base, {
      params,
    });
  }

  public create(data: NewProject) {
    return this.http.post<Project>(this.base, data);
  }

  public get(projectId: number) {
    return this.http.get<Project>(`${this.base}/${projectId}`);
  }

  public getBySlug(slug: string) {
    return this.http.get<Project>(`${this.base}/by_slug`, {
      params: UtilsService.buildQueryParams({
        slug,
      }),
    });
  }

  public put(projectId: number, data: NewProject) {
    return this.http.put<Project>(`${this.base}/${projectId}`, data);
  }

  public patch(projectId: number, data: NewProject) {
    return this.http.patch<Project>(`${this.base}/${projectId}`, data);
  }

  public delete(projectId: number) {
    return this.http.delete(`${this.base}/${projectId}`);
  }

  public bulkUpdateOrder(newOrder: {order: number; projectId: number}[]) {
    return this.http.post(`${this.base}/bulk_update_order`, newOrder);
  }

  public getModulesConfiguration(projectId: number) {
    return this.http.get<ProjectModules>(`${this.base}/${projectId}/modules`);
  }

  public editModulesConfiguration(projectId: number, modules: Partial<ProjectModules>) {
    return this.http.patch<ProjectModules>(`${this.base}/${projectId}/modules`, modules);
  }

  public stats(projectId: number) {
    return this.http.get<ProjectStats>(`${this.base}/${projectId}/stats`);
  }

  public issueStats(projectId: number) {
    return this.http.get<ProjectIssueStats>(`${this.base}/${projectId}/issues_stats`);
  }

  public tagColors(projectId: number) {
    return this.http.get<Record<string, null | string>>(`${this.base}/${projectId}/tags_colors`);
  }

  public createTag(projectId: number, tag: Tag) {
    return this.http.post(`${this.base}/${projectId}/create_tag`, tag);
  }

  public editTag(projectId: number, tag: EditTag) {
    return this.http.post(`${this.base}/${projectId}/edit_tag`, tag);
  }

  public deleteTag(projectId: number, tag: string) {
    return this.http.delete(`${this.base}/${projectId}/delete_tag`, {
      params: UtilsService.buildQueryParams({
        tag,
      }),
    });
  }

  public mixTags(projectId: number, fromTags: string[], toTag: string) {
    return this.http.get(`${this.base}/${projectId}/mix_tags`, {
      params: UtilsService.buildQueryParams({
        fromTags,
        toTag,
      }),
    });
  }

  public likeProject(projectId: number) {
    return this.http.get(`${this.base}/${projectId}/like`);
  }

  public projectFans(projectId: number) {
    return this.http.get<Pick<User, 'fullName' | 'username' | 'id'>[]>(`${this.base}/${projectId}/fans`);
  }

  public watchProject(projectId: number, notifyLevel: number) {
    return this.http.post(`${this.base}/${projectId}/watch`, {
      notifyLevel,
    });
  }

  public stopWatchingProject(projectId: number) {
    return this.http.post(`${this.base}/${projectId}/unwatch`, null);
  }

  public projectWatchers(projectId: number) {
    return this.http.get<Pick<User, 'fullName' | 'username' | 'id'>[]>(`${this.base}/${projectId}/watchers`);
  }

  public createTemplate(projectId: number, templateName: string, templateDescription: string) {
    return this.http.post<ProjectTemplate>(`${this.base}/${projectId}/create_template`, {
      templateName,
      templateDescription,
    });
  }

  public leave(projectId: number) {
    return this.http.post(`${this.base}/${projectId}/leave`, null);
  }

  public changeLogo(projectId: number, logo: File) {
    const formData = new FormData();
    formData.append('logo', logo, logo.name);
    return this.http.post<Project>(`${this.base}/${projectId}/change_logo`, formData);
  }

  public removeLogo(projectId: number) {
    return this.http.post<Project>(`${this.base}/${projectId}/remove_logo`, null);
  }

  public transferValidateToken(projectId: number) {
    return this.http.post<Project>(`${this.base}/${projectId}/transfer_validate_token`, null);
  }

  public transferRequest(projectId: number) {
    return this.http.post(`${this.base}/${projectId}/transfer_request`, null);
  }

  public transferStart(projectId: number, user: number) {
    return this.http.post(`${this.base}/${projectId}/transfer_start`, {
      user,
    });
  }

  public transferAccept(projectId: number, token: string, reason: string) {
    return this.http.post(`${this.base}/${projectId}/transfer_accept`, {
      reason,
      token,
    });
  }

  public transferReject(projectId: number, token: string, reason: string) {
    return this.http.post(`${this.base}/${projectId}/transfer_reject`, {
      reason,
      token,
    });
  }

  public duplicate(projectId: number, newProject: DuplicateProject) {
    return this.http.post<Project>(`${this.base}/${projectId}/duplicate`, newProject);
  }

  public export(projectId: number) {
    return this.http.get<SyncExport | AsyncExport>(`${this.config.apiUrl}/exporter/${projectId}`);
  }

  public import(dump: File) {
    const data = UtilsService.buildFormData({
      dump,
    });

    return this.http.post<ImportAccepted | Project>(`${this.config.apiUrl}/importer/load_dump`, data);
  }
}
