/**
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 *
 * Copyright (c) 2021-present Kaleidos INC
 */

import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import * as faker from 'faker';

import { ConfigService } from '@/app/config.service';
import { ConfigServiceMock } from '@/app/config.service.mock';
import { UtilsService } from '@/app/commons/utils/utils-service.service';

import { WikiLinkMockFactory  } from './wiki.model.mock';
import { WikiLinksApiService } from './wiki-links-api.service';

describe('WikiLinksApiService', () => {
  let spectator: SpectatorHttp<WikiLinksApiService>;
  const createHttp = createHttpFactory({
    service: WikiLinksApiService,
    providers: [
      {
        provide: ConfigService,
        useValue: ConfigServiceMock,
      },
    ],
  });

  beforeEach(() => spectator = createHttp());

  it('list', () => {
    spectator.service.list().subscribe();
    spectator.expectOne(
      `${ConfigServiceMock.apiUrl}/wiki-links`,
      HttpMethod.GET
    );
  });

  it('listi by project', () => {
    const project = faker.random.number();

    spectator.service.list(project).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/wiki-links?${UtilsService.buildQueryParams({
      project,
    })}`, HttpMethod.GET);
  });

  it('create', () => {
    const data = WikiLinkMockFactory.build();

    spectator.service.create(data).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/wiki-links`, HttpMethod.POST);
    expect(req.request.body).toEqual(data);
  });

  it('get', () => {
    const id = faker.random.number();
    spectator.service.get(id).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/wiki-links/${id}`, HttpMethod.GET);
  });

  it('put', () => {
    const data = WikiLinkMockFactory.build();

    spectator.service.put(data).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/wiki-links/${data.id}`, HttpMethod.PUT);
    expect(req.request.body).toEqual(data);
  });

  it('patch', () => {
    const data = WikiLinkMockFactory.build();

    spectator.service.patch(data.id, data).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/wiki-links/${data.id}`, HttpMethod.PATCH);
    expect(req.request.body).toEqual(data);
  });

  it('delete', () => {
    const id = faker.random.number();

    spectator.service.delete(id).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/wiki-links/${id}`, HttpMethod.DELETE);
  });
});
