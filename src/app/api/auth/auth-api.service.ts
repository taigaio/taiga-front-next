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
