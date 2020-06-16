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
