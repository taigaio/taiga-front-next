/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { createHttpFactory, SpectatorHttp, HttpMethod } from '@ngneat/spectator';

import { ConfigService } from '@/app/config.service';
import { ConfigServiceMock } from '@/app/config.service.mock';
import { PointsApiService } from './points-api.service';
import { PointsMockFactory } from './points.model.mock';
import { parseQueryParams } from '@/utils/test.helpers';

describe('PointsApiService', () => {

  let spectator: SpectatorHttp<PointsApiService>;
  const createHttp = createHttpFactory({
    service: PointsApiService,
    providers: [
      { provide: ConfigService, useValue: ConfigServiceMock },
    ],
  });

  beforeEach(() => spectator = createHttp());

  it('list', () => {
    spectator.service.list().subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/points`, HttpMethod.GET);
  });

  it('list filtered by project', () => {
    const project = 1;
    const queryParams = {
      project: project.toString(),
    };

    spectator.service.list(project).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/points?${parseQueryParams(queryParams)}`, HttpMethod.GET);
  });

  it('get', () => {
    const id = 1;

    spectator.service.get(id).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/points/${id}`, HttpMethod.GET);
  });

  it('create', () => {
    const data = {
      name: 'test',
      value: null,
      order: 1,
      project: 1,
    };

    spectator.service.create(data).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/points`, HttpMethod.POST);
  });

  it('put', () => {
    const id = 1;
    const data = PointsMockFactory.build({id});

    spectator.service.put(id, data).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/points/${id}`, HttpMethod.PUT);
  });

  it('patch', () => {
    const id = 1;
    const data = {
      value: 2,
    };

    spectator.service.patch(id, data).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/points/${id}`, HttpMethod.PATCH);
  });

  it('delete', () => {
    const id = 1;

    spectator.service.delete(id).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/points/${id}`, HttpMethod.DELETE);
  });

  it('update order in bulk', () => {
    const project = 1;
    const newOrder = [
      [1, 0],
      [2, 2],
      [3, 1],
    ];

    spectator.service.updateOrderInBulk(project, newOrder).subscribe();
    const req = spectator.expectOne(
      `${ConfigServiceMock.apiUrl}/points/bulk_update_order`,
       HttpMethod.POST);
    expect(req.request.body).toEqual({bulkPoints: newOrder, project});
  });
});
