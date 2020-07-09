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
import { NotifyPolicyDetail } from './notify-policies.model';

@Injectable()
export class NotifyPoliciesApiService {

  constructor(
    private http: HttpClient,
    private config: ConfigService) { }

  public get base() {
    return `${this.config.apiUrl}/notify-policies`;
  }

  public list() {
    return this.http.get<NotifyPolicyDetail[]>(this.base);
  }

  public get(id: number) {
    return this.http.get<NotifyPolicyDetail[]>(`${this.base}/${id}`);
  }

  public put(id: number, notifyPolicyDetail: NotifyPolicyDetail) {
    return this.http.put<NotifyPolicyDetail>(`${this.base}/${id}`, notifyPolicyDetail);
  }

  public patch(id: number, notifyPolicyDetail: Partial<NotifyPolicyDetail>) {
    return this.http.patch<NotifyPolicyDetail>(`${this.base}/${id}`, notifyPolicyDetail);
  }
}
