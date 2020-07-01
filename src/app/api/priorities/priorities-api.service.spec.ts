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
import { PrioritiesApiService } from './priorities-api.service';
import { PriorityMockFactory } from './priorities.model.mock';
import { parseQueryParams } from '@/utils/test.helpers';

describe('PrioritiesApiService', () => {

  let spectator: SpectatorHttp<PrioritiesApiService>;
  const createHttp = createHttpFactory({
    service: PrioritiesApiService,
    providers: [
      { provide: ConfigService, useValue: ConfigServiceMock },
    ],
  });

  beforeEach(() => spectator = createHttp());

  it('list', () => {
    spectator.service.list().subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/priorities`, HttpMethod.GET);
  });

  it('list filtered by project', () => {
    const project = 1;
    const queryParams = {
      project: project.toString(),
    };

    spectator.service.list(project).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/priorities?${parseQueryParams(queryParams)}`, HttpMethod.GET);
  });

  it('get', () => {
    const id = 1;

    spectator.service.get(id).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/priorities/${id}`, HttpMethod.GET);
  });

  it('create', () => {
    const data = {
      name: 'test',
      color: '#fabada',
      order: 1,
      project: 1,
    };

    spectator.service.create(data).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/priorities`, HttpMethod.POST);
    expect(req.request.body).toEqual(data);
  });

  it('put', () => {
    const id = 1;
    const data = PriorityMockFactory.build({id});

    spectator.service.put(id, data).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/priorities/${id}`, HttpMethod.PUT);
    expect(req.request.body).toEqual(data);
  });

  it('patch', () => {
    const id = 1;
    const data = {
      color: '#fabada',
    };

    spectator.service.patch(id, data).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/priorities/${id}`, HttpMethod.PATCH);
    expect(req.request.body).toEqual(data);
  });

  it('delete', () => {
    const id = 1;

    spectator.service.delete(id).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/priorities/${id}`, HttpMethod.DELETE);
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
      `${ConfigServiceMock.apiUrl}/priorities/bulk_update_order`,
       HttpMethod.POST);
    expect(req.request.body).toEqual({bulkPriorities: newOrder, project});
  });
});
