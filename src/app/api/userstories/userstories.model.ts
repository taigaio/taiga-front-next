/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { User } from '@/app/api/users/users.model';
import { Optional } from 'utility-types';
import { Project } from '@/app/api/projects/projects.model';
import { Epic } from '@/app/api/epics/epics.model';

export interface UserstoryFilter {
  project: number;
  milestone: number;
  milestoneIsnull: boolean;
  status: number;
  statusIsArchived: boolean;
  tags: string;
  watchers: number[];
  assignedTo: number[];
  epic: number;
  role: number;
  statusIsClosed: boolean;
  excludeStatus: number;
  excludeTags: string;
  excludeAssignedTo: number;
  excludeRole: number;
  excludeEpic: number;
}

export interface Userstory {
  assignedTo: null | number;
  assignedToExtraInfo: Pick<User,
    'bigPhoto' |
    'fullNameDisplay' |
    'gravatarId' |
    'id' |
    'isActive' |
    'photo' |
    'username'>;
  assignedUsers: number[];
  attachments: unknown[];
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
  milestoneName: null | string;
  milestoneSlug: null | string;
  modifiedDate: string;
  neighbors: {
    next: Pick<Userstory, 'id' | 'ref' | 'subject'>
    previous: Pick<Userstory, 'id' | 'ref' | 'subject'>
  };
  originIssue: null | number;
  originTask: null | number;
  owner: number;
  ownerExtraInfo: Pick<User,
    'bigPhoto' |
    'fullNameDisplay' |
    'gravatarId' |
    'id' |
    'isActive' |
    'photo' |
    'username'>;
  points: Record<string, number>;
  project: number;
  projectExtraInfo: Pick<Project,
    'id' |
    'logoSmallUrl' |
    'name' |
    'slug'
  >;
  ref: number;
  sprintOrder: number;
  status: number;
  statusExtraInfo: {
    color: string;
    isClosed: boolean;
    name: string;
  };
  subject: string;
  tags: [string, string | null][];
  tasks: number[];
  teamRequirement: boolean;
  totalAttachments: number;
  totalComments: number;
  totalPoints: number;
  totalVoters: number;
  totalWatchers: number;
  tribeGig: null | string;
  version: number;
  watchers: number[];
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
    fullName: string;
    id: null | number;
  }[];
  assignedUsers: {
    count: number;
    fullName: string;
    id: null | number;
  }[];
  epics: {
    count: number;
    id: null | number,
    order: number,
    ref: null | number,
    subject: null | string
  }[];
  owners: {
    count: number;
    fullName: string;
    id: number;
  }[];
  roles: {
    color: null | string;
    count: number;
    id: number;
    name: string;
    order: number;
  }[];
  statuses: {
    color: string;
    count: number;
    id: number;
    name: string;
    order: number;
  }[];
  tags: {
    color: null | string;
    count: number;
    name: string;
  }[];
}

export type UserstoryVoter = Pick<User, 'fullName' | 'id' | 'username'>;
export type UserstoryWatcher = Pick<User, 'fullName' | 'id' | 'username'>;

export interface Attachment {
  attachedFile: string;
  createdDate: string;
  description: string;
  fromComment: boolean;
  id: number;
  isDeprecated: boolean;
  modifiedDate: string;
  name: string;
  objectId: number;
  order: number;
  owner: number;
  previewUrl: string;
  project: number;
  sha1: string;
  size: number;
  thumbnailCardUrl: null | string;
  url: string;
}

export type AttachmentCreationData = Optional<{
  attachedFile: File;
} & Pick<Attachment,
  'objectId' |
  'project' |
  'description' |
  'isDeprecated'>,
  'description' |
  'isDeprecated'>;
