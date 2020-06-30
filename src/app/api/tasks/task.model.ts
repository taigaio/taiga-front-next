/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

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

export interface StatusExtraInfo {
  color: string;
  isClosed: boolean;
  name: string;
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
  externalReference: string | null;
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
  status: number;
  statusExtraInfo: StatusExtraInfo;
  subject: string;
  tags: Record<string, string>[];
  taskboardOrder: number;
  totalComments: number;
  totalVoters: number;
  totalWatchers: number;
  usOrder: number;
  userStory: number;
  userStoryExtraInfo: UserStoryExtraInfo;
  version: number;
  watchers: number[];
}

export interface TaskFilter {
  assignedTo: number;
  excludeAssignedTo: number;
  excludeOwner: number;
  excludeRole: number;
  excludeStatus: number;
  excludeTags: string[];
  milestone?: number;
  owner?: number;
  project?: number;
  role?: number;
  status?: number;
  tags?: string[];
  userStory?: number;
  watchers: number;
  statusIsClosed: boolean;
}
