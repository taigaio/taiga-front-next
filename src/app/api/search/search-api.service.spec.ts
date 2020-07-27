/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { SearchApiService } from './search-api.service';
import { ConfigService } from '@/app/config.service';
import { ConfigServiceMock } from '@/app/config.service.mock';
import { UtilsService } from '@/app/commons/utils/utils-service.service';

describe('SearchApiService', () => {
  let spectator: SpectatorHttp<SearchApiService>;
  const createHttp = createHttpFactory({
    service: SearchApiService,
    providers: [
      { provide: ConfigService, useValue: ConfigServiceMock },
    ],
  });


  beforeEach(() => spectator = createHttp());

  it('search', () => {
    const queryParams = {
      project: 1,
      text: 'search-text',
    };

    spectator.service.search(queryParams.project, queryParams.text).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/search?${UtilsService.buildQueryParams(queryParams)}`, HttpMethod.GET);
  });
});
