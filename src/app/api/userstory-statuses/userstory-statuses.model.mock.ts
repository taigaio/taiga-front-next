/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import * as Factory from 'factory.ts';
import * as faker from 'faker';

import { UserstoryStatus } from './userstory-statuses.model';

export const UserstoryStatusMockFactory = Factory.Sync.makeFactory<UserstoryStatus>({
  id: faker.random.number(),
  name: faker.lorem.words(),
  slug: faker.lorem.slug(),
  color: faker.internet.color(),
  isClosed: faker.random.boolean(),
  isArchived: faker.random.boolean(),
  wipLimit: faker.random.arrayElement([null, faker.random.number(5)]),
  order: faker.random.number(),
  project: faker.random.number(),
});
