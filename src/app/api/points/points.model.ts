/**
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 *
 * Copyright (c) 2021-present Kaleidos INC
 */

import { Project } from '@/app/api//projects/projects.model';

export interface Points {
  id: number;
  name: string;
  value: number | null;
  order: number;
  project: Project['id'];
}

export interface PointsInput {
  name: string;
  value: number | null;
  order: number;
  project: Project['id'];
}

export type PointsPartialInput = Partial<PointsInput>;

export type PointsOrderList = number[][];
