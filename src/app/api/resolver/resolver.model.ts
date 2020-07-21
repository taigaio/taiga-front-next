/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
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
