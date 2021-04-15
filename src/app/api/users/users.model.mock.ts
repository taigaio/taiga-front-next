/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import * as Factory from 'factory.ts';
import * as faker from 'faker';

import { User } from './users.model';

export const UserMockFactory = Factory.Sync.makeFactory<User>({
  acceptedTerms: faker.random.boolean(),
  bigPhoto: faker.image.avatar(),
  bio: faker.lorem.paragraphs(),
  color: faker.internet.color(),
  dateJoined: faker.date.past().toDateString(),
  email: faker.internet.email(),
  fullName: faker.name.firstName(),
  fullNameDisplay: `${faker.name.firstName()} ${faker.name.lastName()}`,
  gravatarId: faker.random.uuid(),
  id: faker.random.number(),
  isActive: faker.random.boolean(),
  lang: faker.random.locale(),
  maxMembershipsPrivateProjects: faker.random.number(),
  maxMembershipsPublicProjects: faker.random.number(),
  maxPrivateProjects: faker.random.number(),
  maxPublicProjects: faker.random.number(),
  photo: faker.image.avatar(),
  readNewTerms: faker.random.boolean(),
  roles: [
    faker.name.jobArea(),
  ],
  theme: 'taiga',
  timezone: '',
  totalPrivateProjects: faker.random.number(),
  totalPublicProjects: faker.random.number(),
  username: faker.internet.userName(),
  uuid: faker.random.uuid(),
});
