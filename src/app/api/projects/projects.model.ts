/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */
import { Optional } from 'utility-types';
import { User } from '@/app/api/users/users.model';
import { Role, Permissions } from '../roles/roles.model';

export interface ProjectsListFilter {
  member?: number;
  members?: number[];
  isLookingForPeople?: boolean;
  isFeatured?: boolean;
  isBacklogActivated?: boolean;
  isKanbanActivated?: boolean;
}

type NewProjectFields =
  'name' |
  'description' |
  'creationTemplate' |
  'isBacklogActivated' |
  'isIssuesActivated' |
  'isKanbanActivated' |
  'isPrivate' |
  'isWikiActivated' |
  'videoconferences' |
  'videoconferencesExtraData' |
  'totalMilestones' |
  'totalStoryPoints';

type NewProjectRequiredFields = 'name' | 'description';

type NewProjectOptionalFields = Exclude<NewProjectFields, NewProjectRequiredFields>;

export type NewProject = Optional<Pick<Project, NewProjectFields>, NewProjectOptionalFields>;

export interface DuplicateProject extends Pick<Project,
'description' |
'isPrivate' |
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

export interface Status {
  color: string;
  id: number;
  isClosed: boolean;
  name: string;
  order: number;
  projectId: number;
  slug: string;
}

export interface Duedates {
  byDefault: boolean;
  color: string;
  daysToDue: null | string;
  id: number;
  name: string;
  order: number;
  projectId: number;
}

export interface Attribute {
  color: string;
  id: number;
  name: string;
  order: number;
  projectId: number;
}

export type ProjectListEntry = Pick<Project,
  'anonPermissions' |
  'blockedCode' |
  'createdDate' |
  'creationTemplate' |
  'defaultEpicStatus' |
  'defaultIssueStatus' |
  'defaultIssueType' |
  'defaultPoints' |
  'defaultPriority' |
  'defaultSeverity' |
  'defaultTaskStatus' |
  'defaultUsStatus' |
  'description' |
  'iAmAdmin' |
  'iAmMember' |
  'iAmOwner' |
  'id' |
  'isBacklogActivated' |
  'isContactActivated' |
  'isEpicsActivated' |
  'isFan' |
  'isFeatured' |
  'isIssuesActivated' |
  'isKanbanActivated' |
  'isLookingForPeople' |
  'isPrivate' |
  'isWatcher' |
  'isWikiActivated' |
  'logoBigUrl' |
  'logoSmallUrl' |
  'lookingForPeopleNote' |
  'members' |
  'modifiedDate' |
  'myHomepage' |
  'myPermissions' |
  'name' |
  'notifyLevel' |
  'owner' |
  'publicPermissions' |
  'slug' |
  'tags' |
  'tagsColors' |
  'totalActivity' |
  'totalActivityLastMonth' |
  'totalActivityLastWeek' |
  'totalActivityLastYear' |
  'totalClosedMilestones' |
  'totalFans' |
  'totalFansLastMonth' |
  'totalFansLastWeek' |
  'totalFansLastYear' |
  'totalMilestones' |
  'totalStoryPoints' |
  'totalWatchers' |
  'totalsUpdatedDatetime' |
  'videoconferences' |
  'videoconferencesExtraData'>;

export interface CustomAttribute {
  createdDate: string;
  description: string;
  extra: null | string;
  id: number;
  modifiedDate: string;
  name: string;
  order: number;
  projectId: number;
  type: 'text' | 'multiline' | 'richtext' | 'date' | 'url' | 'dropdown' | 'checkbox' | 'number';
}

