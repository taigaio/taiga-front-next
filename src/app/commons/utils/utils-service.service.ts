/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */


import { HttpParams } from '@angular/common/http';

type dataTypes = string | number | boolean | Date | File;

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

        if (Array.isArray(value)) {
          target = target.append(newKey, value.join(','));
        } else if (value && value.toString) {
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

        if (value instanceof File) {
          formData.append(newKey, value, value.name);
        } else if (Array.isArray(value)) {
          formData.append(newKey, value.join(','));
        } else if (value && value.toString) {
          formData.append(newKey, value.toString());
        }
    });

    return formData;
  }
}
