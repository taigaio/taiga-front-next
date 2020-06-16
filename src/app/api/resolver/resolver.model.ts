/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

export interface ProjectResolver  {
  project: number;
}

export interface UserStoryResolver {
  project: number;
  us: number;
}

export interface IssueResolver {
  project: number;
  issue: number;
}

export interface TaskResolver {
  project: number;
  task: number;
}

export interface MilestoneResolver {
  project: number;
  milestone: number;
}

export interface WikiPageResolver {
  project: number;
  wikipage: number;
}

export interface MultipleResolver {
  project: number;
  task?: number;
  us?: number;
  wikipage?: number;
}

export interface RefResolver {
  project: number;
  task?: number;
  us?: number;
  wikipage?: number;
}
