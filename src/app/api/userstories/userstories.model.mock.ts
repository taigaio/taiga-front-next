/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import * as Factory from 'factory.ts';
import * as faker from 'faker';
import { UserMockFactory } from '@/app/api/users/users.model.mock';
import { Userstory, UserstoryCreationData, AttachmentCreationData } from './userstories.model';

const user = UserMockFactory.build();

export const UserstoryMockFactory = Factory.Sync.makeFactory<Userstory>({
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
  assignedUsers: [],
  attachments: [],
  backlogOrder: faker.random.number(),
  blockedNote: faker.lorem.paragraph(),
  blockedNoteHtml: faker.lorem.paragraph(),
  clientRequirement: faker.random.boolean(),
  comment: faker.lorem.paragraphs(),
  createdDate: faker.date.recent().toString(),
  description: faker.lorem.paragraphs(),
  descriptionHtml: faker.lorem.paragraphs(),
  dueDate: faker.date.recent().toString(),
  dueDateReason: faker.lorem.paragraph(),
  dueDateStatus: faker.lorem.paragraph(),
  epicOrder: faker.random.number(),
  epics: [{
    color: faker.internet.color(),
    id: faker.random.number(),
    project: {
        id: faker.random.number(),
        name:  faker.name.firstName(),
        slug: faker.lorem.slug(),
    },
    ref: faker.random.number(),
    subject: faker.lorem.paragraph(),
  }],
  externalReference: faker.random.number(),
  finishDate: faker.date.recent().toString(),
  generatedFromIssue: faker.random.boolean(),
  generatedFromTask: faker.random.boolean(),
  id: Factory.each(() => faker.random.number()),
  isBlocked: faker.random.boolean(),
  isClosed: faker.random.boolean(),
  isVoter: faker.random.boolean(),
  isWatcher: faker.random.boolean(),
  kanbanOrder: faker.random.number(),
  milestone: faker.random.number(),
  milestoneName: faker.random.word(),
  milestoneSlug: faker.lorem.slug(),
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
  originIssue: faker.random.number(),
  originTask: faker.random.number(),
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
  points: {
    [faker.random.word()]: faker.random.number(),
  },
  project: faker.random.number(),
  projectExtraInfo: {
      id: faker.random.number(),
      logoSmallUrl: faker.image.imageUrl(),
      name: faker.random.word(),
      slug: faker.lorem.slug(),
  },
  ref: faker.random.number(),
  sprintOrder: faker.random.number(),
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
  tasks: [
    faker.random.number(),
  ],
  teamRequirement: faker.random.boolean(),
  totalAttachments: faker.random.number(),
  totalComments: faker.random.number(),
  totalPoints: faker.random.number(),
  totalVoters: faker.random.number(),
  totalWatchers: faker.random.number(),
  tribeGig: faker.internet.url(),
  version: faker.random.number(),
  watchers: [faker.random.number()],
});


export const UserstoryCreationDataMockFactory = Factory.Sync.makeFactory<UserstoryCreationData>({
  assignedTo: faker.random.number(),
  backlogOrder: faker.random.number(),
  blockedNote: faker.lorem.paragraph(),
  clientRequirement: faker.random.boolean(),
  description: faker.lorem.paragraphs(),
  isBlocked: faker.random.boolean(),
  isClosed: faker.random.boolean(),
  kanbanOrder: faker.random.number(),
  milestone: faker.random.number(),
  points: {
    [faker.random.word()]: faker.random.number(),
  },
  project: faker.random.number(),
  sprintOrder: faker.random.number(),
  status: faker.random.number(),
  subject: faker.lorem.paragraph(),
  tags: [
    [faker.random.word(), faker.random.word()],
  ],
  teamRequirement: faker.random.boolean(),
  watchers: [faker.random.number()],
});

export const UserstoryAttachmentCreationMockFactory = Factory.Sync.makeFactory<AttachmentCreationData>({
  objectId: faker.random.number(),
  project: faker.random.number(),
  attachedFile: new File([], faker.random.word()),
  description: faker.lorem.sentence(),
  isDeprecated: faker.random.boolean(),
});
