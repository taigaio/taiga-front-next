/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import * as Factory from 'factory.ts';
import * as faker from 'faker';
import { Membership } from './memberships-invitations.model';


export const MembershipMockFactory = Factory.Sync.makeFactory<Membership>({
  color: faker.internet.color(),
  createdAt: faker.date.past().toString(),
  email: faker.internet.email(),
  fullName: `${faker.name.firstName} ${faker.name.lastName}`,
  gravatarId: faker.random.alphaNumeric(),
  id: faker.random.number(),
  invitationExtraText: faker.lorem.paragraph(),
  invitedBy: faker.random.number(),
  isAdmin: faker.random.boolean(),
  isOwner: faker.random.boolean(),
  isUserActive: faker.random.boolean(),
  photo: faker.image.food(),
  project: faker.random.number(),
  projectName: faker.random.words(),
  projectSlug: faker.lorem.slug(),
  role: faker.random.number(),
  roleName: faker.random.word(),
  user: faker.random.number(),
  userEmail: faker.internet.email(),
  userOrder: faker.random.number(),
});
