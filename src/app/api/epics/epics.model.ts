/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

export interface Epic {
  assigned_to: number;
  assigned_to_extra_info: UserExtraInfo;
  attachments: any[];
  blocked_note: string;
  client_requirement: boolean;
  color: string;
  created_date: string;
  epics_order: number;
  id: number;
  is_blocked: boolean;
  is_closed: boolean;
  is_voter: boolean;
  is_watcher: boolean;
  modified_date: string;
  owner: number;
  owner_extra_info: UserExtraInfo;
  project: number;
  project_extra_info: ProjectExtraInfo;
  ref: number;
  status: number;
  status_extra_info: StatusExtraInfo;
  subject: string;
  tags: string | null[];
  team_requirement: boolean;
  total_voters: number;
  total_watchers: 3;
  user_stories_counts: UserStoryCounts;
  version: number;
  watchers: number[];
}

export interface UserExtraInfo {
  big_photo: null | string;
  full_name_display: string;
  gravatar_id: string;
  id: number;
  is_active: boolean;
  photo: null | string;
  username: string;
}

export interface ProjectExtraInfo {
  id: number;
  logo_small_url: null | string;
  name: string;
  slug: string;
}

export interface StatusExtraInfo {
  color: string;
  is_closed: boolean;
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
