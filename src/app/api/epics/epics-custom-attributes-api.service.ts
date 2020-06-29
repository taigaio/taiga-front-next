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
import { EpicCustomAttributeDetail, EpicCustomAttributeCreationData, EpicCustomAttributePartialInput, EpicCustomAttributeBulkUpdate } from './epics-custom-attributes.model';


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
      params: {
        ...(project && { project: project.toString() }),
      },
    });
  }

  public create(data: EpicCustomAttributeCreationData) {
    const query = {
      ...(data.description && { description: data.description }),
      ...(data.order && { blockedNote: data.order }),
      project: data.project,
      name: data.name,
    };
    return this.http.post<EpicCustomAttributeDetail>(this.base, query);
  }

  public get(id: number) {
    return this.http.get<EpicCustomAttributeDetail>(`${this.base}/${id}`);
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
