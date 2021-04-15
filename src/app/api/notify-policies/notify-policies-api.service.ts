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
