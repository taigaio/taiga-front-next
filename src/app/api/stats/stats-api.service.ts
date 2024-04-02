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
import { Stats } from './stats.model';

@Injectable()
export class StatsApiService {

  constructor(private http: HttpClient, private config: ConfigService) { }

  public getDiscover() {
    return this.http.get<Stats>(`${this.config.apiUrl}/stats/discover`);
  }
}
