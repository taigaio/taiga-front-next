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
import { Stats } from './stats.model';

@Injectable()
export class StatsApiService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  public getDiscover() {
    return this.http.get<Stats>(`${this.config.apiUrl}/stats/discover`);
  }
}
