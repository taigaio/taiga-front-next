/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { EpicStatus } from '@/app/api/epic-statuses/epic-statuses.model';
import { IssueStatus } from '@/app/api/issue-statuses/issue-statuses.model';
import { IssueType } from '@/app/api/issue-types/issue-types.model';
import { Points } from '@/app/api/points/points.model';
import { Priority } from '@/app/api/priorities/priorities.model';
import { Severity } from '@/app/api/severities/severities.model';
import { TaskStatus } from '@/app/api/task-statuses/task-statuses.model';
import { UserstoryStatus } from '@/app/api/userstory-statuses/userstory-statuses.model';
import { Role } from '@/app/api/roles/roles.model';

type CommonOmits = 'id' | 'project';

export interface ProjectTemplate {
  createdDate: string;
  defaultOptions: {
    epicStatus: EpicStatus['name'];
    usStatus: UserstoryStatus['name'];
    points: string;
    taskStatus: TaskStatus['name'];
    issueStatus: IssueStatus['name'];
    issueType: string;
    priority: string;
    severity: string;
  };
  defaultOwnerRole: string;
  description: string;
  epicStatuses: Omit<EpicStatus, CommonOmits>[];
  id: number;
  isBacklogActivated: boolean;
  isContactActivated: boolean;
  isEpicsActivated: boolean;
  isIssuesActivated: boolean;
  isKanbanActivated: boolean;
  isWikiActivated: boolean;
  issueStatuses: Omit<IssueStatus, CommonOmits>[];
  issueTypes: Omit<IssueType, CommonOmits>[];
  modifiedDate: string;
  name: string;
  order: number;
  points: Omit<Points, CommonOmits>[];
  priorities: Omit<Priority, CommonOmits>[];
  roles: Pick<Role,
    'computable' |
    'name' |
    'order' |
    'permissions' |
    'slug'>[];
  severities: Omit<Severity, CommonOmits>[];
  slug: string;
  taskStatuses: Omit<TaskStatus, CommonOmits>[];
  usStatuses: Omit<UserstoryStatus, CommonOmits>[];
  videoconferences: string | null;
  videoconferencesExtraData: string;
}

export type ProjectTemplateInput = Omit<ProjectTemplate, CommonOmits>;

export type ProjectTemplatePartialInput = Partial<ProjectTemplateInput>;
