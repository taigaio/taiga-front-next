/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import * as Factory from 'factory.ts';
import * as faker from 'faker';
import { WebhookCreationData, WebhookDetail } from './webhooks.model';


export const WebhookMockFactory = Factory.Sync.makeFactory<WebhookDetail>({
  id: faker.random.number(),
  project: faker.random.number(),
  key: faker.random.uuid(),
  logsCounter: faker.random.number(),
  name: faker.random.word(),
  url: faker.internet.url(),
});

export const WebhookCreationMockFactory = Factory.Sync.makeFactory<WebhookCreationData>({
  name: faker.random.word(),
  project: faker.random.number(),
  key: faker.random.uuid(),
  url: faker.internet.url(),
});
