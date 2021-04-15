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
import { parseQueryParams } from '@/utils/test.helpers';

import { JiraImporterApiService } from './jira-importer-api.service';

describe('JiraImporterApiService', () => {
  let spectator: SpectatorHttp<JiraImporterApiService>;
  const createHttp = createHttpFactory({
    service: JiraImporterApiService,
    providers: [
      {
        provide: ConfigService,
        useValue: ConfigServiceMock,
      },
    ],
  });

  beforeEach(() => spectator = createHttp());

  const url = faker.internet.url();

  const queryParams = {
    url,
  };

  it('get auth url', () => {
    spectator.service.getAuthUrl(url).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/jira/auth_url?${parseQueryParams(queryParams)}`, HttpMethod.GET);
  });

  it('auth', () => {
    spectator.service.auth().subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/jira/authorize`, HttpMethod.POST);
  });

  it('list users', () => {
    const data = {
      project: faker.random.word(),
      token: faker.random.word(),
      url: faker.internet.url(),
    };

    spectator.service.listUsers(data.project, data.token, data.url).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/jira/list_users`, HttpMethod.POST);

    expect(req.request.body).toEqual(data);
  });

  it('list projects', () => {
    const data = {
      token: faker.random.word(),
      url: faker.internet.url(),
    };

    spectator.service.listProjects(data.token, data.url).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/jira/list_projects`, HttpMethod.POST);

    expect(req.request.body).toEqual(data);
  });

  it('import projects', () => {
    const project = {
      description: faker.lorem.sentence(),
      isPrivate: faker.random.boolean(),
      keepExternalReference: faker.random.boolean(),
      name: faker.random.word(),
      project: faker.random.word(),
      projectType: faker.random.word(),
      template: faker.random.word(),
      token: faker.random.word(),
      url: faker.internet.url(),
      usersBindings: {
        a: faker.random.word(),
        b: faker.random.word(),
      },
    };

    spectator.service.importProject(project).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/jira/import`, HttpMethod.POST);

    expect(req.request.body).toEqual(project);
  });

});
