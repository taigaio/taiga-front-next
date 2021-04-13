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
