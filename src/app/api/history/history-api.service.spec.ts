/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
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
