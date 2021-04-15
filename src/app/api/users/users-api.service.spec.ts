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
import { UtilsService } from '@/app/commons/utils/utils-service.service';
import { UsersApiService } from './users-api.service';
import { WatchedContentFilter, VotedContentFilter, User } from './users.model';
import { UserMockFactory } from './users.model.mock';

describe('UsersApiService', () => {
  let spectator: SpectatorHttp<UsersApiService>;
  const createHttp = createHttpFactory({
    service: UsersApiService,
    providers: [
      {
        provide: ConfigService,
        useValue: ConfigServiceMock,
      },
    ],
  });

  beforeEach(() => spectator = createHttp());

  it('list', () => {
    const project = faker.random.number();

    spectator.service.list(project).subscribe();
    spectator.expectOne(
      `${ConfigServiceMock.apiUrl}/users?${UtilsService.buildQueryParams({
        project,
      })}`,
      HttpMethod.GET
    );
  });

  it('get', () => {
    const userId = faker.random.number();
    spectator.service.get(userId).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/users/${userId}`, HttpMethod.GET);
  });

  it('me', () => {
    spectator.service.me().subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/users/me`, HttpMethod.GET);
  });

  it('stats', () => {
    const userId = faker.random.number();
    spectator.service.stats(userId).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/users/${userId}/stats`, HttpMethod.GET);
  });

  it('getWatchedContent', () => {
    const userId = faker.random.number();
    const params: WatchedContentFilter = {
      type: 'project',
      q: faker.random.word(),
    };

    spectator.service.getWatchedContent(userId, params).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/users/${userId}/watched?${UtilsService.buildQueryParams(params)}`, HttpMethod.GET);
  });

  it('getLikedContent', () => {
    const userId = faker.random.number();
    const q = faker.random.word();

    spectator.service.getLikedContent(userId, q).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/users/${userId}/liked?${UtilsService.buildQueryParams({q})}`, HttpMethod.GET);
  });

  it('getVotedContent', () => {
    const userId = faker.random.number();
    const params: VotedContentFilter = {
      type: 'userstory',
      q: faker.random.word(),
    };

    spectator.service.getVotedContent(userId, params).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/users/${userId}/voted?${UtilsService.buildQueryParams(params)}`, HttpMethod.GET);
  });

  it('put', () => {
    const userId = faker.random.number();
    const data = UserMockFactory.build();

    spectator.service.put(userId, data).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/users/${userId}`, HttpMethod.PUT);
    expect(req.request.body).toEqual(data);
  });

  it('patch', () => {
    const userId = faker.random.number();
    const data: Partial<User> = { username: faker.random.word() };

    spectator.service.patch(userId, data).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/users/${userId}`, HttpMethod.PATCH);
    expect(req.request.body).toEqual(data);
  });

  it('delete', () => {
    const id = faker.random.number();

    spectator.service.delete(id).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/users/${id}`, HttpMethod.DELETE);
  });

  it('getContacts', () => {
    const userId = faker.random.number();
    spectator.service.getContacts(userId).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/users/${userId}/contacts`, HttpMethod.GET);
  });

  it('cancel', () => {
    const cancelToken = faker.random.word();

    spectator.service.cancel(cancelToken).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/users/cancel`, HttpMethod.POST);
    expect(req.request.body).toEqual({
      cancelToken,
    });
  });

  it('changeAvatar', () => {
    const avatarFileName = faker.random.word();
    const avatar = new File([], avatarFileName);

    spectator.service.changeAvatar(avatar).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/users/change_avatar`, HttpMethod.POST);

    expect(req.request.body.get('avatar')).toBeInstanceOf(File);
    expect((req.request.body.get('avatar') as File).name).toEqual(avatarFileName);
  });

  it('removeAvatar', () => {
    spectator.service.removeAvatar().subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/users/remove_avatar`, HttpMethod.POST);
  });

  it('changeEmail', () => {
    const emailToken = faker.random.word();

    spectator.service.changeEmail(emailToken).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/users/change_email`, HttpMethod.POST);
    expect(req.request.body).toEqual({emailToken});
  });

  it('changePassword', () => {
    const currentPassword = faker.random.word();
    const password = faker.random.word();

    spectator.service.changePassword(currentPassword, password).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/users/change_password`, HttpMethod.POST);
    expect(req.request.body).toEqual({currentPassword, password});
  });

  it('passwordRecovery', () => {
    const username = faker.random.word();

    spectator.service.passwordRecovery(username).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/users/password_recovery`, HttpMethod.POST);
    expect(req.request.body).toEqual({username});
  });

  it('changePasswordFromRecovery', () => {
    const password = faker.random.word();
    const token = faker.random.word();

    spectator.service.changePasswordFromRecovery(token, password).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/users/change_password_from_recovery`, HttpMethod.POST);
    expect(req.request.body).toEqual({password, token});
  });
});
