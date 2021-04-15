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
import { UserStorage } from './user-storage.model';

@Injectable()
export class UserStorageApiService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) { }

  public get base() {
    return `${this.config.apiUrl}/user-storage`;
  }

  public list() {
    return this.http.get<UserStorage<unknown>[]>(this.base);
  }

  public create<T>(data: Record<string, string>) {
    return this.http.post<UserStorage<T>>(this.base, data);
  }

  public get<T>(key: string) {
    return this.http.get<UserStorage<T>>(`${this.base}/${key}`);
  }

  public put<T>(key: string, data: Record<string, string>) {
    return this.http.put<UserStorage<T>>(`${this.base}/${key}`, data);
  }

  public patch<T>(key: string, data: Record<string, string>) {
    return this.http.patch<UserStorage<T>>(`${this.base}/${key}`, data);
  }

  public delete(key: string) {
    return this.http.delete(`${this.base}/${key}`);
  }
}
