/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
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
