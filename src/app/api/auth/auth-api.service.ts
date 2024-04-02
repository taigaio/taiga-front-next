/**
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 *
 * Copyright (c) 2021-present Kaleidos INC
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '@/app/config.service';
import { Auth, LoginInput, PublicRegistryInput, PrivateRegistryInput } from './auth.model';

@Injectable()
export class AuthApiService {
  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  public get base() {
    return `${this.config.apiUrl}/auth`;
  }

  public login(data: LoginInput) {
    return this.http.post<Auth>(`${this.base}`, data);
  }

  public register(data: PublicRegistryInput | PrivateRegistryInput) {
    return this.http.post<Auth>(`${this.base}/register`, data);
  }
}
