/**
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 *
 * Copyright (c) 2021-present Kaleidos INC
 */

import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() { }

  public get<T>(key: string): T | undefined {
    const item = localStorage.getItem(key);
    if (item) {
      try {
        return JSON.parse(item);
      } catch (error) {
        return undefined;
      }
    }
    return undefined;
  }

  public set(key: string, newValue?: {}) {
    localStorage.setItem(
      key,
      JSON.stringify(newValue)
    );
  }

  public remove(key: string) {
    localStorage.removeItem(key);
  }

  public contains(key: string) {
    return localStorage.get(key) !== undefined;
  }

  public clear() {
    localStorage.clear();
  }
}
