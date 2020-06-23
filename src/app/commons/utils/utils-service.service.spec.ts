/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { UtilsService } from './utils-service.service';

describe('UtilsService', () => {
  it('transform object to HttpParams with param3 key transformation', () => {
    const params = {
      param1: 1,
      param2: 'test',
      param3: [1, 'two'],
    };

    expect(
      UtilsService.buildQueryParams(params, (key) => key === 'param3' ? 'Param3' : key).toString()
    ).toEqual(`param1=1&param2=test&Param3=1,two`);
  });

  it('transform object to FormData with param3 key transformation', () => {
    const params = {
      param1: 1,
      param2: 'test',
      param3: [1, 'two'],
      param4: new File([], 'test.png'),
    };

    const formData = UtilsService.buildFormData(params, (key) => key === 'param3' ? 'Param3' : key);

    expect(formData.get('param1')).toEqual(params.param1.toString());
    expect(formData.get('param2')).toEqual(params.param2);
    expect(formData.get('Param3')).toEqual(params.param3.join(','));
    expect(formData.get('param4')).toBeInstanceOf(File);
    expect((formData.get('param4') as File).name).toEqual('test.png');
  });
});
