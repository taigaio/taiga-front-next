/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import * as Factory from 'factory.ts';
import { TaskCustomAttribute } from './task-custom-attribute.model';
import * as faker from 'faker';

export const TaskCustomAttributeCreationDataMockFactory = Factory.Sync.makeFactory<TaskCustomAttribute>({
  createdDate: faker.date.recent().toString(),
  description: faker.lorem.paragraph(),
  extra: faker.lorem.paragraph(),
  id: faker.random.number(),
  modifiedDate: faker.date.recent().toString(),
  name: faker.random.word(),
  order: faker.random.number(),
  project: faker.random.number(),
  type: faker.random.word(),
});
