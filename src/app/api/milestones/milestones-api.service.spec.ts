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
import { MilestoneApiService } from './milestones-api.service';
import { MilestonePartialInput } from './milestones.model';
import { parseQueryParams } from '@/utils/test.helpers';
import { MilestoneMockFactory } from './milestones.model.mock';

describe('MilestonesApiService', () => {
  let spectator: SpectatorHttp<MilestoneApiService>;
  const createHttp = createHttpFactory({
    service: MilestoneApiService,
    providers: [
      {
        provide: ConfigService,
        useValue: ConfigServiceMock,
      },
    ],
  });

  beforeEach(() => spectator = createHttp());

  it('List ALL milestones', () => {
    spectator.service.list().subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/milestones`, HttpMethod.GET);
  });

  it('List milestones filtered by project', () => {
    const project = faker.random.number();

    const queryParams = {
      project: project.toString(),
    };

    spectator.service.list(project).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/milestones?${parseQueryParams(queryParams)}`, HttpMethod.GET);
  });

  it('List milestones filtered by project and only closed', () => {
    const project = faker.random.number();

    const queryParams = {
      project: project.toString(),
      closed: 'true',
    };

    spectator.service.list(project, true).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/milestones?${parseQueryParams(queryParams)}`, HttpMethod.GET);
  });

  it('create milestone', () => {
    const data = {
      project: faker.random.number(),
      name: faker.company.catchPhrase(),
      estimatedStart: faker.date.recent().toISOString(),
      estimatedFinish: faker.date.future().toISOString(),
      disponibility: faker.random.number(),
      slug: faker.random.word(),
      order: faker.random.number(),
    };

    const body = {
      project: data.project,
      name: data.name,
      estimatedStart: data.estimatedStart,
      estimatedFinish: data.estimatedFinish,
      disponibility: data.disponibility,
      slug: data.slug,
      order: data.order,
    };

    spectator.service.create(data).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/milestones`, HttpMethod.POST);

    expect(req.request.body).toEqual(body);
  });

  it('get milestone', () => {
    const milestone = faker.random.number();

    spectator.service.get(milestone).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/milestones/${milestone}`, HttpMethod.GET);
  });

  it('put a milestone', () => {
    const milestone = faker.random.number();

    const data = MilestoneMockFactory.build({id: milestone});

    spectator.service.put(milestone, data).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/milestones/${milestone}`, HttpMethod.PUT);

    expect(req.request.body).toEqual(data);
  });

  it('patch a milestone', () => {
    const milestone = faker.random.number();

    const data: MilestonePartialInput = {
      closed: faker.random.boolean(),
    };

    spectator.service.patch(milestone, data).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/milestones/${milestone}`, HttpMethod.PATCH);

    expect(req.request.body).toEqual(data);
  });

  it('delete a milestone', () => {
    const milestone = faker.random.number();

    spectator.service.delete(milestone).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/milestones/${milestone}`, HttpMethod.DELETE);
  });

  it('get milestone stats', () => {
    const milestone = faker.random.number();

    spectator.service.stats(milestone).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/milestones/${milestone}/stats`, HttpMethod.GET);
  });

  it('watch milestone', () => {
    const milestone = faker.random.number();

    spectator.service.watch(milestone).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/milestones/${milestone}/watch`, HttpMethod.POST);
  });

  it('unwatch milestone', () => {
    const milestone = faker.random.number();

    spectator.service.unwatch(milestone).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/milestones/${milestone}/unwatch`, HttpMethod.POST);
  });

  it('list watchers', () => {
    const milestone = faker.random.number();

    spectator.service.watchers(milestone).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/milestones/${milestone}/watchers`, HttpMethod.GET);
  });

});
