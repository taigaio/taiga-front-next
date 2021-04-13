import * as Factory from 'factory.ts';
import * as faker from 'faker';

import { IssueStatus } from './issue-statuses.model';

export const IssueStatusMockFactory = Factory.Sync.makeFactory<IssueStatus>({
  id: faker.random.number(),
  name: faker.lorem.words(),
  slug: faker.lorem.slug(),
  color: faker.internet.color(),
  isClosed: faker.random.boolean(),
  order: faker.random.number(),
  project: faker.random.number(),
});
