import * as Factory from 'factory.ts';
import * as faker from 'faker';

import { Role } from './roles.model';

export const RoleMockFactory = Factory.Sync.makeFactory<Role>({
  id: faker.random.number(),
  name: faker.lorem.words(),
  slug: faker.lorem.slug(),
  order: faker.random.number(),
  project: faker.random.number(),
  computable: faker.random.boolean(),
  permissions: [],
  membersCount: faker.random.number(),
});
