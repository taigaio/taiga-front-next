/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { Pipe, PipeTransform } from '@angular/core';
import { UtilsService } from '../utils/utils-service.service';
import { camelCase } from 'change-case';

@Pipe({name: 'camelCaseTransformer'})
export class CamelCaseTranformerPipe implements PipeTransform {
  transform(value: object | ArrayLike<unknown>): any {
    return UtilsService.objKeysTransformer(value, camelCase);
  }
}
