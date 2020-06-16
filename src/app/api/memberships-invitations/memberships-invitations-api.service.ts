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
import { Membership } from './memberships-invitations.model';


@Injectable()
export class MembershipsInvitationsApiService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  public get base() {
    return `${this.config.apiUrl}/memberships`;
  }

  public list(project?: number, role?: number) {
    return this.http.get<Membership[]>(this.base, {
      params: {
        ...(project && { project: project.toString() }),
        ...(role && { role: role.toString() }),
      },
    });
  }

  public create(project: number, role: number, username: string) {
    const data = {
      project: project.toString(),
      role: role.toString(),
      username,
    };

    return this.http.post<Membership>(this.base, data);
  }
}
