/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { Issue } from './issues.model';

export interface  IssueCustomAttribute {
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

export interface IssueCustomAttributeCreationData {
  name: string;
  description?: string;
  order?: number;
  project: number;
}

export interface IssueCustomAttributeValues {
  attributesValues: Record<string, string>;
  issue: Issue['id'];
  version: number;
}
