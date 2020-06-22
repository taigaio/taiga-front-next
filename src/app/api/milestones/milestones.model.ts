/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

export interface Milestone {
  closed: boolean;
  closed_points: null | number;
  created_date: string;
  disponibility: number;
  estimated_finish: string;
  estimated_start: string;
  id: number;
  modified_date: string;
  name: string;
  order: number;
  owner: number;
  project: number;
  project_extra_info: any;
  slug: string;
  total_points: number;
  user_stories: any[];
}

export type MilestonePartialInput = Partial<Milestone>;

export interface MilestoneCreationData {
  project: number;
  name: string;
  estimatedStart: string;
  estimatedFinish: string;
  disponibility?: number;
  slug?: string;
  order?: number;
  watchers?: number[];
}
