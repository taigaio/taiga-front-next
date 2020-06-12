/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import * as Factory from 'factory.ts';
import * as faker from 'faker';

import { User } from './users.model';

export const UserMockFactory = Factory.Sync.makeFactory<User>({
  accepted_terms: faker.random.boolean(),
  big_photo: faker.image.avatar(),
  bio: faker.lorem.paragraphs(),
  color: faker.internet.color(),
  date_joined: faker.date.past().toDateString(),
  email: faker.internet.email(),
  full_name: faker.name.firstName(),
  full_name_display: `${faker.name.firstName()} ${faker.name.lastName()}`,
  gravatar_id: faker.random.uuid(),
  id: faker.random.number(),
  is_active: faker.random.boolean(),
  lang: faker.random.locale(),
  max_memberships_private_projects: faker.random.number(),
  max_memberships_public_projects: faker.random.number(),
  max_private_projects: faker.random.number(),
  max_public_projects: faker.random.number(),
  photo: faker.image.avatar(),
  read_new_terms: faker.random.boolean(),
  roles: [
    faker.name.jobArea(),
  ],
  theme: 'taiga',
  timezone: '',
  total_private_projects: faker.random.number(),
  total_public_projects: faker.random.number(),
  username: faker.internet.userName(),
  uuid: faker.random.uuid(),
});
