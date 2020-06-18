/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */
import { Optional } from 'utility-types';
import { User } from '@/app/api/users/users.model';

export interface ProjectsListFilter {
  member?: number;
  members?: number[];
  is_looking_for_people?: boolean;
  is_featured?: boolean;
  is_backlog_activated?: boolean;
  is_kanban_activated?: boolean;
}

type NewProjectFields =
  'name' |
  'description' |
  'creation_template' |
  'is_backlog_activated' |
  'is_issues_activated' |
  'is_kanban_activated' |
  'is_private' |
  'is_wiki_activated' |
  'videoconferences' |
  'videoconferences_extra_data' |
  'total_milestones' |
  'total_story_points';

type NewProjectRequiredFields = 'name' | 'description';

type NewProjectOptionalFields = Exclude<NewProjectFields, NewProjectRequiredFields>;

export type NewProject = Optional<Pick<Project, NewProjectFields>, NewProjectOptionalFields>;

export interface DuplicateProject extends Pick<Project,
'description' |
'is_private' |
'name'> {
  users: User['id'][];
}

export enum ProjectsListOrderBy {
  membershipsUserOrder = 'memberships_user_order',
  totalFans = 'total_fans',
  totalFansLastWeek = 'total_fans_last_week',
  totalFansLastMonth = 'total_fans_last_month',
  totalFansLastYear = 'total_fans_last_year',
  totalActivity = 'total_activity',
  totalActivityLastWeek = 'total_activity_last_week',
  totalActivityLastMonth = 'total_activity_last_month',
  totalActivityLastYear = 'total_activity_last_year',
}

export enum Permissions {
  modifyTask = 'modify_task',
  modifyEpic = 'modify_epic',
  addTask = 'add_task',
  adminRoles = 'admin_roles',
  commentWikiPage = 'comment_wiki_page',
  viewProject = 'view_project',
  modifyProject = 'modify_project',
  modifyWikiPage = 'modify_wiki_page',
  adminProjectValues = 'admin_project_values',
  modifyUs = 'modify_us',
  viewEpics = 'view_epics',
  deleteProject = 'delete_project',
  modifyIssue = 'modify_issue',
  modifyWikiLink = 'modify_wiki_link',
  addIssue = 'add_issue',
  deleteMilestone = 'delete_milestone',
  removeMember = 'remove_member',
  deleteEpic = 'delete_epic',
  deleteWikiLink = 'delete_wiki_link',
  addEpic = 'add_epic',
  commentEpic = 'comment_epic',
  deleteTask = 'delete_task',
  commentTask = 'comment_task',
  commentIssue = 'comment_issue',
  viewIssues = 'view_issues',
  addUs = 'add_us',
  addMember = 'add_member',
  addWikiPage = 'add_wiki_page',
  deleteIssue = 'delete_issue',
  viewWikiPages = 'view_wiki_pages',
  viewMilestones = 'view_milestones',
  addMilestone = 'add_milestone',
  commentUs = 'comment_us',
  deleteWikiPage = 'delete_wiki_page',
  viewUs = 'view_us',
  modifyMilestone = 'modify_milestone',
  addWikiLink = 'add_wiki_link',
  deleteUs = 'delete_us',
  viewWikiLinks = 'view_wiki_links',
  viewTasks = 'view_tasks',
}

export interface Status {
  color: string;
  id: number;
  is_closed: boolean;
  name: string;
  order: number;
  project_id: number;
  slug: string;
}

export interface Duedates {
  by_default: boolean;
  color: string;
  days_to_due: null | string;
  id: number;
  name: string;
  order: number;
  project_id: number;
}

export interface Attribute {
  color: string;
  id: number;
  name: string;
  order: number;
  project_id: number;
}

