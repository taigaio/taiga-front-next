/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';

import { ConfigService } from '@/app/config.service';
import { EpicCustomAttributeCreationMockFactory, EpicCustomAttributeBulkOrderMockFactory, EpicCustomAttributeDetailMockFactory } from './epics.model.mock';
import { EpicsCustomAttributeApiService } from './epics-custom-attributes-api.service';
import { ConfigServiceMock } from '@/app/config.service.mock';
import { EpicCustomAttributePartialInput, EpicCustomAttributeBulkUpdate } from './epics-custom-attributes.model';
import { parseQueryParams } from '@/utils/test.helpers';
import faker from 'faker';

describe('EpicsCustomAttributeApiService', () => {
  let spectator: SpectatorHttp<EpicsCustomAttributeApiService>;
  const createHttp = createHttpFactory({
    service: EpicsCustomAttributeApiService,
    providers: [
      {
        provide: ConfigService,
        useValue: ConfigServiceMock,
      },
    ],
  });

  beforeEach(() => spectator = createHttp());

  // const project = 1;
  // const epic = 2;
  it('List ALL Epics custom attributes by project', () => {
    const project = faker.random.number();
    const query = {
      project: project.toString(),
    };
    spectator.service.list(project).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epic-custom-attributes?${parseQueryParams(query)}`, HttpMethod.GET);
  });

  it('create epic custom attribute', () => {
    const data = EpicCustomAttributeCreationMockFactory.build();

    spectator.service.create(data).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/epic-custom-attributes`, HttpMethod.POST);

    expect(req.request.body).toEqual(data);
  });

  it('get epic custom attributes', () => {
    const epic = faker.random.number();

    spectator.service.get(epic).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epic-custom-attributes/${epic}`, HttpMethod.GET);
  });

  it('put epic custom attribute', () => {
    const epic = faker.random.number();
    const data = EpicCustomAttributeDetailMockFactory.build();

    spectator.service.put(epic, data).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/epic-custom-attributes/${epic}`, HttpMethod.PUT);

    expect(req.request.body).toEqual(data);
  });

  it('patch epic custom attribute', () => {
    const epic = faker.random.number();
    const data: EpicCustomAttributePartialInput = {
      name: faker.internet.color(),
    };

    spectator.service.patch(epic, data).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/epic-custom-attributes/${epic}`, HttpMethod.PATCH);

    expect(req.request.body).toEqual(data);
  });

  it('delete epic custom attributes', () => {
    const epic = faker.random.number();

    spectator.service.delete(epic).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epic-custom-attributes/${epic}`, HttpMethod.DELETE);
  });

  it('bulk update epic order custom attributes', () => {
    const data = EpicCustomAttributeBulkOrderMockFactory.build();

    const body: EpicCustomAttributeBulkUpdate = {
      project: data.project,
      bulkEpicCustomAttributes: data.bulkEpicCustomAttributes,
    };

    spectator.service.bulkUpdateOrder(data).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/epic-custom-attributes`, HttpMethod.POST);

    expect(req.request.body).toEqual(body);
  });
});
