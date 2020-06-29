/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';

import { ConfigService } from '@/app/config.service';
import { ConfigServiceMock } from '@/app/config.service.mock';
import { EpicsCustomAttributesValuesApiService } from './epics-custom-attributes-values-api.service';
import { EpicCustomAttributeValueDetailPartialInput } from './epics-custom-attributes-value.model';

describe('EpicsCustomAttributesValuesApiService', () => {
  let spectator: SpectatorHttp<EpicsCustomAttributesValuesApiService>;
  const createHttp = createHttpFactory({
    service: EpicsCustomAttributesValuesApiService,
    providers: [
      {
        provide: ConfigService,
        useValue: ConfigServiceMock,
      },
    ],
  });

  const epic = 2;

  beforeEach(() => spectator = createHttp());

  it('get an epic custom attribute value', () => {
    spectator.service.get(epic).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/custom-attributes-values/${epic}`, HttpMethod.GET);
  });

  it('edit epic custom attribute value', () => {
    const data: EpicCustomAttributeValueDetailPartialInput = {
      attributesValues: {
        12: '240 min',
      },
      version: 1,
    };

    spectator.service.patch(epic, data).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/epics/custom-attributes-values/${epic}`, HttpMethod.PATCH);

    expect(req.request.body).toEqual(data);
  });

});
