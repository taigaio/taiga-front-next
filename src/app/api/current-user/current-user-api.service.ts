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
import { User } from '../users/users.model';

@Injectable()
export class CurrentUserApiService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  public getCurrentUser() {
    return this.http.get<User>(`${this.config.apiUrl}/me`);
  }
}
