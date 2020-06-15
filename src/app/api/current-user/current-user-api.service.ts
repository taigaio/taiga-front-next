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
import { User } from '../users/users.model';

@Injectable()
export class CurrentUserApiService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  public getCurrentUser() {
    return this.http.get<User>(`${this.config.apiUrl}/me`);
  }
}
