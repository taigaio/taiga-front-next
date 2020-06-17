/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */


export interface TaskStatus {
  id: number;
  name: string;
  slug: string;
  color: string;
  is_closed: boolean;
  order: number;
  project: number;
}

export interface TaskStatusInput {
  name: string;
  color: string;
  is_closed: boolean;
  order: number;
  project: number;
}

export type TaskStatusPartialInput = Partial<TaskStatusInput>;

export type TaskStatusesOrderList = number[][];
