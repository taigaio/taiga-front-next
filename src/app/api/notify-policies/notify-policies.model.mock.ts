/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
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