export interface Project {
  anonPermissions: string[];
  blockedCode: null | string;
  createdDate: string;
  creationTemplate: number;
  defaultEpicStatus: number;
  defaultIssueStatus: number;
  defaultIssueType: number;
  defaultPoints: number;
  defaultPriority: number;
  defaultSeverity: number;
  defaultTaskStatus: number;
  defaultUsStatus: number;
  description: string;
  epicCustomAttributes: CustomAttribute[];
  epicStatuses: Status;
  epicsCsvUuid: null | string;
  iAmAdmin: boolean;
  iAmMember: boolean;
  iAmOwner: boolean;
  id: number;
  isBacklogActivated: boolean;
  isContactActivated: boolean;
  isEpicsActivated: boolean;
  isFan: boolean;
  isFeatured: boolean;
  isIssuesActivated: boolean;
  isKanbanActivated: boolean;
  isLookingForPeople: boolean;
  isOutOfOwnerLimits: boolean;
  isPrivate: boolean;
  isPrivateExtraInfo: {
      canBeUpdated: boolean;
      reason: null | string;
  };
  isWatcher: boolean;
  isWikiActivated: boolean;
  issueCustomAttributes: CustomAttribute[];
  issueDuedates: Duedates[];
  issueStatuses: Status[];
  issueTypes: Attribute[];
  issuesCsvUuid: null | string;
  logoBigUrl: string;
  logoSmallUrl: string;
  lookingForPeopleNote: string;
  maxMemberships: null | number;
  members: {
    role: number;
    roleName: string;
  } & Pick<User,
      'color' |
      'fullName' |
      'fullNameDisplay' |
      'gravatarId' |
      'id' |
      'isActive' |
      'photo' |
      'username'>;
  milestones: {
    closed: boolean;
    id: number;
    name: string;
    slug: string;
  }[];
  modifiedDate: string;
  myHomepage: number;
  myPermissions: Permissions[];
  name: string;
  notifyLevel: number;
  owner: Pick<User,
    'bigPhoto' |
    'fullNameDisplay' |
    'gravatarId' |
    'id' |
    'isActive' |
    'photo' |
    'username'>;
  points: {
    id: number;
    name: string;
    order: number;
    projectId: number;
    value: null | number;
  }[];
  priorities: Attribute[];
  publicPermissions: Permissions[];
  roles: Pick<Role,
    'computable' |
    'id' |
    'name' |
    'order' |
    'permissions' |
    'slug'> & {projectId: number}[];
  severities: Attribute[];
  slug: string;
  tags: string[];
  tagsColors: Record<string, string>;
  taskCustomAttributes: CustomAttribute[];
  taskDuedates: Duedates[];
  taskStatuses: Status[];
  tasksCsvUuid: null | string;
  totalActivity: number;
  totalActivityLastMonth: number;
  totalActivityLastWeek: number;
  totalActivityLastYear: number;
  totalClosedMilestones: number;
  totalFans: number;
  totalFansLastMonth: number;
  totalFansLastWeek: number;
  totalFansLastYear: number;
  totalMemberships: number;
  totalMilestones: number;
  totalStoryPoints: number;
  totalWatchers: number;
  totalsUpdatedDatetime: string;
  transferToken: string;
  usDuedates: Duedates[];
  usStatuses: Status[];
  userstoriesCsvUuid: null | string;
  userstoryCustomAttributes: CustomAttribute[];
  videoconferences: null | string;
  videoconferencesExtraData: null | string;
}

export interface ProjectModules {
  bitbucket: {
      secret: string;
      validOriginIps: string[];
      webhooksUrl: string;
  };
  github: {
      secret: string;
      webhooksUrl: string;
  };
  gitlab: {
      secret: string;
      validOriginIps: string[];
      webhooksUrl: string;
  };
  gogs: {
      secret: string;
      webhooksUrl: string;
  };
}

export interface ProjectStats {
  assignedPoints: number;
  assignedPointsPerRole: Record<string, number>;
  closedPoints: number;
  closedPointsPerRole: Record<string, number>;
  definedPoints: number;
  definedPointsPerRole: Record<string, number>;
  milestones: {
    'client-increment': number;
    evolution: number;
    name: string;
    optimal: number;
    'team-increment': number;
  }[];
  name: string;
  speed: number;
  totalMilestones: number;
  totalPoints: number;
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
  closedIssues: number;
  issuesPerAssignedTo: Record<string, AssignedStat>;
  issuesPerOwner: Record<string, Omit<AssignedStat, 'username'>>;
  issuesPerPriority: Record<string, Omit<AssignedStat, 'username'>>;
  issuesPerSeverity: Record<string, Omit<AssignedStat, 'username'>>;
  issuesPerStatus: Record<string, Omit<AssignedStat, 'username'>>;
  issuesPerType: Record<string, Omit<AssignedStat, 'username'>>;
  lastFourWeeksDays: {
    byOpenClosed: {
      closed: number[];
      open: number[];
      byPriority: Record<string, StatsByOpenClosed>
      bySeverity: Record<string, StatsByOpenClosed>
      byStatus: Record<string, StatsByOpenClosed>
    };
  };
  openedIssues: number;
  totalIssues: number;
}

export interface Tag {
  color: string;
  tag: string;
}

export interface EditTag {
  color: string;
  fromTag: string;
  toTag: string;
}

