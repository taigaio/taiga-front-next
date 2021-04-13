import * as Factory from 'factory.ts';
import { UserstoryCustomAttribute } from './userstories-custom-attribute.model';
import * as faker from 'faker';

export const UserstoriesCustomAttributeCreationDataMockFactory = Factory.Sync.makeFactory<UserstoryCustomAttribute>({
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
