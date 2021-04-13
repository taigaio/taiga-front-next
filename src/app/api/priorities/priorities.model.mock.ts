import * as Factory from 'factory.ts';
import * as faker from 'faker';

import { Priority } from './priorities.model';

export const PriorityMockFactory = Factory.Sync.makeFactory<Priority>({
  id: faker.random.number(),
  name: faker.lorem.words(),
  color: faker.internet.color(),
  order: faker.random.number(),
  project: faker.random.number(),
});
