import * as Factory from 'factory.ts';
import * as faker from 'faker';

import { TaskStatus } from './task-statuses.model';

export const TaskStatusMockFactory = Factory.Sync.makeFactory<TaskStatus>({
  id: faker.random.number(),
  name: faker.lorem.words(),
  slug: faker.lorem.slug(),
  color: faker.internet.color(),
  isClosed: faker.random.boolean(),
  order: faker.random.number(),
  project: faker.random.number(),
});
