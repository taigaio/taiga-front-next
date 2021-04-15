/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import * as Factory from 'factory.ts';
import { IssueCustomAttribute } from './issue-custom-attribute.model';
import * as faker from 'faker';

export const IssueCustomAttributeCreationDataMockFactory = Factory.Sync.makeFactory<IssueCustomAttribute>({
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
