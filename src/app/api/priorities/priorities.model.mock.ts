/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import * as Factory from 'factory.ts';
import * as faker from 'faker';

import { Priority } from './priorities.model';

export const PriorityMockFactory = Factory.Sync.makeFactory<Priority>({
  id: faker.random.number(),
  name: faker.lorem.words(),
  color: faker.internet.color(),
  order: faker.random.number(),
  project: faker.random.number(),
});
