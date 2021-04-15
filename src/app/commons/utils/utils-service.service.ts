/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { HttpParams } from '@angular/common/http';

type dataTypes = string | number | boolean | Date | File | undefined | null;

export class UtilsService {
  constructor() {}

  static buildQueryParams(
    source: Record<string, any>,
    keyMap: Record<string, string> = {}) {
    let target: HttpParams = new HttpParams();

    Object.keys(source)
    .forEach((key: string) => {
        const value: dataTypes | dataTypes[] = source[key];
        const newKey = key in keyMap ? keyMap[key] : key;
        if (value === undefined) {
          target = target.append(newKey, 'undefined');
        } else if (value === null) {
            target = target.append(newKey, 'null');
        } else if (Array.isArray(value)) {
          target = target.append(newKey, value.join(','));
        } else if (value.toString) {
          target = target.append(newKey, value.toString());
        }
    });

    return target;
  }

  static buildFormData(
    source: Record<string, any>,
    keyMap: Record<string, string> = {}) {
    const formData: FormData = new FormData();

    Object.keys(source)
    .forEach((key: string) => {
        const value: dataTypes | dataTypes[] = source[key];
        const newKey = key in keyMap ? keyMap[key] : key;

        if (value === undefined) {
          formData.append(newKey, 'undefined');
        } else if (value === null) {
          formData.append(newKey, 'null');
        } else if (value instanceof File) {
          formData.append(newKey, value, value.name);
        } else if (Array.isArray(value)) {
          formData.append(newKey, value.join(','));
        } else if (value.toString) {
          formData.append(newKey, value.toString());
        }
    });

    return formData;
  }

  static objKeysTransformer(
    input: object | ArrayLike<unknown>,
    transformerFn: (input: object | ArrayLike<unknown>) => string): object | ArrayLike<unknown> {
    if (input === null || typeof input !== 'object') {
      return input;
    } else if (Array.isArray(input)) {
      return input.map((it) => {
        return this.objKeysTransformer(it, transformerFn);
      });
    } else {
      return Object.fromEntries(
        Object.entries(input).map(([key, value]) => {
          if (typeof value === 'object' && value !== null) {
            return [transformerFn(key), this.objKeysTransformer(value, transformerFn)];
          }

          return [transformerFn(key), value];
        })
      );
    }
  }

  static slugify(data: string) {
    return data.toLowerCase().trim()
        .replace(/\s+/g, '-')
        .replace(/&/g, '-and-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
  }
}
