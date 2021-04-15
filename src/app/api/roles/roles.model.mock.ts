/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import * as Factory from 'factory.ts';
import * as faker from 'faker';

import { Role } from './roles.model';

export const RoleMockFactory = Factory.Sync.makeFactory<Role>({
  id: faker.random.number(),
  name: faker.lorem.words(),
  slug: faker.lorem.slug(),
  order: faker.random.number(),
  project: faker.random.number(),
  computable: faker.random.boolean(),
  permissions: [],
  membersCount: faker.random.number(),
});
