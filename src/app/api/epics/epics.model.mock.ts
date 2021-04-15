/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import * as Factory from 'factory.ts';
import * as faker from 'faker';

import { EpicCreationData, EpicCreationInBulk, RelatedUserStoryCreationInBulk, EpicAttachmentCreationData, Epic } from './epics.model';
import { EpicCustomAttributeCreationData, EpicCustomAttributeBulkUpdate, EpicCustomAttributeDetail } from './epics-custom-attributes.model';
import { UserMockFactory } from '@/app/api/users/users.model.mock';

const user = UserMockFactory.build();

export const EpicMockFactory = Factory.Sync.makeFactory<Epic>({
  assignedTo: user.id,
  assignedToExtraInfo: {
    bigPhoto: user.bigPhoto,
    fullNameDisplay: user.fullNameDisplay,
    gravatarId: user.gravatarId,
    id: user.id,
    isActive: user.isActive,
    photo: user.photo,
    username: user.username,
  },
  attachments: [],
  blockedNote: faker.lorem.sentence(),
  clientRequirement: faker.random.boolean(),
  createdDate: faker.date.past().toString(),
  epicsOrder: faker.random.number(),
  id: faker.random.number(),
  isBlocked: faker.random.boolean(),
  isClosed: faker.random.boolean(),
  color: faker.internet.color(),
  isVoter: faker.random.boolean(),
  isWatcher: faker.random.boolean(),
  modifiedDate: faker.date.recent().toString(),
  owner: faker.random.number(),
  ownerExtraInfo: {
    bigPhoto: user.bigPhoto,
    fullNameDisplay: user.fullNameDisplay,
    gravatarId: user.gravatarId,
    id: user.id,
    isActive: user.isActive,
    photo: user.photo,
    username: user.username,
  },
  project: faker.random.number(),
  projectExtraInfo: {
    id: faker.random.number(),
    logoSmallUrl: faker.image.imageUrl(),
    name: faker.random.word(),
    slug: faker.lorem.slug(),
  },
  ref: faker.random.number(),
  status: faker.random.number(),
  statusExtraInfo: {
    color: faker.internet.color(),
    isClosed: faker.random.boolean(),
    name: faker.lorem.word(),
  },
  subject: faker.lorem.sentence(),
  tags: [
    faker.lorem.word(),
    faker.lorem.word(),
  ],
  teamRequirement: faker.random.boolean(),
  totalVoters: faker.random.number(),
  totalWatchers: faker.random.number(),
  userStoriesCounts: {
    progress: faker.random.number(),
    total: faker.random.number(),
  },
  version: faker.random.number(),
  watchers: [
    faker.random.number(),
    faker.random.number(),
  ],
});


export const EpicCreationMockFactory = Factory.Sync.makeFactory<EpicCreationData>({
  assignedTo: faker.random.number(),
  blockedNote: faker.lorem.sentence(),
  description: faker.lorem.sentence(),
  isBlocked: faker.random.boolean(),
  isClosed: faker.random.boolean(),
  color: faker.internet.color(),
  project: faker.random.number(),
  subject: faker.lorem.sentence(),
  tags: [
    faker.lorem.word(),
    faker.lorem.word(),
  ],
  watchers: [
    faker.random.number(),
    faker.random.number(),
  ],
});

export const EpicCreationInBulkMockFactory = Factory.Sync.makeFactory<EpicCreationInBulk>({
  projectId: faker.random.number(),
  statusId: faker.random.number(),
  bulkEpics: [
    faker.lorem.sentence(),
    faker.lorem.sentence(),
    faker.lorem.sentence(),
  ],
});

export const RelatedUserStoryCreationInBulkMockFactory = Factory.Sync.makeFactory<RelatedUserStoryCreationInBulk>({
  projectId: faker.random.number(),
  bulkUserStories: [
    faker.lorem.sentence(),
    faker.lorem.sentence(),
    faker.lorem.sentence(),
  ],
});

export const AttachmentCreationMockFactory = Factory.Sync.makeFactory<EpicAttachmentCreationData>({
  objectId: faker.random.number(),
  project: faker.random.number(),
  attachedFile: new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: 'text/xml'}),
  description: faker.lorem.sentence(),
  isDeprecated: faker.random.boolean(),
});

export const EpicCustomAttributeDetailMockFactory = Factory.Sync.makeFactory<EpicCustomAttributeDetail>({
  createdDate: faker.date.past().toString(),
  description: faker.lorem.sentence(),
  extra: null,
  id: faker.random.number(),
  modifiedDate: faker.date.recent().toString(),
  name: faker.random.word(),
  order: faker.random.number(),
  project: faker.random.number(),
  type: faker.random.word(),
});

export const EpicCustomAttributeCreationMockFactory = Factory.Sync.makeFactory<EpicCustomAttributeCreationData>({
  project: faker.random.number(),
  name: faker.lorem.sentence(),
  description: faker.lorem.sentence(),
  order: faker.random.number(),
});

export const EpicCustomAttributeBulkOrderMockFactory = Factory.Sync.makeFactory<EpicCustomAttributeBulkUpdate>({
  project: faker.random.number(),
  bulkEpicCustomAttributes: [
    [
      faker.random.number(),
      faker.random.number(),
    ],
    [
      faker.random.number(),
      faker.random.number(),
    ],
  ],
});
