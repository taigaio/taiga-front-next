/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import * as Factory from 'factory.ts';
import * as faker from 'faker';
import { Project, Status } from './projects.model';
import { UserMockFactory } from '@/app/api/users/users.model.mock';
import { PointsMockFactory } from '@/app/api/points/points.model.mock';
import { Permissions } from '@/app/api/roles/roles.model';
import { MilestoneMockFactory } from '../milestones/milestones.model.mock';

export const ProjectStatusMockFactory = Factory.Sync.makeFactory<Status>({
  id: faker.random.number(),
  name: faker.lorem.words(),
  slug: faker.lorem.slug(),
  color: faker.internet.color(),
  isClosed: faker.random.boolean(),
  order: faker.random.number(),
  projectId: faker.random.number(),
});

export const ProjectMockFactory = Factory.Sync.makeFactory<Project>({
  anonPermissions: [faker.random.word()],
  blockedCode: null,
  createdDate: faker.date.past.toString(),
  creationTemplate: 1,
  defaultEpicStatus: faker.random.number(),
  defaultIssueStatus: faker.random.number(),
  defaultIssueType: faker.random.number(),
  defaultPoints: faker.random.number(),
  defaultPriority: faker.random.number(),
  defaultSeverity: faker.random.number(),
  defaultTaskStatus: faker.random.number(),
  defaultUsStatus: faker.random.number(),
  description: faker.lorem.paragraph(),
  epicCustomAttributes: [],
  epicStatuses: ProjectStatusMockFactory.build(),
  epicsCsvUuid: null,
  iAmAdmin: faker.random.boolean(),
  iAmMember: faker.random.boolean(),
  iAmOwner: faker.random.boolean(),
  id: faker.random.number(),
  isBacklogActivated: faker.random.boolean(),
  isContactActivated: faker.random.boolean(),
  isEpicsActivated: faker.random.boolean(),
  isFan: faker.random.boolean(),
  isFeatured: faker.random.boolean(),
  isIssuesActivated: faker.random.boolean(),
  isKanbanActivated: faker.random.boolean(),
  isLookingForPeople: faker.random.boolean(),
  isOutOfOwnerLimits: faker.random.boolean(),
  isPrivate: faker.random.boolean(),
  isPrivateExtraInfo: {
    canBeUpdated: faker.random.boolean(),
    reason: null,
  },
  isWatcher: faker.random.boolean(),
  isWikiActivated: faker.random.boolean(),
  issueCustomAttributes: [],
  issueDuedates: [],
  issueStatuses: [],
  issueTypes: [],
  issuesCsvUuid: null,
  logoBigUrl: faker.image.imageUrl(),
  logoSmallUrl: faker.image.imageUrl(),
  lookingForPeopleNote: faker.lorem.paragraph(),
  maxMemberships: null,
  members: [
    {
      role: faker.random.number(),
      roleName: faker.lorem.word(),
      ...UserMockFactory.build(),
    },
  ],
  milestones: [
    MilestoneMockFactory.build( { closed: false }),
    MilestoneMockFactory.build({ name: faker.random.word(), closed: false }),
    MilestoneMockFactory.build({ name: faker.random.word(), closed: false }),
    MilestoneMockFactory.build({ name: faker.random.word(), closed: true }),
  ],
  modifiedDate: faker.date.past.toString(),
  myHomepage: faker.random.number(),
  myPermissions: [
    Permissions.viewEpics,
    Permissions.viewMilestones,
    Permissions.viewUserstory,
    Permissions.viewTasks,
    Permissions.viewIssues,
    Permissions.viewWikiLinks,
    Permissions.viewWikiPages,
    Permissions.viewProject,
  ],
  name: faker.lorem.word(),
  notifyLevel: faker.random.number(),
  owner: UserMockFactory.build(),
  points: [
    {
      projectId: 2,
      ...PointsMockFactory.build(),
    },
  ],
  priorities: [],
  publicPermissions: [],
  roles: [],
  severities: [],
  slug: faker.lorem.slug(),
  tags: [],
  tagsColors: {},
  taskCustomAttributes: [],
  taskDuedates: [],
  taskStatuses: [],
  tasksCsvUuid: null,
  totalActivity: faker.random.number(),
  totalActivityLastMonth: faker.random.number(),
  totalActivityLastWeek: faker.random.number(),
  totalActivityLastYear: faker.random.number(),
  totalClosedMilestones: faker.random.number(),
  totalFans: faker.random.number(),
  totalFansLastMonth: faker.random.number(),
  totalFansLastWeek: faker.random.number(),
  totalFansLastYear: faker.random.number(),
  totalMemberships: faker.random.number(),
  totalMilestones: faker.random.number(),
  totalStoryPoints: faker.random.number(),
  totalWatchers: faker.random.number(),
  totalsUpdatedDatetime: faker.lorem.word(),
  transferToken: faker.lorem.word(),
  usDuedates: [],
  usStatuses: [],
  userstoriesCsvUuid: null,
  userstoryCustomAttributes: [],
  videoconferences: null,
  videoconferencesExtraData: null,
});
