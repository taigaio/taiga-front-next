/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import * as Factory from 'factory.ts';
import { Auth } from './auth.model';
import * as faker from 'faker';
import { UserMockFactory } from '@/app/api/users/users.model.mock';

export const AuthMockFactory: Factory.Sync.Factory<Auth> = Factory.Sync.makeFactory({
  authToken: faker.random.uuid(),
})
.combine(UserMockFactory);
