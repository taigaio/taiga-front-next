/**
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 *
 * Copyright (c) 2021-present Kaleidos INC
 */

import { Injectable } from '@angular/core';
import { ConfigService } from '@/app/config.service';
import { HttpClient } from '@angular/common/http';
import { IssueCustomAttributeValues } from './issue-custom-attribute.model';

@Injectable()
export class IssueCustomAttributeValuesApiService {
  constructor(private http: HttpClient, private config: ConfigService) { }

  public get base() {
    return `${this.config.apiUrl}/issue-custom-attributes-values`;
  }

  public get(id: number) {
    return this.http.get<IssueCustomAttributeValues>(`${this.base}/${id}`);
  }

  public put(id: number, values: Record<string, string>) {
    return this.http.put<IssueCustomAttributeValues>(`${this.base}/${id}`, values);
  }

  public patch(id: number, values: Record<string, string>) {
    return this.http.patch<IssueCustomAttributeValues>(`${this.base}/${id}`, values);
  }
}
