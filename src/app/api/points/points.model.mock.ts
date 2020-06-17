/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
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
