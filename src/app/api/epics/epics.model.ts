/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { User } from '@/app/api/users/users.model';
import { Project } from '@/app/api/projects/projects.model';
import { Userstory } from '../userstories/userstories.model';
import { Attachment as EpicAttachment, AttachmentCreationData as EpicAttachmentCreationData } from '@/app/api/commons/attachment.model';
import { UserExtraInfo } from '@/app/api/users/users.model';
import { Watcher as EpicVoterWatcher } from '@/app/api/commons/watcher.model';
import { EpicStatus, EpicStatusExtraInfo } from '@/app/api/epic-statuses/epic-statuses.model';
import { TagsFilter } from '@/app/api/commons/tag.model';

export interface Epic {
  assignedTo: User['id'];
  assignedToExtraInfo: UserExtraInfo;
  attachments: EpicAttachment[];
  blockedNote: string;
  clientRequirement: boolean;
  color: string;
  createdDate: string;
  epicsOrder: number;
  id: number;
  isBlocked: boolean;
  isClosed: boolean;
  isVoter: boolean;
  isWatcher: boolean;
  modifiedDate: string;
  owner: number;
  ownerExtraInfo: UserExtraInfo;
  project: number;
  projectExtraInfo: ProjectExtraInfo;
  ref: number;
  status: EpicStatus['id'];
  statusExtraInfo: EpicStatusExtraInfo;
  subject: string;
  tags: string[] | null;
  teamRequirement: boolean;
  totalVoters: number;
  totalWatchers: number;
  userStoriesCounts: UserStoryCounts;
  version: number;
  watchers: EpicVoterWatcher['id'][];
}

export type ProjectExtraInfo = Pick<Project,
  'id' |
  'logoSmallUrl' |
  'name' |
  'slug'>;

export interface UserStoryCounts {
  progress: number;
  total: number;
}

export interface EpicFilter {
  project?: Project['id'];
  slug?: Project['slug'];
  assignedTo?: User['id'];
  closed?: boolean;
}

export interface EpicCreationData {
  assignedTo?: User['id'];
  blockedNote?: string;
  description?: string;
  isBlocked?: boolean;
  isClosed?: boolean;
  color?: string;
  project: Project['id'];
  subject: string;
  tags?: string[];
  watchers?: EpicVoterWatcher['id'][];
}

export type EpicPartialInput = Partial<Epic>;

export interface EpicCreationInBulk {
  projectId: Project['id'];
  statusId?: number;
  bulkEpics: string[];
}

export type MemberFilter = Pick<User,
  'id' |
  'fullName'> & {
    count: number;
  };

export type StatusFilter = Pick<EpicStatus,
  'color' |
  'id' |
  'name' |
  'order'> & {
  count: number;
};

export interface EpicFilters {
  assignedTo: MemberFilter[];
  owners: MemberFilter[];
  statuses: StatusFilter[];
  tags: TagsFilter[];
}

export interface EpicUserStory {
  epic: Epic['id'];
  order: number;
  userStory: Userstory['id'];
}

export type EpicUserStoryPartialInput = Partial<EpicUserStory>;

export interface RelatedUserStoryCreationInBulk {
  projectId: Project['id'];
  bulkUserStories: string[];
}

export type { EpicVoterWatcher };
export type { EpicAttachment };
export type { EpicAttachmentCreationData };
