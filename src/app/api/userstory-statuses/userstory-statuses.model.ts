/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
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

