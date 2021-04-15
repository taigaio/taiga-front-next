/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
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
