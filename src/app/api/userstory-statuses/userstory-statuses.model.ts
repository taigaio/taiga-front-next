/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { Project } from '@/app/api/projects/projects.model';

export interface UserstoryStatus {
  id: number;
  name: string;
  slug: string;
  color: string;
  isClosed: boolean;
  isArchived: boolean;
  wipLimit: number | null;
  order: number;
  project: Project['id'];
}

export interface UserstoryStatusInput {
  name: string;
  color: string;
  isClosed: boolean;
  isArchived: boolean;
  wipLimit: number | null;
  order: number;
  project: Project['id'];
}

export type UserstoryStatusPartialInput = Partial<UserstoryStatusInput>;

export type UserstoryStatusesOrderList = number[][];

export type UserstoryStatusExtraInfo = Pick<UserstoryStatus, 'color' | 'isClosed' | 'name'>;

