/**
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 *
 * Copyright (c) 2021-present Kaleidos INC
 */

import { createHttpFactory, SpectatorHttp, HttpMethod } from '@ngneat/spectator';

import { ConfigService } from '@/app/config.service';
import { ConfigServiceMock } from '@/app/config.service.mock';
import { ProjectTemplatesApiService } from './project-templates-api.service';
import { ProjectTemplateMockFactory } from './project-templates.model.mock';

describe('ProjectTemplatesApiService', () => {

  let spectator: SpectatorHttp<ProjectTemplatesApiService>;
  const createHttp = createHttpFactory({
    service: ProjectTemplatesApiService,
    providers: [
      { provide: ConfigService, useValue: ConfigServiceMock },
    ],
  });

  beforeEach(() => spectator = createHttp());

  it('list', () => {
    spectator.service.list().subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/project-templates`, HttpMethod.GET);
  });

  it('get', () => {
    const id = 1;

    spectator.service.get(id).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/project-templates/${id}`, HttpMethod.GET);
  });

  it('create', () => {
    const data = ProjectTemplateMockFactory.build();

    spectator.service.create(data).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/project-templates`, HttpMethod.POST);
    expect(req.request.body).toEqual(data);
  });

  it('put', () => {
    const id = 1;
    const data = ProjectTemplateMockFactory.build({id});

    spectator.service.put(id, data).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/project-templates/${id}`, HttpMethod.PUT);
    expect(req.request.body).toEqual(data);
  });

  it('patch', () => {
    const id = 1;
    const data = {
      description: 'a new description',
    };

    spectator.service.patch(id, data).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/project-templates/${id}`, HttpMethod.PATCH);
    expect(req.request.body).toEqual(data);
  });

  it('delete', () => {
    const id = 1;

    spectator.service.delete(id).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/project-templates/${id}`, HttpMethod.DELETE);
  });
});
