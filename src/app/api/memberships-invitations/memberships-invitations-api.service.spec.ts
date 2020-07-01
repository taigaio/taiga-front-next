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
import * as faker from 'faker';
import { MembershipPartialInput } from './memberships-invitations.model';
import { parseQueryParams } from '@/utils/test.helpers';

describe('MembershipsInvitationsApiService', () => {
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
  const username = faker.internet.email();

  it('List ALL memberships', () => {
    spectator.service.list().subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/memberships`, HttpMethod.GET);
  });

  it('List filtered memberships by project', () => {
    const queryParams = {
      project: project.toString(),
    };

    spectator.service.list(project).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/memberships?${parseQueryParams(queryParams)}`, HttpMethod.GET);
  });

  it('List filtered memberships by project and role', () => {
    const queryParams = {
      project: project.toString(),
      role: role.toString(),
    };

    spectator.service.list(project, role).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/memberships?${parseQueryParams(queryParams)}`, HttpMethod.GET);
  });

  it('create member', () => {
    const data = {
      project,
      role,
      username,
    };

    const body = {
      project: project.toString(),
      role: role.toString(),
      username,
    };

    spectator.service.create(data).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/memberships`, HttpMethod.POST);

    expect(req.request.body).toEqual(body);
  });

  it('bulk create', () => {
    const body = {
      project,
      members: [
        {
          roleId: role,
          username,
        },
      ],
      invitationText: faker.lorem.sentence(20),
    };

    const data = {
      projectId: body.project,
      bulkMemberships: [
        {
          roleId: role,
          username,
        },
      ],
      invitationExtraText: body.invitationText,
    };

    spectator.service.bulkCreate(body).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/memberships`, HttpMethod.POST);

    expect(req.request.body).toEqual(data);
  });

  it('get a memberships', () => {
    spectator.service.get(1).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/memberships/1`, HttpMethod.GET);
  });

  it('edit a membership', () => {
    const data: MembershipPartialInput = {
      color: '#fabada',
    };

    spectator.service.edit(1, data).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/memberships/1`, HttpMethod.PATCH);

    expect(req.request.body).toEqual(data);
  });

  it('delete a memberships', () => {
    spectator.service.delete(1).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/memberships/1`, HttpMethod.DELETE);
  });

  it('resend an invitation', () => {
    spectator.service.resendInvitation(1).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/memberships/1/resend_invitation`, HttpMethod.POST);
  });

  it('get invitation', () => {
    spectator.service.getInvitation(1).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/invitations/1`, HttpMethod.GET);
  });
});
