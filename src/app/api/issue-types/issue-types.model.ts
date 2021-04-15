/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
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
