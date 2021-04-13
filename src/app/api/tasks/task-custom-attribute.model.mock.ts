import * as Factory from 'factory.ts';
import { TaskCustomAttribute } from './task-custom-attribute.model';
import * as faker from 'faker';

export const TaskCustomAttributeCreationDataMockFactory = Factory.Sync.makeFactory<TaskCustomAttribute>({
  createdDate: faker.date.recent().toString(),
  description: faker.lorem.paragraph(),
  extra: faker.lorem.paragraph(),
  id: faker.random.number(),
  modifiedDate: faker.date.recent().toString(),
  name: faker.random.word(),
  order: faker.random.number(),
  project: faker.random.number(),
  type: faker.random.word(),
});
