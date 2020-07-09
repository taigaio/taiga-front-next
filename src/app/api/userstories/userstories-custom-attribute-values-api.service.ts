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
import { UserstoryCustomAttributeValues } from './userstories-custom-attribute.model';

@Injectable()
export class UserstoriesCustomAttributeValuesApiService {
  constructor(private http: HttpClient, private config: ConfigService) { }

  public get base() {
    return `${this.config.apiUrl}/userstories/custom-attributes-values`;
  }

  public get(id: number) {
    return this.http.get<UserstoryCustomAttributeValues>(`${this.base}/${id}`);
  }

  public put(id: number, values: Record<string, string>) {
    return this.http.put<UserstoryCustomAttributeValues>(`${this.base}/${id}`, values);
  }

  public patch(id: number, values: Record<string, string>) {
    return this.http.patch<UserstoryCustomAttributeValues>(`${this.base}/${id}`, values);
  }
}
