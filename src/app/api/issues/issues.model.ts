/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { Project, Status } from '@/app/api/projects/projects.model';
import { Severity } from '@/app/api/severities/severities.model';
import { Priority } from '@/app/api/priorities/priorities.model';
import { User } from '@/app/api/users/users.model';
import { Role } from '@/app/api/roles/roles.model';
import { Milestone } from '@/app/api/milestones/milestones.model';
import { Omit } from 'utility-types';
export { Attachment, AttachmentCreationData } from '@/app/api/commons/attachment.model';

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
  attachments: unknown[];
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
    next?: {
      id: Issue['id'],
      ref: Issue['ref'],
      subject: Issue['subject'],
    },
    previous?: {
      id: Issue['id'],
      ref: Issue['ref'],
      subject: Issue['subject'],
    },
  };
  owner: number;
  ownerExtraInfo: Pick<User,
    'bigPhoto' |
    'fullNameDisplay' |
    'gravatarId' |
    'id' |
    'isActive' |
    'photo' |
    'username'>;
  priority: number;
  project: number;
  projectExtraInfo: Pick<Project,
    'id' |
    'logoSmallUrl' |
    'name' |
    'slug'
  >;
  severity: Severity['id'];
  status: Status['id'];
  statusExtraInfo: {
    color: string;
    isClosed: boolean;
    name: string;
  };
  tags: [string, string | null][];
  totalVoters: number;
  totalWatchers: number;
  type: number;
  version: number;
  watchers: number[];
}

export type IssueListItem = Omit<Issue,
'blockedNoteHtml' |
'description' |
'descriptionHtml' |
'neighbors'>;

export interface IssueFilter {
  project: Project['id'];
  status: Status['id'];
  severity: Severity['id'];
  priority: Priority['id'];
  owner: User['id'];
  assignedTo: User['id'];
  tags: string[];
  type: string;
  role: Role['id'];
  watchers: User['id'][];
  statusIsClosed: boolean;
  excludeStatus: Status['id'];
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
  status?: Status['id'];
  severity?: Severity['id'];
  priority?: Priority['id'];
  type?: string;
  subject: string;
  tags?: string[];
  watchers?: User['id'][];
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
  } & Pick<Status, 'color' | 'id' | 'name' | 'order'>;
  tags: {
    color: string | null;
    count: number;
    name: string;
  };
  types: {
    color: string | null;
    count: number;
    name: string;
    id: number;
    order: number;
  };
}

export type IssueVoter = Pick<User, 'fullName' | 'id' | 'username'>;
export type IssueWatcher = Pick<User, 'fullName' | 'id' | 'username'>;
