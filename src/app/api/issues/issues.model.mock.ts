/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import * as Factory from 'factory.ts';
import * as faker from 'faker';
import { UserMockFactory } from '@/app/api/users/users.model.mock';
import { Issue, IssueCreationData, AttachmentCreationData } from './issues.model';

const user = UserMockFactory.build();

export const IssueMockFactory = Factory.Sync.makeFactory<Issue>({
  assignedTo: faker.random.number(),
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
  blockedNote: faker.lorem.paragraph(),
  blockedNoteHtml: faker.lorem.paragraph(),
  comment: faker.lorem.paragraphs(),
  createdDate: faker.date.recent().toString(),
  description: faker.lorem.paragraphs(),
  descriptionHtml: faker.lorem.paragraphs(),
  dueDate: faker.date.recent().toString(),
  dueDateReason: faker.lorem.paragraph(),
  dueDateStatus: faker.lorem.paragraph(),
  externalReference: faker.random.number(),
  finishedDate: faker.date.recent().toString(),
  id: Factory.each(() => faker.random.number()),
  generatedUserStories: faker.random.word(),
  isBlocked: faker.random.boolean(),
  isClosed: faker.random.boolean(),
  isVoter: faker.random.boolean(),
  isWatcher: faker.random.boolean(),
  milestone: faker.random.number(),
  modifiedDate: faker.date.recent().toString(),
  neighbors: {
    next: {
      id: faker.random.number(),
      ref: faker.random.number(),
      subject: faker.lorem.paragraph(),
    },
    previous: {
      id: faker.random.number(),
      ref: faker.random.number(),
      subject: faker.lorem.paragraph(),
    },
  },
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
  priority: faker.random.number(),
  project: faker.random.number(),
  projectExtraInfo: {
      id: faker.random.number(),
      logoSmallUrl: faker.image.imageUrl(),
      name: faker.random.word(),
      slug: faker.lorem.slug(),
  },
  ref: faker.random.number(),
  severity: faker.random.number(),
  status: faker.random.number(),
  statusExtraInfo: {
      color: faker.internet.color(),
      isClosed: faker.random.boolean(),
      name: faker.lorem.word(),
  },
  subject: faker.lorem.paragraph(),
  tags: [
    [faker.random.word(), faker.random.word()],
  ],
  totalVoters: faker.random.number(),
  totalWatchers: faker.random.number(),
  type: faker.random.number(),
  version: faker.random.number(),
  watchers: [faker.random.number()],
});


export const IssueCreationDataMockFactory = Factory.Sync.makeFactory<IssueCreationData>({
  description: faker.lorem.paragraphs(),
  milestone: faker.random.number(),
  project: faker.random.number(),
  status: faker.random.number(),
  subject: faker.lorem.paragraph(),
  watchers: [faker.random.number()],
});

export const IssueAttachmentCreationMockFactory = Factory.Sync.makeFactory<AttachmentCreationData>({
  objectId: faker.random.number(),
  project: faker.random.number(),
  attachedFile: new File([], faker.random.word()),
  description: faker.lorem.sentence(),
  isDeprecated: faker.random.boolean(),
});
