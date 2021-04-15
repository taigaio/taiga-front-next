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
import { TimelineEntry } from './timeline.model';
import { User } from '@/app/api/users/users.model';
import { Project } from '@/app/api/projects/projects.model';

@Injectable()
export class TimelineApiService {
  constructor(private http: HttpClient, private config: ConfigService) { }

  public get base() {
    return `${this.config.apiUrl}/timeline`;
  }

  public user(userId: User['id']) {
    return this.http.get<TimelineEntry>(`${this.base}/user/${userId}`);
  }

  public profile(userId: User['id']) {
    return this.http.get<TimelineEntry>(`${this.base}/profile/${userId}`);
  }

  public project(projectId: Project['id']) {
    return this.http.get<TimelineEntry>(`${this.base}/project/${projectId}`);
  }
}
