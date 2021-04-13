import * as Factory from 'factory.ts';
import * as faker from 'faker';

import { Points } from './points.model';

export const PointsMockFactory = Factory.Sync.makeFactory<Points>({
  id: faker.random.number(),
  name: faker.lorem.words(),
  value: faker.random.arrayElement([null, faker.random.number(30)]),
  order: faker.random.number(),
  project: faker.random.number(),
});
