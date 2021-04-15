/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import * as Factory from 'factory.ts';
import * as faker from 'faker';

import { NotifyPolicyDetail } from './notify-policies.model';

export const NotifyPoliciesMockFactory = Factory.Sync.makeFactory<NotifyPolicyDetail>({
  id: faker.random.number(),
  liveNotifyLevel: faker.random.number(),
  project: faker.random.number(),
  projectName: faker.random.word(),
  webNotifyLevel: faker.random.boolean(),
});
