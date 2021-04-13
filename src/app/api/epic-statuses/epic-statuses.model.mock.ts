import * as Factory from 'factory.ts';
import * as faker from 'faker';

import { EpicStatus } from './epic-statuses.model';

export const EpicStatusMockFactory = Factory.Sync.makeFactory<EpicStatus>({
  id: faker.random.number(),
  name: faker.lorem.words(),
  slug: faker.lorem.slug(),
  color: faker.internet.color(),
  isClosed: faker.random.boolean(),
  order: faker.random.number(),
  project: faker.random.number(),
});
