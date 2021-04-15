/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { ConfigService } from '@/app/config.service';
import { SpectatorHttp, createHttpFactory, HttpMethod } from '@ngneat/spectator';
import { ConfigServiceMock } from '@/app/config.service.mock';
import * as faker from 'faker';
import { UtilsService } from '@/app/commons/utils/utils-service.service';
import { UserstoriesCustomAttributeApiService } from './userstories-custom-attribute-api.service';
import { UserstoriesCustomAttributeCreationDataMockFactory } from './userstories-custom-attribute.model.mock';


describe('UserstoriesCustomAttributeApiService', () => {
  let spectator: SpectatorHttp<UserstoriesCustomAttributeApiService>;
  const createHttp = createHttpFactory({
    service: UserstoriesCustomAttributeApiService,
    providers: [
      {
        provide: ConfigService,
        useValue: ConfigServiceMock,
      },
    ],
  });

  beforeEach(() => spectator = createHttp());

  it('list', () => {
    const projectId = faker.random.number();

    spectator.service.list(projectId).subscribe();
    spectator.expectOne(
      `${ConfigServiceMock.apiUrl}/userstory-custom-attributes?${UtilsService.buildQueryParams({
        project: projectId.toString(),
      })}`,
      HttpMethod.GET
    );
  });

  it('create', () => {
    const data = UserstoriesCustomAttributeCreationDataMockFactory.build();

    spectator.service.create(data).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstory-custom-attributes`, HttpMethod.POST);
    expect(req.request.body).toEqual(data);
  });

  it('get', () => {
    const id = faker.random.number();
    spectator.service.get(id).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstory-custom-attributes/${id}`, HttpMethod.GET);
  });

  it('put', () => {
    const id = faker.random.number();
    const data = UserstoriesCustomAttributeCreationDataMockFactory.build();

    spectator.service.put(id, data).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstory-custom-attributes/${id}`, HttpMethod.PUT);
    expect(req.request.body).toEqual(data);
  });

  it('patch', () => {
    const id = faker.random.number();
    const data = UserstoriesCustomAttributeCreationDataMockFactory.build();

    spectator.service.patch(id, data).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstory-custom-attributes/${id}`, HttpMethod.PATCH);
    expect(req.request.body).toEqual(data);
  });

  it('delete', () => {
    const id = faker.random.number();

    spectator.service.delete(id).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstory-custom-attributes/${id}`, HttpMethod.DELETE);
  });

  it('bulk update order', () => {
    const projectId = faker.random.number();
    const bulkUserstoryCustomAttributes: [number, number][] = [
      [faker.random.number(), faker.random.number()],
    ];

    spectator.service.bulkUpdateOrder(projectId, bulkUserstoryCustomAttributes).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/userstory-custom-attributes/bulk_update_order`, HttpMethod.POST);
    expect(req.request.body).toEqual({
      projectId,
      bulkUserstoryCustomAttributes,
    });
  });
});
