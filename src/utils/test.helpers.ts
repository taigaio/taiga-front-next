/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { HttpParams } from '@angular/common/http';

export const parseQueryParams = (params: Record<string, string>) => {
  return new HttpParams({
    fromObject: params,
  });
};
