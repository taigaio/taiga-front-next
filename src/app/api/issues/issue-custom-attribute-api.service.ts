/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { Injectable } from '@angular/core';
import { ConfigService } from '@/app/config.service';
import { HttpClient } from '@angular/common/http';
import { IssueCustomAttribute, IssueCustomAttributeCreationData } from './issue-custom-attribute.model';
import { UtilsService } from '@/app/commons/utils/utils-service.service';

@Injectable()
export class IssueCustomAttributeApiService {
  constructor(private http: HttpClient, private config: ConfigService) { }

  public get base() {
    return `${this.config.apiUrl}/issue-custom-attributes`;
  }

  public list(projectId: number) {
    return this.http.get<IssueCustomAttribute[]>(this.base, {
      params: UtilsService.buildQueryParams({
        project: projectId.toString(),
      }),
    });
  }

  public create(issueCustomAttribute: IssueCustomAttributeCreationData) {
    return this.http.post<IssueCustomAttribute>(this.base, issueCustomAttribute);
  }

  public get(id: number) {
    return this.http.get<IssueCustomAttribute>(`${this.base}/${id}`);
  }

  public put(id: number, us: Partial<IssueCustomAttribute>) {
    return this.http.put<IssueCustomAttribute>(`${this.base}/${id}`, us);
  }

  public patch(id: number, us: Partial<IssueCustomAttribute>) {
    return this.http.patch<IssueCustomAttribute>(`${this.base}/${id}`, us);
  }

  public delete(id: number) {
    return this.http.delete(`${this.base}/${id}`);
  }

  public bulkUpdateOrder(projectId: number, bulkIssueCustomAttributes: [number, number][]) {
    return this.http.post(`${this.base}/bulk_update_order`, {
      projectId,
      bulkIssueCustomAttributes,
    });
  }

}
