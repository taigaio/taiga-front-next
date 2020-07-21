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
