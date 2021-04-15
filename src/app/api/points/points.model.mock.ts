/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import * as Factory from 'factory.ts';
import * as faker from 'faker';

import { Points } from './points.model';

export const PointsMockFactory = Factory.Sync.makeFactory<Points>({
  id: faker.random.number(),
  name: faker.lorem.words(),
  value: faker.random.arrayElement([null, faker.random.number(30)]),
  order: faker.random.number(),
  project: faker.random.number(),
});
