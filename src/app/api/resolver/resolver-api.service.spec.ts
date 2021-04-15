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
import { ResolverApiService } from './resolver-api.service';

import * as faker from 'faker';
import { parseQueryParams } from '@/utils/test.helpers';

describe('ResolverApiService', () => {
  let spectator: SpectatorHttp<ResolverApiService>;
  const createHttp = createHttpFactory({
    service: ResolverApiService,
    providers: [
      {
        provide: ConfigService,
        useValue: ConfigServiceMock,
      },
    ],
  });

  beforeEach(() => spectator = createHttp());

  const project = 'project-0';
  const us = faker.random.number();
  const issue = faker.random.number();
  const task = faker.random.number();
  const milestone = faker.hacker.adjective();
  const wikiPage = faker.random.word();

  it('Resolver by project', () => {

    const queryParams = {
      project,
    };

    spectator.service.project(project).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/resolver?${parseQueryParams(queryParams)}`, HttpMethod.GET);
  });

  it('Resolver by userStory', () => {
    const queryParams = {
      project,
      us: us.toString(),
    };

    spectator.service.userStory(project, us).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/resolver?${parseQueryParams(queryParams)}`, HttpMethod.GET);
  });

  it('Resolver by issue', () => {
    const queryParams = {
      project,
      issue: issue.toString(),
    };

    spectator.service.issue(project, issue).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/resolver?${parseQueryParams(queryParams)}`, HttpMethod.GET);
  });

  it('Resolver by task', () => {
    const queryParams = {
      project,
      task: task.toString(),
    };

    spectator.service.task(project, task).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/resolver?${parseQueryParams(queryParams)}`, HttpMethod.GET);
  });

  it('Resolver by milestone', () => {
    const queryParams = {
      project,
      milestone,
    };

    spectator.service.milestone(project, milestone).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/resolver?${parseQueryParams(queryParams)}`, HttpMethod.GET);
  });

  it('Resolver by wikiPage', () => {
    const queryParams = {
      project,
      wikipage: wikiPage,
    };

    spectator.service.wikiPage(project, wikiPage).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/resolver?${parseQueryParams(queryParams)}`, HttpMethod.GET);
  });

  it('Resolver by multiple, only one parameter', () => {

    const data = {
      project: faker.random.number(),
      task,
    };

    const queryParams = {
      project: data.project.toString(),
      task: data.task.toString(),
    };
    spectator.service.multiple(data).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/resolver?${parseQueryParams(queryParams)}`, HttpMethod.GET);
  });

  it('Resolver by multiple, many parameters', () => {
    const data = {
      project: faker.random.number(),
      task,
      us,
    };

    const queryParams = {
      project: data.project.toString(),
      task: data.task.toString(),
      us: data.us.toString(),
    };
    spectator.service.multiple(data).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/resolver?${parseQueryParams(queryParams)}`, HttpMethod.GET);
  });

  it('Resolver by Reference', () => {
    const queryParams = {
      project,
      ref: us.toString(),
    };
    spectator.service.ref(project, us).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/resolver?${parseQueryParams(queryParams)}`, HttpMethod.GET);
  });
});
