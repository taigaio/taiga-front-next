import * as Factory from 'factory.ts';
import * as faker from 'faker';

import { IssueType } from './issue-types.model';

export const IssueTypeMockFactory = Factory.Sync.makeFactory<IssueType>({
  id: faker.random.number(),
  name: faker.lorem.words(),
  color: faker.internet.color(),
  order: faker.random.number(),
  project: faker.random.number(),
});
