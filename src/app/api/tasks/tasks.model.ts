/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

export { Attachment, AttachmentCreationData } from '@/app/api/commons/attachment.model';
import { Voter as TaskVoter } from '@/app/api/commons/voter.model';
import { Watcher as TaskWatcher } from '@/app/api/commons/watcher.model';
import { UserExtraInfo, User } from '@/app/api/users/users.model';
import { Role } from '@/app/api/roles/roles.model';
import { TagsFilter } from '@/app/api/commons/tag.model';
import { TaskStatusExtraInfo } from '@/app/api/task-statuses/task-statuses.model';
import { TaskStatus } from '../task-statuses/task-statuses.model';

export type { TaskVoter };
export type { TaskWatcher };

export interface ProjectExtraInfo {
  id: number;
  logoSmallUrl: null | string;
  name: string;
  slug: string;
}

export interface EpicExtraInfo {
  color: string;
  id: number;
  project: Pick<ProjectExtraInfo, 'id' | 'name' | 'slug'>;
  ref: number;
  subject: string;
}

export interface UserStoryExtraInfo {
  epics: EpicExtraInfo[];
  id: number;
  ref: number;
  subject: string;
}

export interface Task {
  assignedTo: number;
  assignedToExtraInfo: UserExtraInfo;
  attachments: any[];
  blockedNote: string;
  createdDate: string;
  dueDate: string;
  dueDateReason: string;
  dueDateStatus: string;
  externalReference: number;
  finishedDate: string;
  id: number;
  isBlocked: boolean;
  isClosed: boolean;
  isIocaine: boolean;
  isVoter: boolean;
  isWatcher: boolean;
  milestone: number;
  milestoneSlug: string;
  modifiedDate: string;
  owner: number;
  ownerExtraInfo: UserExtraInfo;
  project: number;
  projectExtraInfo: ProjectExtraInfo;
  ref: number;
  status: TaskStatus['id'];
  statusExtraInfo: TaskStatusExtraInfo;
  subject: string;
  tags: [string, string | null][];
  taskboardOrder: number;
  totalComments: number;
  totalVoters: number;
  totalWatchers: number;
  usOrder: number;
  userStory: number;
  userStoryExtraInfo: UserStoryExtraInfo;
  version: number;
  watchers: TaskWatcher['id'][];
}

export interface TaskGet extends Task {
  blockedNoteHtml: string;
  comment: string;
  description: string;
  descriptionHtml: string;
  generatedUserStories: number[];
  neighbors: {
    next: Pick<Task, 'id' | 'ref' | 'subject'>
    previous: Pick<Task, 'id' | 'ref' | 'subject'>
  };
}

export interface TaskFilter {
  assignedTo: number;
  excludeAssignedTo: number;
  excludeOwner: number;
  excludeRole: Role['id'];
  excludeStatus: number;
  excludeTags: string[];
  milestone: number;
  owner: number;
  project: number;
  role: Role['id'];
  status: number;
  tags: string[];
  userStory: number;
  watchers: TaskWatcher['id'];
  statusIsClosed: boolean;
}

export interface TaskCreationData {
  assignedTo: number;
  blockedNote: string;
  description: string;
  isBlocked: boolean;
  isClosed: boolean;
  milestone: number;
  project: number;
  userStory: number;
  status: number;
  subject: string;
  tags: [string, string | null][];
  usOrder: number;
  taskboardOrder: number;
  isIocaine: boolean;
  externalReference: number;
  watchers: TaskWatcher['id'][];
}

export interface TaskBulkCreationData {
  projectId: number;
  statusId?: number;
  sprintId?: number;
  UsId?: number;
  bulkTasks: string[];
}

export interface TaskFiltersData {
  assignedTo: Pick<User,
  'fullName' |
  'id'> & {
    count: number;
  }[];
  owners: Pick<User,
  'fullName' |
  'id'> & {
    count: number;
  }[];
  roles: Pick<Role,
    'id' |
    'name' |
    'order'> & {
      color: null | string;
      count: number;
  }[];
  statuses: {
    color: string;
    count: number;
    id: number;
    name: string;
    order: number;
  }[];
  tags: TagsFilter[];
}
