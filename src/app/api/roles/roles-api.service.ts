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
