/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { EpicStatus } from '../epic-statuses/epic-statuses.model';
import { IssueStatus } from '../issue-statuses/issue-statuses.model';
import { IssueType } from '../issue-types/issue-types.model';
import { Points } from '../points/points.model';
import { Priority } from '../priorities/priorities.model';
import { Severity } from '../severities/severities.model';
import { TaskStatus } from '../task-statuses/task-statuses.model';
import { UserstoryStatus } from '../userstory-statuses/userstory-statuses.model';

type CommonOmits = 'id' | 'project';

export interface ProjectTemplate {
  createdDate: string;
  defaultOptions: {
    epicStatus: string;
    usStatus: string;
    points: string;
    taskStatus: string;
    issueStatus: string;
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
  roles: {
    computable: boolean;
    name: string;
    order: number;
    permissions: Permissions[]
    slug: string;
  }[];  // TODO Use model from api/roles
  severities: Omit<Severity, CommonOmits>[];
  slug: string;
  taskStatuses: Omit<TaskStatus, CommonOmits>[];
  usStatuses: Omit<UserstoryStatus, CommonOmits>[];
  videoconferences: string | null;
  videoconferencesExtraData: string;
}

export type ProjectTemplateInput = Omit<ProjectTemplate, CommonOmits>;

export type ProjectTemplatePartialInput = Partial<ProjectTemplateInput>;
