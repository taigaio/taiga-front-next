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
import { AuthorizeInput, ValidateInput, ApplicationToken } from './application-tokens.model';

@Injectable()
export class ApplicationTokensApiService {
  constructor(private http: HttpClient, private config: ConfigService) { }

  public get base() {
    return `${this.config.apiUrl}/application-tokens`;
  }

  public list() {
    return this.http.get<ApplicationToken[]>(this.base);
  }

  public get(applicationTokenId: string) {
    return this.http.get<ApplicationToken>(`${this.base}/${applicationTokenId}`);
  }

  public delete(applicationTokenId: string) {
    return this.http.delete(`${this.base}/${applicationTokenId}`);
  }

  public authorize(data: AuthorizeInput) {
    return this.http.post<ApplicationToken>(`${this.base}/authorize`, data);
  }

  public validate(data: ValidateInput) {
    return this.http.post(`${this.base}/validate`, data);
  }
}
