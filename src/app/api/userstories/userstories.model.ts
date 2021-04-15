/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { User } from '@/app/api/users/users.model';
import { Project } from '@/app/api/projects/projects.model';
import { Epic } from '@/app/api/epics/epics.model';
import { Milestone } from '@/app/api/milestones/milestones.model';
import { Role } from '@/app/api/roles/roles.model';
import { Attachment } from '@/app/api/commons/attachment.model';
import { Issue } from '@/app/api/issues/issues.model';
import { Task } from '@/app/api/tasks/tasks.model';
export { Attachment, AttachmentCreationData } from '@/app/api/commons/attachment.model';
import { Voter as UserstoryVoter } from '@/app/api/commons/voter.model';
import { Watcher as UserstoryWatcher } from '@/app/api/commons/watcher.model';
import { UserstoryStatus, UserstoryStatusExtraInfo } from '@/app/api/userstory-statuses/userstory-statuses.model';

export type { UserstoryVoter };
export type { UserstoryWatcher };

export interface UserstoryFilter {
  project: Project['id'];
  milestone: Milestone['id'];
  milestoneIsnull: boolean;
  status: UserstoryStatus['id'];
  statusIsArchived: boolean;
  tags: string;
  watchers: UserstoryWatcher['id'][];
  assignedTo: User['id'][];
  epic: Epic['id'];
  role: Role['id'];
  statusIsClosed: boolean;
  excludeStatus: UserstoryStatus['id'];
  excludeTags: string;
  excludeAssignedTo: User['id'][];
  excludeRole: Role['id'];
  excludeEpic: Epic['id'];
}

export interface Userstory {
  assignedTo: null | User['id'];
  assignedToExtraInfo: Pick<User,
    'bigPhoto' |
    'fullNameDisplay' |
    'gravatarId' |
    'id' |
    'isActive' |
    'photo' |
    'username'>;
  assignedUsers: User['id'][];
  attachments: Attachment[];
  backlogOrder: number;
  blockedNote: string;
  blockedNoteHtml: string;
  clientRequirement: boolean;
  comment: string;
  createdDate: string;
  description: string;
  descriptionHtml: string;
  dueDate: null | string;
  dueDateReason: string;
  dueDateStatus: string;
  epicOrder: null | number;
  epics: null | (Pick<Epic,
  'color' |
  'id' |
  'ref' |
  'subject'> & {
    project: Pick<Project,
      'id' |
      'name' |
      'slug'
    >
  })[];
  externalReference: null | number;
  finishDate: null | string;
  generatedFromIssue: null | boolean;
  generatedFromTask: null | boolean;
  id: number;
  isBlocked: boolean;
  isClosed: boolean;
  isVoter: boolean;
  isWatcher: boolean;
  kanbanOrder: number;
  milestone: null | number;
  milestoneName: null | Milestone['name'];
  milestoneSlug: null | Milestone['slug'];
  modifiedDate: Milestone['modifiedDate'];
  neighbors: {
    next: Pick<Userstory, 'id' | 'ref' | 'subject'>
    previous: Pick<Userstory, 'id' | 'ref' | 'subject'>
  };
  originIssue: null | Issue['id'];
  originTask: null | Task['id'];
  owner: User['id'];
  ownerExtraInfo: Pick<User,
    'bigPhoto' |
    'fullNameDisplay' |
    'gravatarId' |
    'id' |
    'isActive' |
    'photo' |
    'username'>;
  points: Record<string, number>;
  project: Project['id'];
  projectExtraInfo: Pick<Project,
    'id' |
    'logoSmallUrl' |
    'name' |
    'slug'
  >;
  ref: number;
  sprintOrder: number;
  status: UserstoryStatus['id'];
  statusExtraInfo: UserstoryStatusExtraInfo;
  subject: string;
  tags: [string, string | null][];
  tasks: Task['id'][];
  teamRequirement: boolean;
  totalAttachments: number;
  totalComments: number;
  totalPoints: number;
  totalVoters: number;
  totalWatchers: number;
  tribeGig: null | string;
  version: number;
  watchers: UserstoryWatcher['id'][];
}

export type UserstoryCreationData = Pick<Userstory,
  'assignedTo' |
  'backlogOrder' |
  'blockedNote' |
  'clientRequirement' |
  'description' |
  'isBlocked' |
  'isClosed' |
  'kanbanOrder' |
  'milestone' |
  'points' |
  'project' |
  'sprintOrder' |
  'status' |
  'subject' |
  'tags' |
  'teamRequirement' |
  'watchers'>;

export type UserstoryList  = Omit<Userstory,
  'blockedNoteHtml' |
  'description' |
  'descriptionHtml' |
  'neighbors'>;

export interface UserstoryFiltersData {
  assignedTo: {
    count: number;
    fullName: User['fullName'];
    id: null | User['id'];
  }[];
  assignedUsers: {
    count: number;
    fullName: User['fullName'];
    id: null | User['id'];
  }[];
  epics: {
    count: number;
    id: null | Epic['id'];
    order: number;
    ref: null | Epic['ref'];
    subject: null | Epic['subject'];
  }[];
  owners: {
    count: number;
    fullName: User['fullName'];
    id: User['id'];
  }[];
  roles: {
    color: null | string;
    count: number;
    id: Role['id'];
    name: Role['name'];
    order: Role['order'];
  }[];
  statuses: {
    count: number;
  } & Pick<UserstoryStatus, 'color' | 'id' | 'name' | 'order'>;
  tags: {
    color: null | string;
    count: number;
    name: string;
  }[];
}
