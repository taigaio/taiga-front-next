/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

export interface Epic {
  assignedTo: number;
  assignedToExtraInfo: UserExtraInfo;
  attachments: any[];
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
  status: number;
  statusExtraInfo: StatusExtraInfo;
  subject: string;
  tags: string[] | null;
  teamRequirement: boolean;
  totalVoters: number;
  totalWatchers: 3;
  userStoriesCounts: UserStoryCounts;
  version: number;
  watchers: number[];
}

export interface UserExtraInfo {
  bigPhoto: null | string;
  fullNameDisplay: string;
  gravatarId: string;
  id: number;
  isActive: boolean;
  photo: null | string;
  username: string;
}

export interface ProjectExtraInfo {
  id: number;
  logoSmallUrl: null | string;
  name: string;
  slug: string;
}

export interface StatusExtraInfo {
  color: string;
  isClosed: boolean;
  name: string;
}

export interface UserStoryCounts {
  progress: number;
  total: number;
}

export interface EpicFilter {
  project?: number;
  slug?: string;
  assignedTo?: number;
  closed?: boolean;
}

export interface EpicCreationData {
  assignedTo?: number;
  blockedNote?: string;
  description?: string;
  isBlocked?: boolean;
  isClosed?: boolean;
  color?: string;
  project: number;
  subject: string;
  tags?: string[];
  watchers?: number[];
}

export type EpicPartialInput = Partial<Epic>;

export interface EpicCreationInBulk {
  projectId: number;
  statusId?: number;
  bulkEpics: string[];
}

export interface MemberFilter {
  count: number;
  fullName: string;
  id?: number;
}

export interface StatusFilter {
  color: string;
  count: number;
  id: number;
  name: string;
  order: number;
}

export interface TagsFilter {
  color: string;
  count: number;
  name: string;
}

export interface EpicFilters {
  assignedTo: MemberFilter[];
  owners: MemberFilter[];
  statuses: StatusFilter[];
  tags: TagsFilter[];
}

export interface EpicUserStory {
  epic: number;
  order: number;
  userStory: number;
}

export type EpicUserStoryPartialInput = Partial<EpicUserStory>;

export interface RelatedUserStoryCreationInBulk {
  projectId: number;
  bulkUserStories: string[];
}

export interface EpicVoterWatcher {
  fullName: string;
  id: number;
  username: string;
}

export interface EpicAttachment {
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
    thumbnailCardUrl: string;
    url: string;
}

export interface EpicAttachmentCreationData {
  objectId: number;
  project: number;
  attachedFile: any;
  description?: string;
  isDeprecated?: boolean;
}
