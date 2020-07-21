/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */
import { User } from '@/app/api/users/users.model';
import { Project } from '@/app/api/projects/projects.model';
import { Userstory } from '@/app/api/userstories/userstories.model';

export interface Milestone {
  closed: boolean;
  closedPoints: null | number;
  createdDate: string;
  disponibility: number;
  estimatedFinish: string;
  estimatedStart: string;
  id: number;
  modifiedDate: string;
  name: string;
  order: number;
  owner: User['id'];
  project: Project['id'];
  projectExtraInfo: any;
  slug: string;
  totalPoints: number;
  userStories: Userstory[];
}

export type MilestonePartialInput = Partial<Milestone>;

export interface MilestoneCreationData {
  project: Project['id'];
  name: string;
  estimatedStart: string;
  estimatedFinish: string;
  disponibility?: number;
  slug?: string;
  order?: number;
  watchers?: User['id'][];
}
