/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';

import { ConfigService } from '@/app/config.service';
import { EpicCustomAttributeCreationMockFactory, EpicCustomAttributeBulkOrderMockFactory } from './epics.model.mock';
import { EpicsCustomAttributeApiService } from './epics-custom-attributes-api.service';
import { ConfigServiceMock } from '@/app/config.service.mock';
import { EpicCustomAttributePartialInput, EpicCustomAttributeBulkUpdate } from './epics-custom-attributes.model';
import { parseQueryParams } from '@/utils/test.helpers';

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

  const project = 1;
  const epic = 2;
  it('List ALL Epics custom attributes by project', () => {
    const query = {
      project: project.toString(),
    };
    spectator.service.list(project).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epic-custom-attributes?${parseQueryParams(query)}`, HttpMethod.GET);
  });

  it('create epic custom attribute', () => {
    const data = EpicCustomAttributeCreationMockFactory.build();

    const body = {
      ...(data.description && { description: data.description }),
      ...(data.order && { blockedNote: data.order }),
      project: data.project,
      name: data.name,
    };

    spectator.service.create(data).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/epic-custom-attributes`, HttpMethod.POST);

    expect(req.request.body).toEqual(body);
  });

  it('get epic custom attributes', () => {
    spectator.service.get(epic).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/epic-custom-attributes/${epic}`, HttpMethod.GET);
  });

  it('edit epic custom attribute', () => {
    const data: EpicCustomAttributePartialInput = {
      name: '#fabada',
    };

    spectator.service.patch(epic, data).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/epic-custom-attributes/${epic}`, HttpMethod.PATCH);

    expect(req.request.body).toEqual(data);
  });

  it('delete epic custom attributes', () => {
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
