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
import { RolesApiService } from './roles-api.service';
import { RoleMockFactory } from './roles.model.mock';

describe('RolesApiService', () => {

  let spectator: SpectatorHttp<RolesApiService>;
  const createHttp = createHttpFactory({
    service: RolesApiService,
    providers: [
      { provide: ConfigService, useValue: ConfigServiceMock },
    ],
  });

  beforeEach(() => spectator = createHttp());

  it('list', () => {
    spectator.service.list().subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/roles`, HttpMethod.GET);
  });

  it('list filtered by project', () => {
    const project = 1;
    const queryParams = {
      project: project.toString(),
    };

    spectator.service.list(project).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/roles?${new URLSearchParams(queryParams)}`, HttpMethod.GET);
  });

  it('get', () => {
    const id = 1;

    spectator.service.get(id).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/roles/${id}`, HttpMethod.GET);
  });

  it('create', () => {
    const data = {
      name: 'test',
      order: 1,
      project: 1,
      computable: false,
      permissions: [],
    };

    spectator.service.create(data).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/roles`, HttpMethod.POST);
    expect(req.request.body).toEqual(data);
  });

  it('put', () => {
    const id = 1;
    const data = RoleMockFactory.build({id});

    spectator.service.put(id, data).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/roles/${id}`, HttpMethod.PUT);
    expect(req.request.body).toEqual(data);
  });

  it('patch', () => {
    const id = 1;
    const data = {
      computable: true,
    };

    spectator.service.patch(id, data).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/roles/${id}`, HttpMethod.PATCH);
    expect(req.request.body).toEqual(data);
  });

  it('delete', () => {
    const id = 1;

    spectator.service.delete(id).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/roles/${id}`, HttpMethod.DELETE);
  });

  it('delete movving members to other role', () => {
    const id = 1;
    const moveTo = 10;
    const queryParams = {
      moveTo: moveTo.toString(),
    };

    spectator.service.delete(id, moveTo).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/roles/${id}?${new URLSearchParams(queryParams)}`, HttpMethod.DELETE);
  });
});
