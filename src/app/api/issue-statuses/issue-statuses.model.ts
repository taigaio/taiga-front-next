/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

import { Project } from '@/app/api/projects/projects.model';

export interface IssueStatus {
  id: number;
  name: string;
  slug: string;
  color: string;
  isClosed: boolean;
  order: number;
  project: Project['id'];
}

export interface IssueStatusInput {
  name: string;
  color: string;
  isClosed: boolean;
  order: number;
  project: Project['id'];
}

export type IssueStatusPartialInput = Partial<IssueStatusInput>;

export type IssueStatusesOrderList = number[][];

export type IssueStatusExtraInfo = Pick<IssueStatus, 'color' | 'isClosed' | 'name'>;
