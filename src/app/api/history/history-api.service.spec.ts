/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { createHttpFactory, SpectatorHttp, HttpMethod } from '@ngneat/spectator';

import { HistoryApiService } from './history-api.service';
import { ConfigService } from '@/app/config.service';
import { ConfigServiceMock } from '@/app/config.service.mock';
import * as faker from 'faker';
import { UtilsService } from '@/app/commons/utils/utils-service.service';

describe('IssueStatusesApiService', () => {

  let spectator: SpectatorHttp<HistoryApiService>;
  const createHttp = createHttpFactory({
    service: HistoryApiService,
    providers: [
      { provide: ConfigService, useValue: ConfigServiceMock },
    ],
  });

  beforeEach(() => spectator = createHttp());

  it('get', () => {
    const id = faker.random.number();

    spectator.service.getHistoryEntry(id, 'userstory').subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/history/userstory/${id}`, HttpMethod.GET);
  });

  it('get', () => {
    const id = faker.random.number();
    const commentId = faker.random.uuid();

    spectator.service.getCommentVersions(id, 'userstory', commentId).subscribe();
    spectator.expectOne(
      `${ConfigServiceMock.apiUrl}/history/userstory/${id}/comment_versions?${UtilsService.buildQueryParams({id: commentId})}`,
      HttpMethod.GET
    );
  });

  it('edit', () => {
    const id = faker.random.number();
    const commentId = faker.random.uuid();
    const comment = faker.lorem.paragraph();

    spectator.service.editComment(id, 'userstory', commentId, comment).subscribe();
    const req = spectator.expectOne(
      `${ConfigServiceMock.apiUrl}/history/userstory/${id}/edit_comment?${UtilsService.buildQueryParams({id: commentId})}`,
      HttpMethod.POST
    );
    expect(req.request.body).toEqual({
      comment,
    });
  });

  it('delete', () => {
    const id = faker.random.number();
    const commentId = faker.random.uuid();

    spectator.service.deleteComment(id, 'userstory', commentId).subscribe();
    spectator.expectOne(
      `${ConfigServiceMock.apiUrl}/history/userstory/${id}/delete_comment?${UtilsService.buildQueryParams({id: commentId})}`,
      HttpMethod.DELETE
    );
  });

  it('undelete', () => {
    const id = faker.random.number();
    const commentId = faker.random.uuid();

    spectator.service.undeleteComment(id, 'userstory', commentId).subscribe();
    spectator.expectOne(
      `${ConfigServiceMock.apiUrl}/history/userstory/${id}/undelete_comment?${UtilsService.buildQueryParams({id: commentId})}`,
      HttpMethod.POST
    );
  });
});
