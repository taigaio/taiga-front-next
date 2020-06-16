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

import { MembershipsInvitationsApiService } from './memberships-invitations-api.service';

describe('ResolverApiService', () => {
  let spectator: SpectatorHttp<MembershipsInvitationsApiService>;
  const createHttp = createHttpFactory({
    service: MembershipsInvitationsApiService,
    providers: [
      {
        provide: ConfigService,
        useValue: ConfigServiceMock,
      },
    ],
  });

  beforeEach(() => spectator = createHttp());

  const project = 1;
  const role = 2;
  const username = 'taiga@taiga.io';

  it('List ALL memberships', () => {
    spectator.service.list().subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/memberships`, HttpMethod.GET);
  });

  it('List filtered memberships by project', () => {
    const queryParams = {
      project: project.toString(),
    };

    spectator.service.list(project).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/memberships?${new URLSearchParams(queryParams)}`, HttpMethod.GET);
  });

  it('List filtered memberships by project and role', () => {
    const queryParams = {
      project: project.toString(),
      role: role.toString(),
    };

    spectator.service.list(project, role).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/memberships?${new URLSearchParams(queryParams)}`, HttpMethod.GET);
  });

  it('create member', () => {
    const data = {
      project: project.toString(),
      role: role.toString(),
      username,
    };

    spectator.service.create(project, role, username).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/memberships`, HttpMethod.POST);

    expect(req.request.body).toEqual(data);
  });
});
