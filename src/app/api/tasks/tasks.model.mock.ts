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
import { Task, TaskCreationData } from './tasks.model';
import { AttachmentCreationData } from '../userstories/userstories.model';

const user = UserMockFactory.build();

export const TaskMockFactory = Factory.Sync.makeFactory<Task>({
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
  createdDate: faker.date.recent().toString(),
  dueDate: faker.date.future().toString(),
  dueDateReason: faker.lorem.paragraph(),
  dueDateStatus: faker.lorem.paragraph(),
  externalReference: faker.random.number(),
  finishedDate: faker.date.recent().toString(),
  id: Factory.each(() => faker.random.number()),
  isBlocked: faker.random.boolean(),
  isClosed: faker.random.boolean(),
  isVoter: faker.random.boolean(),
  isIocaine: faker.random.boolean(),
  isWatcher: faker.random.boolean(),
  milestone: faker.random.number(),
  milestoneSlug: faker.lorem.slug(),
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
  subject: faker.lorem.paragraph(),
  tags: [
    [faker.random.word(), faker.random.word()],
  ],
  taskboardOrder: faker.random.number(),
  totalComments: faker.random.number(),
  totalVoters: faker.random.number(),
  totalWatchers: faker.random.number(),
  usOrder: faker.random.number(),
  userStory: faker.random.number(),
  userStoryExtraInfo: {
    epics: [{
      color: faker.internet.color(),
      id: faker.random.number(),
      ref: faker.random.number(),
      subject: faker.lorem.paragraph(),
      project: {
        id: faker.random.number(),
        name:  faker.name.firstName(),
        slug: faker.lorem.slug(),
      },
    }],
    id: faker.random.number(),
    ref: faker.random.number(),
    subject: faker.lorem.paragraph(),
  },
  version: faker.random.number(),
  watchers: [faker.random.number(), faker.random.number()],
});


export const TaskCreationDataMockFactory = Factory.Sync.makeFactory<TaskCreationData>({
  assignedTo: faker.random.number(),
  blockedNote: faker.lorem.paragraph(),
  description: faker.lorem.paragraphs(),
  isBlocked: faker.random.boolean(),
  isClosed: faker.random.boolean(),
  milestone: faker.random.number(),
  project: faker.random.number(),
  userStory: faker.random.number(),
  status: faker.random.number(),
  subject: faker.lorem.paragraph(),
  tags: [
    [faker.random.word(), faker.random.word()],
  ],
  usOrder: faker.random.number(),
  taskboardOrder: faker.random.number(),
  isIocaine: faker.random.boolean(),
  externalReference: faker.random.number(),
  watchers: [faker.random.number()],
});

export const TaskAttachmentCreationMockFactory = Factory.Sync.makeFactory<AttachmentCreationData>({
  objectId: faker.random.number(),
  project: faker.random.number(),
  attachedFile: new File([], faker.random.word()),
  description: faker.lorem.sentence(),
  isDeprecated: faker.random.boolean(),
});
