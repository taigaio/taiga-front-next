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
import { Role, RoleInput, RolePartialInput } from './roles.model';

@Injectable()
export class RolesApiService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  public get base() {
    return `${this.config.apiUrl}/roles`;
  }

  public list(project?: number) {
    const query = {
      ...(project && { project: project.toString() }),
    };

    return this.http.get<Role[]>(this.base, {
      params: query,
    });
  }

  public get(roleId: number) {
    return this.http.get<Role>(`${this.base}/${roleId}`);
  }

  public create(data: RoleInput) {
    return this.http.post<Role>(this.base, data);
  }

  public put(roleId: number, data: Role) {
    return this.http.put<Role>(`${this.base}/${roleId}`, data);
  }

  public patch(roleId: number, data: RolePartialInput) {
    return this.http.patch<Role>(`${this.base}/${roleId}`, data);
  }

  public delete(roleId: number, moveTo?: number) {
    const query = {
      ...(moveTo && { moveTo: moveTo.toString() }),
    };

    return this.http.delete(`${this.base}/${roleId}`, {
      params: query,
    });
  }
}
