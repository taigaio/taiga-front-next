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