export type ProjectListEntry = Pick<Project,
  'anon_permissions' |
  'blocked_code' |
  'created_date' |
  'creation_template' |
  'default_epic_status' |
  'default_issue_status' |
  'default_issue_type' |
  'default_points' |
  'default_priority' |
  'default_severity' |
  'default_task_status' |
  'default_us_status' |
  'description' |
  'i_am_admin' |
  'i_am_member' |
  'i_am_owner' |
  'id' |
  'is_backlog_activated' |
  'is_contact_activated' |
  'is_epics_activated' |
  'is_fan' |
  'is_featured' |
  'is_issues_activated' |
  'is_kanban_activated' |
  'is_looking_for_people' |
  'is_private' |
  'is_watcher' |
  'is_wiki_activated' |
  'logo_big_url' |
  'logo_small_url' |
  'looking_for_people_note' |
  'members' |
  'modified_date' |
  'my_homepage' |
  'my_permissions' |
  'name' |
  'notify_level' |
  'owner' |
  'public_permissions' |
  'slug' |
  'tags' |
  'tags_colors' |
  'total_activity' |
  'total_activity_last_month' |
  'total_activity_last_week' |
  'total_activity_last_year' |
  'total_closed_milestones' |
  'total_fans' |
  'total_fans_last_month' |
  'total_fans_last_week' |
  'total_fans_last_year' |
  'total_milestones' |
  'total_story_points' |
  'total_watchers' |
  'totals_updated_datetime' |
  'videoconferences' |
  'videoconferences_extra_data'>;

export interface CustomAttribute {
  created_date: string;
  description: string;
  extra: null | string;
  id: number;
  modified_date: string;
  name: string;
  order: number;
  project_id: number;
  type: 'text' | 'multiline' | 'richtext' | 'date' | 'url' | 'dropdown' | 'checkbox' | 'number';
}

export interface Project {
  anon_permissions: string[];
  blocked_code: null | string;
  created_date: string;
  creation_template: number;
  default_epic_status: number;
  default_issue_status: number;
  default_issue_type: number;
  default_points: number;
  default_priority: number;
  default_severity: number;
  default_task_status: number;
  default_us_status: number;
  description: string;
  epic_custom_attributes: CustomAttribute[];
  epic_statuses: Status;
  epics_csv_uuid: null | string;
  i_am_admin: boolean;
  i_am_member: boolean;
  i_am_owner: boolean;
  id: number;
  is_backlog_activated: boolean;
  is_contact_activated: boolean;
  is_epics_activated: boolean;
  is_fan: boolean;
  is_featured: boolean;
  is_issues_activated: boolean;
  is_kanban_activated: boolean;
  is_looking_for_people: boolean;
  is_out_of_owner_limits: boolean;
  is_private: boolean;
  is_private_extra_info: {
      can_be_updated: boolean;
      reason: null | string;
  };
  is_watcher: boolean;
  is_wiki_activated: boolean;
  issue_custom_attributes: CustomAttribute[];
  issue_duedates: Duedates[];
  issue_statuses: Status[];
  issue_types: Attribute[];
  issues_csv_uuid: null | string;
  logo_big_url: string;
  logo_small_url: string;
  looking_for_people_note: string;
  max_memberships: null | number;
  members: {
    role: number;
    role_name: string;
  } & Pick<User,
      'color' |
      'full_name' |
      'full_name_display' |
      'gravatar_id' |
      'id' |
      'is_active' |
      'photo' |
      'username'>;
  milestones: {
    closed: boolean;
    id: number;
    name: string;
    slug: string;
  }[];
  modified_date: string;
  my_homepage: number;
  my_permissions: Permissions[];
  name: string;
  notify_level: number;
  owner: Pick<User,
    'big_photo' |
    'full_name_display' |
    'gravatar_id' |
    'id' |
    'is_active' |
    'photo' |
    'username'>;
  points: {
    id: number;
    name: string;
    order: number;
    project_id: number;
    value: null | number;
  }[];
  priorities: Attribute[];
  public_permissions: Permissions[];
  roles: {
    computable: boolean,
    id: number;
    name: string;
    order: number;
    permissions: Permissions[],
    project_id: number;
    slug: string;
  }[];
  severities: Attribute[];
  slug: string;
  tags: string[];
  tags_colors: Record<string, string>;
  task_custom_attributes: CustomAttribute[];
  task_duedates: Duedates[];
  task_statuses: Status[];
  tasks_csv_uuid: null | string;
  total_activity: number;
  total_activity_last_month: number;
  total_activity_last_week: number;
  total_activity_last_year: number;
  total_closed_milestones: number;
  total_fans: number;
  total_fans_last_month: number;
  total_fans_last_week: number;
  total_fans_last_year: number;
  total_memberships: number;
  total_milestones: number;
  total_story_points: number;
  total_watchers: number;
  totals_updated_datetime: string;
  transfer_token: string;
  us_duedates: Duedates[];
  us_statuses: Status[];
  userstories_csv_uuid: null | string;
  userstory_custom_attributes: CustomAttribute[];
  videoconferences: null | string;
  videoconferences_extra_data: null | string;
}

