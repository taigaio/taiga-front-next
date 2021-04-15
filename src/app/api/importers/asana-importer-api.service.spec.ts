/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';

import { ConfigService } from '@/app/config.service';
import { ConfigServiceMock } from '@/app/config.service.mock';
import * as faker from 'faker';
import { AsanaImporterApiService } from './asana-importer-api.service';
import { AsanaAuthToken } from './importer.model';

const token: AsanaAuthToken = {
  token: {
    access_token: faker.random.word(),
    data: {
      email: faker.internet.email(),
      id: faker.random.number(),
      name: faker.random.word(),
    },
    expires_in: faker.random.number(),
    refresh_token: faker.random.word(),
    token_type: faker.random.word(),
  },
};

describe('AsanaImporterApiService', () => {
  let spectator: SpectatorHttp<AsanaImporterApiService>;
  const createHttp = createHttpFactory({
    service: AsanaImporterApiService,
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
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/asana/auth_url`, HttpMethod.GET);
  });

  it('auth', () => {
    spectator.service.auth().subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/asana/authorize`, HttpMethod.POST);
  });

  it('list users', () => {
    const project = faker.random.number();

    spectator.service.listUsers(project, token).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/asana/list_users`, HttpMethod.POST);

    expect(req.request.body).toEqual({
      project,
      token,
    });
  });

  it('list projects', () => {

    spectator.service.listProjects(token).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/asana/list_projects`, HttpMethod.POST);

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
      token,
      usersBindings: {
        a: faker.random.word(),
        b: faker.random.word(),
      },
    };


    spectator.service.importProject(project).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/asana/import`, HttpMethod.POST);

    expect(req.request.body).toEqual(project);
  });

});
