import * as Factory from 'factory.ts';
import * as faker from 'faker';

import { Severity } from './severities.model';

export const SeverityMockFactory = Factory.Sync.makeFactory<Severity>({
  id: faker.random.number(),
  name: faker.lorem.words(),
  color: faker.internet.color(),
  order: faker.random.number(),
  project: faker.random.number(),
});
