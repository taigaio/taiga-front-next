/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
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
