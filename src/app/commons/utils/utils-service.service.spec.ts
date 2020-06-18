/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { UtilsService } from './utils-service.service';

describe('UtilsServiceService', () => {
  it('should be created', () => {
    const params = {
      param1: 1,
      param2: 'test',
      param3: [1, 'two'],
    };

    expect(UtilsService.buildQueryParams(params).toString()).toEqual(`param1=1&param2=test&param3=1,two`);
  });
});
