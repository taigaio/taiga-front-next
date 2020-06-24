/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import * as Factory from 'factory.ts';
import * as faker from 'faker';

import { EpicCreationData, EpicCreationInBulk } from './epics.model';

export const EpicCreationMockFactory = Factory.Sync.makeFactory<EpicCreationData>({
  assignedTo: faker.random.number(),
  blockedNote: faker.lorem.sentence(),
  description: faker.lorem.sentence(),
  isBlocked: faker.random.boolean(),
  isClosed: faker.random.boolean(),
  color: faker.internet.color(),
  project: faker.random.number(),
  subject: faker.lorem.sentence(),
  tags: [
    faker.lorem.word(),
    faker.lorem.word(),
  ],
  watchers: [
    faker.random.number(),
    faker.random.number(),
  ],
});

export const EpicCreationInBulkMockFactory = Factory.Sync.makeFactory<EpicCreationInBulk>({
  project: faker.random.number(),
  statusId: faker.random.number(),
  bulkEpics: [
    faker.lorem.sentence(),
    faker.lorem.sentence(),
    faker.lorem.sentence(),
  ],
});
