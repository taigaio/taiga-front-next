/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos INC
 */

import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';

import { ConfigService } from '@/app/config.service';
import { ConfigServiceMock } from '@/app/config.service.mock';
import * as faker from 'faker';
import { TrelloImporterApiService } from './trello-importer-api.service';

describe('TrelloImporterApiService', () => {
  let spectator: SpectatorHttp<TrelloImporterApiService>;
  const createHttp = createHttpFactory({
    service: TrelloImporterApiService,
    providers: [
      {
        provide: ConfigService,
        useValue: ConfigServiceMock,
      },
    ],
  });

  beforeEach(() => spectator = createHttp());

  it('get auth url', () => {
    spectator.service.getAuthUrl().subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/trello/auth_url`, HttpMethod.GET);
  });

  it('auth', () => {
    const code = faker.random.word();

    spectator.service.auth(code).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/trello/authorize`, HttpMethod.POST);

    expect(req.request.body).toEqual({
      code,
    });
  });

  it('list users', () => {
    const data = {
      project: faker.random.word(),
      token: faker.random.word(),
    };

    spectator.service.listUsers(data.project, data.token).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/trello/list_users`, HttpMethod.POST);

    expect(req.request.body).toEqual(data);
  });

  it('list projects', () => {
    const token = faker.random.word();

    spectator.service.listProjects(token).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/trello/list_projects`, HttpMethod.POST);

    expect(req.request.body).toEqual({
      token,
    });
  });

  it('import projects', () => {
    const project = {
      description: faker.lorem.sentence(),
      isPrivate: faker.random.boolean(),
      keepExternalReference: faker.random.boolean(),
      name: faker.random.word(),
      project: faker.random.word(),
      template: faker.random.word(),
      token: faker.random.word(),
      usersBindings: {
        a: faker.random.word(),
        b: faker.random.word(),
      },
    };

    spectator.service.importProject(project).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/trello/import`, HttpMethod.POST);

    expect(req.request.body).toEqual(project);
  });

});
