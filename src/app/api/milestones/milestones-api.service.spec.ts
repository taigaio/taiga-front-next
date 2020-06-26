/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';

import { ConfigService } from '@/app/config.service';
import { ConfigServiceMock } from '@/app/config.service.mock';
import * as faker from 'faker';
import { MilestoneApiService } from './milestones-api.service';
import { MilestonePartialInput } from './milestones.model';

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

  const project = 1;
  const milestone = 2;
  // const username = faker.internet.email();

  it('List ALL milestones', () => {
    spectator.service.list().subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/milestones`, HttpMethod.GET);
  });

  it('List milestones filtered by project', () => {
    const queryParams = {
      project: project.toString(),
    };

    spectator.service.list(project).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/milestones?${new URLSearchParams(queryParams)}`, HttpMethod.GET);
  });

  it('List milestones filtered by project and only closed', () => {
    const queryParams = {
      project: project.toString(),
      closed: 'true',
    };

    spectator.service.list(project, true).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/milestones?${new URLSearchParams(queryParams)}`, HttpMethod.GET);
  });

  it('create milestone', () => {
    const data = {
      project,
      name: faker.company.catchPhrase(),
      estimatedStart: '2020/06/18',
      estimatedFinish: '2020/07/18',
      disponibility: 30,
      slug: 'sprint-1',
      order: 1,
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
    spectator.service.get(milestone).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/milestones/${milestone}`, HttpMethod.GET);
  });

  it('edit a milestone', () => {
    const data: MilestonePartialInput = {
      closed: true,
    };

    spectator.service.edit(milestone, data).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/milestones/${milestone}`, HttpMethod.PATCH);

    expect(req.request.body).toEqual(data);
  });

  it('delete a milestone', () => {
    spectator.service.delete(milestone).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/milestones/${milestone}`, HttpMethod.DELETE);
  });

  it('get milestone stats', () => {
    spectator.service.stats(milestone).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/milestones/${milestone}/stats`, HttpMethod.GET);
  });

  it('watch milestone', () => {
    spectator.service.watch(milestone).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/milestones/${milestone}/watch`, HttpMethod.POST);
  });

  it('unwatch milestone', () => {
    spectator.service.unwatch(milestone).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/milestones/${milestone}/unwatch`, HttpMethod.POST);
  });

  it('list watchers', () => {
    spectator.service.watchers(milestone).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/milestones/${milestone}/watchers`, HttpMethod.GET);
  });

});
