/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { Project } from '@/app/api/projects/projects.model';
import { Userstory } from '@/app/api/userstories/userstories.model';
import { Issue } from '@/app/api/issues/issues.model';
import { Task } from '@/app/api/tasks/tasks.model';
import { Milestone } from '@/app/api/milestones/milestones.model';
import { WikiPage } from '@/app/api/wiki/wiki.model';

export interface ProjectResolver  {
  project: Project['id'];
}

export interface UserStoryResolver {
  project: Project['id'];
  us: Userstory['id'];
}

export interface IssueResolver {
  project: Project['id'];
  issue: Issue['id'];
}

export interface TaskResolver {
  project: Project['id'];
  task: Task['id'];
}

export interface MilestoneResolver {
  project: Project['id'];
  milestone: Milestone['id'];
}

export interface WikiPageResolver {
  project: Project['id'];
  wikipage: WikiPage['id'];
}

export interface MultipleResolver {
  project: Project['id'];
  task?: Task['id'];
  us?: Userstory['id'];
  wikipage?: WikiPage['id'];
}

export interface RefResolver {
  project: Project['id'];
  task?: Task['id'];
  us?: Userstory['id'];
  wikipage?: WikiPage['id'];
}
