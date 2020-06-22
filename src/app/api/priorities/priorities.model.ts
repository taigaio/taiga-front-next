/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */


export interface Priority {
  id: number;
  name: string;
  color: string;
  order: number;
  project: number;
}

export interface PriorityInput {
  name: string;
  color: string;
  order: number;
  project: number;
}

export type PriorityPartialInput = Partial<PriorityInput>;

export type PrioritiesOrderList = number[][];
