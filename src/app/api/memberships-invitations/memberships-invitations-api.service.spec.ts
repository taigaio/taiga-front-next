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

import { MembershipsInvitationsApiService } from './memberships-invitations-api.service';
import * as faker from 'faker';
import { MembershipPartialInput } from './memberships-invitations.model';
import { parseQueryParams } from '@/utils/test.helpers';
import { MembershipMockFactory } from './memberships-invitations.model.mock';

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

  it('List ALL memberships', () => {
    spectator.service.list().subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/memberships`, HttpMethod.GET);
  });

  it('List filtered memberships by project', () => {
    const project = faker.random.number();

    const queryParams = {
      project: project.toString(),
    };

    spectator.service.list(project).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/memberships?${parseQueryParams(queryParams)}`, HttpMethod.GET);
  });

  it('List filtered memberships by project and role', () => {
    const project = faker.random.number();
    const role = faker.random.number();

    const queryParams = {
      project: project.toString(),
      role: role.toString(),
    };

    spectator.service.list(project, role).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/memberships?${parseQueryParams(queryParams)}`, HttpMethod.GET);
  });

  it('create member', () => {
    const data = {
      project: faker.random.number(),
      role: faker.random.number(),
      username: faker.name.lastName(),
    };

    const body = {
      project: data.project.toString(),
      role: data.role.toString(),
      username: data.username,
    };

    spectator.service.create(data).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/memberships`, HttpMethod.POST);

    expect(req.request.body).toEqual(body);
  });

  it('bulk create', () => {
    const body = {
      project: faker.random.number(),
      members: [
        {
          roleId: faker.random.number(),
          username: faker.name.lastName(),
        },
      ],
      invitationText: faker.lorem.sentence(20),
    };

    const data = {
      projectId: body.project,
      bulkMemberships: body.members.map(member => member),
      invitationExtraText: body.invitationText,
    };

    spectator.service.bulkCreate(body).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/memberships`, HttpMethod.POST);

    expect(req.request.body).toEqual(data);
  });

  it('get a memberships', () => {
    const member = faker.random.number();

    spectator.service.get(member).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/memberships/${member}`, HttpMethod.GET);
  });

  it('put a membership', () => {
    const member = faker.random.number();
    const data = MembershipMockFactory.build({id: member});

    spectator.service.put(member, data).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/memberships/${member}`, HttpMethod.PUT);

    expect(req.request.body).toEqual(data);
  });

  it('patch a membership', () => {
    const member = faker.random.number();
    const data: MembershipPartialInput = {
      color: faker.internet.color(),
    };

    spectator.service.patch(member, data).subscribe();
    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/memberships/${member}`, HttpMethod.PATCH);

    expect(req.request.body).toEqual(data);
  });

  it('delete a memberships', () => {
    const member = faker.random.number();

    spectator.service.delete(member).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/memberships/${member}`, HttpMethod.DELETE);
  });

  it('resend an invitation', () => {
    const member = faker.random.number();

    spectator.service.resendInvitation(member).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/memberships/${member}/resend_invitation`, HttpMethod.POST);
  });

  it('get invitation', () => {
    const member = faker.random.number();

    spectator.service.getInvitation(member).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/invitations/${member}`, HttpMethod.GET);
  });
});
