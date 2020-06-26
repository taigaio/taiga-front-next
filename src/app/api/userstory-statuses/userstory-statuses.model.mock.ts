/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
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
