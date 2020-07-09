/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { Task } from './tasks.model';

export interface  TaskCustomAttribute {
  createdDate: string;
  description: string;
  extra: null | string;
  id: number;
  modifiedDate: string;
  name: string;
  order: number;
  project: number;
  type: string;
}

export interface TaskCustomAttributeCreationData {
  name: string;
  description?: string;
  order?: number;
  project: number;
}

export interface TaskCustomAttributeValues {
  attributesValues: Record<string, string>;
  task: Task['id'];
  version: number;
}