export interface ProjectModules {
  bitbucket: {
      secret: string;
      valid_origin_ips: string[];
      webhooks_url: string;
  };
  github: {
      secret: string;
      webhooks_url: string;
  };
  gitlab: {
      secret: string;
      valid_origin_ips: string[];
      webhooks_url: string;
  };
  gogs: {
      secret: string;
      webhooks_url: string;
  };
}

export interface ProjectStats {
  assigned_points: number;
  assigned_points_per_role: Record<string, number>;
  closed_points: number;
  closed_points_per_role: Record<string, number>;
  defined_points: number;
  defined_points_per_role: Record<string, number>;
  milestones: {
    'client-increment': number;
    evolution: number;
    name: string;
    optimal: number;
    'team-increment': number;
  }[];
  name: string;
  speed: number;
  total_milestones: number;
  total_points: number;
}

export interface AssignedStat {
  count: number;
  color: string;
  id: number;
  name: string;
  username: string;
}

export interface StatsByOpenClosed {
  color: string;
  data: number[];
  id: number;
  name: string;
}

export interface ProjectIssueStats {
  closed_issues: number;
  issues_per_assigned_to: Record<string, AssignedStat>;
  issues_per_owner: Record<string, Omit<AssignedStat, 'username'>>;
  issues_per_priority: Record<string, Omit<AssignedStat, 'username'>>;
  issues_per_severity: Record<string, Omit<AssignedStat, 'username'>>;
  issues_per_status: Record<string, Omit<AssignedStat, 'username'>>;
  issues_per_type: Record<string, Omit<AssignedStat, 'username'>>;
  last_four_weeks_days: {
    by_open_closed: {
      closed: number[];
      open: number[];
      by_priority: Record<string, StatsByOpenClosed>
      by_severity: Record<string, StatsByOpenClosed>
      by_status: Record<string, StatsByOpenClosed>
    };
  };
  opened_issues: number;
  total_issues: number;
}

export interface Tag {
  color: string;
  tag: string;
}

export interface EditTag {
  color: string;
  from_tag: string;
  to_tag: string;
}

export interface ProjectTemplateDetail {
  created_date: string;
  default_options: {
      epic_status: string;
      issue_status: string;
      issue_type: string;
      points: string;
      priority: string;
      severity: string;
      task_status: string;
      us_status: string;
  };
  default_owner_role: string;
  description: string;
  epic_statuses: Pick<Status, 'color' | 'is_closed' | 'name' | 'order' | 'slug'>[];
  id: number;
  is_backlog_activated: boolean;
  is_contact_activated: boolean;
  is_epics_activated: boolean;
  is_issues_activated: boolean;
  is_kanban_activated: boolean;
  is_wiki_activated: boolean;
  issue_statuses: Pick<Status, 'color' | 'is_closed' | 'name' | 'order' | 'slug'>[];
  issue_types: {
    color: string;
    name: string;
    order: number;
  }[];
  modified_date: string;
  name: string;
  order: number;
  points: {
    name: string;
    order: number
    value: null | string;
  }[];
  priorities: {
    color: string;
    name: string;
    order: number;
  }[];
  roles: {
    computable: boolean;
    name: string;
    order: number;
    permissions: Permissions[]
    slug: string;
  }[];
  severities: {
    color: string;
    name: string;
    order: number;
  }[];
  slug: string;
  task_statuses: Pick<Status, 'color' | 'is_closed' | 'name' | 'order' | 'slug'>[];
  us_statuses: {
    is_archived: boolean;
    wip_limit: null | string;
  } & Pick<Status,
    'color' |
    'is_closed' |
    'name' |
    'order' |
    'slug'>[];
  videoconferences: null | string;
  videoconferences_extra_data: string;
}
