/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { Project } from '@/app/api/projects/projects.model';
import { Severity } from '@/app/api/severities/severities.model';
import { Priority } from '@/app/api/priorities/priorities.model';
import { User } from '@/app/api/users/users.model';
import { Role } from '@/app/api/roles/roles.model';
import { Milestone } from '@/app/api/milestones/milestones.model';
import { Omit } from 'utility-types';
import { Attachment, AttachmentCreationData } from '@/app/api/commons/attachment.model';

import { Voter as IssueVoter } from '@/app/api/commons/voter.model';
import { Watcher as IssueWatcher } from '@/app/api/commons/watcher.model';
import { IssueStatusExtraInfo, IssueStatus } from '@/app/api/issue-statuses/issue-statuses.model';
import { TagsFilter } from '@/app/api/commons/tag.model';
import { IssueType } from '@/app/api/issue-types/issue-types.model';

export { Attachment };
export { AttachmentCreationData };

export type { IssueVoter };
export type { IssueWatcher };

export interface Issue {
  assignedTo: number;
  assignedToExtraInfo: Pick<User,
    'bigPhoto' |
    'fullNameDisplay' |
    'gravatarId' |
    'id' |
    'isActive' |
    'photo' |
    'username'>;
  attachments: Attachment[];
  blockedNote: string;
  blockedNoteHtml: string;
  comment: string;
  createdDate: string;
  description: string;
  descriptionHtml: string;
  dueDate: null | string;
  dueDateReason: string;
  dueDateStatus: string;
  externalReference: null | number;
  finishedDate: null | string;
  generatedUserStories: null | string;
  id: number;
  isBlocked: boolean;
  isClosed: boolean;
  isVoter: boolean;
  isWatcher: boolean;
  milestone: null | number;
  modifiedDate: string;
  ref: number;
  subject: string;
  neighbors: {
    next?: Pick<Issue, 'id' | 'ref' | 'subject'>,
    previous?: Pick<Issue, 'id' | 'ref' | 'subject'>,
  };
  owner: User['id'];
  ownerExtraInfo: Pick<User,
    'bigPhoto' |
    'fullNameDisplay' |
    'gravatarId' |
    'id' |
    'isActive' |
    'photo' |
    'username'>;
  priority: number;
  project: Project['id'];
  projectExtraInfo: Pick<Project,
    'id' |
    'logoSmallUrl' |
    'name' |
    'slug'
  >;
  severity: Severity['id'];
  status: IssueStatus['id'];
  statusExtraInfo: IssueStatusExtraInfo;
  tags: [string, string | null][];
  totalVoters: number;
  totalWatchers: number;
  type: number;
  version: number;
  watchers: IssueWatcher['id'][];
}

export type IssueListItem = Omit<Issue,
'blockedNoteHtml' |
'description' |
'descriptionHtml' |
'neighbors'>;

export interface IssueFilter {
  project: Project['id'];
  status: IssueStatus['id'];
  severity: Severity['id'];
  priority: Priority['id'];
  owner: User['id'];
  assignedTo: User['id'];
  tags: string[];
  type: string;
  role: Role['id'];
  watchers: IssueWatcher['id'][];
  statusIsClosed: boolean;
  excludeStatus: IssueStatus['id'];
  excludeSeverity: Severity['id'];
  excludePriority: Priority['id'];
  excludeOwner: User['id'];
  excludeAssignedTo: User['id'];
  excludeTags: string[];
  excludeType: string;
  excludeRole: Role['id'];
}

export type IssueOrderBy = 'type' |
'severity' |
'status' |
'priority' |
'createdDate' |
'modifiedDate' |
'owner' |
'assignedTo';

export interface IssueCreationData {
  assigned_to?: User['id'];
  blocked_note?: string;
  description?: string;
  is_blocked?: boolean;
  is_closed?: boolean;
  milestone?: Milestone['id'];
  project: Project['id'];
  status?: IssueStatus['id'];
  severity?: Severity['id'];
  priority?: Priority['id'];
  type?: string;
  subject: string;
  tags?: string[];
  watchers?: IssueWatcher['id'][];
}

export interface IssueFiltersData {
  assignedTo: {
    count: number;
  } & Pick<User, 'fullName' | 'id'>;
  owners: {
    count: number;
  } & Pick<User, 'fullName' | 'id'>;
  priorities: {
    count: number;
  } & Pick<Priority, 'color' | 'id' | 'name' | 'order'>;
  roles: {
    count: number;
    color: string;
  } & Pick<Role, 'id' | 'name' | 'order'>;
  severities: {
    count: number;
  } & Pick<Severity, 'color' | 'id' | 'name' | 'order'>;
  statuses: {
    count: number;
  } & Pick<IssueStatus, 'color' | 'id' | 'name' | 'order'>;
  tags: TagsFilter;
  types: {
    color: IssueType['color'] | null;
    count: number;
    name: IssueType['name'];
    id: IssueType['id'];
    order: IssueType['order'];
  };
}
