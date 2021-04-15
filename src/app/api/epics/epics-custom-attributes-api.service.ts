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
import { EpicCustomAttributeDetail, EpicCustomAttributeCreationData, EpicCustomAttributePartialInput, EpicCustomAttributeBulkUpdate } from './epics-custom-attributes.model';
import { UtilsService } from '@/app/commons/utils/utils-service.service';


@Injectable()
export class EpicsCustomAttributeApiService {

  constructor(
    private http: HttpClient,
    private config: ConfigService) { }

  public get base() {
    return `${this.config.apiUrl}/epic-custom-attributes`;
  }

  public list(project?: number) {
    return this.http.get<EpicCustomAttributeDetail[]>(this.base, {
      params: UtilsService.buildQueryParams({
        project,
      }),
    });
  }

  public create(data: EpicCustomAttributeCreationData) {
    return this.http.post<EpicCustomAttributeDetail>(this.base, data);
  }

  public get(id: number) {
    return this.http.get<EpicCustomAttributeDetail>(`${this.base}/${id}`);
  }

  public put(id: number, data: EpicCustomAttributeDetail) {
    return this.http.put<EpicCustomAttributeDetail>(`${this.base}/${id}`, data);
  }

  public patch(id: number, data: EpicCustomAttributePartialInput) {
    return this.http.patch<EpicCustomAttributeDetail>(`${this.base}/${id}`, data);
  }

  public delete(id: number) {
    return this.http.delete(`${this.base}/${id}`);
  }

  public bulkUpdateOrder(data: EpicCustomAttributeBulkUpdate) {
    const query = {
      project: data.project,
      bulkEpicCustomAttributes: data.bulkEpicCustomAttributes,
    };
    return this.http.post(this.base, query);
  }
}
