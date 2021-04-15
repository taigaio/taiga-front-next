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

import { NotifyPoliciesApiService } from './notify-policies-api.service';
import { NotifyPoliciesMockFactory } from './notify-policies.model.mock';


describe('NotifyPoliciesApiService', () => {
  let spectator: SpectatorHttp<NotifyPoliciesApiService>;
  const createHttp = createHttpFactory({
    service: NotifyPoliciesApiService,
    providers: [
      {
        provide: ConfigService,
        useValue: ConfigServiceMock,
      },
    ],
  });

  beforeEach(() => spectator = createHttp());

  it('list notify policies', () => {
    spectator.service.list().subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/notify-policies`, HttpMethod.GET);
  });

  it('get notify policies', () => {
    const id = faker.random.number();

    spectator.service.get(id).subscribe();
    spectator.expectOne(`${ConfigServiceMock.apiUrl}/notify-policies/${id}`, HttpMethod.GET);
  });

  it('put', () => {
    const id = faker.random.number();
    const data = NotifyPoliciesMockFactory.build();

    spectator.service.put(id, data).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/notify-policies/${id}`, HttpMethod.PUT);
    expect(req.request.body).toEqual(data);
  });

  it('patch', () => {
    const id = faker.random.number();
    const data = NotifyPoliciesMockFactory.build();

    spectator.service.patch(id, data).subscribe();

    const req = spectator.expectOne(`${ConfigServiceMock.apiUrl}/notify-policies/${id}`, HttpMethod.PATCH);
    expect(req.request.body).toEqual(data);
  });

});
