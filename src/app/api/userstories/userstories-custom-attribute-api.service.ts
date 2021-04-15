/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { Injectable } from '@angular/core';
import { ConfigService } from '@/app/config.service';
import { HttpClient } from '@angular/common/http';
import { UserstoryCustomAttribute, UserstoryCustomAttributeCreationData } from './userstories-custom-attribute.model';
import { UtilsService } from '@/app/commons/utils/utils-service.service';

@Injectable()
export class UserstoriesCustomAttributeApiService {
  constructor(private http: HttpClient, private config: ConfigService) { }

  public get base() {
    return `${this.config.apiUrl}/userstory-custom-attributes`;
  }

  public list(projectId: number) {
    return this.http.get<UserstoryCustomAttribute[]>(this.base, {
      params: UtilsService.buildQueryParams({
        project: projectId,
      }),
    });
  }

  public create(userstoryCustomAttribute: UserstoryCustomAttributeCreationData) {
    return this.http.post<UserstoryCustomAttribute>(this.base, userstoryCustomAttribute);
  }

  public get(id: number) {
    return this.http.get<UserstoryCustomAttribute>(`${this.base}/${id}`);
  }

  public put(id: number, us: UserstoryCustomAttribute) {
    return this.http.put<UserstoryCustomAttribute>(`${this.base}/${id}`, us);
  }

  public patch(id: number, us: Partial<UserstoryCustomAttribute>) {
    return this.http.patch<UserstoryCustomAttribute>(`${this.base}/${id}`, us);
  }

  public delete(id: number) {
    return this.http.delete(`${this.base}/${id}`);
  }

  public bulkUpdateOrder(projectId: number, bulkUserstoryCustomAttributes: [number, number][]) {
    return this.http.post(`${this.base}/bulk_update_order`, {
      projectId,
      bulkUserstoryCustomAttributes,
    });
  }

}
