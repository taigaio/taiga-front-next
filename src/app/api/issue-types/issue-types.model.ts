/**
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 *
 * Copyright (c) 2021-present Kaleidos INC
 */

import { Project } from '@/app/api/projects/projects.model';

export interface IssueType {
  id: number;
  name: string;
  color: string;
  order: number;
  project: Project['id'];
}

export interface IssueTypeInput {
  name: string;
  color: string;
  order: number;
  project: Project['id'];
}

export type IssueTypePartialInput = Partial<IssueTypeInput>;

export type IssueTypesOrderList = number[][];
