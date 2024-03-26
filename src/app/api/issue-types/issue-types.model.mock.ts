/**
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 *
 * Copyright (c) 2021-present Kaleidos INC
 */

import * as Factory from 'factory.ts';
import * as faker from 'faker';

import { IssueType } from './issue-types.model';

export const IssueTypeMockFactory = Factory.Sync.makeFactory<IssueType>({
  id: faker.random.number(),
  name: faker.lorem.words(),
  color: faker.internet.color(),
  order: faker.random.number(),
  project: faker.random.number(),
});
