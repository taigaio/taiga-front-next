/**
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 *
 * Copyright (c) 2021-present Kaleidos INC
 */

import * as Factory from 'factory.ts';
import { Auth } from './auth.model';
import * as faker from 'faker';
import { UserMockFactory } from '@/app/api/users/users.model.mock';

export const AuthMockFactory: Factory.Sync.Factory<Auth> = Factory.Sync.makeFactory({
  authToken: faker.random.uuid(),
})
.combine(UserMockFactory);
